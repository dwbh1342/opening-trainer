const fs = require('fs');
const { Chess } = require('chess.js');
const src = fs.readFileSync(process.argv[2], 'utf8');
const start = src.indexOf('const OPENINGS = [');
const end = src.indexOf('const BOARD_COLORS');
const OPENINGS = eval(src.slice(start, end).replace('const OPENINGS =', '(') .replace(/;\s*$/, ')'));
const norm = s => s.replace(/[+#!?]/g, '');
let problems = 0;
for (const op of OPENINGS) {
  const seen = {};
  for (const l of op.lines) {
    const sans = l.moves.trim().split(/\s+/).map(t => t.replace(/^\d+\.(\.\.)?/, '')).filter(Boolean);
    const g = new Chess();
    let ok = true;
    for (let i = 0; i < sans.length; i++) {
      const fen = g.fen().split(' ').slice(0, 4).join(' ');
      const mover = g.turn();
      const mv = g.move(sans[i]);
      if (!mv) { console.log('ILLEGAL', l.id, i, sans[i]); problems++; ok = false; break; }
      if (mv.san.replace(/[+#]/g,'') !== norm(sans[i])) console.log('SAN differs', l.id, sans[i], mv.san);
      if (mover === op.side) {
        if (seen[fen] && seen[fen].san !== norm(mv.san)) { console.log('CONFLICT', l.id, mv.san, 'vs', seen[fen].line, seen[fen].san); problems++; }
        else seen[fen] = { san: norm(mv.san), line: l.id };
      }
    }
    if (ok) console.log('ok', op.id, l.id, Math.ceil(sans.length/2) + ' moves', g.fen());
  }
}
console.log(problems ? problems + ' problems' : 'ALL GOOD');
