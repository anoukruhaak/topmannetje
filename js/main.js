


//STATE

 	//Links to SVG elements
 var s = Snap("#kantoor"),
 	help = s.select("g[id='help-button']"),
 	answer_a = s.select("g[id='a']"),
 	answer_b = s.select("g[id='b']"),
 	answer_c = s.select("g[id='c']"),
 	trophee1 = s.select("g[id='kikker-beker']"),
 	koffer = s.select("g[id='koffer']"),
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
		this.text = "  " + text + " ";
	}
}

class State {
	constructor(earth, business, news_ids){
		this.earth = earth;
		this.business = business;
		this.news_ids = news_ids;
	}
}

var global_state = new State(0, 0, []),
 	states = [],
 	selected_question = 0,
 	foodDone = false,
 	homeDone = false,
 	careDone = false;


var newsArray = [new NewsText(0, "Nieuwe CEO Unilever gooit het roer om."),
new NewsText(1, "Groene stroom in fabrieken Unilever!"),
new NewsText(2, "Unilever speelt op zeker: nieuwe CEO durft groene stroom nog niet aan."),
new NewsText(3, "Unilever haalt voor 2020 al het vlees uit haar producten. Consumenten reageren geschokt."), 
new NewsText(4, "De vegetarisch bond is blij met de vegetarische Unox worsten!")
];

