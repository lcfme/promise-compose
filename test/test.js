const compose = require("..");
const assert = require("assert");

function wait(ms) {
  return new Promise(r => setTimeout(r, ms || 0));
}

describe("compose", function() {
  it("should work", async function() {
    const arr = [];
    const stack = [];

    stack.push(async (context, next) => {
      arr.push(1);
      await wait(1);
      await next();
      await wait(1);
      arr.push(6);
    });

    stack.push(async (context, next) => {
      arr.push(2);
      await wait(1);
      await next();
      await wait(1);
      arr.push(5);
    });

    stack.push(async (context, next) => {
      arr.push(3);
      await wait(1);
      await next();
      await wait(1);
      arr.push(4);
    });

    await compose(...stack)({});
    expect(arr).toEqual(expect.arrayContaining([1, 2, 3, 4, 5, 6]));
  });
});
