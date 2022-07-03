/* sg-species.js */

sg.species = {
	list: null,
	
	init: function() {
		sg.log("init species");
		sg.species.request();
	},
	
	request: function(uri) {
		sg.log("requesting species");
		
		$.ajax("data/sg-species.json")
			.done(function(data, status, jqxhr) {
				sg.species.list = data;
				sg.log("found " + data.length + " species");
			})
			.fail(function(e) {
				sg.log("Error: unable to load species", e);
			})
			.always(function() {
				setTimeout(sg.species.render, 10);
			});
	},
	
	render: function() {
		var list = sg.species.list;
		_.each(list, function(species, index) {
			var o = "<option>" + species.type + "</option>";
			$("#crew-species-select").append(o);
		});
	}

};
	