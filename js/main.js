 	//Links to SVG elements
 var s = Snap("#kantoor"),
 	help = s.select("g[id='help-button']"),
 	answer_a = s.select("g[id='a']"),
 	answer_b = s.select("g[id='b']"),
 	answer_c = s.select("g[id='c']"),
 	koffer = s.select("g[id='koffer']"),
 	globe = s.select("g[id='globe']"),
 	globe_water = globe.select("circle[id='globe-water']"),
 	globe_bg = globe.select("path[id='globe-bg']"),
 	globe_clouds = s.select("g[id='w3-wolk']"),
 	globe_trees = s.select("g[id='boompjes']"),
 	globe_flames = s.select("g[id='vlam']"),
 	fabriek_gr = s.select("g[id='fabriek-groot']"),
 	fabriek_kl = s.select("g[id='fabriek-klein']"),
 	fabriek_mi = s.select("g[id='fabriek-midden']"),
 	newsText = s.select("g[id='news-tekst']"),
 	plank_globe = s.select("path[id='plank-globe']"),
 	plank_fabriek = s.select("path[id='plank-fabriek']"),
 	oldNews = "",
 	plank_color = "#b6ab99";

 // var d = Snap("#duurzaamheidsman"),
 // 	legs = d.select("g[id='been']");
 var d = Snap("#duurzaamheid"),
 	 m = Snap("#marketing"),
 	 r = s.select("g[id='rutte']");

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

var global_state = new State(5, 5, []),
 	states = [],
 	selected_question = 0,
 	foodDone = false,
 	homeDone = false,
 	careDone = false,
 	earth_state = 4,
 	business_state = 2;


var newsArray = [new NewsText(0, "Nieuwe topman Unilever gooit het roer om."),
new NewsText(1, "Groene stroom in fabrieken Unilever!"),
new NewsText(2, "Unilever speelt op zeker: nieuwe CEO durft groene stroom nog niet aan."),
new NewsText(3, "Unilever haalt voor 2020 al het vlees uit haar producten. Consumenten reageren geschokt."), 
new NewsText(4, "De vegetarisch bond is blij met de vegetarische Unox worsten!"),
new NewsText(5, "Wildgroei aan keurmerken verwart de consument, stelt de Consumentenbond."),
new NewsText(6, "Consument klaagt dat nieuwe shampoos van Unilever minder goed werken."),
new NewsText(7, "Elfstedentocht gaat door. Staking Unox-fabriek escaleert."),
new NewsText(8, "Heinz Kraft spekt oorlogskas voor overname Unilever."),
new NewsText(9, "British Health Council: Marmite too salt for healthy diet."),
new NewsText(10, "Becel Light winnaar Margriet Winter Festival spreads award"),
new NewsText(11, "Gekke koeienziekte, varkenspest en vogelgriep vallen samen dit jaar. Consumenten stappen over op vegetarisch."),
new NewsText(12, "Lobby Plastic Soup Foundation slaagt: EU-verbod op microplastics."),
new NewsText(13, "Consumentenbond: klant verliest vertrouwen door wildgroei keurmerken."),
new NewsText(14, "Straatoproer India na dood heilige koeien door eten plastic afval. 23 doden."),
new NewsText(15, "Storm bovenop stijgende zeespiegel veegt Bangladesh van de kaart. Vraag naar shampoo valt weg.."),
new NewsText(16, "Laatste ijs Noordpool verdwenen. Snelle vaarroute naar China ligt open."),
new NewsText(17, "@fakeDonaldTrump: This @Topmannetje totally gets it! Running a business is about MAKING MONEY, not saving polar bears! #dealwithit"),
new NewsText(18, "Oorlog India en Pakistan over drinkwater. Theeplantages staan in brand."),
new NewsText(19, "Bosbescherming slaagt. Sumatraanse tijgers terroriseren Indonesische jungle."),
new NewsText(20, "Unilever verwelkomt nieuwe topman."),
new NewsText(21, "Nieuwe topman Unilever wil hogere marges en meer winst."),
new NewsText(22, "Unilever verwelkomt nieuwe topman."),
];

