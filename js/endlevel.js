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
		
        var playButton = this.game.add.button(this.game.world.centerX,
                                                this.game.world.height -50,"play",this.onPlayClicked,this);
        playButton.anchor.setTo(0.5,0.5);
    },
    onPlayClicked: function(){
        //TODO go back to level select here
        this.game.state.start("Splash");
    }
}