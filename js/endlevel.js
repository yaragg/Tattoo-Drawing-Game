var endLevel = function(game){
	var wonLevel;
	
};

endLevel.prototype = {

    init: function(won){
		wonLevel = won;
    },

    create: function(){
        var style = { font: "32px Arial", fill: "#000000", align: "center"};
			
		var tString = "";
		if (wonLevel) {
			tString = "Level Complete";
		}else {
			tString = "Game Over";
		}
		
		
		var text = this.game.add.text(this.game.world.centerX, this.game.world.centerY-100, tString, style);
		text.anchor.set(0.5);

        var tButton = this.game.add.button(this.game.world.centerX-120,
            this.game.world.height -50,"button",this.onPlayClicked,this);
        tButton.anchor.setTo(0.5,0.5);

        style = { font: "24px Arial", fill: "#000000", align: "center"};
        text = this.game.add.text(tButton.x, tButton.y, "Back To Menu", style);
        text.anchor.set(0.5);

        //view model
        tButton = this.game.add.button(this.game.world.centerX+120,
            this.game.world.height -50,"button",this.onModelClicked,this);
        tButton.anchor.setTo(0.5,0.5);

        style = { font: "24px Arial", fill: "#000000", align: "center"};
        text = this.game.add.text(tButton.x, tButton.y, "Model Test", style);
        text.anchor.set(0.5);
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