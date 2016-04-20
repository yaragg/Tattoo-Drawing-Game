var world = function(game){
    var loop;
    var i;
    var colors;
    var bmcanvas;
    var bmworld;
    var lastPosition;
};

world.prototype = {
    
    preload: function () {
        //TODO move this to load screen
        this.game.load.json(currentLevel, 'assets/levels/'+currentLevel+'.json');
        this.game.load.image('loop', 'assets/brush.png');
    },
    
    create: function(){
        

        lastPosition = null;

        colors = Phaser.Color.HSVColorWheel();
        i = 0;

        loop = this.game.make.sprite(0, 0, 'loop');
        loop.scale.set(0.5);
        loop.anchor.set(0.5);
        //  This is the BitmapData we're going to be drawing to
        bmcanvas = this.game.add.bitmapData(this.game.width, this.game.height);
        bmcanvas.addToWorld();

        bmcanvas.smoothed = false;

        this.game.input.addMoveCallback(this.paint, this);
    },

    paint: function (pointer, x, y) {
        if (pointer.isDown) {
            lastPosition = lastPosition || new Phaser.Point(this.game.input.activePointer.x, this.game.input.activePointer.y);


            loop.tint = (colors[i].r << 16) | (colors[i].g << 8) | colors[i].b;
            i = this.game.math.wrapValue(i, 1, 359);

            var position = new Phaser.Point(this.game.input.activePointer.x, this.game.input.activePointer.y);
            

            var tween = this.game.make.tween(lastPosition).to(position);
            var path = tween.generateData(60);

            for(var j=0; j<path.length; j++) {
                bmcanvas.draw(loop, path[j].x, path[j].y, null, null, '');

            }
            lastPosition = position;

            loop.scale.set(loop.scale.x - 0.05*(this.game.time.elapsed/1000));
        }
    },

    update: function() {

        if (loop.scale.x <= 0) {
			this.endLevel(false);
		}

    },
	
	endLevel: function(wonLevel) {

        
        //save bitmap TODO only on win
        if (true /*won level*/) {
            var save = GetSave();
            for (i = 0; i < save.levels.length; i++) {
                var level = save.levels[i];
                if (level.name == currentLevel) {
                    level.bitmap = bmcanvas.canvas.toDataURL();
                }
                save.levels[i] = level;
            }
            SaveGame(save);
            console.log(save);
        }

        //move to game over
        this.game.state.clearCurrentState();
        this.game.state.start("EndLevel", wonLevel);

	}

};

