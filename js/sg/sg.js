/* sg.js */

var sg = {
	queue: [],
	
	log: function(s1, s2) {
		if (typeof(window.console) != "undefined") {
			if (s2) {
				console.log([s1, s2]);
			} else {
				console.log(s1);
			}
		}
	},

	init: function() {
		sg.queue = [
			"sg.stats",
			"sg.species"
		];
		setTimeout("sg.nextInit()", 10);
	},
	
	nextInit: function() {
		var n = sg.queue.shift();
		setTimeout(n+".init()", 10);
	}
};

$(document).ready(sg.init);
