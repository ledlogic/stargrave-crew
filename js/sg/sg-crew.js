/* sg-crew.js */

sg.crew = {
	list: [],
	max: 10,
	
	init: function() {
		sg.log("init crew");
		sg.crew.load();
		setTimeout(sg.nextInit, 10);
	},
	
	load: function() {
		// build list
		var list = [];
		var c = null;
		c = new Crew();
		c.init({"role": "captain"})
		list.push(c);
		c = new Crew();
		c.init({"role": "first-mate"});
		list.push(c);
		while (list.length < 10) {
			c = new Crew();
			c.init({"role": "soldier"});
			list.push(c);
		}
		sg.crew.list = list;
		sg.log("sg.crew.list.length: " + sg.crew.list.length);
	},
	
	setStatValue: function(stats, statName, statValue) {
		var ret = null;
		_.each(stats, function(searchStatValue, searchStatKey) {
			if (!ret && searchStatValue.name == statName) {
				searchStatValue.value = statValue;
				ret = searchStatValue;
			}
		});
		return ret;
	},
	
	// find the crew object associated with an element
	find: function(element) {
		sg.log(["find element:", element]);
		var dataMemberI = $(element).closest("[data-member-i]");
		sg.log(["dataMemberI:", dataMemberI]);
		if (dataMemberI.length) {
			var i = dataMemberI.attr("data-member-i");
			return sg.crew.list[i];
		}
		return null;
	}
};

function Crew() {
	//sg.log(this);
}

Crew.prototype.init = function(settings) {
	var that = this;
	var stats = _.map(sg.stats.list, _.clone);
	_.map(settings, function(settingValue, settingKey, ) {
		_.each(stats, function(statValue, statKey) {
			if (statValue.name == settingKey) {
				statValue.value = settingValue;
				return;
			}
		});
	});
	
	var roleName = settings.role;
	//sg.log("roleName:" + roleName);
	var role = sg.roles.find(roleName);
	//sg.log("role:" + role);
	
	_.each(role.stats, function(searchStatValue, statName) {
		//sg.log("statName:" + statName + ", searchStatValue:" + searchStatValue);
		sg.crew.setStatValue(stats, statName, searchStatValue);
	});

	that.stats = stats;
}

Crew.prototype.getStatValue = function(statName) {
	//sg.log("getStatValue, statName:" + statName);
	var stats = this.stats;
	var ret = null;
	_.each(stats, function(searchStatValue, searchStatKey) {
		if (!ret && searchStatValue.name == statName) {
			ret = searchStatValue.value;
		}
	});
	//sg.log("getStatValue, ret:" + ret);
	return ret;
}

Crew.prototype.setBackground = function(background) {
	var stats = this.stats;
	sg.crew.setStatValue(stats, "background", background);
	sg.log(["stats:", stats]);
}