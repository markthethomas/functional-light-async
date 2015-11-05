'use strict';

const test = require('tape');

// Bas function
// function mult(x,y,z) {
// 	return x * y * z;
// }

function mult(...args) {
  if (args.length <= 2) {
    return args[0] * args[1];
  }
	return args[0] * mult(...args.slice(1));
}

console.log(mult(2,3,4));

test('recursion', t => {
	t.plan(3);
	t.equal(mult(1,2,3), 6);
	t.equal(mult(2,3,4), 24)
	t.equal(mult(2,3), 6);
})
