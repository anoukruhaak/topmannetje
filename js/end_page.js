var loading = Snap("#loading"),
	end_page = Snap("#end_page");

function transitionToEndPage(){
	var timer = setTimeout( function() {
		loading.animate({opacity: 0}, 1000, mina.easeout, function() {
			loading.attr({"display": "none"});
		});

	}, 1500);
}

transitionToEndPage();