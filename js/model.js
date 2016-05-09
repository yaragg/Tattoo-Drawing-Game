var model = function(game){
    var scene;
    var camera;
    var mesh;
    var save;
};

model.prototype = {

    preload: function() {
        save = GetSave();
    },

    dispose: function() {
        scene = null;
        camera = null;
        mesh = null;
        save = null;
    },

    create: function(){

        var style = { font: "48px Arial", fill: "rgb(47, 63, 129)", align: "center"};

        //var text = this.game.add.text(this.game.world.centerX, this.game.world.centerY-70, "Background", style);
        //text.anchor.set(0.5);

        var texture = new PIXI.Texture(modelTexture);
        this.game.add.sprite(0, 0, texture);
        
        var tex = this.game.cache.getImage('texture');
        var canvas = this.game.make.bitmapData(1024, 1024);
        canvas.draw(tex, 0,0);
        var tats = [];
        for (var i = 0; i < save.levels.length; i++){
            tats.push(this.game.make.sprite(0,0, save.levels[i].file));
          
            switch (i){
              case 0: 
                tats[i].scale.set(0.1);
                tats[i].anchor.set(0.5);
                canvas.draw(tats[i], 585, 735);
                break;
              case 1: 
                tats[i].scale.setTo(0.05);
                tats[i].anchor.set(0.5);
                canvas.draw(tats[i], 290, 700);
                break;
              case 2: 
                tats[i].scale.setTo(0.05);
                tats[i].anchor.set(0.5);
                canvas.draw(tats[i], 585, 680);
                break;
              case 3: // TODO: place / size tattoos from her down
                tats[i].scale.setTo(0.05);
                tats[i].anchor.set(0.5);
                canvas.draw(tats[i], 290, 700);
                break;
              case 4: 
                tats[i].scale.setTo(0.05);
                tats[i].anchor.set(0.5);
                canvas.draw(tats[i], 585, 735);
                break;
              case 5: 
                tats[i].scale.setTo(0.05);
                tats[i].anchor.set(0.5);
                canvas.draw(tats[i], 290, 700);
                break;
              case 6: 
                tats[i].scale.setTo(0.05);
                tats[i].anchor.set(0.5);
                canvas.draw(tats[i], 585, 735);
                break;
              case 7:
                tats[i].scale.setTo(0.05);
                tats[i].anchor.set(0.5);
                canvas.draw(tats[i], 290, 700);
                break;
              case 8: 
                tats[i].scale.setTo(0.05);
                tats[i].anchor.set(0.5);
                canvas.draw(tats[i], 585, 735);
                break;
              case 9: 
                tats[i].scale.setTo(0.05);
                tats[i].anchor.set(0.5);
                canvas.draw(tats[i], 290, 700);
                break;
              case 9: 
                tats[i].scale.setTo(0.05);
                tats[i].anchor.set(0.5);
                canvas.draw(tats[i], 585, 735);
                break;
              case 10: 
                tats[i].scale.setTo(0.05);
                tats[i].anchor.set(0.5);
                canvas.draw(tats[i], 290, 700);
                break;
              case 11: 
                tats[i].scale.setTo(0.05);
                tats[i].anchor.set(0.5);
                canvas.draw(tats[i], 585, 735);
                break;
              case 12: 
                tats[i].scale.setTo(0.05);
                tats[i].anchor.set(0.5);
                canvas.draw(tats[i], 290, 700);
                break;
              case 13: 
                tats[i].scale.setTo(0.05);
                tats[i].anchor.set(0.5);
                canvas.draw(tats[i], 585, 735);
                break;
              case 14: 
                tats[i].scale.setTo(0.05);
                tats[i].anchor.set(0.5);
                canvas.draw(tats[i], 290, 700);
                break;
            }
        }
     
        /*for (i = 0; i < save.levels.length; i++){
          switch (i){
              case 0: canvas.draw(tats[i], 585, 735);
                tats[i].scale.set(0.1);
                tats[i].anchor.set(0.5);
                break;
              case 1: canvas.draw(tats[i], 290, 700);
                break;
              case 2: canvas.draw(tats[i], 585, 680);
                tats[i].scale.setTo(0.05);
                tats[i].anchor.set(0.5);
                //tats[i] = curTat;
                break;
              case 3: canvas.draw(tats[i], 290, 700);
                break;
              case 4: canvas.draw(tats[i], 585, 735);
                break;
              case 5: canvas.draw(tats[i], 290, 700);
                break;
              case 6: canvas.draw(tats[i], 585, 735);
                break;
              case 7: canvas.draw(tats[i], 290, 700);
                break;
              case 8: canvas.draw(tats[i], 585, 735);
                break;
              case 9: canvas.draw(tats[i], 290, 700);
                break;
              case 9: canvas.draw(tats[i], 585, 735);
                break;
              case 10: canvas.draw(tats[i], 290, 700);
                break;
              case 11: canvas.draw(tats[i], 585, 735);
                break;
              case 12: canvas.draw(tats[i], 290, 700);
                break;
              case 13: canvas.draw(tats[i], 585, 735);
                break;
              case 14: canvas.draw(tats[i], 290, 700);
                break;
            }
        }*/

        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(75
            , 800/600
            , 0.1, 1000);

        camera.position.y = 2;
        camera.position.z = 5;
        camera.lookAt(new THREE.Vector3(0, 0, 0));
        
        mesh = null;
        var mtlLoader = new THREE.MTLLoader();
        mtlLoader.setBaseUrl( 'assets/' );
        mtlLoader.setPath( 'assets/' );
        mtlLoader.load( 'Model_Final_01_SM.mtl', function( materials ) {
            materials.preload();
            var objLoader = new THREE.OBJLoader();
            objLoader.setMaterials( materials );
            objLoader.setPath('assets/');
            objLoader.load( 'Model_Final_01_SM.obj', function ( object ) {
                object.position.y = 2.2;
                scene.add( object );
                mesh = object;
                mesh.children[0].material.color = new THREE.Color(0xFFFFFF);
                mesh.children[0].material.map.image = canvas.canvas;
                mesh.children[0].material.map.needsUpdate = true;
                mesh.children[0].geometry.computeFaceNormals();
                mesh.children[0].geometry.computeVertexNormals();
            } );
        });
        
        

        //Test model nonsense
        //var geometry = new THREE.BoxGeometry( 1, 1, 1 );
        //var material = new THREE.MeshLambertMaterial({ color: 0x1ec876 });
        //mesh = new THREE.Mesh( geometry, material );
        //scene.add( mesh );

        var pointLight = new THREE.PointLight(0xffffff);
        pointLight.position.set(0, 2, 5);

        scene.add(pointLight);

        var playButton = this.game.add.button(this.game.world.centerX,
            this.game.world.height -50,"button",this.onPlayClicked,this);
        playButton.anchor.setTo(0.5,0.5);

        style = { font: "24px Arial", fill: "#000000", align: "center"};
        text = this.game.add.text(playButton.x, playButton.y, "Back To Menu", style);
        text.anchor.set(0.5);
    },

    update: function() {
        
        if (mesh != null)
            mesh.rotateY(0.005);
        modelRenderer.render(scene, camera);
        modelTexture.dirty();

    },

    onPlayClicked: function(){
        this.dispose();
        this.game.state.clearCurrentState();
        this.game.state.start("LevelSelect");
    }
};