var app = app || {};

app.main = {
    game: undefined,
    width: 800,
    height: 600,


    init: function () {
        this.game = new Phaser.Game(800, 600, Phaser.CANVAS, '', {
            preload: this.preload.bind(this),
            create: this.create.bind(this),
            update: this.update.bind(this)
        });
    },

    preload: function () {

        this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.game.scale.refresh();
        this.game.load.image('logo', 'assets/phaser.png');
    },

    create: function () {
        var logo = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
        logo.anchor.setTo(0.5, 0.5);
    },

    update: function () {

    }

}