# Swiggy-Inspired Food Delivery Website

A high-fidelity, responsive food-delivery web app built with React, TypeScript, Vite, Tailwind CSS and React Router, recreating the Swiggy UI/UX: home page, restaurant/menu page, functional cart, a right-side sign-in drawer, a dedicated search page, an offers page, and a Help & Support page.

## Pages

| Route              | Description                                             |
|---------------------|----------------------------------------------------------|
| `/`                 | Home — categories, top restaurant chains, restaurant grid |
| `/restaurant/:id`   | Restaurant menu with accordions, filters, add-to-cart     |
| `/search`           | Live search across restaurants and dishes                 |
| `/offers`           | Coupons, restaurant offers, bank offers                   |
| `/cart`             | Functional cart / checkout with bill breakdown            |
| `/help`             | Help & Support with sidebar + FAQ accordion                |
| Sign In (drawer)    | Opens from the header on every page                        |

## Getting started

```bash
npm install
npm run dev
```

Open the printed local URL (typically http://localhost:5173).

## Build for production

```bash
npm run build
npm run preview
```

## Deploying to a live URL

### Option A — Vercel (recommended, easiest)

1. Push this project to a GitHub repository.
2. Go to https://vercel.com/new and import that repository.
3. Vercel auto-detects Vite — leave the defaults (Build Command `npm run build`, Output Directory `dist`) and click **Deploy**.
4. `vercel.json` is already included so client-side routes (`/restaurant/:id`, `/cart`, etc.) resolve correctly on refresh.

### Option B — GitHub Pages

1. Push this project to a GitHub repository, e.g. `github.com/<user>/<repo>`.
2. In the repo settings, go to **Pages** → set **Source** to **GitHub Actions**.
3. Push to `main` — the included workflow (`.github/workflows/deploy.yml`) builds the app with the correct base path (`/<repo>/`) and deploys it automatically.
4. Your site will be live at `https://<user>.github.io/<repo>/`.
5. A `public/404.html` redirect trick is included so deep links (e.g. `/help`) work correctly on GitHub Pages, which otherwise only serves `index.html` at the root.

To build locally with the GitHub Pages base path manually:

```bash
VITE_BASE=/<repo-name>/ npm run build
```

## Project structure

```
src/
├── components/   # Reusable UI building blocks (Header, RestaurantCard, MenuItem, OfferCard, SafeImage, ...)
├── pages/        # Route-level views (Home, Restaurant, Search, Offers, Cart, Help)
├── data/         # Local mock data (restaurants, menu, categories, offers, help content)
├── context/      # CartContext (cart state) and UIContext (sign-in drawer state)
├── hooks/        # useCart, useUI
├── types/        # Shared TypeScript interfaces
└── utils/        # Formatting + image-fallback helpers
```

## Notes

- All data is local/mock — there is no backend.
- Food and restaurant photos are pulled from a free keyword-based image service (LoremFlickr) at request time, so they need an internet connection to load. Every image goes through a `SafeImage` component with a broader fallback query and, failing that, a styled placeholder icon — so a broken image never reaches the page.
- Cart state is in-memory (React context) and resets on a full page reload.
