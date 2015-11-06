'use strict';

const test = require('tape');

function fakeAjax(url, cb) {
  var fake_responses = {
    "file1": "The first text",
    "file2": "The middle text",
    "file3": "The last text"
  };
  var randomDelay = (Math.round(Math.random() * 1E4) % 8000) + 1000;
	console.log(randomDelay);
  console.log("Requesting: " + url);

  setTimeout(function() {
    cb(fake_responses[url]);
  }, randomDelay);
}

function output(text) {
  console.log(text);
}

// **************************************
// The old-n-busted callback way

// Steps
// 1. push each file into a tracking array
// 2. run the fakeAjax response
// 3. when that process finishes, run the render function
// 4. - First, check to see if the filename is in the responses object
//    - if not, add it.
//    - Then, loop over the length of the files array.
//    - Each time, use the index to check if the current file is in responses
//    - if true, check to see if it's equal to true
// 		- if it both these pass, output the file contents and set the current
//      file in responses to true
// 		- if it fails, return false.


let files = [];
let responses = {};

function getFile(file) {
  files.push(file);
  fakeAjax(file, function(text) {
    render(file, text);
  });
}

function render(filename, contents) {
  if (!responses[filename]) {
    responses[filename] = contents;
  }

  for (var i = 0; i < files.length; i++) {
    if (files[i] in responses) {
			if (responses[files[i]] !== true) {
				output(responses[files[i]]);
	      responses[files[i]] = true;
			}
    } else {
      return false;
    }
  }
	output('All done!');
}


// request all files at once in "parallel"
getFile("file1");
getFile("file2");
getFile("file3");
