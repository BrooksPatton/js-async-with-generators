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
	// what do we do here?
  let fn;
  let text;

  fakeAjax(file, function(response) {
    if(fn) {
      fn(response)
    } else {
      text = response
    }
  });

  return function(cb) {
    if(text) {
      cb(text)
    } else {
      fn = cb;
    }
  };
}

// request all files at once in "parallel"
// ???
var getfile1 = getFile('file1');
var getFile2 = getFile('file2');
var getfile3 = getFile('file3');

getfile1(text => {
  output(text)
  getFile2(text => {
    output(text)
    getfile3(text => output(text));
  });
});
