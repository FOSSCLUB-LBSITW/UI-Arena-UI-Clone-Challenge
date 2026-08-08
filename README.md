# Swiggy Clone — UI ARENA Submission

A static, responsive clone of Swiggy's UI built with plain HTML, CSS, and JavaScript (no build tools required).

## Pages / features included
- **Home** (`index.html`) — 6 restaurants with ratings, cuisines, offers
- **Restaurant page** (`restaurant.html?id=1..6`) — menu with 5–6 items each, add-to-cart
- **Cart** (`cart.html`) — add/remove items, live bill total, persists via `localStorage`
- **Sign In** — right-side drawer (open via the "Sign In" link on any page)
- **Search** (`search.html`) — live search across restaurants and dishes
- **Help** (`help.html`) — FAQ accordion + support topics

## Run locally
No install needed — it's plain static files.
```
python3 -m http.server 8000
```
Then open `http://localhost:8000`.

Or just double-click `index.html` (some browsers restrict `fetch`/modules on `file://`, but this project uses none, so it works fine either way).

## Deploy (GitHub Pages)
1. Push this repo/branch to GitHub.
2. Repo → **Settings → Pages** → Source: deploy from branch → pick `main` (or your branch) and `/ (root)`.
3. Your live URL appears at `https://<username>.github.io/<repo-name>/`.

## Deploy (Vercel) — alternative
1. Import the GitHub repo at vercel.com.
2. Framework preset: **Other** (no build step). Output directory: `/` (root).
3. Deploy — Vercel gives you a live URL instantly.

## Notes
- All data (restaurants, menu items) is static mock data in `js/data.js` — no backend, as allowed by the problem statement.
- Images are represented with styled emoji placeholders (per "use placeholder images/text where exact original assets aren't accessible").
- Not affiliated with Swiggy — built purely as a UI recreation exercise for UI ARENA.
