var splash = function(game){};

splash.prototype = {

    preload: function () {
        //set up scaling
        this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        this.game.scale.refresh();

        //load assets for splash screen

        // this.game.load.image('button', 'assets/button.png');
        this.game.load.spritesheet('button', 'assets/buttons.png', 200, 53);
        this.game.load.image('loader', 'assets/loader.png');

        //TODO set to save before release
        var save = new DefaultSaveGame();
        SaveGame(save);
    },

    create: function(){
		//TODO remove this when there is a background image
        this.game.stage.backgroundColor = "#FFFFFF";
		
        var style = { font: "32px Arial", fill: "rgb(47, 63, 129)", align: "center"};

		var text = this.game.add.text(this.game.world.centerX, this.game.world.centerY-100, "Tattoo Game", style);
		text.anchor.set(0.5);
		
        var playButton = this.game.add.button(this.game.world.centerX,
                                                this.game.world.height -50,"button",this.onPlayClicked,this, 1, 0, 2);
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
      {file:"level1", name:"One", unlocked:true, completed:false, bitmap:null, score:0},
      {file:"level2", name:"Dimensions", unlocked:true, completed:false, bitmap:null, score:0},
      {file:"level3", name:"Love", unlocked:true, completed:false, bitmap:null, score:0},
      {file:"level4", name:"Mystery", unlocked:true, completed:false, bitmap:null, score:0},
      {file:"level5", name:"Business", unlocked:true, completed:false, bitmap:null, score:0},
      {file:"level6", name:"Burst", unlocked:true, completed:false, bitmap:null, score:0},
      {file:"level7", name:"Sea", unlocked:true, completed:false, bitmap:null, score:0},
      {file:"level8", name:"Gone", unlocked:true, completed:false, bitmap:null, score:0},
      {file:"level9", name:"Friend", unlocked:true, completed:false, bitmap:null, score:0},
      {file:"level10", name:"Studious", unlocked:true, completed:false, bitmap:null, score:0},
      {file:"level11", name:"Dry", unlocked:true, completed:false, bitmap:null, score:0},
      {file:"level12", name:"Moving", unlocked:true, completed:false, bitmap:null, score:0},
      {file:"level13", name:"Focus", unlocked:true, completed:false, bitmap:null, score:0},
      {file:"level14", name:"Spooky", unlocked:true, completed:false, bitmap:null, score:0},
      {file:"level15", name:"Curious", unlocked:true, completed:false, bitmap:null, score:0}
  ];

}

function GetSave() {
    return JSON.parse(localStorage.getItem("tattooSaveGame"));
}

function SaveGame(save) {
    localStorage.setItem("tattooSaveGame", JSON.stringify(save));
}