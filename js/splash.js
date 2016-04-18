var splash = function(game){}

splash.prototype = {

    preload: function () {
        //set up scaling
        this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        this.game.scale.refresh();

        //load assets for splash screen
        this.game.load.image('logo', 'assets/phaser.png');
        this.game.load.image('play', 'assets/play.png');

    },

    create: function(){
		//TODO remove this when there is a background image
        this.game.stage.backgroundColor = "#FFFFFF";
		
        var style = { font: "32px Arial", fill: "#000000", align: "center"};

		var text = this.game.add.text(this.game.world.centerX, this.game.world.centerY-100, "Tattoo Game", style);
		text.anchor.set(0.5);
		
        var playButton = this.game.add.button(this.game.world.centerX,
                                                this.game.world.height -50,"play",this.onPlayClicked,this);
        playButton.anchor.setTo(0.5,0.5);
    },
    onPlayClicked: function(){
        //TODO level select screen
        //TODO load screen
        this.game.state.start("World");
    }
}