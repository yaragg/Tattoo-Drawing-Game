var world = function(game){
    var loop;
    var i;
    var colors;
    var bmcanvas;
    var bmworld;
};

world.prototype = {
    
    preload: function () {
        //TODO move this to load screen
        this.game.load.image('loop', 'assets/brush.png');
    },
    
    create: function(){
        //TODO remove this when there is a background image
        this.game.stage.backgroundColor = "#FFFFFF";

        colors = Phaser.Color.HSVColorWheel();
        i = 0;

        loop = this.game.make.sprite(0, 0, 'loop');
        loop.scale.set(0.5);
        loop.anchor.set(0.5);
        //	This is the BitmapData we're going to be drawing to
        bmcanvas = this.game.add.bitmapData(this.game.width, this.game.height);
        bmcanvas.addToWorld();

        bmcanvas.smoothed = false;

        this.game.input.addMoveCallback(this.paint, this);
    },

    paint: function (pointer, x, y) {
        if (pointer.isDown) {

            //bmcanvas.circle(x, y, 4, colors[i].rgba);
            //console.log(colors[i]);
            loop.tint = (colors[i].r << 16) | (colors[i].g << 8) | colors[i].b;
            i = this.game.math.wrapValue(i, 1, 359);

            bmcanvas.draw(loop, x, y, null, null, '');

            //loop.scale.set(loop.scale.x - 0.05*(this.game.time.elapsed/1000));
        }
    },

    update: function() {

        

    }

};

