var world = function(game){
    var loop;
    var i;
    var colors;
    var bmcanvas;
    var bmworld;
    var lastPosition;
    var cursorLoop;
    var cursorEmitter;
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
        loop.scale.set(0.5);
        loop.anchor.set(0.5);
        //  This is the BitmapData we're going to be drawing to
        bmcanvas = this.game.add.bitmapData(this.game.width, this.game.height);
        bmcanvas.addToWorld();

        bmcanvas.smoothed = false;

        this.game.input.addMoveCallback(this.paint, this);

        cursorLoop = this.game.add.sprite(0, 0, 'loop');
        cursorLoop.scale.set(0.5);
        cursorLoop.anchor.set(0.5);

        emitter = this.game.add.emitter(0, 0, 100);
        emitter.makeParticles(['loop']);
        // this.cursor = this.game.add.sprite('loop');
        emitter.setAlpha(1, 0, 3000);
        emitter.setScale(0.02, 0.1, 0.02, 0.1, 1000);
        emitter.minParticleSpeed = new Phaser.Point(-100,-100);
        emitter.maxParticleSpeed = new Phaser.Point(100,100);
        // emitter.start();
        emitter.flow(500, 100, 100, -1, true);
    },

    paint: function (pointer, x, y) {
            var position = new Phaser.Point(this.game.input.activePointer.x, this.game.input.activePointer.y);
            emitter.position.x = position.x;
            emitter.position.y = position.y; 
            cursorLoop.position.x = position.x;  
            cursorLoop.position.y = position.y;

        if (pointer.isDown) {
            lastPosition = lastPosition || new Phaser.Point(this.game.input.activePointer.x, this.game.input.activePointer.y);

            //bmcanvas.circle(x, y, 4, colors[i].rgba);
            //console.log(colors[i]);
            loop.tint = (colors[i].r << 16) | (colors[i].g << 8) | colors[i].b;
            i = this.game.math.wrapValue(i, 1, 359);

        
            for(var j=0; j<emitter.children.length; j++) emitter.children[j].tint = loop.tint;
            cursorLoop.tint = loop.tint;


            console.log(emitter); 

            var tween = this.game.make.tween(lastPosition).to(position);
            var path = tween.generateData(60);

            for(var j=0; j<path.length; j++) {
                bmcanvas.draw(loop, path[j].x, path[j].y, null, null, '');
            }
            lastPosition = position;


            // bmcanvas.path(loop, x, y, null, null, '');

            //loop.scale.set(loop.scale.x - 0.05*(this.game.time.elapsed/1000));
        }
    },

    update: function() {

        

    }

};

