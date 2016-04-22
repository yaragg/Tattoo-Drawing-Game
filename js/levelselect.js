var levelSelect = function(game){};

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

        var tButton = this.game.add.button(this.game.world.centerX-220,
            this.game.world.centerY,"button",function(){
                currentLevel = "level1";
                this.game.state.clearCurrentState();
                this.game.state.start("World");
            },this);
        tButton.anchor.setTo(0.5,0.5);
        text = this.game.add.text(tButton.x, tButton.y, "Level 1", style);
        text.anchor.set(0.5);

        tButton = this.game.add.button(this.game.world.centerX,
            this.game.world.centerY,"button",function(){
                currentLevel = "level2";
                this.game.state.clearCurrentState();
                this.game.state.start("World");
            },this);
        tButton.anchor.setTo(0.5,0.5);
        text = this.game.add.text(tButton.x, tButton.y, "Level 2", style);
        text.anchor.set(0.5);

        tButton = this.game.add.button(this.game.world.centerX+220,
            this.game.world.centerY,"button",function(){
                currentLevel = "level3";
                this.game.state.clearCurrentState();
                this.game.state.start("World");
            },this);
        tButton.anchor.setTo(0.5,0.5);
        text = this.game.add.text(tButton.x, tButton.y, "Level 3", style);
        text.anchor.set(0.5);

        //thumbnails
        var save = GetSave();
        for (var i = 0; i < save.levels.length; i++) {
            var level = save.levels[i];
            if (level.bitmap != null) {
                var tSprite = this.game.add.sprite((this.game.world.centerX-220)+(220*i),
                this.game.world.centerY-120, level.name);
                tSprite.anchor.setTo(0.5,0.5);
                var tScale = 200/tSprite.width;
                tSprite.scale.setTo(tScale,tScale);
            }
        }
    }

};