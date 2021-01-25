function Modelos()
{
	this.pitaBot = function(tamPitaBot)
	{
		var geo = new THREE.BoxGeometry(1,1,1);
		var mat = new THREE.MeshPhongMaterial( { color: 0x222222 } );
		var modelo = new THREE.Mesh( geo, mat );		

		geo = new THREE.BoxGeometry(0.4,0.4,0.4);
		mat = new THREE.MeshPhongMaterial( { color: 0xffff00 } );
		var pico = new THREE.Mesh(geo, mat);
		pico.rotation.y = -Math.PI/4+0.2;
		pico.rotation.z = Math.PI/4;
		pico.position.x = 0.4;
		pico.position.z = -0.1;
		
		modelo.add(pico);
		
		geo = new THREE.BoxGeometry(0.2,0.2,0.2);
		mat = new THREE.MeshPhongMaterial( { color: 0xffffff } );
		var ojo = new THREE.Mesh(geo, mat);
		ojo.position.x = 0.45;
		ojo.position.z = 0.2;
		ojo.position.y = 0.2;
		
		modelo.add(ojo);
		
		ojo = new THREE.Mesh(geo, mat);
		ojo.position.x = 0.45;
		ojo.position.z = 0.2;
		ojo.position.y = -0.2;

		modelo.add(ojo);
		
		geo = new THREE.BoxGeometry(0.1,0.1,0.1);
		mat = new THREE.MeshPhongMaterial( { color: 0x111111 } );
		var pupila = new THREE.Mesh(geo, mat);
		pupila.position.x = 0.55;
		pupila.position.z = 0.2;
		pupila.position.y = 0.2;
		
		modelo.add(pupila);
		
		pupila = new THREE.Mesh(geo, mat);
		pupila.position.x = 0.55;
		pupila.position.z = 0.2;
		pupila.position.y = -0.2;

		modelo.add(pupila);
		
		geo = new THREE.BoxGeometry(0.2,0.2,0.4);
		mat = new THREE.MeshPhongMaterial( { color: 0x222222 } );
		var pata = new THREE.Mesh(geo, mat);
		pata.position.z = -0.65;
		pata.position.y = 0.2;
		modelo.add(pata);
		
		var pata = new THREE.Mesh(geo, mat);
		pata.position.z = -0.65;
		pata.position.y = -0.2;
		modelo.add(pata);
		
		geo = new THREE.BoxGeometry(0.7,0.7,0.2);
		mat = new THREE.MeshPhongMaterial( { color: 0x222222 } );
		var pies = new THREE.Mesh(geo, mat);
		pies.position.z = -0.9;
		modelo.add(pies);

		geo = new THREE.BoxGeometry(0.7,0.2,0.4);
		mat = new THREE.MeshPhongMaterial( { color: 0xaa6644 } );
		var ala = new THREE.Mesh(geo, mat);
		ala.position.z = -0.1;
		ala.position.y = 0.6;
		ala.rotation.x = 0.3;
		modelo.add(ala);

		ala = new THREE.Mesh(geo, mat);
		ala.position.z = -0.1;
		ala.position.y = -0.6;
		ala.rotation.x = -0.3;
		modelo.add(ala);

		geo = new THREE.BoxGeometry(0.7,0.2,0.4);
		mat = new THREE.MeshPhongMaterial( { color: 0xaa3322 } );
		var cresta = new THREE.Mesh(geo, mat);
		cresta.position.z = 0.6;
		modelo.add(cresta);
		
		modelo.scale.x = tamPitaBot;
		modelo.scale.y = tamPitaBot;
		modelo.scale.z = tamPitaBot;
		
		return modelo;
	};

	this.millo = function ()
	{
		var geo = new THREE.BoxGeometry(0.3,0.3,0.3);
		var mat = new THREE.MeshPhongMaterial( { color : 0xffff00 } );
		var modelo = new THREE.Mesh(geo, mat);
		modelo.rotation.x = Math.PI/4;
		modelo.rotation.y = Math.PI/4;
		return modelo;
	};
	
	this.SplashScreen = function()
	{
		var geo = new THREE.BoxGeometry(8,4,0.5);
		var mat = new THREE.MeshPhongMaterial({color:0xaaaaaa});
		var modelo = new THREE.Mesh(geo, mat);
		return modelo;
	};
}