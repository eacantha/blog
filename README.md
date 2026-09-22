# blog.kittenin.space

A small self-hosted Hugo blog. The site uses custom Hugo templates, plain CSS, page-bundle images, and a small client-side search index.

## Preview locally

Start Hugo's development server, including draft posts:

```bash
hugo server
```

Open <http://localhost:1313/>.

## Create a post

Posts are Hugo page bundles. Create one with:

```bash
hugo new content posts/new-post/index.md
```

This creates:

```text
content/posts/my-new-post/
└── index.md
```

The generated front matter includes:

- `title`, `date`, `draft`, and `tags`
- Optional `summary`
- Optional `featured_image` and `featured_image_alt`
- Optional `show_toc`

New posts begin with `draft: true`. Change this to `draft: false` when the post is ready to publish.

## Add images

Place post images beside `index.md`:

```text
content/posts/my-new-post/
├── index.md
├── featured.jpg
└── detail.jpg
```

Reference the card and social-sharing image in front matter:

```yaml
featured_image: "featured.jpg"
featured_image_alt: "A concise description of the image"
```

Reference another page-bundle image from Markdown with its filename:

```markdown
![Description of the project detail](detail.jpg)
```

## Write content

Normal Markdown is supported, including headings, links, lists, blockquotes, images, tables, and fenced code blocks.

Set the following front matter value to display an automatically generated table of contents:

```yaml
show_toc: true
```

Tags are the primary content-discovery system:

```yaml
tags:
  - knitting
  - tutorial
  - yarn
```

Hugo generates a page and RSS feed for each tag.

## Edit site information

Site-wide settings live in [`hugo.yaml`](hugo.yaml), including:

- Canonical site URL
- Site title and locale
- Tagline and description
- Homepage About teaser
- Pagination size

The full About page is Markdown at [`content/about/index.md`](content/about/index.md).