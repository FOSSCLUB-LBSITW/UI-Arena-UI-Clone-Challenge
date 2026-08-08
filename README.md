# Swiggy Clone — UI ARENA

Starter scaffold: React + Vite + Tailwind, React Router, cart context.

## Run it locally
```bash
npm install
npm run dev
```
Opens at http://localhost:5173

## What's already built
- **Home** — hero, cuisine filter chips, 6 restaurant cards (`src/pages/Home.jsx`)
- **Restaurant** — banner, 5-6 item menu, add/remove with qty stepper (`src/pages/Restaurant.jsx`)
- **Cart** — global cart via Context, bill summary (`src/pages/Cart.jsx`)
- **Sign In** — right-side drawer, phone number input (`src/components/SignInDrawer.jsx`)
- **Search** — dedicated page with live filter by name/cuisine/dish (`src/pages/Search.jsx`)
- **Help** — accordion FAQ sections (`src/pages/Help.jsx`)

Mock data lives in `src/data/restaurants.js` — this is what you should edit first
to match real Swiggy content/imagery once the event's reference site is revealed.

## What YOU still need to do
1. Compare every page against the actual reference site/video shown at kickoff.
2. Fix spacing, colors, fonts, and layout to match more closely (this is 35% of your score).
3. Test responsiveness at mobile/tablet/desktop breakpoints — resize the browser or use dev tools device toolbar.
4. Swap in real restaurant images/names if the brief wants a specific look.
5. Add loading states / empty states if you have time.

## Git / GitHub submission workflow

### 1. Fork the official repo
On GitHub, open the official repo link shared at kickoff → click **Fork** (top right) →
this creates a copy under your own GitHub account.

### 2. Clone YOUR fork (not the original repo)
```bash
git clone https://github.com/<your-username>/<repo-name>.git
cd <repo-name>
```

### 3. Copy this project's files in
Copy everything from this scaffold into your cloned repo folder (or start fresh there
and paste these files in), keeping the same folder structure.

### 4. Create a new branch (good practice, not always required)
```bash
git checkout -b swiggy-ui
```

### 5. Stage, commit, push — do this regularly, not just once at the end
```bash
git add .
git commit -m "Add home page with restaurant listing"
git push origin swiggy-ui
```
Commit in small chunks as you build (e.g. one commit per page) — "clear, readable
commit messages" is explicitly part of the rules.

### 6. Open the Pull Request
Go to your fork on GitHub → you'll see a banner "Compare & pull request" → click it →
set the base repo to the **official** repo, base branch as instructed at kickoff →
add a short description of what you built → **Create pull request**.

### 7. Before the deadline
Double-check:
- Your fork is public / accessible to judges
- The PR target is correct (official repo, not your own fork)
- The PR was opened **before** 9:00 PM IST cutoff — late PRs are auto-disqualified

## Judging weight reminder
| Criteria | Weight |
|---|---|
| UI Accuracy & Resemblance | 35% |
| Responsiveness | 20% |
| Code Quality & Folder Structure | 20% |
| Component Implementation | 15% |
| Overall UX | 10% |

Spend your remaining time in that order — accuracy and responsiveness first.
