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
        var logo = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
        logo.anchor.setTo(0.5, 0.5);
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