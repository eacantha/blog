(() => {
  const root = document.querySelector("[data-search-root]");
  if (!root) return;

  const form = root.querySelector("[data-search-form]");
  const input = root.querySelector("[data-search-input]");
  const results = root.querySelector("[data-search-results]");
  const status = root.querySelector("[data-search-status]");
  const indexUrl = form.dataset.indexUrl;

  let posts = null;
  let loadError = false;
  let debounceTimer;

  const normalize = (value) =>
    String(value || "")
      .normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLocaleLowerCase();

  const loadIndex = async () => {
    if (posts || loadError) return posts;

    try {
      const response = await fetch(indexUrl, { credentials: "same-origin" });
      if (!response.ok) throw new Error(`Search index returned ${response.status}`);
      posts = await response.json();
      return posts;
    } catch (error) {
      loadError = true;
      console.error("Unable to load the search index.", error);
      return null;
    }
  };

  const clearResults = () => {
    results.replaceChildren();
    results.hidden = true;
    status.textContent = "";
  };

  const formatDate = (date) => {
    const value = new Date(`${date}T12:00:00`);
    return new Intl.DateTimeFormat(document.documentElement.lang || "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(value);
  };

  const createResult = (post) => {
    const article = document.createElement("article");
    article.className = "search-result";

    const heading = document.createElement("h3");
    const link = document.createElement("a");
    link.href = post.url;
    link.textContent = post.title;
    heading.append(link);
    article.append(heading);

    const meta = document.createElement("p");
    meta.className = "search-result__meta";
    const date = document.createElement("time");
    date.dateTime = post.date;
    date.textContent = formatDate(post.date);
    meta.append(date);

    if (post.tags?.length) {
      meta.append(document.createTextNode(` · ${post.tags.join(" · ")}`));
    }
    article.append(meta);

    if (post.summary) {
      const summary = document.createElement("p");
      summary.textContent = post.summary;
      article.append(summary);
    }

    return article;
  };

  const runSearch = async () => {
    const query = normalize(input.value).trim();
    if (!query) {
      clearResults();
      return;
    }

    status.textContent = "Searching…";
    const index = await loadIndex();
    if (!index) {
      results.replaceChildren();
      results.hidden = false;
      const message = document.createElement("p");
      message.className = "search-results__message";
      message.textContent = "Search is temporarily unavailable. Please try the tags or archive.";
      results.append(message);
      status.textContent = "Search is unavailable.";
      return;
    }

    const terms = query.split(/\s+/).filter(Boolean);
    const matches = index
      .filter((post) => {
        const searchable = normalize(
          [post.title, post.summary, ...(post.tags || [])].join(" ")
        );
        return terms.every((term) => searchable.includes(term));
      })
      .slice(0, 10);

    results.replaceChildren();
    results.hidden = false;

    if (!matches.length) {
      const message = document.createElement("p");
      message.className = "search-results__message";
      message.textContent = `No posts found for “${input.value.trim()}”.`;
      results.append(message);
    } else {
      matches.forEach((post) => results.append(createResult(post)));
    }

    const resultLabel = matches.length === 1 ? "result" : "results";
    status.textContent = `${matches.length} ${resultLabel} found.`;
  };

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    window.clearTimeout(debounceTimer);
    runSearch();
  });

  input.addEventListener("input", () => {
    window.clearTimeout(debounceTimer);
    debounceTimer = window.setTimeout(runSearch, 180);
  });

  input.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      input.value = "";
      clearResults();
    }
  });
})();

