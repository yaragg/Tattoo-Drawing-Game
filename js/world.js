var world = function(game){
    var loop;
    var colorPos;
    var colors;
    var bmcanvas;
    var lastPosition;
    var cursorLoop;
    var cursorEmitter;
    var inkAmount;
    var inkDecrease;
    var workPoint;
    var pointerDown;
    var points;
    var refills;
};

world.prototype = {
    
    preload: function () {
        
    },

    dispose: function() {
        this.game.input.deleteMoveCallback(this.paint, this);

        bmcanvas.destroy();
        bmcanvas = null;
        loop.destroy();
        loop = null;
        cursorLoop.destroy();
        cursorLoop = null;
        cursorEmitter = null;
        colors = null;
        lastPosition = null;
        workPoint = null;
        points = null;
        refills = null;
    },
    
    create: function(){

        //level parsing
        var level = this.game.cache.getJSON(currentLevel);

        //background
        var bg = this.game.add.image(this.game.world.centerX, this.game.world.centerY, level.background);
        bg.anchor.setTo(0.5);

        lastPosition = new Phaser.Point(this.game.input.activePointer.x, this.game.input.activePointer.y);
        workPoint = new Phaser.Point();
        colors = Phaser.Color.HSVColorWheel();
        colorPos = 0;
        pointerDown = false;
        
        //cursor
        loop = this.game.make.sprite(0, 0, 'loop');
        loop.scale.set(0.25);
        loop.anchor.set(0.5);
        
        //ink
        inkAmount = loop.scale.x;
        inkDecrease = inkAmount / 200;
        
        bmcanvas = this.game.add.bitmapData(this.game.width, this.game.height);
        bmcanvas.addToWorld();

        bmcanvas.smoothed = false;



        points = [];
        refills = [];

        for (i = 0; i < level.points.length; i++) {
            var point = level.points[i];
            points.push(new dot(this.game, point.x, point.y, false));
        }

        for (i = 0; i < level.pickups.length; i++) {
            var refill = level.pickups[i];
            refills.push(new dot(this.game, refill.x, refill.y, true));
        }

        this.game.input.addMoveCallback(this.paint, this);

        cursorLoop = this.game.add.sprite(0, 0, 'loop');
        cursorLoop.scale.set(0.5);
        cursorLoop.anchor.set(0.5);

        emitter = this.game.add.emitter(0, 0, 500);
        emitter.makeParticles(['loop']);
        emitter.setAlpha(1, 0, 3000);
        emitter.setScale(0.02, 0.15, 0.02, 0.15, 1000);
        emitter.minParticleSpeed = new Phaser.Point(-50,-50);
        emitter.maxParticleSpeed = new Phaser.Point(50,50);
        emitter.start(false, 700, 5);
    },

    paint: function (pointer, x, y) {
            workPoint.setTo(this.game.input.activePointer.x, this.game.input.activePointer.y);
            emitter.position.x = workPoint.x;
            emitter.position.y = workPoint.y;
            cursorLoop.position.x = workPoint.x;
            cursorLoop.position.y = workPoint.y;
       
        if (pointer.isDown && inkAmount > 0) {
            //for game over check
            pointerDown = true;

            //color
            loop.tint = (colors[colorPos].r << 16) | (colors[colorPos].g << 8) | colors[colorPos].b;
            colorPos = this.game.math.wrapValue(colorPos, 1, 359);

        
            for(var j=0; j<emitter.children.length; j++) emitter.children[j].tint = loop.tint;
            cursorLoop.tint = loop.tint;


            //smooth tween
            workPoint.setTo(this.game.input.activePointer.x, this.game.input.activePointer.y);
            var tween = this.game.make.tween(lastPosition).to(workPoint);
            var path = tween.generateData(60);
            for(var j=0; j<path.length; j++) {
                bmcanvas.draw(loop, path[j].x, path[j].y, null, null, '');
            }
            lastPosition.setTo(workPoint.x, workPoint.y);

            //ink
            inkAmount -= inkDecrease;
            loop.scale.set(inkAmount);

            this.checkPoints();
        } else {
            //Game over check
            if (pointerDown) {
                this.endLevel();
                return;
            }
        }
        lastPosition.setTo(x,y);
    },

    checkPoints: function() {
        for (i = 0; i < points.length; i++) {
            if (Phaser.Point.distance(lastPosition, points[i], true) < 20 &&
                points[i].visited == false) {
                points[i].visit();
            }
        }

        for (i = 0; i < refills.length; i++) {
            if (Phaser.Point.distance(lastPosition, refills[i], true) < 20 &&
                refills[i].canRefill) {
                inkAmount += refills[i].refillAmount;
                refills[i].visit();
            }
        }
    },

    update: function() {

        if (loop.scale.x <= 0) {
			this.endLevel();
		}

    },
	
	endLevel: function() {

        var wonLevel = true;
        for (i = 0; i < points.length; i++) {
            if (!points[i].visited) {
                wonLevel = false;
            }
        }
        
        //save bitmap TODO only on win
        if (wonLevel) {
            var save = GetSave();
            for (i = 0; i < save.levels.length; i++) {
                var level = save.levels[i];
                if (level.name == currentLevel) {
                    level.bitmap = bmcanvas.canvas.toDataURL();
                    level.completed = true;
                    if (i < save.levels.length-1) {
                        save.levels[i+1].unlocked = true;
                    }
                }
                save.levels[i] = level;
            }
            SaveGame(save);
        }

        //move to game over
        this.dispose();
        this.game.state.clearCurrentState();
        this.game.state.start("EndLevel", true, false, wonLevel);

	}

};

var dot = function(game, x, y, refill){
    this.refillAmount = inkAmount/4;
    this.canRefill = refill;
    this.visited = false;
    this.x = x;
    this.y = y;
    this.graphics = game.add.graphics(0,0);
    if (refill) {
        this.graphics.beginFill(0x00FF00, 1);
    }
    else {
        this.graphics.beginFill(0x000000, 1);
    }

    this.graphics.drawCircle(x, y, 10);
};
dot.prototype = Object.create(Phaser.Point.prototype);
dot.prototype.constructor = dot;
dot.prototype.visit = function() {
    //TODO particle effects?
    this.canRefill = false;
    this.visited = true;
    this.graphics.alpha = 0.5;
};
