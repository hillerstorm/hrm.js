const Runner = require('../runner');
const DEBUG = false;
const runner = new Runner([
  0, 0, 0, 0, 0,
  0, 0, 0, 0, 0,
  0, 0, 0, 0, 0,
  0, 0, 0, 0, 0,
  0, 0, 0, 0, 0
], [16, 8, 9].reverse(), DEBUG);

const i = 1;
const j = 6;
const n = 0;
const m = 5;
const zero = 24;
const one = 19;
const two = 20;
const i_x_i = 2;

runner.run(r => {
r.COPYFROM(zero);
r.COPYTO(one);
r.BUMP_ADD(one);
r.ADD(one);
r.COPYTO(two);
first: for (;;) {if (DEBUG) console.log(':first');
  r.INPUT();
  r.COPYTO(n);
  r.COPYFROM(two);
  r.COPYTO(i);
  r.ADD(two);
  r.COPYTO(i_x_i);
  second: for (;;) {if (DEBUG) console.log(':second');
    r.COPYFROM(n);
    r.SUB(i_x_i);
    if (r.JUMPIFNEG()) break second;
    r.COPYFROM(zero);
    r.COPYTO(j);
    r.COPYFROM(n);
    r.COPYTO(m);
    third: for (;;) {if (DEBUG) console.log(':third');
      r.SUB(i);
      if (r.JUMPIFNEG()) break third;
      r.COPYTO(m);
      r.BUMP_ADD(j);
      r.COPYFROM(m);
      r.JUMP();continue third;
    }/*third*/
    r.COPYFROM(m);
    if (r.JUMPIFZERO()) {
      r.COPYFROM(j);
      r.COPYTO(n);
      r.COPYFROM(i);
      r.OUTPUT();
      r.JUMP();continue second;
    } else {
      r.BUMP_ADD(i);
      r.ADD(i);
      r.SUB(one);
      r.ADD(i_x_i);
      r.COPYTO(i_x_i);
      r.JUMP();continue second;
    }
  }/*second*/
  r.COPYFROM(n);
  r.SUB(one);
  if (r.JUMPIFNEG() || r.JUMPIFZERO()) {
    r.JUMP();continue first;
  }
  r.COPYFROM(n);
  r.OUTPUT();
  r.JUMP();continue first;
}/*first*/
});