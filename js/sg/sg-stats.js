/* sg-stats.js */

sg.stats = {
	list: null,
	
	init: function() {
		sg.log("init stats");
		sg.stats.request();
	},
	
	request: function(uri) {
		sg.log("requesting stats");
		
		var ts = (new Date()).getTime();
		$.ajax("data/sg-stats.json?ts=" + ts)
			.done(function(data, status, jqxhr) {
				sg.stats.list = data;
				sg.log("found " + data.length + " stats");
			})
			.fail(function(e) {
				sg.log("Error: unable to load stats", e);
			})
			.always(function() {
				setTimeout(sg.nextInit, 10);
		});
	}
};