var endLevel = function(game){};

endLevel.prototype = {
    init: function(score){

    },
    create: function(){
        var gameOverTitle = this.game.add.sprite(160,160,"gameover");
        gameOverTitle.anchor.setTo(0.5,0.5);
        var playButton = this.game.add.button(160,320,"play",this.playTheGame,this);
        playButton.anchor.setTo(0.5,0.5);
    },
    playTheGame: function(){
        //TODO go back to level select here
        this.game.state.start("Splash");
    }
}