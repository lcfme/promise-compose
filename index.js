module.exports = compose;

function compose(...middlewares) {
  for (const fn of middlewares) {
    if (typeof fn !== "function") {
      throw new TypeError("Middleware must be function");
    }
  }
  return (arg, callback) => {
    let index = -1;
    return next(0);
    function next(i) {
      if (i <= index) {
        return Promise.reject(new Error("next() called too many times"));
      }
      index = i;
      let fn = middlewares[i];
      if (i === middlewares.length) fn = callback;
      if (!fn) {
        return Promise.resolve();
      }
      try {
        return Promise.resolve(fn(arg, next.bind(null, i + 1)));
      } catch (err) {
        return Promise.reject(err);
      }
    }
  };
}
