


//STATE
var earth = 0,
 	business = 0,
 	news_ids = [],
 	states = [(earth, business, 0)],
 	selected_question = 0;
 	
 	//Links to SVG elements
 var s = Snap("#kantoor"),
 	help = s.select("g[id='help-button']"),
 	answer_a = s.select("g[id='a']"),
 	answer_b = s.select("g[id='b']"),
 	answer_c = s.select("g[id='c']"),
 	text_a = s.select("text[id='antwoord-a']"),
 	text_b = s.select("text[id='antwoord-b']"),
 	text_c = s.select("text[id='antwoord-c']"),
 	trophee1 = s.select("g[id='kikker-beker']"),
 	koffer = s.select("g[id='koffer']"),
 	vraag = s.select("g[id='vraag']"),
 	newsText = s.select("g[id='news-tekst']");

class Answer {
	constructor(id, text, earth, business, news_id, delay, next) {
		this.id = id;
		this.text = text;
		this.earth = earth;
		this.business = business;
		this.news_id = news_id;
		this.delay = delay;
		this.next = next;
	}
};

class NewsText {
	constructor(id, text) {
		this.id = id;
		this.text = " --- " + text;
	}
}

var newsArray = [new NewsText(0, "Polar bears are dying"), new NewsText(1, "ice cream is in demand"), new NewsText(2, "the world is ending")];

var questions = [{"id": 0, "text": "gender", "answerA": new Answer(0.1, "A. Man", 0, 0, 0, 0, 1), 
"answerB": new Answer(0.2, "B. Vrouw", 0, 0, 0, 0, 1), "answerC": new Answer(0.3, "C. Ik twijfel", 0, 0, 0, 0, 1)},

{"id": 1, "text": "CEO", "answerA": new Answer(1.1, "Groen", 0, 0, 0, 0, 2), 
"answerB": new Answer(1.2, "Fossiel", 0, 0, 0, 0, 2), 
"answerC": null}, 

{"id": 2, "text": "Fabriek", "answerA": new Answer(2.1, "Duurzaam", 1, -1, 0, 0, 1), 
"answerB": new Answer(2.2, "Fossiel", -1, -1, 0, 0, 1), 
"answerC": null}];



//---------------- GAME LOGIC -------------------------------------------------------------
function displayQuestion(id) {
	selected_question = id;
	var txt = questions[id].text,
		a = questions[id].answerA.text,
		b = questions[id].answerB.text,
		c = questions[id].answerC; 
	
	if (c === null) {
		text_c.attr({ text: ""});
		answer_c.attr({display: 'none'});
	} else {
		text_c.attr({ text: c.text});
		answer_c.attr({display: ''});
	}

	vraag.select("text").attr({ text: txt});
	text_a.attr({ text: a});
	text_b.attr({ text: b});
	
};

function updateForAnswer(answer) {

}

function updateStates(){

}

   		
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
	help.transform({fill: red});
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
		var next = questions[selected_question].answerA.next;
		displayQuestion(next);
	};

	answer_b.node.onclick = function () {
		changeBackgroundColor("grey", "#99a2a2", answer_b.select("rect"));
		var next = questions[selected_question].answerB.next;
		displayQuestion(next);
	};

	answer_c.node.onclick = function () {
		if (questions[selected_question].answerC) {
			changeBackgroundColor("grey", "#99a2a2", answer_c.select("rect"));
			var next = questions[selected_question].answerA.next;
			displayQuestion(next);
		}
	};

	function moveNewsBanner () {
		var startMatrix = new Snap.Matrix(),
		midMatrix = new Snap.Matrix();
		newsText.transform(startMatrix);
		startMatrix.translate(1000, 0);
		midMatrix.translate(-100, 0);

		newsText.animate({opacity: 0.7, transform: midMatrix}, 7000, mina.linear, function () {
			newsText.animate({opacity: 1.0, transform: startMatrix}, 1, mina.easeout, function () {
				moveNewsBanner();
			});
		});

	};
	moveNewsBanner();
	displayQuestion(0);

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