var endLevel = function(game){
	var wonLevel;
	
};

endLevel.prototype = {

    init: function(won){
		wonLevel = won;
    },
	
	preload: function() {
		var save = GetSave();
        for (var i = 0; i < save.levels.length; i++) {
            var level = save.levels[i];
            if (level.bitmap != null) {
                var data = new Image();
                data.src = level.bitmap;
                this.game.cache.addImage(level.file, level.bitmap, data);
            }
        }
	},

    create: function(){
        var style = { font: "32px Arial", fill: "rgb(47, 63, 129)", align: "center"};

		var tString = "";
		if (wonLevel) {
			tString = "Level Complete";
		}else {
			tString = "Game Over";
            var button = this.game.add.button(this.game.world.centerX,
                this.game.world.height -120,"button",this.onRestartClicked,this, 1, 0, 2);
            button.anchor.setTo(0.5,0.5);

            var tstyle = { font: "24px Arial", fill: "rgb(47, 63, 129)", align: "center"};
            var text = this.game.add.text(button.x, button.y, "Retry Level", tstyle);
            text.anchor.set(0.5);
		}


		var text = this.game.add.text(this.game.world.centerX, this.game.world.centerY-100, tString, style);
		text.anchor.set(0.5);

        var tButton = this.game.add.button(this.game.world.centerX,
            this.game.world.height -50,"button",this.onPlayClicked,this, 1, 0, 2);
        tButton.anchor.setTo(0.5,0.5);

        style = { font: "24px Arial", fill: "rgb(47, 63, 129)", align: "center"};
        text = this.game.add.text(tButton.x, tButton.y, "Back To Menu", style);
        text.anchor.set(0.5);

        //view model
        var save = GetSave();
        if (save.levels[save.levels.length - 1].bitmap != null) {
            tButton = this.game.add.button(this.game.world.centerX ,
                this.game.world.height -190, "button", this.onModelClicked, this, 1, 0, 2);
            tButton.anchor.setTo(0.5, 0.5);

            style = {font: "24px Arial", fill: "rgb(47, 63, 129)", align: "center"};
            text = this.game.add.text(tButton.x, tButton.y, "View Your Work", style);
            text.anchor.set(0.5);
        }
    },

    onRestartClicked: function() {
        this.game.state.clearCurrentState();
        this.game.state.start("World");
    },

    onPlayClicked: function(){
        this.game.state.clearCurrentState();
        this.game.state.start("LevelSelect");
    },

    onModelClicked: function() {
        this.game.state.clearCurrentState();
        this.game.state.start("Model");
    }
};