'use strict';

export function day14(input) {
  let race = input.split('\n')
                  .map(x => x.match(/^.* can fly (\d+) km\/s for (\d+) seconds, but then must rest for (\d+) seconds\.$/).slice(1))
                  .map(x => ({
                    speed: parseInt(x[0], 10),
                    fly: parseInt(x[1], 10),
                    rest: parseInt(x[2], 10),
                    distance: 0,
                    points: 0
                  }));
  new Array(2503).fill(undefined).forEach((item, index) => {
    race = race.map(x => {
      let ran = index % (x.fly + x.rest) < x.fly;
      x.distance += ran ? x.speed : 0;
      return x;
    });
    let lead = race.reduce((prev, x) => Math.max(prev, x.distance), 0);
    race.filter(x => x.distance === lead).forEach(x => x.points++);
  });

  let part1 = race.reduce((prev, x) => Math.max(prev, x.distance), 0);
  let part2 = race.reduce((prev, x) => Math.max(prev, x.points), 0);
  return [part1, part2];
}
