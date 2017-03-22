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

function displayPopup(action) {
	document.getElementById("popup-button").onclick = function() { 
            action();
        };
	popup.style.display = "block";

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
		link = end_page.select("g[id='link']"),
		twitter = end_page.select("path[id='twitter']");

	arrow.node.onclick = function () {
		window.location.href = "http://www.platform-investico.nl/artikel/duurzaamheid-uit-een-pakje/";
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

	link.node.onclick = function () {
		displayPopup(function () {
			document.getElementById('popup').style.display = "none";
		});
	};

	function goToFacebook() {
		var img = getImage();
		var url = "https://www.facebook.com/sharer/sharer.php?u=platform-investico.nl/topmannetje&title=Wat+voor+topman+ben+jij%3F&caption=Platform+Investico&quote=&description=Wat+voor+topmannetje+ben+jij%3F+Ga+jij+voor+het+snelle+geld%3F+Of+zet+je+je+bedrijf+in+om+de+planeet+te+redden%3F";
		var picture = "&picture=http%3A%2F%2Fplatform-investico.nl%2Ftopmannetje%2Fimg%2F"+ img 
		console.log(url);
		window.location.href = url + picture;
	}

	function goToTwitter() {
		var img = getImage();
		var url = "https://twitter.com/home?status=Wat%20voor%20topman%20ben%20jij?%20Red%20jij%20de%20planeet?%20Of%20ga%20je%20voor%20de%20winst?%20http%3A//platform-investico.nl/topmannetje"
		window.location.href = url;
	}

	function sendEmail(){
		window.location.href = "mailto:email?&subject=Speel topmannetje!&body=Ben%20jij%20een%20groene%20topman?%20Of%20gaat%20bij%20jou%20de%20winst%20voor%20de%20planeet?%20Wat%20voor%20topman%20ben%20jij?%20Speel%20het%20spel%3A%20http%3A//platform-investico.nl/topmannetje"}
}

// https://www.facebook.com/sharer/sharer.php?undefined&picture=http://topmannetje.herokuapp.com/img/appelboer.jpg&title=Speel%20topmannetje!&caption=Platform%20Investio
// https://www.facebook.com/sharer/sharer.php?u=ikstem.com&picture=http%3A%2F%2Ftopmannetje.herokuapp.com%2Fimg%2Fappelboer.jpg&title=Hallo&caption=Bye&quote=&description=Jij+verkoopt+liever+appels+op+de+markt.

transitionToEndPage();
