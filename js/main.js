

// First lets create our drawing surface out of existing SVG element
// If you want to create new surface just provide dimensions
// like s = Snap(800, 600);
// First lets create our drawing surface out of existing SVG element
// If you want to create new surface just provide dimensions
// like s = Snap(800, 600);


var s = Snap("#kantoor");

help = s.select("g[id='help-button']");
answer_a = s.select("g[id='a']");
answer_b = s.select("g[id='b']");
answer_c = s.select("g[id='c']");
trophee1 = s.select("g[id='kikker-beker']");
koffer = s.select("g[id='koffer']");
newsText = s.select("g[id='news-tekst']");
   		
function animateHelpButton(){
	red = help.select("path[fill='#e0421d']");
	orange = help.select("path[fill='#f97d09']");

	if (red === null) {
		orange.attr({'fill':'#e0421d'});
	} else {
		red.attr({'fill':"#f97d09"});
	}
};


function resetSVG (){
    var t = new Snap.Matrix()
	t.translate(0, 0);
	help.transform(t);
};

function breakNews () {
	bg = s.select("g[id='achtergrond']").select("rect");

	var anim2 = function () {bg.animate({fill: "white"}, 10000, mina.easeinout, anim3)};
	var anim1 = function () {bg.animate({fill: "lemonchiffon", filter: Snap("#glow")}, 200, mina.easeinout, anim2)};
	var anim3 = function () {bg.animate({fill: "orange", filter: Snap("#glow")}, 200, mina.easeinout, anim1)};
	anim3();
};


function setUp(){

	help.mouseover(animateHelpButton,resetSVG);
	trophee1.drag();
	koffer.drag();
	// var animBack = function () {koffer.animate({transform: "rotate(20 100 0)"}, 2000, mina.easeinout, null)};
	// var anim = function () {koffer.animate({transform: "rotate(20 100 100 )"}, 2000, mina.easeinout, animBack)};
	// anim();

	function changeBackgroundColor(newColor, oldColor, surface) {
		surface.animate({fill: newColor}, 200, mina.easeinout, function() {
			surface.animate({fill: oldColor}, 200, mina.easeinout, null);
		});
	};
	
	//Setup answer buttons	
	answer_a.node.onclick = function () {
		changeBackgroundColor("grey", "#99a2a2", answer_a.select("rect"));
	};

	answer_b.node.onclick = function () {
		changeBackgroundColor("grey", "#99a2a2", answer_b.select("rect"));
	};

	answer_c.node.onclick = function () {
		changeBackgroundColor("grey", "#99a2a2", answer_c.select("rect"));
	};

	function moveNewsBanner () {
		var startMatrix = new Snap.Matrix(),
		midMatrix = new Snap.Matrix();
		startMatrix.translate(1000, 0);
		midMatrix.translate(-10, 0);

		newsText.animate({opacity: 0.7, transform: startMatrix}, 6000, mina.linear, function () {
			newsText.animate({opacity: 1.0, transform: midMatrix}, 1, mina.easeout, function () {
				moveNewsBanner();
			});
		});

	};
	moveNewsBanner();

};

function animateClouds(){
	function getRandomInt(min, max) {
	  min = Math.ceil(min);
	  max = Math.floor(max);
	  return Math.floor(Math.random() * (max - min)) + min;
	}

	function animateCloud(index, wolk){
		var wolkStartMatrix = new Snap.Matrix(),
		wolkMidMatrix = new Snap.Matrix();
		wolkStartMatrix.translate(0, -5);
		wolkMidMatrix.translate(0, 5);

		wolk.animate({opacity: 0, transform: wolkStartMatrix}, 1000*index, mina.easeinout, function () {
			wolk.animate({transform: wolkMidMatrix}, 1, mina.easeout, function () {
				wolk.animate({opacity: 1}, 2000, mina.easeinout, function () {animateCloud(index, wolk);});
			  });
		});
	}
	wolken = [s.select('#wolk-1'), s.select('#wolk-2'), s.select('#wolk-3')];
	wolken.forEach( function(wolk){
		animateCloud(getRandomInt(1,5), wolk);
	});
};



setUp();
animateClouds();
breakNews();