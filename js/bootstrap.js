//bootstrap.js

//globals
var currentLevel;

//load in each game state - "Screens"
window.onload = function(){
    var game = new Phaser.Game(800, 600, Phaser.CANVAS, "game");


    game.state.add("Splash",splash);
    game.state.add("World",world);
    game.state.add("LevelSelect", levelSelect);
    game.state.add("Loading", loading);
    game.state.add("EndLevel",endLevel);
    game.state.start("Splash");
};

document.oncontextmenu = function(){
    return false;
};
