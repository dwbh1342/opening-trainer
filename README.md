# Repertoire Drills: Vienna & Caro-Kann

**Live app: https://dwbh1342.github.io/opening-trainer/**

A single-page app for memorizing an opening repertoire on an interactive chessboard:

- **Vienna Game** (you play White): 9 lines, about 8–9 moves deep
- **Caro-Kann Defense** (you play Black): 10 lines, about 8–10 moves deep

## Modes

- **Lines:** learn each line with arrows showing the moves, then drill it from memory. The opponent's moves are played for you. Review is scheduled with spaced repetition (Leitner boxes), so lines you know well come up less often.
- **Quiz:** every position in your repertoire where it's your move becomes a one-move puzzle, grouped into one level per line. Misses go into a review queue.

Other features: a daily goal and streak, stats, hints, three board colour themes, and light and dark modes.

Progress is saved in the browser's `localStorage`. When the page runs as a claude.ai artifact, progress also syncs to your Claude account.

## Running it

It's one static file with no build step. Open `index.html` in a browser, or serve the folder with any static host (GitHub Pages, Netlify, Cloudflare Pages).

Dependencies load from CDNs: [chess.js 0.10.3](https://github.com/jhlywa/chess.js) from cdnjs, plus Google Fonts.

## Editing lines

The lines are in the `OPENINGS` array near the top of the script in `index.html`. After changing them, check that every move is legal and that you have only one answer per position:

```sh
npm install
npm run validate
```

The check prints `ALL GOOD`, or lists each illegal move or conflicting answer.
