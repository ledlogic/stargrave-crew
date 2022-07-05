/* st-render.js */

sg.render = {
	init: function() {
		sg.log("init render");
		sg.render.render();
	},

	render: function() {
		sg.render.crew();
	},
	
	crew: function() {
		var c = [];
		for (var i=0;i<sg.crew.list.length;i++) {
			var m = sg.render.member(i);
			c.push(m);
		}
		$(".crew").append(c.join(""));
	
		$(".stat-background").on("change", sg.background.change);
	},
	
	member: function(i) {
		var c = [];
		var member = sg.crew.list[i];
		var role = member.getStatValue("role");
		
		// TODO: temp only
		if (role != "captain") {
			return "";
		}
		
		var prettyRole = sg.render.deslugifyAndCapitalize(role);
		sg.log("render member: " + role + " (" + prettyRole + ")");
		
		var name = member.getStatValue("name");
		var level = member.getStatValue("level");
		var move = member.getStatValue("move");
		var fight = member.getStatValue("fight");
		var shoot = member.getStatValue("shoot");
		var armour = member.getStatValue("armour");
		var will = member.getStatValue("will");
		var health = member.getStatValue("health");
		var healthcurrent = member.getStatValue("health-current");
		
		var nameType = "text";
		var levelType = "number";
		var moveType = "number";
		var fightType = "number";
		var shootType = "number";
		var armourType = "number";
		var willType = "number";
		var healthType = "number";
		var healthCurrentType = "number";
		
		c.push("<div class=\"crew-" + role + "\" data-member-i=\"" + i + "\">");
		c.push("<img class=\"crew-bg\" src=\"img/" + role + ".jpg\"/>");
		c.push("<div class=\"crew-stat\">");
		c.push("<input class=\"stat stat-name\"           type=\"" + nameType + "\" value=\"" + name + "\" />");
		c.push("<select class=\"stat stat-background\">");
		
		c.push("<option value=\"\">");
		c.push("No Background");
		c.push("</option>");
		
		_.each(sg.background.list,function(background, index) {
			var prettyBackground = sg.render.deslugifyAndCapitalize(background.type);
			c.push("<option value=\"" + background.type + "\">");
			c.push(prettyBackground);
			c.push("</option>");
		});
		
		c.push("</select>");
		c.push("<input class=\"stat stat-level\"          type=\"" + levelType + "\" value=\"" + level + "\" />");
		c.push("<input class=\"stat stat-move\"           type=\"" + moveType + "\" value=\"" + move + "\" />");
		c.push("<input class=\"stat stat-fight\"          type=\"" + fightType + "\" value=\"" + fight + "\" />");
		c.push("<input class=\"stat stat-shoot\"          type=\"" + shootType + "\" value=\"" + shoot + "\" />");
		c.push("<input class=\"stat stat-armour\"         type=\"" + armourType + "\" value=\"" + armour + "\" />");
		c.push("<input class=\"stat stat-will\"           type=\"" + willType + "\" value=\"" + will + "\" />");
		c.push("<input class=\"stat stat-health\"         type=\"" + healthType + "\" value=\"" + health + "\" />");
		c.push("<input class=\"stat stat-health-current\" type=\"" + healthCurrentType + "\" value=\"" + healthcurrent + "\" />");
		c.push("</div>");
		c.push("</div>");
		return c.join("");

/*

					<div class="crew crew-captain sg-hidden">
					<img class="crew-bg" src="img/captain.jpg" />
					<div class="crew-stat">
						<input class="stat stat-name" value="Captain Tight Pants" />
						<input class="stat stat-level" value="15" />
						<input class="stat stat-move" value="+1" />
						<input class="stat stat-fight" value="+2" />
						<input class="stat stat-shoot" value="+3" />
						<input class="stat stat-armour" value="+4" />
						<input class="stat stat-will" value="+5" />
						<input class="stat stat-health-max" value="+6" />
						<input class="stat stat-health-current" value="+7" />
					</div>
*/

	},
	
	deslugifyAndCapitalize: function(str) {
		var ret = str.replace(/-/g, " ");
		ret = ret.replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));
		return ret;
	}
};

