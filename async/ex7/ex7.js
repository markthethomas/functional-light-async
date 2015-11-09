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

function* main() {
	let p1 = getFile('file1');
	let p2 = getFile('file2');
	let p3 = getFile('file3');

	output(yield p1);
	output(yield p2);
	output(yield p3);
}
let foo = main();
// I get the idea here; just need to use a runner to create the promises + generators next()-ing