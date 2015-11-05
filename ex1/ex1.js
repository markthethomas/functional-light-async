const test = require('tape');

function foo(x) {
  y++;
  z = x * y;
}

var y = 5,
  z;

foo(20);
z; // 120

foo(25);
z; // 175


function bar(x, y) {
	var z;
	foo(x);
	return [y,z];
  function foo(x) {
    y++;
    z = x * y;
  }
}

test('ex1', t => {
	t.plan(3)
  t.equal(bar(1, 2), 3);
	t.equal(bar(1, 2), 3);
	t.equal(bar(1, 2), 3);
});
