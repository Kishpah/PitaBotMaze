//Cargar todos los ficheros del juego
var loader = {
	loaded: true,
	loadedCount: 0, // Assets that have been loaded so far
	totalCount: 0, // Total number of assets that need loading
	
	loadImage: function(url) {
		this.loaded = false;
		this.totalCount++;
		var image = new Image();
		image.addEventListener("load", loader.itemLoaded, false);
		image.src = url;
		return image;
	},

	loadSound: function(url) {
		this.loaded = false;
		this.totalCount++;
		var audio = new Audio();
		audio.addEventListener("canplaythrough", loader.itemLoaded, false);
		audio.src = url;
		return audio;
	},
	
	/*loadJSON: function(url) {
		this.loaded = false;
		this.totalCount++;
		var stringJSON;
		const request = new XMLHttpRequest();
		request.open('GET', url);
		request.responseType = 'json';
		request.send();
		request.addEventListener("load", loader.itemLoaded, false);
	},*/
	
	itemLoaded: function(ev) {
		// Stop listening for event type (load or canplaythrough) for this item now that it has been loaded
		ev.target.removeEventListener(ev.type, loader.itemLoaded, false);
		loader.loadedCount++;
		if (loader.loadedCount === loader.totalCount) {
			// Loader has loaded completely..
			// Reset and clear the loader
			loader.loaded = true;
			loader.loadedCount = 0;
			loader.totalCount = 0;
			if (loader.onload) {
				loader.onload();
				loader.onload = undefined;
			}
		}
	}
};

var iniciarJuego = function(){
	var juego = new Juego(0.1, 0.1, 0.02, 0.05, 0.1, 1, 0.4, datosTableros);
	juego.init();
	juego.inicio();
};

//Sonidos
var sndBuzz = loader.loadSound('snd/Buzz.ogg');
var sndMillo = loader.loadSound('snd/Pio.ogg');

//Imágenes

//Iniciar el juego una vez cargado todo
loader.onload = iniciarJuego
