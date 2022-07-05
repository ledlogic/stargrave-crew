/* sg-background.js */

sg.background = {
	list: null,
	
	init: function() {
		sg.log("init background");
		sg.background.request();
	},
	
	request: function(uri) {
		sg.log("requesting background");
		
		$.ajax("data/sg-background.json")
			.done(function(data, status, jqxhr) {
				sg.background.list = data;
				sg.log("found " + data.length + " backgrounds");
			})
			.fail(function(e) {
				sg.log("Error: unable to load background", e);
			})
			.always(function() {
				setTimeout(sg.nextInit, 10);
			});
	},
	
	render: function() {
		var list = sg.background.list;
		_.each(list, function(background, index) {
			var o = "<option>" + background.type + "</option>";
			$("#crew-background-select").append(o);
		});
	}

};
	