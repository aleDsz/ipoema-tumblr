var compile     = require('tumblr-theme-parser').compile;
var rssData     = require('./data/rss.json');
var fs          = require('fs');
var Promise     = require('bluebird');

// Functions
function readAsync() {
	return new Promise(function(resolve, reject) {
		fs.readFile("./src/theme.html", "utf8", function(err, data) {
			if (err)
				reject(err);
			else
				resolve(data);
		});
	});
}

function writeAsync(data) {
	return new Promise(function(resolve, reject) {
		fs.writeFile("./src/index.html", data, function(err) {
			if (err)
				reject(err);
			else
				resolve("Compiled Html saved");
		});
	});
}

// Load, Compile & Save
readAsync().then(function(data) {
	writeAsync(compile(data, rssData)).then(function (msg) {
		console.log(msg);
	});
});
