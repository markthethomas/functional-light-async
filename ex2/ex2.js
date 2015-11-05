const test = require('tape');

function foo(x, y) {
  return function () {
    return x + y;
  };
}

var x = foo(3,4);

test('basic curry', t => {
  t.plan(4);
  t.equal(x(), 7);
  t.equal(x(), 7);
  t.equal(x(), 7);
  t.equal(x(), 7);
});
