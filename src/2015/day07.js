function day(input) {
  /* eslint no-bitwise: "off" */
  const ops = {
    AND: (p1, p2) => (Math.pow(2, 16) + (p1 & p2)) % Math.pow(2, 16),
    OR: (p1, p2) => (Math.pow(2, 16) + (p1 | p2)) % Math.pow(2, 16),
    NOT: (p1, p2) => (Math.pow(2, 16) + (~p2)) % Math.pow(2, 16),
    LSHIFT: (p1, p2) => (Math.pow(2, 16) + (p1 << p2)) % Math.pow(2, 16),
    RSHIFT: (p1, p2) => (Math.pow(2, 16) + (p1 >> p2)) % Math.pow(2, 16),
    undefined: p1 => (Math.pow(2, 16) + p1) % Math.pow(2, 16)
  };

  function getter(id) {
    return id && id.match(/^[a-z]+$/) ? circuit => circuit[id]() : () => parseInt(id, 10);
  }

  function makeCircuit(input) {
    return input.map(x => x.match(/^(?:(\w+) )?(?:(AND|OR|NOT|LSHIFT|RSHIFT) (\w+) )?-> (\w+)$/))
                .map(x => ({op: ops[x[2] + ''], p1: getter(x[1]), p2: getter(x[3]), result: x[4]}))
                .reduce((circuit, gate) => {
                  circuit[gate.result] = () => {
                    const memo = gate.op(gate.p1(circuit), gate.p2(circuit));
                    circuit[gate.result] = () => memo;
                    return memo;
                  };
                  return circuit;
                }, {});
  }

  const part1 = makeCircuit(input.split('\n')).a();
  const part2 = makeCircuit(input.split('\n').concat(`${part1} -> b`)).a();
  return [part1, part2];
}

module.exports = {day};