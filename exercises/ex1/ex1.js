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
  handleResponse.register(file);

	fakeAjax(file,function(text){
		// what do we do here?
    handleResponse.resolve(file, text);
	});
}

var handleResponse = {
  store: [],

  register: function(file) {
    this.store.push({
      file: file,
      resolved: false
    });
  },

  resolve: function(file, text) {
    var obj;

    this.store.forEach(function(item) {
      if(item.file === file) {
        obj = item;
      }
    });

    obj.resolved = true;
    obj.text = text;

    var current;

    while(this.store.length > 0 && this.store[0].resolved) {
      current = this.store.shift();
      output(current.text);
    }
  }
};

// request all files at once in "parallel"
getFile("file1");
getFile("file2");
getFile("file3");
