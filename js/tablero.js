function Tablero(tamX, tamY, distanciaCamara, datosTablero, tamPitaBot)
{
	this.tamX = tamX;
	this.tamY = tamY;
	this.distanciaCamara = distanciaCamara;
	this.datos = datosTablero;
	this.tamPitaBot = tamPitaBot;
	
	this.modelo = function()
	{
		var i,j;
		var geometry = new THREE.BoxGeometry(this.tamX,this.tamY,1);
		var materialSuelo = new THREE.MeshPhongMaterial( { color: 0xaaaaaa } );
		var materialMuro = new THREE.MeshPhongMaterial({color: 0xaa6633});
		var modelo = new THREE.Mesh(geometry, materialSuelo);

		geometry = new THREE.BoxGeometry(1,1,1);
		
		for(i=0; i<this.tamX; i++){
			for(j=0; j<this.tamY; j++){
				//console.log(i+','+j+' '+datosTablero[i+(this.tamY-1-j)*this.tamX]+' '+(i+(this.tamY-1-j)*this.tamX));
				switch(datosTablero[i+(this.tamY-1-j)*this.tamX]){
					case 1:
					case 4:
						var muro = new THREE.Mesh(geometry, materialMuro);
						var coord = this.posicionACoordenadas({x:i,y:j});
						muro.position.z=1;
						muro.position.y=coord.y+0.5;
						muro.position.x=coord.x+0.5;
						modelo.add(muro);
						break;
				}
			}
		}
		return modelo;		
	};

	this.posicionPitaBot = function()
	{
		var i, j;
		var pos = new Object();
		for(i=0; i<this.tamX; i++){
			for(j=0; j<tamY; j++){
				if(this.datos[i+(this.tamY-1-j)*this.tamX] == 2)
				{
					pos.x = i+0.5;
					pos.y = j+0.5;
				}
			}
		}	
		return pos;
	};

	this.posicionMillo = function()
	{
		var i, j;
		var pos = new Object();
		for(i=0; i<this.tamX; i++){
			for(j=0; j<tamY; j++){
				if(this.datos[i+(this.tamY-1-j)*this.tamX] == 3)
				{	
					pos.x = i+0.5;
					pos.y = j+0.5;
				}
			}
		}	
		return pos;
	};
	
	this.posicionACoordenadas = function(posicion)
	{
		var coordenadas = new Object();
		coordenadas.x = posicion.x-this.tamX/2;
		coordenadas.y = posicion.y-this.tamY/2;
		coordenadas.z = 1;

		return coordenadas;
	};
	
	this.devuelveValorCasilla = function(posicionX, posicionY)
	{
		posX=posicionX;
		posY=this.tamY-posicionY-1;
		//console.log(posX + ', ' + posY + ':(' + (posX+posY*this.tamX) + ') ' + this.datos[posX+posY*this.tamX]);
		return this.datos[posX+(posY)*this.tamX]
	};

	this.comprobarCasilla = function(posicionX, posicionY, movimientoX, movimientoY) {
		var cmpX, cmpY, valorCasilla, ret;
		ret = 0;
		
		//Comprobamos cada una de las cuatro esquinas del PitaBot
		cmpX=posicionX+movimientoX+this.tamPitaBot/2;
		cmpY=posicionY+movimientoY+this.tamPitaBot/2;
		valorCasilla = this.devuelveValorCasilla(Math.floor(cmpX), Math.floor(cmpY));
		if(valorCasilla!=0&&ret!=1) { ret = valorCasilla; };
		cmpX=posicionX+movimientoX+this.tamPitaBot/2;
		cmpY=posicionY+movimientoY-this.tamPitaBot/2;
		valorCasilla = this.devuelveValorCasilla(Math.floor(cmpX), Math.floor(cmpY));
		if(valorCasilla!=0&&ret!=1) { ret = valorCasilla; };
		cmpX=posicionX+movimientoX-this.tamPitaBot/2;
		cmpY=posicionY+movimientoY-this.tamPitaBot/2;
		valorCasilla = this.devuelveValorCasilla(Math.floor(cmpX), Math.floor(cmpY));
		if(valorCasilla!=0&&ret!=1) { ret = valorCasilla; };
		cmpX=posicionX+movimientoX-this.tamPitaBot/2;
		cmpY=posicionY+movimientoY+this.tamPitaBot/2;
		valorCasilla = this.devuelveValorCasilla(Math.floor(cmpX), Math.floor(cmpY));
		if(valorCasilla!=0&&ret!=1) { ret = valorCasilla; };
		
		//console.log(posicionX + ','+posicionY+' '+movimientoX+','+movimientoY+' '+ret);
		return ret;
	};
};

