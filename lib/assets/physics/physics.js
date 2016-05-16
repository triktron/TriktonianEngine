(function(){
var physics = function (obj) {
  this.obj = obj;
}

physics.prototype.pc = {};
physics.prototype.update = function() {
  var mx = 0, my = 0;
  for (var p in this.pc) {
    mx += this.pc[p].power * Math.cos(this.pc[p].a);
    my += this.pc[p].power * Math.sin(this.pc[p].a);
  }
  this.obj.x += mx;
  this.obj.y += my;
}

window.engine.physics = physics;

window.scriptLoading = false;
})()
