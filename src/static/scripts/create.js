/*global document, window, WorkerShim */

function runWorker(year, session) {
  return new Promise(resolve => {
    if (window.SolverWorker) {
      window.SolverWorker.terminate();
    }
    document.getElementById('output').innerHTML = '';

    const u = s => new URL(s, window.location);
    const worker = new WorkerShim('../static/scripts/worker.js', {
      type: 'module',
      importMap: {
        imports: {
          'js-combinatorics': u('../static/polyfills/combinatorics.js'),
          'child_process': u('../static/polyfills/child_process.js'),
          'crypto': u('../static/polyfills/crypto.js'),
          'vm': u('../static/polyfills/vm.js'),
        },
        scopes: {},
      },
    });
    worker.onmessage = e => {
      if (e.data.type === 'log') {
        console.log(e.data.log);
      } else if (e.data.type === 'ready') {
        worker.postMessage({ type: 'solveAll', year, session });
      } else if (e.data.type === 'done') {
        resolve();
      }
    };
    window.SolverWorker = worker;
  });
}

export async function run(year) {
  const session = document.getElementById('session').value;
  document.getElementById('session').value = '';
  document.getElementById('session').blur();
  document.getElementById('loader').style.display = 'block';
  await runWorker(year, session);
  document.getElementById('loader').style.display = 'none';
}

console.log = (...args) => {
  const str = args.map(x => `${x}`).join(' ') + '\n';
  document.getElementById('output').innerHTML += str;
};
