var splash = function(game){};

splash.prototype = {

    preload: function () {
        //set up scaling
        this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        this.game.scale.refresh();

        //load assets for splash screen

        this.game.load.image('button', 'assets/button.jpg');
        this.game.load.image('loader', 'assets/loader.png');

        //TODO set to save before release
        var save = new DefaultSaveGame();
        SaveGame(save);
    },

    create: function(){
		//TODO remove this when there is a background image
        this.game.stage.backgroundColor = "#FFFFFF";
		
        var style = { font: "32px Arial", fill: "#000000", align: "center"};

		var text = this.game.add.text(this.game.world.centerX, this.game.world.centerY-100, "Tattoo Game", style);
		text.anchor.set(0.5);
		
        var playButton = this.game.add.button(this.game.world.centerX,
                                                this.game.world.height -50,"button",this.onPlayClicked,this);
        playButton.anchor.setTo(0.5,0.5);
        text = this.game.add.text(playButton.x, playButton.y, "Play", style);
        text.anchor.set(0.5);
    },
    onPlayClicked: function(){
        
        //TODO load screen
        this.game.state.clearCurrentState();
        this.game.state.start("LevelSelect");
    }
};

function DefaultSaveGame () {
  this.levels = [
      {file:"level1", name:"Level 1", unlocked:true, completed:false, bitmap:null, score:0},
      {file:"level2", name:"Level 2", unlocked:false, completed:false, bitmap:null, score:0},
      {file:"level3", name:"Level 3", unlocked:false, completed:false, bitmap:null, score:0},
      {file:"level4", name:"Level 4", unlocked:false, completed:false, bitmap:null, score:0},
      {file:"level5", name:"Level 5", unlocked:false, completed:false, bitmap:null, score:0},
      {file:"level3", name:"Level 6", unlocked:false, completed:false, bitmap:null, score:0},
      {file:"level1", name:"Level 7", unlocked:false, completed:false, bitmap:null, score:0},
      {file:"level2", name:"Level 8", unlocked:false, completed:false, bitmap:null, score:0},
      {file:"level3", name:"Level 9", unlocked:false, completed:false, bitmap:null, score:0},
      {file:"level1", name:"Level 10", unlocked:false, completed:false, bitmap:null, score:0},
      {file:"level2", name:"Level 11", unlocked:false, completed:false, bitmap:null, score:0},
      {file:"level3", name:"Level 12", unlocked:false, completed:false, bitmap:null, score:0},
      {file:"level1", name:"Level 13", unlocked:false, completed:false, bitmap:null, score:0}
  ];

  this.levels[4].unlocked = true;
}

function GetSave() {
    return JSON.parse(localStorage.getItem("tattooSaveGame"));
}

function SaveGame(save) {
    localStorage.setItem("tattooSaveGame", JSON.stringify(save));
}