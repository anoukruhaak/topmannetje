var loading = Snap("#loading"),
	end_page = Snap("#end-page"),
	url = "http://topmannetje.herokuapp.com",
	text = "Wat voor topmannetje ben jij? Ga jij voor het snelle geld? Of zet je je bedrijf in om de planeet te redden?",
	titel = "Speel topmannetje!";

function transitionToEndPage(){
	var timer = setTimeout( function() {
		setUp();
		loading.animate({opacity: 0}, 1000, mina.easeout, function() {
			loading.attr({"display": "none"});
		});

	}, 1500);
}

function setUp(){
	var arrow = end_page.select("text[id='button']"),
		fb = end_page.select("path[id='fb']"),
		twitter = end_page.select("g[id='twitter']");

	arrow.node.onclick = function () {
		window.location.href = "http://www.platform-investico.nl";
	};


	function goToFacebook() {
		var pathname = window.location.pathname;
		console.log(pathname);
		
		window.location.href ="https://www.facebook.com/sharer/sharer.php?u=ikstem.com&picture=http%3A%2F%2Ftopmannetje.herokuapp.com%2Fimg%2Fappelboer.jpg&title=Hallo&caption=Bye&quote=&description=Jij+verkoopt+liever+appels+op+de+markt."
	}

	function goToTwitter() {

	}
}

transitionToEndPage();
