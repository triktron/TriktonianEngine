(function(){
var self;
var scene = function (name) {
    self = this;
    this.can = document.createElement("canvas");
    this.canTX = this.can.getContext("2d");
    this.can.id = name || "scene";

    this.update();
}

scene.prototype.can;
scene.prototype.update = function () {
    setTimeout(self.update,1000/60)
    // console.time("render")
    if (!document.contains(self.can)) document.body.appendChild(self.can);

    self.can.style.position = "fixed";
    self.can.style.left = "0";
    self.can.style.top = "0";
    self.can.style.width = window.innerWidth + "px";
    self.can.style.height = window.innerHeight + "px";
    self.can.width = window.innerWidth;
    self.can.height = window.innerHeight;

    for (var ob in self.objects) {

      var obj = self.objects[ob];
      var x = obj.x - self.focus.x;
      var y = obj.y - self.focus.y;

      //if (x < window.innerWidth / 2) x = 0; else if (x > self.borders.width - window.innerWidth / 2) x = window.innerWidth - self.borders.width; else x = window.innerWidth / 2 - x;
      //if (y < window.innerHeight / 2) y = 0; else if (y > self.borders.height - window.innerHeight / 2) y = window.innerHeight - self.borders.height; else y = window.innerHeight / 2 - y;

      //self.canTX.strokeRect(x,y,obj.w,obj.h);
      self.canTX.drawImage(obj.texture,x,y,obj.w,obj.h);
    }
    // console.timeEnd("render")
}

scene.prototype.borders = {
    height: 1650,
    width: 1650
}
scene.prototype.setBorders = function (h,w, x, y) {
    this.borders.height = h;
    this.borders.width = w;
}
scene.prototype.focus = {
    x: 0,
    x: 0
}
scene.prototype.setFocus = function (x, y, h, w) {
    if (typeof x == "object") {
      var y = x.y;
      var h = x.h;
      var w = x.w;
      x = x.x;
    }

    if (x < window.innerWidth / 2 - w / 2) x = 0; else if (x > window.innerWidth / 2 - w && x < self.borders.width - window.innerWidth / 2 - w / 2) x -=  window.innerWidth / 2 - w / 2; else x =  self.borders.width - window.innerWidth;
    if (y < window.innerHeight / 2 - h / 2) y = 0; else if (y > window.innerHeight / 2 - h && y < self.borders.height - window.innerHeight / 2 - h / 2) y -=  window.innerHeight / 2 - h / 2; else y =  self.borders.height - window.innerHeight;

    this.focus.x = x;
    this.focus.y = y;
}

scene.prototype.objects = {};

scene.prototype.addObject = function (uuid,ob) {
    ob.renderer = this;
    this.objects[uuid] = ob;
    return this;
}

scene.prototype.removeObject = function (uuid) {
    delete this.objects[uuid];
}

window.engine.Scene = scene;

window.scriptLoading = false;
    })()
