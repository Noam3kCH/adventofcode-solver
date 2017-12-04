const {day} = require('./day22');
const {expect} = require('chai');
const readInput = require('../../read-input');
const input = readInput(__filename);

describe('day22', () => {
  describe('part1', () => {
    it('should work for part 1 examples', () => {
      // expect(day('1').shift()).to.equal('1');
    });

    it('should work for part 1 input', () => {
      expect(day(input).shift()).to.equal(937);
    });
  });

  describe('part2', () => {
    it('should work for part 2 examples', () => {
      expect(day(`root@ebhq-gridcenter# df -h
Filesystem            Size  Used  Avail  Use%
/dev/grid/node-x0-y0   10T    8T     2T   80%
/dev/grid/node-x0-y1   11T    6T     5T   54%
/dev/grid/node-x0-y2   32T   28T     4T   87%
/dev/grid/node-x1-y0    9T    7T     2T   77%
/dev/grid/node-x1-y1    8T    0T     8T    0%
/dev/grid/node-x1-y2   11T    7T     4T   63%
/dev/grid/node-x2-y0   10T    6T     4T   60%
/dev/grid/node-x2-y1    9T    8T     1T   88%
/dev/grid/node-x2-y2    9T    6T     3T   66%`).pop()).to.equal(7);
    });

    it('should work for part 2 input', () => {
      // expect(day(input).pop()).to.equal(input);
    });
  });
});