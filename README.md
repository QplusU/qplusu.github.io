# Q+U website

Static site for Q+U, served by GitHub Pages at https://qplusu.github.io/.

Direction from harmoniqs.ai: a full-viewport hero on an animated canvas, a floating pill nav with a light/dark toggle that follows the time of day, tight display type and lots of air. The hero canvas (`src/radar.js`) is a sequencing disc: a sweep moves round a field of systems in schedule order, flipping each from quantum-vulnerable to post-quantum, skipping a quarter-close freeze, while the exposure figure falls. The particle wave with the hoop (`src/wave.js`) sits under the contact call to action. Both canvases pause when scrolled off screen. No build step: edit `index.html`, `src/styles.css` and `src/radar.js`. Append `?theme=dark` or `?theme=light` to force a theme, `?t=7000` to jump the animations to a moment, and `?lens=520,430` to pin the telescope lens for screenshots.

See `BACKLOG.md` for open work and `PEER_REVIEW.md` for the current review.
