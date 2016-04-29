var loading = function(game){
    var jsonLoaded;

};

loading.prototype = {

    preload: function () {
        //load assets for current level
        var style = { font: "32px Arial", fill: "#000000", align: "center"};
        var text = this.game.add.text(this.game.world.centerX, this.game.world.centerY, "Loading...", style);
        text.anchor.set(0.5);
        //var loadingBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY+50,"loader");
        //loadingBar.anchor.setTo(0.5,0.5);
        //this.game.load.setPreloadSprite(loadingBar);


        if (this.game.cache.checkJSONKey(currentLevel)) {
            //if json is loaded, load level specific assets
            jsonLoaded = true;
            var level = this.game.cache.getJSON(currentLevel);
            this.game.load.image(level.background, 'assets/'+level.background+'.png');
        } else {
            // first stage, load level json and any global assets
            jsonLoaded = false;
            this.game.load.json(currentLevel, 'assets/levels/'+currentLevel+'.json');
            this.game.load.image('loop', 'assets/brush.png');
            this.game.load.image('ink', 'assets/ink.png');
        }


    },

    create: function(){
        if (jsonLoaded) {
            this.loadComplete();
        } else {
            this.continueLoad();
        }
    },

    continueLoad: function() {
        this.game.state.clearCurrentState();
        this.game.state.start("Loading");
    },

	loadComplete: function() {
		this.game.state.clearCurrentState();
        this.game.state.start("World");
	}
    
};