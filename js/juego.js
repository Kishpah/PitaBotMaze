function Juego(topeGiroX, topeGiroY, pasoIda, pasoVuelta, vibracion, proporcionMovimiento, tamPitaBot, datosTableros){
	var self = this;
	
	//Variables de estado del juego
	self.teclaDer = false;
	self.teclaIzq = false; 
	self.teclaArr = false; 
	self.teclaAb = false; 
	self.teclaEspacio = false; //Aquí guardamos qué teclas están pulsadas
	self.giroX = 0;
	self.giroY = 0; 
	self.posPita = 0.0; 
	self.coordPita = 0.0;
	self.cogerMaiz = false; 
	self.finJuego = false; //Para indicar si hemos cogido maíz o no
	self.sonidoMillo = false;
	self.nivel=0;
	self.estado='Esperando';
	self.animacion = 0;
	
	//Objetos necesarios
	self.tablero = new Object();
	self.pitaBot = new Object();
	self.scene = new Object();
	self.camera = new Object();
	
	//Parámetros configurables
	self.topeGiroX = topeGiroX;
	self.topeGiroY = topeGiroY; //rotación actual de la base, y máximo que permitiremos rotar
	self.pasoIda = pasoIda;
	self.pasoVuelta = pasoVuelta; //velocidad de rotación cuando se pulsa una tecla, y velocidad de vuelta a la posición inicial
	self.vibracion = vibracion; //Posición y Movimiento del PitaBot
	self.proporcionMovimiento = proporcionMovimiento; //Cuánto se mueve el PitaBot según la inclinación del tablero
	self.tamPitaBot = tamPitaBot; //Tamaño del PitaBot
	self.datosTableros = datosTableros;
	self.distanciaCamara = 10;
	
	self.init = function() {
		self.teclaDer = false;
		self.teclaIzq = false;
		self.teclaArr = false;
		self.teclaAb = false;
		self.giroX = 0;
		self.giroY = 0;
		self.posPita = {x:0,y:0};
		self.coordPita = {x:0,y:0,x:0};
		self.cogerMaiz = false;
		self.finJuego = false;
		self.sonidoMillo = false;		
		self.nivel = -1;
		self.estado='Esperando';
	};
	
	self.ComprobarEstadoYMoverPitaBot = function(){
		//Revisamos las teclas pulsadas
		//Si hay alguna tecla pulsada, giramos el tablero, sin llegar al tope
		if(self.teclaArr&&Math.abs(self.giroX)<self.topeGiroX) { self.giroX-=self.pasoIda }
		if(self.teclaAb&&Math.abs(self.giroX)<self.topeGiroX) { self.giroX+=self.pasoIda }
		if(self.teclaIzq&&Math.abs(self.giroY)<self.topeGiroY) { self.giroY-=self.pasoIda }
		if(self.teclaDer&&Math.abs(self.giroY)<self.topeGiroY) { self.giroY+=self.pasoIda }
		//En caso contrario movemos el tablero hasta dejarlo horizontal de nuevo
		if(!(self.teclaArr||self.teclaAb)) {
			if(self.giroX!=0){
				if(Math.abs(self.giroX)<self.pasoVuelta){self.giroX=0;}
				else{if(self.giroX>0){self.giroX-=self.pasoVuelta}else{self.giroX+=self.pasoVuelta}}
			}
		}
		if(!(self.teclaDer||self.teclaIzq)) {
			if(self.giroY!=0){
				if(Math.abs(self.giroY)<self.pasoVuelta){self.giroY=0;}
				else{if(self.giroY>0){self.giroY-=self.pasoVuelta}else{self.giroY+=self.pasoVuelta}}
			}
		}

		//Calculamos el movimiento del PitaBot, proporcional a la inclinación del tablero
		var movPitaX = self.giroY*self.proporcionMovimiento;
		var movPitaY = -self.giroX*self.proporcionMovimiento;
		//El PitaBot está vibrando, así que siempre se mueve una pequeña cantidad al azar.
		movPitaX+=Math.random()*self.vibracion-self.vibracion/2;
		movPitaY+=Math.random()*self.vibracion-self.vibracion/2;
		
		//Comprobamos si el movimiento va a hacernos chocar contra una pared
		var chocarX=false;
		var chocarY=false;
		self.cogerMaiz=false;
		
		switch(self.tablero.comprobarCasilla(self.posPita.x, self.posPita.y, movPitaX, 0)){
			case 1: chocarX = true; break;
			case 3: self.cogerMaiz = true; break;
		}
		switch(self.tablero.comprobarCasilla(self.posPita.x, self.posPita.y, 0, movPitaY)){
			case 1: chocarY = true; break;
			case 3: self.cogerMaiz = true; break;
		}
		switch(self.tablero.comprobarCasilla(self.posPita.x, self.posPita.y, movPitaX, movPitaY)){
			//case 1: chocarX = true; chocarY = true; break;
			case 3: self.cogerMaiz = true; break
		}
		
		//Si no chocamos, movemos el PitaBot lo indicado
		if(!chocarX){
			self.posPita.x+=movPitaX;
		}
		if(!chocarY){
			self.posPita.y+=movPitaY;
		}
		
		if(self.cogerMaiz&&!self.finJuego){
			if(!self.sonidoMillo){
				self.sonidoMillo = true;
				sndMillo.play();
			}
			
			self.millo.scale.x*=1.3;
			self.millo.scale.y*=1.3;
			self.millo.scale.z*=1.3;
			if(self.millo.scale.x>20){
				self.finJuego=true;
				sndBuzz.pause();
				self.scene.remove(self.millo);
				self.estado='FadeOut';
			};
		}
		
		self.pitaBot.rotation.z+=Math.random()*self.vibracion-self.vibracion/2;
		self.coordPita = self.tablero.posicionACoordenadas(self.posPita)
		self.pitaBot.position.x=self.coordPita.x;
		self.pitaBot.position.y=self.coordPita.y;
		
		self.millo.rotation.x +=0.02;
		self.millo.rotation.y +=0.02;
		self.millo.rotation.z +=0.02;
		
		self.scene.rotation.x = self.giroX;
		self.scene.rotation.y = self.giroY;

	};
	
	self.FadeIn = function() {
		var numFrames = 40;
		
		self.camera.rotation.y = ((numFrames-self.animacion)/numFrames)*Math.PI/2;
		self.camera.position.z = self.distanciaCamara*5-4*self.distanciaCamara*self.animacion/numFrames;
		self.animacion++;
		if(self.animacion == numFrames+1){
			self.animacion = 0;
			if(self.nivel!=-1){
				sndBuzz.play();
			};
			self.estado = 'Jugando';
		};
	};
	
	self.FadeOut = function () {
		var numFrames = 40;
		self.camera.rotation.y = (-self.animacion/numFrames)*Math.PI/2;
		self.camera.position.z = self.distanciaCamara+4*self.distanciaCamara*self.animacion/numFrames;
		self.animacion++;
		if(self.animacion == numFrames+1){
			self.animacion = 0;
			self.nivel++;
			self.estado = 'CargarNivel';
		};
	};
	
	self.VaciarNivel = function() {
		self.scene.remove(self.modeloSplashScreen);
		self.scene.remove(self.millo);
		self.scene.remove(self.pitaBot);
		self.scene.remove(self.modeloTablero);
	};
	
	self.CargarNivel = function() {
		//Creamos nuestro PitaBot
		self.pitaBot = self.modelos.pitaBot(tamPitaBot);
			
		//Creamos el maíz
		self.millo = self.modelos.millo();
		self.millo.scale.x = 1;
		self.millo.scale.y = 1;
		self.millo.scale.z = 1;
		
		//Creamos el tablero
		self.tablero = new Tablero(datosTableros[self.nivel].tamX, datosTableros[self.nivel].tamY, datosTableros[self.nivel].distanciaCamara, datosTableros[self.nivel].datos, self.tamPitaBot);
		self.distanciaCamara = datosTableros[self.nivel].distanciaCamara;
		
		//Añadimos el tablero a la escena
		self.modeloTablero = self.tablero.modelo();
		self.scene.add(self.modeloTablero);

		//Obtenemos la posición inicial del PitaBot y lo añadimos a la escena
		self.posPita = self.tablero.posicionPitaBot();
		self.coordPita = self.tablero.posicionACoordenadas(self.posPita);
		self.pitaBot.position.x = self.coordPita.x;
		self.pitaBot.position.y = self.coordPita.y;
		self.pitaBot.position.z = self.coordPita.z;
		self.scene.add(self.pitaBot);

		//Obtenemos la posición inicial del maíz y lo añadimos a la escena
		var posMillo = self.tablero.posicionACoordenadas(self.tablero.posicionMillo());
		self.millo.position.x = posMillo.x;
		self.millo.position.y = posMillo.y;
		self.millo.position.z = posMillo.z;
		self.scene.add(self.millo);

		//Separamos la cámara lo suficiente como para ver todo el tablero
		self.camera.position.z = self.tablero.distanciaCamara;
		
		self.cogerMaiz = false;
		self.finJuego = false;
		self.sonidoMillo = false;
	};
	
	self.CargarSplashScreen = function() {
		//Cargamos la pantalla de inicio
		self.modeloSplashScreen = self.modelos.SplashScreen();
		self.scene.add(self.modeloSplashScreen);
		self.camera.position.z = self.distanciaCamara;
	};
	
	self.Esperando = function() {
		//Esperamos a que se pulse una tecla
		if(self.teclaPulsada) {
			self.teclaPulsada = false;
			self.estado = 'FadeOut';
		};
	};
	self.CargarSiguienteNivel = function () {
		console.log(self.nivel + ' ' + self.datosTableros.length);
		self.VaciarNivel();
		if(self.nivel>self.datosTableros.length-1){
			self.nivel = -1;
			self.estado='GameOver'
		}
		else{
			self.CargarNivel();
			self.estado='FadeIn';
		};
	};
	
	self.animate = function () {
		requestAnimationFrame(self.animate);
		
		switch(self.estado){
			case 'Esperando': self.Esperando(); break; // Esperamos a que pulsen espacio para empezar el nivel
			case 'CargarNivel':self.CargarSiguienteNivel(); break; // Cargamos el nivel
			case 'FadeIn': self.FadeIn(); break; // Creamos la nueva escena y la metemos en pantalla
			case 'Jugando': self.ComprobarEstadoYMoverPitaBot(); break; // Movemos el PitaBot por el tablero hasta que el jugador consigue el maíz
			case 'FadeOut': self.FadeOut(); break; // Sacamos el laberinto de pantalla y borramos la escena
			case 'GameOver': break; // Paramos el juego
		}

		self.renderer.render(self.scene, self.camera);
	};

	self.keyDown = function(e) {
		switch(e.key) {
			case 'ArrowUp': self.teclaArr=true; break;
			case 'ArrowDown': self.teclaAb=true; break;
			case 'ArrowLeft': self.teclaIzq=true; break;
			case 'ArrowRight': self.teclaDer=true; break;
			case ' ': self.teclaEspacio=true; break;
		}
	};

	self.keyUp = function(e) {
		switch(e.key) {
			case 'ArrowUp': self.teclaArr=false; break;
			case 'ArrowDown': self.teclaAb=false; break;
			case 'ArrowLeft': self.teclaIzq=false; break;
			case 'ArrowRight': self.teclaDer=false; break;
			case ' ': self.teclaEspacio=false; break;
		}
		if(self.estado=='Esperando') {
			self.teclaPulsada = true;
		};
	};

	self.onWindowResize = function() {
		self.camera.aspect = window.innerWidth/window.innerHeight;
		self.camera.updateProjectionMatrix();
		self.renderer.setSize(window.innerWidth, window.innerHeight);
		self.renderer.render(self.scene, camera);
	};

	self.inicio = function() {		
		//Escena
		self.scene = new THREE.Scene();
		self.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

		self.renderer = new THREE.WebGLRenderer();
		self.renderer.setSize(window.innerWidth, window.innerHeight);
		document.body.appendChild(self.renderer.domElement);

		//Sonidos
		sndBuzz.volume = 0.5;
		sndBuzz.addEventListener('timeupdate', function(){ //Hay que hacer esta historia para que suene continuamente sin saltos
			var buffer = 0.44
			if(this.currentTime > this.duration - buffer){
				this.currentTime = 0
				this.play()
			}
		});

		// Luz ambiente para la escena
		var light = new THREE.AmbientLight(0x404040); // soft white light
		self.scene.add(light);
		// Luz direccional para darle chicha
		var directionalLight = new THREE.DirectionalLight(0xffffff);
		directionalLight.position.set(1, 2, 3).normalize();
		self.scene.add(directionalLight);

		self.modelos = new Modelos();

		//self.CargarNivel();
		self.CargarSplashScreen();
		
		// Comprobación del teclado (marcamos las variables que indican si las teclas están pulsadas o no)
		document.body.addEventListener('keydown', self.keyDown, false);
		document.body.addEventListener('keyup', self.keyUp, false);
		// Reescalamos si se cambia el tamaño de la ventana.
		window.addEventListener('resize', self.onWindowResize, false);

		self.animate();
	};
}