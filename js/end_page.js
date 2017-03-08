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

function setUp(){
	var url = window.location.pathname,
	urlsplit = url.split("/").slice(-1)[0];


	var arrow = end_page.select("text[id='button']"),
		fb = end_page.select("path[id='fb']"),
		twitter = end_page.select("g[id='twitter']");

	arrow.node.onclick = function () {
		window.location.href = "http://www.platform-investico.nl";
	};

	fb.node.onclick = function () {
		switch (urlsplit) {
			case "appelboer.html":
				goToFacebook("appelboer.jpg");
				break;
			case "duurzaam.html":
				goToFacebook("duurzaam.jpg");
				break;
			case "reputatie.html":
				goToFacebook("baas.jpg");
				break;
			case "speel_op_zeker":
				goToFacebook("reputatiemanager.jpg");
				break;
			default:
				goToFacebook("reputatiemanager.jpg");
				break;
		}
	}


	function goToFacebook(img) {
		var url = "https://www.facebook.com/sharer/sharer.php?u=topmannetje.herokuapp.com&title=Wat+voor+topman+ben+jij%3F&caption=Platform+Investico&quote=&description=Wat+voor+topmannetje+ben+jij%3F+Ga+jij+voor+het+snelle+geld%3F+Of+zet+je+je+bedrijf+in+om+de+planeet+te+redden%3F";
		var picture = "&picture=http%3A%2F%2Ftopmannetje.herokuapp.com%2Fimg%2F"+ img 
		console.log(url);
		window.location.href = url + picture;
	}

	function goToTwitter() {

	}
}

// https://www.facebook.com/sharer/sharer.php?undefined&picture=http://topmannetje.herokuapp.com/img/appelboer.jpg&title=Speel%20topmannetje!&caption=Platform%20Investio
// https://www.facebook.com/sharer/sharer.php?u=ikstem.com&picture=http%3A%2F%2Ftopmannetje.herokuapp.com%2Fimg%2Fappelboer.jpg&title=Hallo&caption=Bye&quote=&description=Jij+verkoopt+liever+appels+op+de+markt.

transitionToEndPage();