var questions = [{"id": 0, "text": "Welkom! Ben je een hij of een zij?", "answerA": new Answer(0.1, "Man", 0, 0, 20, 0, 1), 
"answerB": new Answer(0.2, "Vrouw", 0, 0, 20, 0, 0), 
"answerC": new Answer(0.3, "Geen van beiden.", 0, 0, 20, 0, 0),
"audio": null, "animation": null},

{"id": 1, "text": "Gefeliciteerd! Je bent topman van Unilever. De planeet kreunt onder jouw productie. Je eerste besluit:", 
"answerA": new Answer(1.1, "Ik gooi het roer om en kies voor een volledig duurzame productie", 5, -5, 0, 0, 2), 
"answerB": new Answer(1.2, "Ik kan dit niet oplossen. We onderzoeken vergroening maar draaien voorlopig op de oude voet door.", -5, 5, 2, 0, 17), 
"answerC": null, 
"audio": "audio/applause.mp3", "animation": null}, 

//Start Groen
{"id": 2, "text": "Mooi. Laat je de fabrieken volledig draaien op duurzame energie?", 
"answerA": new Answer(2.2, "Groene subsidies zijn onzeker; ik begin met 10 procent groen.", -5, 0, 2, 0, 17), 
"answerB": new Answer(2.1, "Ja, ik stap direct over op volledig groene stroom en bio-brandstof.", 5, 5, 1, 0, 3), 
"answerC": null,
"audio": null, "animation": bounceHulpButton},

//Keuze
{"id": 3, "text": "Welke divisie pak je als eerste aan?", 
"answerA": new Answer(3.1, "Voeding", 0, 0, 0, 0, 4), 
"answerB": new Answer(3.2, "Cosmetica en verzorgingsproducten", 0, 0, 0, 0, 9), 
"answerC": new Answer(3.3, "Wasmiddelen en reiniging", 0, 0, 0, 0, 11),
"audio": null, "animation": null},

//Food groen
{"id": 4, "text": "Waarschuwing van je duurzaamheidsmanager: jouw worst en ijs zijn een zware belasting voor het milieu. Je besluit:", 
"answerA": new Answer(4.1, "Voor 2020 alle vlees en zuivel te vervangen door veganistische alternatieven", 8, -10, 11, 3, 6), 
"answerB": new Answer(4.2, "Een vegetarische variant op de Unox-worst te introduceren", 3, -5, 4, 1, 5),
"answerC": new Answer(4.3, "Samen te werken met het Vegetarisch Verbond, maar niet minder vlees te verkopen.",-10, 10, 0, 0, 6),
"audio": "audio/duck.mp3", "animation": animateSustainableMan},

{"id": 5, "text": "Weet je het zeker? Unox is cultureel erfgoed!", 
"answerA": new Answer(5.1, "Klopt, ik kies voor zeker. Unox blijft Unox.", -10, 5, 0, 0, 6), 
"answerB": new Answer(5.2, "Ik blijf bij mijn besluit: vegetarische worst.", 0, -5, 7, 1, 6), 
"answerC": null,
"audio": null, "animation": null},

{"id": 6, "text": "Het duurzame ijsmerk Jen & Berry’s is te koop. Wil je het overnemen?", 
"answerA": new Answer(6.1, "Ja.", -5, 10, 0, 2, 7), 
"answerB": new Answer(6.2, "Nee", 5, -10, 0, 0, 8), 
"answerC": null,
"audio": null, "animation": null},

{"id": 7, "text": "Zeker weten? IJsjes zijn bevroren blokjes zuivel en suiker.", 
"answerA": new Answer(7.1, "Daar verzin ik wel wat op", -5, 5, 0, 4, 8), 
"answerB": new Answer(7.2, "Oeps, dan toch maar niet", 5, -5, 0, 0, 8), 
"answerC": null,
"audio": null, "animation": bounceHulpButton},

//Animation: verschuif de koffer met certificaten.
{"id": 8, "text": "De groenten in je soep en pastasaus moeten duurzaam. Hoe pak je dat aan?", 
"answerA": new Answer(8.3, "Ik vergroen op mijn eigen manier en bedenk een nieuw keurmerk.", -5, 5, 5, 1, 3), 
"answerB": new Answer(8.2, "Ik verplicht leveranciers biologisch te produceren.", 5, -5, 0, 0, 3), 
"answerC": new Answer(8.1, "Ik ga in zee met veel kleine lokaal werkende boeren.", 5, -5, 0, 2, 3), 
"audio": null, "animation": null},

//Personal Groen
{"id": 9, "text": "Memo van je duurzaamheidsmanager: te lang douchen is slecht voor het milieu. Wat doe je?", 
"answerA": new Answer(9.1, "Ik start een campagne om mensen te overtuigen minder lang te douchen.", 5, 5, 0, 2, 10), 
"answerB": new Answer(9.2, "Ik ontwikkel droogshampoo, daar is geen water voor nodig.", 7, -5, 6, 0, 10), 
"answerC": new Answer(9.3, "Dit is niet een probleem dat ik kan oplossen.", -10, 10, 0, 0, 10),
"audio": "audio/duck.mp3", "animation": animateSustainableMan},

{"id": 10, "text": "Harde plastic ‘microbeads’ in je scrub producten komen in de zee en worden opgegeten door vissen. NGOs en consumenten zijn boos. Wat doe je?", 
"answerA": new Answer(10.1, "Je belooft al het plastic uit je cosmetica producten te verwijderen.", 10, -10, 6, 2, 3), 
"answerB": new Answer(10.2, "Je stapt over op vloeibare plastics en claimt dat die minder schadelijk zijn.", -5, 5, 13, 1, 3), 
"answerC": new Answer(10.3, "Ik stuur mijn slimste lobbyisten naar Brussel om de definitie van 'duurzaam plastic' op te rekken.", -10, 10, 0, 0, 3),
"audio": null, "animation": null},

//Home Groen
{"id": 11, "text": "Kans: De Wereldgezondheidsorganisatie kan diarree bij kinderen in Kenia voorkomen met een 'was je handen' campagne. Ga je zeep doneren?", 
"answerA": new Answer(11.2, "Nee, als bedrijf is dit niet mijn taak.", -5, -5, 0, 0, 12), 
"answerB": new Answer(11.1, "Ja, het is een goed doel én het versterkt mijn merk.", 5, 5, 10, 0, 12), 
"answerC": new Answer(11.3, "Natuurlijk. En ik besteed 1 procent van mijn zeepwinst aan extra gezondheidszorg.", 5, -5, 0, 0, 12),
"audio": "audio/children.mp3", "animation": null},

{"id": 12, "text": "India is een veelbelovende markt, maar veel Indiërs kunnen de grote pakken waspoeder nog niet betalen.", 
"answerA": new Answer(12.2, "Ik kom met kleine wegwerpverpakkingen voor een enkele wasbeurt", -10, 10, 15, 2, 3),  
"answerB": new Answer(12.1, "Ik verander niets aan mijn verpakkingen. Dan maar iets minder omzet.", 10, -10, 0, 0, 3),
"answerC": new Answer(12.3, "Losse verpakkingen zijn overbodig. Ik verkoop via hervulbare containers.", 5, -5, 0, 0, 3),
"audio": "audio/india.mp3", "animation": null},


//Eind groen
{"id": 13, "text": "Amnesty International bewijst dat er volop kinderarbeid plaatsvindt op palmolieplantages waar jij inkoopt. Jouw actie:", 
"answerA": new Answer(13.1, "Je spreekt producenten streng toe en organiseert een ronde tafel voor duurzame olie.", -5, 5, 14, 0, 14), 
"answerB": new Answer(13.2, "Je haalt waar mogelijk palmolie uit je producten en start eigen plantages waar alles deugt.", 10, -10, 10, 0, 14), 
"answerC": new Answer(13.3, "Ik respecteer de cultuur van het land: werkende kinderen zijn daar heel normaal.", -5, 5, 0, 0, 14),
"audio": null, "animation": null},

{"id": 14, "text": "Memo van je marketingmanager: de vraag naar luxe ijsjes neemt toe in Nigeria. Pak je die kans?", 
"answerA": new Answer(14.1, "Natuurlijk: iedereen heeft recht op Magnums. Ik bestel alvast 20 duizend extra diepvriezers", -10, 10, 0, 0, 15), 
"answerB": new Answer(14.2, "Ik promoot ‘Jane and jerry’ vruchtenijs op waterbasis; zonder zuivel met lokaal fruit.", 5, 0, 0, 0, 15), 
"answerC": new Answer(14.3, "We bouwen onze ijs-divisie af", 10, -10, 10, 0, 15),
"audio": "audio/duck.mp3", "animation": animateMarketingMan},

{"id": 15, "text": "Greenpeace komt met een rapport over ontbossing door palmolieplantages waar jij inkoopt. Wat doe je?", 
"answerA": new Answer(15.1, "Je haalt palmolie waar mogelijk uit je producten.", 5, -5, 0, 0, 16), 
"answerB": new Answer(15.2, "Je bedankt voor het rapport en stelt een samenwerking voor.", -5, 5, 0, 0, 16), 
"answerC": new Answer(15.2, "Je kaart de kwestie aan bij de volgende vergadering van de Roundtable for Sustainable Palm Oil.", -5, 5, 0, 0, 16),
"audio": "audio/rain_forest.mp3", "animation": null},

{"id": 16, "text": "Al die duurzaamheid is niet goed voor je balans. Je aandeelhouders zijn boos. Wat doe je?", 
"answerA": new Answer(16.1, "Je ontslaat je VP.", 5, -5, 0, 0, 100), 
"answerB": new Answer(16.2, "Je stapt op.", -5, -5, 0, 0, 100), 
"answerC": new Answer(16.3, "Je past je strategie aan. Dan maar minder duurzaam", -10, 10, 0, 0, 100),
"audio": null, "animation": bounceHulpButton},

//Fossiel start
{"id": 17, "text": "Volgens marktonderzoek gaat het niet goed met de reputatie van je bedrijf. Tijd voor nieuwe slogan. Wat wordt het? ", 
"answerA": new Answer(17.1, "We doen ons best, iets beter dan de rest.", -1, 5, 22, 0, 18), 
"answerB": new Answer(17.2, "Deal with it", -1, 5, 22, 0, 18), 
"answerC": new Answer(17.3, "Doe maar lekker duurzaam", -5, 5, 22,0, 18),
"audio": null, "animation": bounceHulpButton},

{"id": 18, "text": "Welke divisie pas je als eerste aan?", 
"answerA": new Answer(18.1, "Voeding", 0, 0, 22, 0, 19), 
"answerB": new Answer(18.2, "Cosmetica en verzorgingsproducten", 0, 0, 22, 0, 20), 
"answerC": new Answer(18.3, "Wasmiddelen en reiniging", 0, 0, 22, 0, 21),
"audio": null, "animation": null},

//Fossiel food
{"id": 19, "text": "De tomatenoogst valt tegen dit jaar. Wat doe je?", 
"answerA":  new Answer(19.1, "Je vliegt tomaten in uit Mexico.", -10, 5, 16, 0, 18), 
"answerB": new Answer(19.2, "Je gebruikt duurzame diepvriestomaten. ", 5, -5, 16, 0, 18), 
"answerC": null,
"audio": null, "animation": null},

//Fossiel cosmetica
{"id": 20, "text": "De EU stelt strengere eisen aan het gebruik van microplastics in cosmetica. Wat doe je?", 
"answerA": new Answer(20.1, "Je stuurt je slimste lobbyisten naar Brussel om de definitie van plastic in de wet op te rekken. ", -5, 10, 17, 0, 18), 
"answerB": new Answer(20.2, "Je vraagt je beste chemici om een plastic-vrije shampoo te creëren.", 10, -10, 17, 0, 18), 
"answerC": null,
"audio": null, "animation": bounceHulpButton},

//Fossiel home
{"id": 21, "text": "Memo van marketing: mensen wassen minder vaak hun handen - jouw zeep wordt minder verkocht. Wat doe je?", 
"answerA": new Answer(21.1, "Je start een campagne over hygiene.", -5, 10, 18, 0, 18), 
"answerB": new Answer(21.2, "Je ontwikkelt een krachtiger wasmiddel dat kleding langer schoon houdt", 5, -10, 18, 0, 18), 
"answerC": null,
"audio": "audio/duck.mp3", "animation": animateMarketingMan},

//Fossiel eind
{"id": 22, "text": "Amnesty International bewijst dat er volop kinderarbeid plaatsvindt op palmolieplantages waar jij inkoopt. Jouw reactie:", 
"answerA": new Answer(22.1, "\'De plantages zijn niet van ons: de Indonesische regering is verantwoordelijk\'", -10, -5, 19, 0, 23), 
"answerB": new Answer(22.2, "\‘De beschuldiging van Amnesty is onbewezen maar we verwelkomen de kritiek\’", -5, 10, 19, 0, 23), 
"answerC": new Answer(22.3, "\‘Alle relaties met beschuldigde plantagehouders worden stopgezet tot tegendeel bewezen is\’",  10, -10, 19, 0, 23),
"audio": null, "animation": bounceHulpButton},

{"id": 23, "text": "\'Palmolie doodt orang-oetans,\’ stelt Greenpeace. Wat doe je?", 
"answerA": new Answer(23.1, "Je verhoogt het budget van je PR-afedeling met 1 miljoen", -5, 5, 22, 0, 100), 
"answerB": new Answer(23.2, "Je verhoogt het budget van je PR-afedeling met 20 miljoen", -5, 10, 22, 0, 100), 
"answerC": new Answer(23.3, "Je sleept Greenpeace voor de rechter", -5, -5, 22, 0, 100),
"audio": "audio/monkey.mp3", "animation": null},

//Duurzaam eind
{"id": 24, "text": "Het gaat zo slecht met je bedrijfsvoering dat een concurrent dreigt met een vijandelijke overname. Wat doe je?", 
"answerA": new Answer(24.1, "Je stapt op.", 0, 0, 20, 0, 100), 
"answerB": new Answer(24.2, "Je start een crowdfunding-campagne om je groene koers door te kunnen zetten.", 10, 5, 20, 0, 25), 
"answerC": null,
"audio": null, "animation": null},

{"id": 25, "text": "De misstanden in de palmoliesector houden aan, het lukt je niet om duurzame palmolie te garanderen. Wat nu?", 
"answerA": new Answer(25.1, "Je verwijdert palmolie uit al je producten", 10, -10, 0, 0, 100), 
"answerB": new Answer(25.2, "Je stapt over op raapzaadolie uit de EU", 1, 0, 0, 0, 100), 
"answerC": null,
"audio": null, "animation": null},

//Tweede optie voor vraag 16:
{"id": 26, "text": "Het gaat goed met je bedrijf, maar de wereld gaat naar de knoppen. Wat doe je?", 
"answerA": new Answer(50.1, "Je houdt je koers vast.", 1, -1, 0, 0, 100), 
"answerB": new Answer(50.2, "Je besluit dat je voor einde van de wereld liever op een strand ligt en stapt op.", 5, -5, 0, 0, 100), 
"answerC": new Answer(50.3, "Je past je strategie aan. Dan maar wat minder winst", 10, -10, 0, 0, 100),
"audio": null, "animation": null}
];



