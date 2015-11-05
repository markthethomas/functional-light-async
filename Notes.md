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
