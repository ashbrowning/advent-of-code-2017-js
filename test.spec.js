'use strict';
/* global describe it expect */

const launcher = require('./launcher.js');

const answers = [
  [1175, 1166],
  [44887, 242],
];

describe('Advent of code tests', () => {
  answers.forEach( (answers, index) => {
    const day = index + 1;
    it(`should give correct answers to day ${day} part 1`, () => {
      expect(launcher(day, 1)).toBe(answers[0]);
    });
    it(`should give correct answers to day ${day} part 2`, () => {
      expect(launcher(day, 2)).toBe(answers[1]);
    });
  });
});
