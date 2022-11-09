import fetch from 'node-fetch';

const waitFunc = (delay) =>
  new Promise((resolve) => setTimeout(() => resolve(delay), delay)).then(
    (d) => `等待${d}s`
  );

const fetchFunc = (url) =>
  fetch(url)
    .then((response) => response.text())
    .then((text) => `Fetched ${url}, and got back ${text}`)
    .catch((err) => `发生异常${err}`);

const asyncThingsToDo = [
  { task: 'wait', duration: 1000 },
  { task: 'fetch', url: 'http://a.itying.com/api/productlist' },
  { task: 'wait', duration: 2000 },
];

const runTask = (spec) =>
  spec.task === 'wait' ? waitFunc(spec.duration) : fetchFunc(spec.url);

const main = async () => {
  const starterPromise = Promise.resolve(null);
  const log = (result) => console.log(result);

  await asyncThingsToDo.reduce(
    (p, spec) => p.then(() => runTask(spec).then(log)),
    starterPromise
  );
};

// main();

// fetchFunc('http://a.itying.com/api/productlist');
