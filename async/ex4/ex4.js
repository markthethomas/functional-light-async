'use strict';

function fakeAjax(url,cb) {
	var fake_responses = {
		"file1": "The first text",
		"file2": "The middle text",
		"file3": "The last text"
	};
	var randomDelay = (Math.round(Math.random() * 1E4) % 8000) + 1000;

	console.log("Requesting: " + url);

	setTimeout(function(){
		cb(fake_responses[url]);
	},randomDelay);
}

function output(text) {
	console.log(text);
}

// **************************************
// The old-n-busted callback way

function getFile(file) {
	return new Promise(function(resolve){
		fakeAjax(file,resolve);
	});
}

// Request all files at once in
// "parallel" via `getFile(..)`.
//
// Render as each one finishes,
// but only once previous rendering
// is done.

['file1', 'file2', 'file3']
.map((file) => getFile(file))
.reduce((chain, current) => {
	return chain
		.then(() => current)
		.then(output)
}, Promise.resolve())
.then(() => {
	output('done!')
})

// This method takes an array, maps across each
// value to give you a promise, then uses reduce to compose
// each promise resolution together. It sets a chainable Promise
// as the inital value, then adds to that chain in each iteration by
// insserting the current promise into the chain being built and then
// uses the resolution of that promise to output the value. once
// we're all done, we chain one last .then off of everything to ouput done