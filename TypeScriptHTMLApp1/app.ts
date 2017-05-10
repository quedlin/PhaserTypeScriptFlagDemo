/**
 * https://phaser.io/examples/v2/demoscene/flag
 */

class SpriteData {
    ox: number;
    oy: number;
    cx: number;
    cy: number;
}

class SimpleGame {
    
    game: Phaser.Game;

    stars: Phaser.Sprite[];
    starsData: SpriteData[];

    waveformX: Phaser.Sprite[];
    waveformY: Phaser.Sprite[];

    xl;
    yl;

    cx = 0;
    cy = 0;
    
    constructor() {
        this.game = new Phaser.Game(800, 600, Phaser.AUTO, 'content', { preload: this.preload, create: this.create, update: this.update });
    }
    
    preload() {
        this.game.load.image('star', 'block.png');
    }
    
    create() {
        /*
        var logo = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
        logo.anchor.setTo(0.5, 0.5);
        logo.scale.setTo(0.2, 0.2);
        this.game.add.tween(logo.scale).to({ x: 1, y: 1 }, 2000, Phaser.Easing.Bounce.Out, true);
        */

        //  Generate our motion data
        var sprite = { x: 0, y: 0 };
        var tween = this.game.add.tween(sprite).to( { x: 64 }, 2000, "Bounce.easeIn", true, 0, -1, true);
        var tween2 = this.game.add.tween(sprite).to( { y: 64 }, 2000, "Bounce.easeOut", true, 0, -1, true);

        this.waveformX = tween.generateData(60);
        this.waveformY = tween2.generateData(60);

        this.xl = this.waveformX.length - 1;
        this.yl = this.waveformY.length - 1;

        var sprites = new Phaser.SpriteBatch(this.game, null);
        
        this.stars = new Array<Phaser.Sprite>();
        this.starsData = new Array<SpriteData>();
        
        var xs = 25;
        var ys = 30;

        for (var y = 0; y < 10; y++)
        {
            for (var x = 0; x < 20; x++)
            {
                var star = this.game.make.sprite(150 + (x * xs), 150 + (y * ys), 'star');
                var starData = new SpriteData();

                starData.ox = star.x;
                starData.oy = star.y;
                
                starData.cx = x;
                starData.cy = y;

                star.anchor.set(0.5);                
                sprites.addChild(star);                
                this.stars.push(star);
                this.starsData.push(starData);
            }
        }
    }


    update() {

        //var len = this.starsData.length;
        for (var i = 0, len = this.starsData.length; i < len; i++) {
            this.stars[i].x = this.starsData[i].ox + this.waveformX[this.starsData[i].cx].x;
            this.stars[i].y = this.starsData[i].oy + this.waveformY[this.starsData[i].cy].y;

            this.starsData[i].cx++;

            if (this.starsData[i].cx > this.xl) {
                this.starsData[i].cx = 0;
            }

            this.starsData[i].cy++;

            if (this.starsData[i].cy > this.yl) {
                this.starsData[i].cy = 0;
            }
        }
        
       
    }


}


window.onload = () => {

    var game = new SimpleGame();

};