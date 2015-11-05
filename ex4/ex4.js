'use strict';
const test = require('tape');

function baz(x) {
  return function() {
    return x;
  };
}

function foo() {
  return 42;
}

function bar() {
  return 7;
}

function add(x, y) {
  return x + y;
}

function add2(x, y) {
  return add(x, y);
}

function addNLoop(arr) {
  let total = 0;
  for (let i = 0; i < arr.length; i++) {
    total += arr[i];
  }
  return total;
}

test('addNLoop', t => {
  t.equal(addNLoop([2, 3]), 5);
  t.end();
});


function addNRecursion(arr) {
  if (arr.length <= 2) {
    return add2(arr[0], arr[1]);
  }
  return addNRecursion([
    function() {
        return addNRecursion(arr[0], arr[1]);
    }
  ])
    .concat(arr.slice(2));
  return add2(arr[0], arr[1])
}

test.skip('addNRecursion', t => {
  t.equal(addNRecursion([2, 3, 4]), 9);
  t.end();
});


function addNReduce(...arr) {
  return arr
    .reduce(function reducer(prev,current){
      return function addPrevCur() {
        return prev + current;
      };
    }, 0)();
}



test.skip('addNMap', t => {
  t.equal(addNReduce([2, 3, 4]), 9);
  t.end();
});
