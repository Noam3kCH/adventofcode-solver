function parse(input) {
  let source;
  const targets = [];
  const maze = input.split('\n').map((line, y) => line.split('').map((c, x) => {
    if (c === '#') {
      return {x, y, wall: true};
    } else if (c === '.') {
      return {x, y, wall: false};
    } else if (c === '0') {
      return source = {x, y, wall: false};
    } else {
      const point = {x, y, wall: false, target: parseInt(c, 10)};
      targets.push(point);
      return point;
    }
  }));
  return {source, maze, targets};
}

function getNeighbors(maze, point, props) {
  const {x, y} = point;
  return [
    Object.assign({point: maze[y][x - 1]}, props),
    Object.assign({point: maze[y][x + 1]}, props),
    Object.assign({point: maze[y - 1][x]}, props),
    Object.assign({point: maze[y + 1][x]}, props)
  ].filter(x => !x.point.wall);
}

function solve(maze, source, targets, andBack) {
  const visited = {'': new Set().add(source)};
  let queue = [{distance: 0, found: new Set(), key: '', point: source}];
  while (queue.length) {
    let {distance, found, key, point} = queue.shift();
    if (point.target !== undefined && !found.has(point)) {
      found = new Set(found).add(point);
      key += point.target;
      visited[key] = visited[key] || new Set();
    }
    if (found.size === targets.length && (!andBack || point === source)) {
      return distance;
    } else {
      const neighbors = getNeighbors(maze, point, {found, distance: distance + 1, key}).filter(({point}) => !visited[key].has(point));
      neighbors.forEach(({point}) => visited[key].add(point));
      queue = queue.concat(neighbors);
    }
  }
}

function day(input) {
  console.log('Please wait patiently for result...');
  const {source, maze, targets} = parse(input);
  const part1 = solve(maze, source, targets, false);
  const part2 = solve(maze, source, targets, true);
  return [part1, part2];
}

module.exports = {day};
