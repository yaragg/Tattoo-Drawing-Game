var loading = function(game){
    var jsonLoaded;

};

loading.prototype = {

    preload: function () {
        var bg = this.game.add.image(this.game.world.centerX, 0, 'menu_bg');
        bg.anchor.setTo(0.5, 0);

        //load assets for current level
        var style = { font: "36px Arial", fill: "rgb(181, 245, 255)", align: "center"};
        var text = this.game.add.text(this.game.world.centerX, this.game.world.height-50, "Loading...", style);
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
            this.game.load.image('bar_fill', 'assets/bar_fill.png');
            this.game.load.image('bar_bg', 'assets/bar_bg.png');
            this.game.load.image('burst', 'assets/burst.png');
            this.game.load.image('texture', 'assets/Midel_UV.png');
            this.game.load.image('model_bg', 'assets/End_Background.png');
            this.game.load.spritesheet('cursor', 'assets/cursor.png', 150, 150, 20);
            //this.game.load.atlasJSONArray('cursor', 'assets/cursor.png', 'assets/cursor.json');
			
			// Todo: Move to level specific load
            this.game.load.image('pimple', 'assets/pimple.png');
			this.game.load.image('scrape', 'assets/scrape.png');
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