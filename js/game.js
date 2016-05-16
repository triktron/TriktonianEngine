var game;
window.game = game = {};

game.version = "0.0.2";

game.preInit = function preInit() {
    this.asset = new engine.assetManager();
    this.asset.add('lib/assets.js');
    this.asset.start();
}

game.init = function init() {
    game.scene = new engine.Scene();
    game.player = new engine.Object("player",10,10,50,50,"img/box.png");
    game.player.focus = true;
    game.player.physics = new engine.physics(game.player);
    game.scene.addObject("player",game.player);
    game.input = new engine.Input();
    game.input.addKey("up",90);
    game.input.addKey("down",83);
    game.input.addKey("left",81);
    game.input.addKey("right",68);

    for (var x = 0,i = 0;x<1601;x = x + 200) {
        for (var y = 0;y<1601;y = y + 200,i++) {
            game.scene.addObject("o" + i,new engine.Object("o" + i,x,y,50,50,"img/box.png"));
        }
    }

    engine.LS.close();
    if ('ontouchstart' in window) game.input.addDpad({"up":{"name":"up","code":90},"down":{"name":"down","code":83},left:{"name":"left","code":81},right:{"name":"right","code":68}},2)
    console.log("done loading");

    loop();
}

function loop() {
    setTimeout(loop, 1000 / 60);
    // console.time("loop");
    var x = 0,y = 0;
    if (game.input.isDown("up")) x--;
    if (game.input.isDown("down")) x++;
    if (game.input.isDown("left")) y--;
    if (game.input.isDown("right")) y++;
    game.player.physics.pc["thrusters"] = {a:Math.atan2(x, y),power:x==0&&y==0?0:4};
    game.player.update();
    //game.player.move(x*4,y*4);
    // console.timeEnd("loop");
}

game.preInit();
