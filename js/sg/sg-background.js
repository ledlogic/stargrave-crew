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
	
	change: function(background) {
		var newBackground = $(this).val();
		sg.log("change background, newBackground: " + newBackground);
		var crew = sg.crew.find($(this));
		sg.log("change background, crew: " + crew);
		if (crew) {
			crew.setBackground(newBackground);
		}
	}

};
	