export default (fn) => (...args) =>
  new Promise((resolve, reject) =>
    fn(...args, (err, payload) => (err ? reject(err) : resolve(payload))),
  );
