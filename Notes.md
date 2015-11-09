## tl;dr
_These are my notes from a two-day JavaScript workshop taught by Kyle Simpson (@getify everywhere) for Frontend Masters._

_I tried to keep the notes minimal but helpful — I hope they can be of some small help you._

-----
# Day 1
# Functional-light
##Composition
The joining of functions such that output of `x()` can be used by `y()`...`n()`. You *usually* see things nested within each other so the return values can be consumed in outward fashion.

##Immutability
```
var x =2
x++; // allowed

const y = 3;
y++; // not allowed;
```
- Const does not mean that the value can't be changed; just that the binding can't be changed or that the assignment can't be changed
- var/const control binding
- const prevents assignment
- `Object.freeze()` prevents writing --> 'shallow' immutability


## Closure
- definition (loose): when a function "remembers" the variables around it even when that function is executed elsewhere
- ~ execution environment
- if the input never changes, you can have purity, assuming interal mutation is consistent

## Recursion
- incredibly important & useful
- need to watch for stack overflow
- when a function calls another:
	- first, a stack frame is created
    - the stack frames don't get flushed properly because the function hasn't finished yet; (no tail-call optimisation yet)
 - recursion allows for elegant and expressive solutions
 - reminder: do your base-case first
 
 ## Transformation
 - predicate: pure function that gets applied
 - apply a predicate to a set, creating a transformed copy of the input

-----

# Async
- inversion of control: we have to rely on non-sequential patterns that don't map well to how we reason
- thunk: a function that has everything it needs to return a value; simply returns it's passed params
   - becomes a state-container/wrapper and we can now pass it around and execute it to get the value out


# Day 2
Agenda: 
- Paralell vs async
- callbacks
- thunks
- promises
- generators/corouteines
- event reactive (observables)
- CSP (channel-oriented concurrency)

## Paralell vs async
- not the same thing
- parallelism: usually expressed through threads and threading
- non-paralellism: usually single-threaded
- synchronous execution of long-duration (>= ~ 5ms) tasks --> **terrible!**
- the event loop is only ever executing one task at any given time
- events are reliably ordered
- async programming is concurrency management

```
setTimeout(function(){
	console.log('callback')
    setTimeout(function(){
		console.log('another callback');
            setTimeout(function(){
				console.log('another callback still');
			}, 1000);
	}, 1000);
}, 1000)
```

- now/later split
- **not** just the style/indentation —> that is just a side-effect
- you can 'fix' the stylistic aspect with continuation passing or using named functions
- we've tried various things to get everything to work, but it usually doesn't -> two callbacks for err & val, 
-----

## Thunks
- a function that has everything it needs to give you a value back
- precursor/underpinning aspect of/to promises

```
// synchronous thunk
function add(x, y) {
  return x + y;
}

// the thunk is the container wrapper for the value
var thunk = function() {
  return add(10, 15);
}

thunk(); // 25
```
-----

## Promises
- ~ future values
- will eventually become fulfilled, but we need to reason about it while we wait for that to happen
- promises uninvert the inversion of control
- example API:

```
function finish() {
	doFoo();
    somethingElse();
}

function error(err) {
	console.log(err);
}

let promise = doAsyncThing(value)

promise.then(finish, error);
```

- Promise trust: 
   1. only resolved once
   2. either success OR error
   3. messages passed/kept
   4. exceptions become errors
   5. immutable once resolved
- flow control: can be accomplished via promise chaining
- try to **not** use tons of inline function calls in promise chains
- each `.then()` call returns a new promise using the default `resolve()` handler

## Promise Abstractions
1. `Promise.all(Array[Promise]), -> Promise`
	- normalizes an array of promises, returns an ordered array of the completion results
    - ~ **gate**
2. `Promise.race(Array[Promise]), -> Promise`

-----

## Generators
- do not have a run-to-completion semantic
- (also not from JavaScript)
- syntatic form of declaring a state-machine; these declaratively step through a series of transformations
- new keyword `yield`