//---------------- GAME LOGIC -------------------------------------------------------------
function findNextQuestion(next_qid, old_qid) {
	
	function handleCategoryFinished(qid) {
		if (homeDone && careDone && foodDone) {
			console.log("earth: " + global_state.earth + "bizz" + global_state.business);
			//calculate points
			if (global_state.earth > 15 && global_state.business <5) {
				//too green
				return 24;
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

	if (next_qid === 0) {
		console.log("wrong gender");

		displayPopup("Fout antwoord!", "Alleen mannen kunnen topmán worden. Probeer het opnieuw.", function () {
			displayQuestion(0);
			document.getElementById('popup').style.display = "none";
		})
	} else if (next_qid === 100 ) {
		goToLoading();
	}else if (next_qid === 16) {
		if (global_state.earth > global_state.business) {
			displayQuestion(next_qid);
		} else {
			displayQuestion(26);
		}
	}else if (next_qid != 3 && next_qid != 18){
		displayQuestion(next_qid);
	} else {
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
	document.getElementById('antw_c').innerHTML = c;
	document.getElementById("antw_c").style.visibility = "visible";
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
		c = questions[id].answerC,
		audio = questions[id].audio,
		animation = questions[id].animation; 
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

	if (audio){
		var file = new Audio(audio);
		file.play();
	}

	if (animation) {
		animation();
	}
};


//---------------------------------- UPDATE STATE ------------------------------------------------
function showFactories(small, middle, big) {
	var kl = small ? "" : "hidden",
		mi = middle ? "" : "hidden",
		gr = big ? "" : "hidden",
		kl_op = small ? 1 : 0;
		mi_op = middle ? 1 :0;
		gr_op = big ? 1 : 0;

	fabriek_kl.animate({opacity: kl_op}, 1000, mina.easeinout, function () {
		fabriek_kl.attr({visibility: kl});
	});

	fabriek_mi.animate({opacity: mi_op}, 1000, mina.easeinout, function () {
		fabriek_mi.attr({visibility: mi});
	});

	fabriek_gr.animate({opacity: gr_op}, 1000, mina.easeinout, function () {
		fabriek_gr.attr({visibility: gr});
	});
}

function showGlobe(number) {
	var bm = (number === 0) ? "" : "hidden",
		vl = (number === 3) ? "" : "hidden",
		wl = ((number === 2) || (number === 3)) ? "" : "hidden",
		bm_op = (number === 0) ? 1 : 0,
		vl_op = (number === 3) ? 1 : 0,
		wl_op = ((number === 2) || (number === 3)) ? 1 : 0;
		
	globe_trees.animate({opacity: bm_op}, 1000, mina.easeinout, function () {
		globe_trees.attr({visibility: bm});
	});

	globe_clouds.animate({opacity: wl_op}, 1000, mina.easeinout, function () {
		globe_clouds.attr({visibility: wl});
	});
	
	globe_flames.animate({opacity: vl_op}, 1000, mina.easeinout, function () {
		globe_flames.attr({visibility: vl});
	});
}

function colorGlobe(number) {
	var blue = ["#5181A9", "#5181a9", "#4D7184", "#485A68"][number],
	earth = ["#54bb6c", "#ead7b7", "#D2C0A7", "#8A7570"][number];

	globe_bg.animate({fill: earth}, 2000, mina.easeinout, null);
	globe_water.animate({fill: blue}, 2000, mina.easeinout, null);
}

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
  states[answer.delay] = state;
  updateState();
}


function updateState(){
	function updateNewsBanner(state) {
		var banner = " BREAKING NEWS -- ";
		if (current_state.news_ids.length > 1) {
			oldNews = banner + newsArray[current_state.news_ids[1]].text;

			newsText.select("text[id='txt1']").attr({"text": oldNews});
			newsText.select("text[id='txt2']").attr({"text": banner + newsArray[current_state.news_ids[0]].text});

		} else if (current_state.news_ids.length > 0) {
			var new_str = banner + newsArray[current_state.news_ids[0]].text;
			newsText.select("text[id='txt1']").attr({"text": oldNews});
			newsText.select("text[id='txt2']").attr({"text": new_str});
			oldNews = new_str;
		}
	}

	function updateGlobe(points) {
		var old_state = earth_state;


		
		console.log("globe points" + points);
		if (points > 18) {
			showGlobe(0);
			colorGlobe(0);
			earth_state = 1;

		} else if (points > 13) {
			showGlobe(1);
			colorGlobe(0);
			earth_state = 2;

		} else if (points > 8){
			showGlobe(1);
			colorGlobe(1);
			earth_state = 3;
		}

		else if (points > 3) {
			showGlobe(2);
			colorGlobe(1);
			earth_state = 4;
		}

		else if (points > -1) {
			showGlobe(2);
			colorGlobe(2);
			earth_state = 5;

		} else {
			showGlobe(3);
			colorGlobe(3);
			earth_state = 6;
		}
	}

	function updateBusiness(points) {
		var old_state = business_state;
		
		if (points > 9) {
			showFactories(true, true, true);
			business_state = 1;

		} else if (points < 4) {
			showFactories(true, false, false);
			business_state = 3;
		} else {
			showFactories(true, true, false);
			business_state = 2;
		}

		if (business_state != old_state) {
			//play sound
		}
	}

	function flickerPlanks(earth, business){
		var earth_color = (earth >= 0) ? "#63a563" : "#9e1d14",
			business_color = (business >= 0) ? "#63a563" : "#9e1d14";

		plank_globe.animate({fill: earth_color}, 1500, mina.easein, function () {
			plank_globe.animate({fill: plank_color}, 1000, mina.easeout, null);
		});

		plank_fabriek.animate({fill: business_color}, 1500, mina.easein, function () {
			plank_fabriek.animate({fill: plank_color}, 1000, mina.easeout, null);
		});
	}
	
	var current_state = states.shift();
	if (current_state !=  null) {
		global_state.earth += current_state.earth;
		global_state.business += current_state.business;
		updateBusiness(global_state.business);
		updateGlobe(global_state.earth);
		flickerPlanks(current_state.earth, current_state.business);

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
	bg = s.select("rect[id='achtergrond']");

	var anim2 = function () {bg.animate({fill: "white"}, 10000, mina.easeinout, anim3)};
	var anim1 = function () {bg.animate({fill: "lemonchiffon", filter: Snap("#glow")}, 200, mina.easeinout, anim2)};
	var anim3 = function () {bg.animate({fill: "orange", filter: Snap("#glow")}, 200, mina.easeinout, anim1)};
	anim3();
};


function setUp(){
	setElementAboveScreen(d);
	setElementAboveScreen(m);
	setElementAboveScreen(r);

	help.mouseover(animateHelpButton,resetSVG);
	koffer.drag();
	newsText.select("text[id='txt1']").attr({"font-style": "bold", "color": "red"});
	newsText.select("text[id='txt2']").attr({"font-style": "bold", "color": "red"});
	
	oldNews = "BREAKING NEWS -- Unilever op zoek naar nieuwe topman!"
	newsText.select("text[id='txt1']").attr({"text": oldNews});
	newsText.select("text[id='txt2']").attr({"text": oldNews});

	showFactories(true, true, false);
	showGlobe(2);
	colorGlobe(1);

	function changeBackgroundColor(newColor, oldColor, surface) {
		surface.animate({fill: newColor}, 200, mina.easeinout, function() {
			surface.animate({fill: oldColor}, 200, mina.easeinout, null);
		});
	};
	
	help.node.onclick = function () {
		animateMoveDown(r);
		var voicemail = new Audio("audio/voicemail.mp3");
		voicemail.play();
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
		midMatrix.translate(-1000, 0);

		newsText.stop();
		newsText.animate({opacity: 0.7, transform: midMatrix}, 10000, mina.linear, function () {
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

function animateMoveDown(elem){
	var startMatrix = new Snap.Matrix(),
		endMatrix = new Snap.Matrix();
		startMatrix.translate(-100, -600);
		endMatrix.translate(-100, -600);
		startMatrix.translate(150, 500);

	elem.stop();
	elem.attr({opacity: 0.5});
	elem.animate({transform: startMatrix, opacity: 1}, 1800, mina.bounce, function () {
		elem.animate({transform: endMatrix}, 4000, mina.easeout, function () {
			elem.animate({opacity: 0}, 1, mina.easeinout, null);
		});
	});	
}

function gameOver() {
	displayPopup("Game Over", 
		"Terwijl jij zat te treuzelen is de wereld allang vergaan. Probeer het nog een keer!", function (){
			document.getElementById('popup').style.display = "none";
			restartGame();
		});
}

function animateMarketingMan() {
	animateMoveDown(m);
}

function animateSustainableMan() {
	animateMoveDown(d);
}


function displayPopup(title, text, action) {
	var _title = document.getElementById('popup-title'),
		popup = document.getElementById('popup'),
		_text = document.getElementById('popup-text');

		console.log(popup);
	_title.innerHTML = title;
	_text.innerHTML = text;

	document.getElementById("popup-button").onclick = function() { 
            action();
        };
	popup.style.display = "block";

}

function setElementAboveScreen(elem) {
	var matrix = new Snap.Matrix();
	matrix.translate(-100, -600);
	elem.transform(matrix);
	elem.attr({opacity: 0});
}

function bounceHulpButton() {
	var startMatrix = new Snap.Matrix(),
		midMatrix = new Snap.Matrix(),
		endMatrix = new Snap.Matrix();
		endMatrix.translate(0, 0);
		startMatrix.translate(0, -5);
		midMatrix.translate(0, 5);

	help.stop();
	help.animate({transform: startMatrix}, 1000, mina.bounce, function () {
		help.animate({transform: midMatrix}, 1000, mina.bounce, function () {
			help.animate({transform: endMatrix}, 1000, mina.bounce, null);
		});
	});	
}

//------------------------------------TIMER------------------------------------------
function restartGame() {
	global_state = new State(5, 5, []),
 	states = [],
 	selected_question = 0,
 	foodDone = false,
 	homeDone = false,
 	careDone = false,
 	earth_state = 4,
 	business_state = 2;

 	setUp();
}

//-------------------------------------------GOTO-------------------------------------------
function goToLoading() {
	if (global_state.earth > 15) {
		window.location.href = "appelboer.html";
	} else if (global_state.earth > 10 && global_state.business > 5){
		window.location.href = "duurzaam.html";
	} else if (global_state.earth > 5 && global_state.business > 8) {
		window.location.href = "reputatie.html";
	} else {
		window.location.href = "speel_op_zeker.html";
	}
}

setUp();
animateClouds();
breakNews();