var loading = function(game){};

loading.prototype = {

    preload: function () {
        //load assets for current level
        var style = { font: "32px Arial", fill: "#000000", align: "center"};
        var text = this.game.add.text(this.game.world.centerX, this.game.world.centerY, "Loading...", style);
        text.anchor.set(0.5);
        //var loadingBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY+50,"loader");
        //loadingBar.anchor.setTo(0.5,0.5);
        //this.game.load.setPreloadSprite(loadingBar);

        this.game.load.json(currentLevel, 'assets/levels/'+currentLevel+'.json');
        this.game.load.image('loop', 'assets/brush.png');
        this.game.load.image('background01', 'assets/background01.png');
        //load more assets here

    },

    create: function(){
        this.game.state.clearCurrentState();
        this.game.state.start("World");
    }
    
};