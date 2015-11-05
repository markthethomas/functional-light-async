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
