var model = function(game){
    var scene;
    var camera;
    var mesh;

};

model.prototype = {

    preload: function() {

    },

    dispose: function() {
        scene = null;
        camera = null;
        mesh = null;
    },

    create: function(){

        var style = { font: "48px Arial", fill: "rgb(47, 63, 129)", align: "center"};

        var text = this.game.add.text(this.game.world.centerX, this.game.world.centerY-70, "Background", style);
        text.anchor.set(0.5);

        var texture = new PIXI.Texture(modelTexture);
        this.game.add.sprite(0, 0, texture);

        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(75
            , 800/600
            , 0.1, 1000);

        camera.position.y = 1;
        camera.position.z = 3;
        camera.lookAt(new THREE.Vector3(0, 0, 0));

        //Test model nonsense
        var geometry = new THREE.BoxGeometry( 1, 1, 1 );
        var material = new THREE.MeshLambertMaterial({ color: 0x1ec876 });
        mesh = new THREE.Mesh( geometry, material );
        scene.add( mesh );

        var pointLight = new THREE.PointLight(0xffffff);
        pointLight.position.set(0, 300, 200);

        scene.add(pointLight);

        var playButton = this.game.add.button(this.game.world.centerX,
            this.game.world.height -50,"button",this.onPlayClicked,this);
        playButton.anchor.setTo(0.5,0.5);

        style = { font: "24px Arial", fill: "#000000", align: "center"};
        text = this.game.add.text(playButton.x, playButton.y, "Back To Menu", style);
        text.anchor.set(0.5);
    },

    update: function() {

        mesh.rotateY(0.01);
        modelRenderer.render(scene, camera);
        modelTexture.dirty();

    },

    onPlayClicked: function(){
        this.dispose();
        this.game.state.clearCurrentState();
        this.game.state.start("LevelSelect");
    }
};