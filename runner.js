const input = Symbol('input');
const registry = Symbol('registry');
const commands = Symbol('commands');
const DEBUG = Symbol('DEBUG');
const CURRENT = Symbol('CURRENT');

module.exports = class Runner {
    constructor(_registry = [], _input = [], _debug = false) {
        this[input] = _input;
        this[registry] = _registry;
        this[commands] = 0;
        this[DEBUG] = _debug;
        this[CURRENT] = undefined;
    }

    PTR(idx) {
      return this[registry][idx];
    }

    INPUT() {
      this[commands]++;
      this[CURRENT] = this[input].pop();
      if (this[DEBUG]) console.log(`INPUT: ${this[CURRENT]}`);
      if (typeof this[CURRENT] === 'undefined') {
        if (this[DEBUG]) console.log(`commands: ${this[commands]}`);
        process.exit(0);
      }
      return this[CURRENT];
    }

    OUTPUT() {
      this[commands]++;
      if (this[DEBUG]) console.log(`OUTPUT: ${this[CURRENT]}`);
      return this[CURRENT] = console.log(this[CURRENT]);
    }

    ADD(idx) {
      this[commands]++;
      this[CURRENT] += this[registry][idx];
      if (this[DEBUG]) console.log(`ADD ${idx}: ${this[CURRENT]}`);
      return this[CURRENT];
    }

    SUB(idx) {
      this[commands]++;
      this[CURRENT] -= this[registry][idx];
      if (this[DEBUG]) console.log(`SUB ${idx}: ${this[CURRENT]}`);
      return this[CURRENT];
    }

    BUMP_ADD(idx) {
      this[commands]++;
      this[CURRENT] = ++this[registry][idx];
      if (this[DEBUG]) console.log(`BUMP+ ${idx}: ${this[CURRENT]}`);
      return this[CURRENT];
    }

    BUMP_NEG(idx) {
      this[commands]++;
      this[CURRENT] = --this[registry][idx];
      if (this[DEBUG]) console.log(`BUMP- ${idx}: ${this[CURRENT]}`);
      return this[CURRENT];
    }

    COPYFROM(idx) {
      this[commands]++;
      this[CURRENT] = this[registry][idx];
      if (this[DEBUG]) console.log(`COPYFROM ${idx}: ${this[CURRENT]}`);
      return this[CURRENT];
    }

    COPYTO(idx) {
      this[commands]++;
      this[registry][idx] = this[CURRENT];
      if (this[DEBUG]) console.log(`COPYTO ${idx}: ${this[CURRENT]}`);
      return this[CURRENT];
    }

    JUMP() {
      this[commands]++;
      if (this[DEBUG]) console.log(`JUMP`);
      return this[CURRENT];
    }

    JUMPIFZERO() {
      this[commands]++;
      if (this[DEBUG]) console.log(`JUMP IF ZERO -> ${this[CURRENT] === 0}`);
      return this[CURRENT] === 0;
    }

    JUMPIFNEG() {
      this[commands]++;
      if (this[DEBUG]) console.log(`JUMP IF NEGATIVE -> ${this[CURRENT] < 0}`);
      return this[CURRENT] < 0;
    }

    run(code) {
        this[commands] = 0;
        code(this);
        if (this[DEBUG]) {
            console.log(`commands: ${this[commands]}`);
        }
    }
}
