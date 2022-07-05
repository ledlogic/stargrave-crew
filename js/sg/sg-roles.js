/* sg-roles.js */

sg.roles = {
	list: null,
	
	init: function() {
		sg.log("init roles");
		sg.roles.request();
	},
	
	request: function(uri) {
		sg.log("requesting roles");
		
		var ts = (new Date()).getTime();
		$.ajax("data/sg-roles.json?ts=" + ts)
			.done(function(data, status, jqxhr) {
				sg.roles.list = data;
				sg.log("found " + data.length + " roles");
			})
			.fail(function(e) {
				sg.log("Error: unable to load roles", e);
			})
			.always(function() {
				setTimeout(sg.nextInit, 10);
			});
	},
	
	find: function(roleName) {
		var roles = sg.roles.list;
		var ret = null;
		_.each(roles, function(roleValue, roleKey) {
			//sg.log(arguments);
			if (!ret && roleValue.name == roleName) {
				ret = roleValue
			}
		});
		return ret;
	}

};
	