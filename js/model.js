var model = function(game){
    var scene;
    var camera;
    var mesh;
    var save;
    var pointerDown;
    var previousPos;
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

        var bg = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'model_bg');
        bg.anchor.setTo(0.5);
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
			if (save.levels[i].bitmap == null) {
				continue;
			}
            tats.push(this.game.make.sprite(0,0, save.levels[i].file));
			tats[tats.length -1].anchor.set(0.5);
            switch (i){
              case 0: //triangle
                tats[tats.length -1].scale.set(0.1);
                canvas.draw(tats[tats.length -1], 117, 270);
                break;
              case 1: //double box
                tats[tats.length -1].scale.setTo(0.15);
                canvas.draw(tats[tats.length -1], 110, 660);
                break;
              case 2: //heart
                tats[tats.length -1].scale.setTo(0.05);
                canvas.draw(tats[tats.length -1], 585, 680);
                break;
              case 3: //key
                tats[tats.length -1].scale.setTo(0.05);
                canvas.draw(tats[tats.length -1], 520, 950);
                break;
              case 4: //tie
                tats[tats.length -1].scale.setTo(0.05);
                  tats[tats.length-1].angle = 45;
                canvas.draw(tats[tats.length -1], 450, 717);
                break;
              case 5: //burst
                tats[tats.length -1].scale.setTo(0.05);
                canvas.draw(tats[tats.length -1], 600, 900);
                break;
              case 6: //swirl
                tats[tats.length -1].scale.setTo(0.07);
                canvas.draw(tats[tats.length -1], 561, 450);
                break;
              case 7: //skull
                tats[tats.length -1].scale.setTo(0.05);
                  tats[tats.length-1].angle = 180;
                canvas.draw(tats[tats.length -1], 600, 330);
                break;
              case 8: //bone
                tats[tats.length -1].scale.setTo(0.05);
                  tats[tats.length-1].angle = 45;
                canvas.draw(tats[tats.length -1], 650, 697);
                break;
              case 9: //pencil
                tats[tats.length -1].scale.setTo(0.1);
                canvas.draw(tats[tats.length -1], 287, 265);
                break;
              case 10: //cactus
                tats[tats.length -1].scale.setTo(0.15);
                  tats[tats.length-1].angle = 180;
                canvas.draw(tats[tats.length -1], 550, 300);
                break;
              case 11: //shoe
                tats[tats.length -1].scale.setTo(0.05);
                canvas.draw(tats[tats.length -1], 585, 735);
                break;
              case 12: //glasses
                tats[tats.length -1].scale.setTo(0.05);
                  tats[tats.length-1].angle = 180;
                canvas.draw(tats[tats.length -1], 528, 125);
                break;
              case 13: //ghost
                tats[tats.length -1].scale.setTo(0.05);
                  tats[tats.length-1].angle = 180;
                canvas.draw(tats[tats.length -1], 585, 280);
                break;
              case 14: //cat
                tats[tats.length -1].scale.setTo(0.08);
                canvas.draw(tats[tats.length -1], 530, 720);
                break;
            }
        }

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

        pointerDown = false;
        previousPos = new Phaser.Point();
        this.game.input.addMoveCallback(this.rotateModel, this);

        this.game.input.onUp.add(function(){
            pointerDown = false;
        }.bind(this));

        this.game.input.onDown.add(function(){
            pointerDown = true;
        }.bind(this));
    },

    rotateModel: function(pointer, x, y) {

        if (pointerDown && !(previousPos.x == 0 && previousPos.y == 0) ) {
            var deltaX = this.game.input.activePointer.x - previousPos.x;
            if (mesh != null) {
                mesh.rotateY(deltaX*0.01);
            }
        }

        previousPos.setTo(this.game.input.activePointer.x, this.game.input.activePointer.y);
    },

    update: function() {
        
        if (mesh != null && !pointerDown)
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