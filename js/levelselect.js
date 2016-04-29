var levelSelect = function(game){
    var buttons;
    var pageNumber;
    var previousButton;
    var nextButton;
};

levelSelect.prototype = {
    init: function(){
       
    },

    preload: function() {
        var save = GetSave();
        for (var i = 0; i < save.levels.length; i++) {
            var level = save.levels[i];
            if (level.bitmap != null) {
                var data = new Image();
                data.src = level.bitmap;
                this.game.cache.addImage(level.name, level.bitmap, data);
            }
        }
    },
    
    create: function(){
        var style = { font: "32px Arial", fill: "#000000", align: "center"};




        var text = this.game.add.text(this.game.world.centerX, 30, "Level Select", style);
        text.anchor.set(0.5);

        style = { font: "24px Arial", fill: "#000000", align: "center"};

        buttons = [];
        pageNumber = 0;
        
        var save = GetSave();
        for (var i = 0; i < save.levels.length; i++) {

            var level = save.levels[i];

            var offsetX = -220 + (220 * (i%3));
            var offsetY = (i % 6 > 2) ? 180 : -50;

            var tButton = this.game.add.button(this.game.world.centerX+offsetX,
                this.game.world.centerY+offsetY,"button",function(level){
                    return function () {
                        currentLevel = level.file;
                        this.game.state.clearCurrentState();
                        this.game.state.start("Loading");
                    }
                }(save.levels[i]),this);
            tButton.anchor.setTo(0.5,0.5);
            text = tButton.addChild(this.game.make.text(0, 0, level.name, style));
            text.anchor.set(0.5);
            buttons.push(tButton);

            if (level.bitmap != null) {
                var tSprite = tButton.addChild(this.game.make.sprite(0,
                -120, level.name));
                tSprite.anchor.setTo(0.5,0.5);
                var tScale = 200/tSprite.width;
                tSprite.scale.setTo(tScale,tScale);
            }

            if (!level.unlocked) {
                buttons[i].alpha = 0.5;
                buttons[i].input.enabled = false;
            }

            if (i > 5) {
                buttons[i].visible = false;
            }
        }

        previousButton = this.game.add.button(this.game.world.centerX-270,
            this.game.world.height-40, "button", this.onPreviousClicked,this);
        previousButton.anchor.setTo(0.5,0.5);
        text = previousButton.addChild(this.game.make.text(0, 0, "Previous Page", style));
        text.anchor.set(0.5);
        previousButton.alpha = 0.5;
        previousButton.input.enabled = false;

        nextButton = this.game.add.button(this.game.world.centerX+270,
            this.game.world.height-40, "button", this.onNextClicked,this);
        nextButton.anchor.setTo(0.5,0.5);
        text = nextButton.addChild(this.game.make.text(0, 0, "Next Page", style));
        text.anchor.set(0.5);

    },

    onPreviousClicked: function () {
        for (var i = 0; i < buttons.length; i++) {
            buttons[i].visible = false;
        }
        pageNumber --;

        for (var i = pageNumber * 6; i < ((pageNumber*6)+6); i++) {
            buttons[i].visible = true;
        }

        if (pageNumber == 0) {
            previousButton.alpha = 0.5;
            previousButton.input.enabled = false;
        }
        nextButton.alpha = 1;
        nextButton.input.enabled = true;

    },

    onNextClicked: function () {
        for (var i = 0; i < buttons.length; i++) {
            buttons[i].visible = false;
        }
        pageNumber ++;

        for (var i = pageNumber * 6; i < Math.min((pageNumber*6)+6,buttons.length); i++) {
            buttons[i].visible = true;
        }

        if (pageNumber == Math.floor(buttons.length/6)) {
            nextButton.alpha = 0.5;
            nextButton.input.enabled = false;
        }
        previousButton.alpha = 1;
        previousButton.input.enabled = true;
    }

};