function part1(input) {
  const ids = input.split('\n');
  const counts = { double: 0, triple: 0 };
  ids.forEach(id => {
    let s = id
      .split('')
      .sort()
      .join('');
    if (s.match(/([a-z])\1\1/)) {
      counts.triple++;
      s = s.replace(/([a-z])\1\1+/g, '');
    }
    if (s.match(/([a-z])\1/)) {
      counts.double++;
    }
  });
  return counts.triple * counts.double;
}

function part2(input) {
  const ids = input.split('\n');
  const memory = new Set();
  for (const id in ids) {
    const arr = ids[id].split('');
    for (let i = 0; i < arr.length; i++) {
      const without = arr.filter((x, index) => index !== i).join('') + `-${i}`;
      if (memory.has(without)) {
        return without.split('-').shift();
      } else {
        memory.add(without);
      }
    }
  }
  return undefined;
}

module.exports = { part1, part2 };
