(function(){
var object = function (uuid, x, y, h, w, texture) {
    this.x = x || 0;
    this.y = y || 0;
    this.h = h || 50;
    this.w = w || 50;
    this.focus = false;
    this.uuid = uuid;
    this.loadTexture(texture);
    this.renderer;
    this.physics;
    this.update();
}

object.prototype.loadTexture = function(texture) {
  this.texture = new Image();
  this.texture.src = texture || "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAAAAABWESUoAAAAAnRSTlMA/1uRIrUAAAA2SURBVHjaY/hPADCMGAUMeACxCmCKYGyo4RQpQOINmAJyfIGOMQIKrwIsTiNZAWWxOZovgAAAGEW5Y9fdK7oAAAAASUVORK5CYII=";
}

object.prototype.update = function() {
    this.physics&&this.physics.update();
    this.focus&&this.renderer.setFocus(this);
}

object.prototype.move = function(x,y) {
    this.x += x;
    this.y += y;
    this.update();
}

window.engine.Object = object;

window.scriptLoading = false;
    })()