var questions = [{"id": 0, "text": "Ik ben een:", "answerA": new Answer(0.1, "Man", 0, 0, 0, 0, 1), 
"answerB": new Answer(0.2, "Vrouw", 0, 0, 0, 0, 0), "answerC": new Answer(0.3, "Ik twijfel", 0, 0, 0, 0, 0)},

{"id": 1, "text": "Gefeliciteerd! Je bent topman van Unilever. De planeet kreunt onder jouw productie. Je eerste besluit:", "answerA": new Answer(1.1, "Ik gooi het roer om en kies voor een volledig duurzame productie", 1, 0, 0, 0, 2), 
"answerB": new Answer(1.2, "Ik kan dit niet oplossen. We onderzoeken vergroening maar draaien voorlopig op de oude voet door.", -1, 1, 2, 0, 17), 
"answerC": null}, 

//Start Groen
{"id": 2, "text": "Mooi. Laat je de fabrieken volledig draaien op duurzame energie?", "answerA": new Answer(2.1, "Ja, ik stap direct over op volledig groene stroom en bio-brandstof.", 2, 2, 0, 0, 3), 
"answerB": new Answer(2.2, "Groene subsidies zijn onzeker; ik begin met 10 procent groen.", 0, 0, 2, 0, 17), 
"answerC": null},

//Keuze
{"id": 3, "text": "Welke divisie pak je als eerste aan?", "answerA": new Answer(3.1, "Voeding", 0, 0, 0, 0, 4), 
"answerB": new Answer(3.2, "Cosmetica en verzorgingsproducten", 0, 0, 0, 0, 9), 
"answerC": new Answer(3.3, "Wasmiddelen en reiniging", 0, 0, 0, 0, 11)},

//Food groen
{"id": 4, "text": "Je verkoopt worst en ijs, maar vlees en zuivel zijn een zware belasting voor het milieu. Je besluit:", "answerA": new Answer(4.1, "Voor 2020 alle vlees en zuivel te vervangen door veganistische alternatieven", 5, -2, 3, 0, 6), 
"answerB": new Answer(4.2, "Een vegetarische variant op de Unox-worst te introduceren", 0, 0, 0, 0, 5),
"answerC": new Answer(4.3, "Samen te werken met het Vegetarisch Verbond, maar niet minder vlees te verkopen.",-2, 4, 0, 0, 5)},

{"id": 5, "text": "Weet je het zeker? Unox is cultureel erfgoed!", "answerA": new Answer(5.1, "Klopt, ik kies voor zeker. Unox blijft Unox.", -2, 3, 0, 0, 6), 
"answerB": new Answer(5.2, "Ik blijf bij mijn besluit: vegetarische worst.", 3, -2, 4, 1, 6), 
"answerC": null},

{"id": 6, "text": "Food 3 (vraag 6)", "answerA": new Answer(6.1, "Duurzaam", 1, -1, 0, 2, 7), 
"answerB": new Answer(6.2, "Fossiel", 1, -1, 0, 0, 7), 
"answerC": null},

{"id": 7, "text": "Food 4 (vraag 7)", "answerA": new Answer(7.1, "Duurzaam", 1, -1, 0, 2, 8), 
"answerB": new Answer(7.2, "Fossiel", 1, -1, 0, 0, 8), 
"answerC": new Answer(7.3, "skip 5", 1, -1, 0, 0, 8)},

{"id": 8, "text": "Food 5 (vraag 8)", "answerA": new Answer(8.1, "Duurzaam", 1, -1, 0, 2, 3), 
"answerB": new Answer(8.2, "Fossiel", 1, -1, 0, 0, 3), 
"answerC": null},

//Personal Groen
{"id": 9, "text": "9 - Personal 1", "answerA": new Answer(9.1, "Duurzaam", 1, -1, 0, 2, 10), 
"answerB": new Answer(9.2, "Fossiel", -1, -1, 0, 0, 10), 
"answerC": null},

{"id": 10, "text": "10 - Personal 2", "answerA": new Answer(2.1, "Duurzaam", 1, -1, 0, 2, 3), 
"answerB": new Answer(2.2, "Fossiel", 1, -1, 0, 0, 3), 
"answerC": null},

//Home Groen
{"id": 11, "text": "Home 1", "answerA": new Answer(11.1, "Duurzaam", 1, -1, 0, 2, 12), 
"answerB": new Answer(11.2, "Fossiel", 5, -1, 0, 0, 12), 
"answerC": null},

{"id": 12, "text": "Home 2 -12", "answerA": new Answer(12.1, "Duurzaam", 1, -1, 0, 2, 3), 
"answerB": new Answer(12.2, "Fossiel", -1, -1, 0, 0, 3), 
"answerC": null},


//Eind groen
{"id": 13, "text": "Amnesty (13)", "answerA": new Answer(13.1, "Duurzaam", 1, -1, 0, 2, 14), 
"answerB": new Answer(13.2, "Fossiel", -1, -1, 0, 0, 14), 
"answerC": null},

{"id": 14, "text": "eind groen 14", "answerA": new Answer(14.1, "Duurzaam", 1, -1, 0, 2, 15), 
"answerB": new Answer(14.2, "Fossiel", -1, -1, 0, 0, 15), 
"answerC": new Answer(14.3, "Fossiel", -1, -1, 0, 0, 15)},

{"id": 15, "text": "eind groen 15", "answerA": new Answer(15.1, "Duurzaam", 1, -1, 0, 2, 16), 
"answerB": new Answer(15.2, "Fossiel", -1, -1, 0, 0, 16), 
"answerC": null},

{"id": 16, "text": "eind groen 16", "answerA": new Answer(16.1, "Duurzaam", 1, -1, 0, 2, 100), 
"answerB": new Answer(16.2, "Fossiel", -1, -1, 0, 0, 100), 
"answerC": null},

//Fossiel start
{"id": 17, "text": "Bedenk slogan", "answerA": new Answer(17.1, "Duurzaam", 1, -1, 0, 2, 18), 
"answerB": new Answer(17.2, "Fossiel", -1, -1, 0, 0, 18), 
"answerC": null},

{"id": 18, "text": "Keuze", "answerA": new Answer(3.1, "Food", 1, -1, 0, 2, 19), 
"answerB": new Answer(3.2, "Personal Care", -1, -1, 0, 0, 20), 
"answerC": new Answer(3.3, "Home", -1, -1, 0, 0, 21)},

{"id": 19, "text": "Food - fossiel (1)", "answerA":  new Answer(19.1, "Duurzaam", 1, -1, 0, 2, 18), 
"answerB": new Answer(19.2, "Fossiel", -1, -1, 0, 0, 18), 
"answerC": null},

{"id": 20, "text": "Personal - fossiel (1)", "answerA": new Answer(20.1, "Duurzaam", 1, -1, 0, 2, 18), 
"answerB": new Answer(20.2, "Fossiel", -1, -1, 0, 0, 18), 
"answerC": null},

{"id": 21, "text": "Home - fossiel (1)", "answerA": new Answer(21.1, "Duurzaam", 1, -1, 0, 2, 18), 
"answerB": new Answer(21.2, "Fossiel", -1, -1, 0, 0, 18), 
"answerC": null},

//Fossiel eind
{"id": 22, "text": "Fossiel Eind", "answerA": new Answer(22.1, "Duurzaam", 1, -1, 0, 2, 100), 
"answerB": new Answer(22.2, "Fossiel", -1, -1, 0, 0, 100), 
"answerC": null},

//Duurzaam eind
{"id": 23, "text": "Fabriek", "answerA": new Answer(23.1, "Duurzaam", 1, -1, 0, 2, 100), 
"answerB": new Answer(23.2, "Fossiel", -1, -1, 0, 0, 100), 
"answerC": null}];



