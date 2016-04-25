//bootstrap.js

//globals
var currentLevel;
var modelRenderer;
var modelTexture;

//load in each game state - "Screens"
window.onload = function(){
    var game = new Phaser.Game(800, 600, Phaser.WEBGL, "game");

    modelRenderer = new THREE.WebGLRenderer({alpha:true});
    modelRenderer.setSize(game.width, game.height);
    //modelRenderer.setClearColor(0x0000FF, 1);

    modelTexture = new PIXI.BaseTexture(modelRenderer.domElement);

    game.state.add("Splash",splash);
    game.state.add("World",world);
    game.state.add("LevelSelect", levelSelect);
    game.state.add("Loading", loading);
    game.state.add("EndLevel",endLevel);
    game.state.add("Model",model);
    game.state.start("Splash");
};

document.oncontextmenu = function(){
    return false;
};
