var loading = Snap("#loading"),
	end_page = Snap("#end-page"),
	text = "&description=Wat voor topmannetje ben jij? Ga jij voor het snelle geld? Of zet je je bedrijf in om de planeet te redden?",
	title = "&title=Speel topmannetje!",
	caption = "&caption=Platform Investio";

function transitionToEndPage(){
	var timer = setTimeout( function() {
		setUp();
		loading.animate({opacity: 0}, 1000, mina.easeout, function() {
			loading.attr({"display": "none"});
		});

	}, 1500);
}

function setUp() {
	function getImage() {
		var url = window.location.pathname,
		urlsplit = url.split("/").slice(-1)[0];
		switch (urlsplit) {
			case "appelboer.html":
				return "appelboer.jpg";
				break;
			case "duurzaam.html":
				return "duurzaam.jpg";
				break;
			case "reputatie.html":
				return "reputatiemanager.jpg";
				break;
			case "speel_op_zeker":
				return "baas.jpg";
				break;
			default:
				return "reputatiemanager.jpg";
				break;
		}
	}

	var arrow = end_page.select("text[id='button']"),
		fb = end_page.select("path[id='fb']"),
		mail = end_page.select("g[id='mail']"),
		twitter = end_page.select("path[id='twitter']");

	arrow.node.onclick = function () {
		window.location.href = "http://www.platform-investico.nl";
	};

	fb.node.onclick = function () {
		goToFacebook();
	};

	twitter.node.onclick = function () {
		goToTwitter();
	};

	mail.node.onclick = function () {
		sendEmail();
	};

	function goToFacebook() {
		var img = getImage();
		var url = "https://www.facebook.com/sharer/sharer.php?u=topmannetje.herokuapp.com/topmannetje.html&title=Wat+voor+topman+ben+jij%3F&caption=Platform+Investico&quote=&description=Wat+voor+topmannetje+ben+jij%3F+Ga+jij+voor+het+snelle+geld%3F+Of+zet+je+je+bedrijf+in+om+de+planeet+te+redden%3F";
		var picture = "&picture=http%3A%2F%2Ftopmannetje.herokuapp.com%2Fimg%2F"+ img 
		console.log(url);
		window.location.href = url + picture;
	}

	function goToTwitter() {
		var img = getImage();
		var url = "https://twitter.com/home?status=Wat%20voor%20topman%20ben%20jij?%20Red%20jij%20de%20planeet?%20Of%20ga%20je%20voor%20de%20winst?%20http%3A//topmannetje.herokuapp.com/index.html"
		window.location.href = url;
	}

	function sendEmail(){
		window.location.href = "mailto:?subject=Wat voor topman ben jij?&body=I thought you might find this information interesting:&attachment=http://topmannetje.herokuapp.com/img/appelboer.jpg";
	}
}

// https://www.facebook.com/sharer/sharer.php?undefined&picture=http://topmannetje.herokuapp.com/img/appelboer.jpg&title=Speel%20topmannetje!&caption=Platform%20Investio
// https://www.facebook.com/sharer/sharer.php?u=ikstem.com&picture=http%3A%2F%2Ftopmannetje.herokuapp.com%2Fimg%2Fappelboer.jpg&title=Hallo&caption=Bye&quote=&description=Jij+verkoopt+liever+appels+op+de+markt.

transitionToEndPage();
