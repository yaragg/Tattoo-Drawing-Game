var world = function(game){
    var loop;
    var i;
    var colors;
    var bmcanvas;
    var bmworld;
    var lastPosition;
    var inkAmount;
    var inkDecrease;
    
    var refillDot;
};

world.prototype = {
    
    preload: function () {
        //TODO move this to load screen
        this.game.load.image('loop', 'assets/brush.png');
    },
    
    create: function(){
        //TODO remove this when there is a background image
        this.game.stage.backgroundColor = "#FFFFFF";

        lastPosition = null;

        colors = Phaser.Color.HSVColorWheel();
        i = 0;

        loop = this.game.make.sprite(0, 0, 'loop');
        loop.scale.set(0.25);
        loop.anchor.set(0.5);
        inkAmount = loop.scale.x;
        inkDecrease = inkAmount / 80;
        //  This is the BitmapData we're going to be drawing to
        bmcanvas = this.game.add.bitmapData(this.game.width, this.game.height);
        bmcanvas.addToWorld();

        bmcanvas.smoothed = false;
        
        refillDot = new refill(this.game, 250, 250);

        this.game.input.addMoveCallback(this.paint, this);
    },

    paint: function (pointer, x, y) {
        if (pointer.isDown && inkAmount > 0) {
            lastPosition = lastPosition || new Phaser.Point(this.game.input.activePointer.x, this.game.input.activePointer.y);

            //bmcanvas.circle(x, y, 4, colors[i].rgba);
            //console.log(colors[i]);
            loop.tint = (colors[i].r << 16) | (colors[i].g << 8) | colors[i].b;
            i = this.game.math.wrapValue(i, 1, 359);

            var position = new Phaser.Point(this.game.input.activePointer.x, this.game.input.activePointer.y);
            
            var tween = this.game.make.tween(lastPosition).to(position);
            var path = tween.generateData(60);

            for(var j=0; j<path.length; j++) {
                bmcanvas.draw(loop, path[j].x, path[j].y, null, null, '');

            }
            lastPosition = position;
            
            inkAmount -= inkDecrease;
            
            //bmcanvas.path(loop, x, y, null, null, '');

            //loop.scale.set(loop.scale.x - 0.05*(this.game.time.elapsed/1000));
            loop.scale.set(inkAmount);
            //console.log("loop.scale: " + loop.scale);
        }
    },

    update: function() {

        if (lastPosition != null && Phaser.Point.distance(lastPosition, refillDot, true) < 20 && refillDot.canRefill) {
            inkAmount += refillDot.refillAmount;
            refillDot.canRefill = false;
            console.log("Refilled!");    
        }

    }

};

var refill = function(game, x, y){
    this.refillAmount = inkDecrease * 40;
    this.canRefill = true;
    this.x = x;
    this.y = y;
    this.graphics = game.add.graphics(0,0);
    this.graphics.beginFill(0xFF0000, 1);
    this.graphics.drawCircle(x, y, 10);
};
refill.prototype = Object.create(Phaser.Point.prototype);
refill.prototype.constructor = refill;