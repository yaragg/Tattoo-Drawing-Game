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
    var pointsRemaining;
    var refills;
    var inkBar;
    var withinBounds;
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

        lastPosition = null;
        workPoint = new Phaser.Point();
        colors = Phaser.Color.HSVColorWheel();
        colorPos = 0;
        pointerDown = false;
        
        //cursor
        loop = this.game.make.sprite(-500, -500, 'cursor');

        //loop.animations.add('wobble');
        //loop.animations.play('wobble',12,true);
        loop.scale.set(0.1);
        loop.anchor.set(0.5);
        
        bmcanvas = this.game.add.bitmapData(this.game.width, this.game.height);
        bmcanvas.addToWorld();

        bmcanvas.smoothed = false;

		//ink
        inkAmount = 100;
        inkDecrease = level.inkDecrease;	// Amount of ink you loose per unit of distance
		
        inkBarBg = this.game.add.sprite(5, 575, 'bar_bg');
        inkBarFill = this.game.add.sprite(10, 580, 'bar_fill');
        inkBarBg.width = inkAmount+10;
        inkBarFill.width = inkAmount;

        points = [];
        refills = [];
				pointsRemaining = level.points.length;
        for (i = 0; i < level.points.length; i++) {
            var point = level.points[i];
            points.push(new dot(this.game, point.x, point.y, false));
        }

        for (i = 0; i < level.pickups.length; i++) {
            var refill = level.pickups[i];
            refills.push(new dot(this.game, refill.x, refill.y, true));
        }

        this.game.input.addMoveCallback(this.paint, this);

        //Fix to make the game end if you lift your finger off the mobile screen
        //Apparently simply checking input.isDown like in the paint method doesn't work for mobile
        this.game.input.onUp.add(function(){
            if (withinBounds && pointerDown)
                this.endLevel();
        }.bind(this));
			
				//withinBounds = true;
				document.addEventListener('onmouseout', function(){ withinBounds = false; });
				document.addEventListener('onmouseover', function(){ withinBounds = true; });


        emitter = this.game.add.emitter(0, 0, 500);
        emitter.makeParticles(['loop']);
        emitter.setAlpha(1, 0, 3000);
        emitter.setScale(0.02, 0.15, 0.02, 0.15, 1000);
        emitter.minParticleSpeed = new Phaser.Point(-50,-50);
        emitter.maxParticleSpeed = new Phaser.Point(50,50);
        emitter.start(false, 700, 5);

        cursorLoop = this.game.add.sprite(0, 0, 'cursor');
        cursorLoop.animations.add('wobble');
        cursorLoop.animations.play('wobble',12,true);
        cursorLoop.scale.set(0.15);
        cursorLoop.anchor.set(0.5);
    },

    paint: function (pointer, x, y) {
        workPoint.setTo(this.game.input.activePointer.x, this.game.input.activePointer.y);
        emitter.position.x = workPoint.x;
        emitter.position.y = workPoint.y;
        cursorLoop.position.x = workPoint.x;
        cursorLoop.position.y = workPoint.y;

        if(lastPosition == null) lastPosition = new Phaser.Point(workPoint.x, workPoint.y);
       
        if (pointer.isDown && inkAmount > 0) {
            //for game over check
            pointerDown = true;

            //color
            loop.tint = (colors[colorPos].r << 16) | (colors[colorPos].g << 8) | colors[colorPos].b;
            colorPos = this.game.math.wrapValue(colorPos, 1, 359);
        
            for(var j=0; j<emitter.children.length; j++) emitter.children[j].tint = loop.tint;
            cursorLoop.tint = loop.tint;
			
			//ink
			var distance = Phaser.Point.distance(lastPosition, workPoint, true);
            if (Math.abs(distance) >= 1)
				inkAmount -= inkDecrease * Math.abs(distance);
            //cursorLoop.scale.set(inkAmount);

            //smooth tween
            workPoint.setTo(this.game.input.activePointer.x, this.game.input.activePointer.y);
            var tween = this.game.make.tween(lastPosition).to(workPoint);
            var path = tween.generateData(60);
            for(var j=0; j<path.length; j++) {
                bmcanvas.draw(loop, path[j].x, path[j].y, null, null, '');
            }
            lastPosition.setTo(workPoint.x, workPoint.y);

            this.checkPoints();
        } else {
            //Game over check (unneeded with new listener)
            //if (pointerDown && !withinBounds) {
                //this.endLevel();
                //return;
            //}
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
            if (Phaser.Point.distance(lastPosition, refills[i], true) < refills[i].sprite.width/2 &&
                refills[i].canRefill) {
                inkAmount += refills[i].refillAmount;
                refills[i].visit();
            }
        }
    },

    update: function() {
        withinBounds = !(cursorLoop.x <= 0 || cursorLoop.y <= 0 ||
        cursorLoop.x >= this.game.width || cursorLoop.y >= this.game.height);
        
        inkBarFill.width = inkAmount;

        if ( inkAmount <= 0) {
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
        
        //save bitmap
        if (wonLevel) {
            var save = GetSave();
            for (i = 0; i < save.levels.length; i++) {
                var level = save.levels[i];
                if (level.file == currentLevel) {
                    level.bitmap = bmcanvas.canvas.toDataURL();
                    level.completed = true;
                    if (i < save.levels.length-1) {
                        save.levels[i+1].unlocked = true;
                    }
                    save.levels[i] = level;
                    break;
                }

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
    
    if (refill) {
        this.sprite = game.add.sprite(x,y,'ink');
		this.sprite.scale.setTo(0.5);
		this.sprite.anchor.setTo(0.5);
    }
    else {
        this.sprite = game.add.sprite(x,y,'burst');
        this.sprite.scale.setTo(0.25);
        this.sprite.anchor.setTo(0.5);
    }

    
};
dot.prototype = Object.create(Phaser.Point.prototype);
dot.prototype.constructor = dot;
dot.prototype.visit = function() {
    //TODO particle effects?
		if (!this.canRefill)
			pointsRemaining -= 1;
    this.canRefill = false;
    this.visited = true;
    this.sprite.alpha = 0.1;
};
