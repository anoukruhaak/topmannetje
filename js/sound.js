bg_sound = new Audio('./audio/bg-sound.wav');
bg_sound.volume = 0.3;
bg_sound.addEventListener('ended', function() {
	    this.currentTime = 0;
	    this.play();
	}, false);
bg_sound.play();
