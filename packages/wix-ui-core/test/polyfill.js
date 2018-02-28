let lastTime = 0;

if (!global.requestAnimationFrame || !global.cancelAnimationFrame) {
  global.requestAnimationFrame = function (callback) {
    const currTime = new Date().getTime();
    const timeToCall = Math.max(0, 16 - (currTime - lastTime));
    const id = global.setTimeout(() => {
      callback(currTime + timeToCall);
    }, timeToCall);
    lastTime = currTime + timeToCall;
    return id;
  };
  global.cancelAnimationFrame = function (id) {
    clearTimeout(id);
  };
}
