# gaiusAmogus Next.js × WordPress Headless Starter

Next.js starter for a headless WordPress frontend. Includes SCSS, App Router, ISR, sticky header with mobile menu, dynamic navigation from WP REST API, blog pages, and a dev UI kit page.

Repository: https://github.com/gaiusAmogus/gaiusAmogus-next.js-wordpress-starter

## Requirements

- [Node.js](https://nodejs.org/) >= 18
- npm >= 9
- WordPress instance with REST API enabled (pretty permalinks active)

## Installation

### Clone repository

```bash
git clone https://github.com/gaiusAmogus/gaiusAmogus-next.js-wordpress-starter.git
cd gaiusAmogus-next.js-wordpress-starter
```

### Install dependencies

```bash
npm install
```

### Environment variables

Copy the example file and fill in your values:

```bash
cp .env.local.example .env.local
```

| Variable | Description |
|---|---|
| `WORDPRESS_API_URL` | URL of your WordPress instance, e.g. `http://localhost/my-wp` |
| `REVALIDATE_SECRET` | Random secret token for the ISR webhook |

## Running the project

### Development mode

```bash
npm run dev
```

Starts the Next.js development server at `http://localhost:3000`.

Changes in JS, JSX, and SCSS files are refreshed automatically.

### Production build (static export)

```bash
$env:WORDPRESS_API_URL="https://your-wp-url.com" ; npm run build
```

Builds the project into the `build/` directory as a fully static site (HTML/CSS/JS). Upload the contents of `build/` to your hosting via FTP — no Node.js required on the server.

On Linux/Mac:
```bash
WORDPRESS_API_URL=https://your-wp-url.com npm run build
```

### Lint

```bash
npm run lint
```

Checks the code for errors using Next.js built-in ESLint configuration.

## WordPress setup

1. Go to **Settings → Permalinks** and choose any option other than "Plain".
2. The WP REST API is then available at `<WORDPRESS_API_URL>/wp-json/wp/v2/`.
3. (Optional) To trigger ISR revalidation after saving posts/pages, configure a webhook in WordPress (e.g. via a custom plugin or [WP Webhooks](https://wordpress.org/plugins/wp-webhooks/)) to send:

```
POST https://your-frontend.com/api/revalidate
Authorization: Bearer <REVALIDATE_SECRET>
Content-Type: application/json

{ "type": "post", "slug": "my-post-slug" }
```

`type` can be `"post"` or `"page"`.

## Project structure

```
.env.local.example             # environment variables template
lib/
  wordpress.js                 # WordPress REST API utility
app/
  layout.jsx                   # root layout — metadata from WP, dynamic nav
  page.jsx                     # home page (/)
  not-found.jsx                # 404 page
  [slug]/
    page.jsx                   # WordPress CMS pages (e.g. /about, /contact)
  blog/
    page.jsx                   # blog list (/blog)
    [slug]/
      page.jsx                 # single post (/blog/my-post)
  api/
    revalidate/
      route.js                 # ISR webhook endpoint
  dev-page/
    page.jsx                   # ui kit page (/dev-page)
src/
  js/
    components/
      Header/
        Header.jsx             # sticky header + mobile menu + dynamic nav
      Footer/
        Footer.jsx             # footer
    pages/
      Home/
        Home.jsx               # home page component
      BlogPage/
        BlogPage.jsx           # blog list component
      SinglePost/
        SinglePost.jsx         # single post component
      WpPage/
        WpPage.jsx             # CMS page component
      DevPage/
        DevPage.jsx            # ui kit page component
      NotFound/
        NotFound.jsx           # 404 page component
  scss/
    style.scss                 # main SCSS entry file
    layout/                    # global styles (grid, colors, fonts, etc.)
    components/
      Header/_Header.scss
      Footer/_Footer.scss
    pages/
      Home/_Home.scss
      BlogPage/_BlogPage.scss
      SinglePost/_SinglePost.scss
      WpPage/_WpPage.scss
      DevPage/_DevPage.scss
      NotFound/_NotFound.scss
```

## Static assets

Place images, fonts, and other static files in a `public/` directory (create it when needed).
Files inside `public/` are served at the root path, e.g. `public/logo.svg` → `/logo.svg`.
      DevPage/
        _DevPage.scss      # ui kit page styles
      NotFound/
        _NotFound.scss     # 404 page styles
build/                     # static export output (generated, not committed)
```

## Adding new pages

1. Create a folder `app/page-name/` with a `page.jsx` file inside
2. Create a component in `src/js/pages/PageName/PageName.jsx` and import it in `app/page-name/page.jsx`
3. (optional) Create an SCSS file in `src/scss/pages/PageName/_PageName.scss`
4. Import styles in `src/scss/style.scss`:
   ```scss
   @use "pages/PageName/PageName";
   ```