//---------------- GAME LOGIC -------------------------------------------------------------
function findNextQuestion(next_qid, old_qid) {
	
	function handleCategoryFinished(qid) {
		if (homeDone && careDone && foodDone) {
			//calculate points
			if (global_state.earth > 10 && global_state.business <5) {
				//too green
				return 23;
			} else if (global_state.earth < 5) {
				return 22;
			} else {
				return 13;
			}
		}
		return (qid === 3) ? 3 : 18;
	}

	function updateCategoriesFinished(old_qid){
		//check if we finished one of the sections:
		if (old_qid === 8 ||old_qid === 19) {
			foodDone = true;
		} else if (old_qid === 10 ||old_qid === 20) {
			careDone = true;
		} else if (old_qid === 12 ||old_qid === 21) {
			homeDone = true;
		}
	}

	if (next_qid === 100 ) {
		goToLoading();
	}
	else if (next_qid != 3 && next_qid != 18){
		displayQuestion(next_qid);
	} 
	else {
		updateCategoriesFinished(old_qid);
		var id = handleCategoryFinished(next_qid);

		if(id == 3 || id == 18) {
			displayDashboard(id);
		} else {
			displayQuestion(id);
		}
	}
}

function displayDashboard(id) {
	console.log(homeDone, careDone, foodDone);
	selected_question = id;

	if (homeDone) colorButton(answer_c, "green");
	if (careDone) colorButton(answer_b, "green");
	if (foodDone) colorButton(answer_a, "green");
	

	var txt = questions[id].text,
		a = questions[id].answerA.text,
		b = questions[id].answerB.text,
		c = questions[id].answerC.text; 
	answer_c.attr({display: ''});

	document.getElementById('vraag').innerHTML = txt;
	document.getElementById('antw_a').innerHTML = a;
	document.getElementById('antw_b').innerHTML = b;
	document.getElementById('antw_b').innerHTML = c;
	document.getElementById("antw_c").style.visibility = "visible";
}

function goToLoading() {
	window.location.href = "loading.html"
}

function goToFinal() {

}

function resetButtons() {
	colorButton(answer_a, "#99a2a2");
	colorButton(answer_b, "#99a2a2");
	colorButton(answer_c, "#99a2a2");
}

function colorButton(button, color){
	button.select("rect").stop();
	button.select("rect").attr({"fill": color});
}

function displayQuestion(id) {
	selected_question = id;
	resetButtons();
	var txt = questions[id].text,
		a = questions[id].answerA.text,
		b = questions[id].answerB.text,
		c = questions[id].answerC; 
	document.getElementById('vraag').innerHTML = txt;
	document.getElementById('antw_a').innerHTML = a;
	document.getElementById('antw_b').innerHTML = b;

	if (c === null) {
		document.getElementById("antw_c").style.visibility = "hidden";
		answer_c.attr({display: 'none'});
	} else {
		document.getElementById("antw_c").style.visibility = "visible";
		document.getElementById('antw_c').innerHTML = c.text;
		answer_c.attr({display: ''});
	}	
};


//---------------------------------- UPDATE STATE ------------------------------------------------
function processAnswer(answer) {
	var state = states[answer.delay] ? addToState(answer, states[answer.delay]) : createNewState(answer);
  
	function createNewState(answer) {
		return new State(answer.earth, answer.business, [answer.news_id]);
	}

	function addToState(answer, old) {
	var ids = old.news_ids
	ids.push(answer.news_id);
		return new State(old.earth + answer.earth, old.business + answer.business, ids);
	}
  
  //add state back to array
  states[answer.delay] = state
  updateState();
}


function updateState(){
	function updateNewsBanner(state) {
		var news_str = " --- Breaking News --- ";
		current_state.news_ids.forEach( function (id) {
			str = newsArray[id] ? newsArray[id].text : "";
			news_str += str;
		});
		newsText.select("text").attr({"text": news_str});
	}

	function updateGlobe() {

	}

	function updateBusiness() {

	}
	
	var current_state = states.shift();
	if (current_state !=  null) {
		global_state.earth += current_state.earth;
		global_state.business += current_state.business;

		if (current_state.news_ids.length > 0) {
			updateNewsBanner(current_state);
		}
	}
}

//------------------------------------------- ANIMATIONS --------------------------------------------		
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
	newsText.select("text").attr({"font-size": "16px", "font-family": "Catamaran, sans-serif", "font-style": "regular"});

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
		var a = questions[selected_question].answerA,
				next = a.next;
		processAnswer(a);
		findNextQuestion(next, selected_question);
	};

	answer_b.node.onclick = function () {
		changeBackgroundColor("grey", "#99a2a2", answer_b.select("rect"));
		var b = questions[selected_question].answerB,
				next = b.next;
		processAnswer(b);
		findNextQuestion(next, selected_question);
	};

	answer_c.node.onclick = function () {
		var c = questions[selected_question].answerC;
		if (c) {
			changeBackgroundColor("grey", "#99a2a2", answer_c.select("rect"));
			var next = c.next;
			processAnswer(c);
			findNextQuestion(next, selected_question);
		}
	};

	function moveNewsBanner () {
		var startMatrix = new Snap.Matrix(),
		midMatrix = new Snap.Matrix();
		newsText.transform(startMatrix);
		startMatrix.translate(1000, 0);
		midMatrix.translate(-100, 0);

		newsText.animate({opacity: 0.7, transform: midMatrix}, 9000, mina.linear, function () {
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