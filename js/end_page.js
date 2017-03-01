var loading = Snap("#loading"),
	end_page = Snap("#end-page");

function transitionToEndPage(){
	var timer = setTimeout( function() {
		setUp();
		loading.animate({opacity: 0}, 1000, mina.easeout, function() {
			loading.attr({"display": "none"});
		});

	}, 1500);
}

function setUp(){
	var arrow = end_page.select("g[id='arrow']"),
		inv = end_page.select("tspan[id='Investico']");

	inv.node.onclick = goToFacebook;
	arrow.node.onclick = goToFacebook;

	function goToFacebook() {
		// var pathname = window.location.pathname; 
		// window.location.href ="http://www.facebook.com/share.php?u=topmannetje.heroku.app/" +pathname;
	}
}

transitionToEndPage();
