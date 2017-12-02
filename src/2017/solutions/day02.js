function day(input) {
  const part1 = input.split('\n').map(line => {
    const numbers = line.split(/\s+/).map(x => parseInt(x, 10)).sort((a, b) => a - b);
    return numbers.pop() - numbers.shift();
  }).reduce((sum, x) => sum + x, 0);

  const part2 = input.split('\n').map(line => {
    const numbers = line.split(/\s+/).map(x => parseInt(x, 10)).sort((a, b) => a - b);
    const divisible = a => b => a % b === 0;
    let a, b;
    while (numbers.length > 0 && b === undefined) {
      a = numbers.pop();
      b = numbers.find(divisible(a));
    }
    return a / b;
  }).reduce((sum, x) => sum + x, 0);

  return [part1, part2];
}

module.exports = {day};