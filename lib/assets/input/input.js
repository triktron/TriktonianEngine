(function(){
var self;
var Input = function () {
    window.addEventListener("keydown", this.inputDown);
    window.addEventListener("keyup", this.inputUp);
    self = this;
}

Input.prototype.keys = {};

Input.prototype.addKey = function(name, code) {
    self.keys[code] = {name:name,down:false};
}

Input.prototype.inputDown = function(evt) {
    if (!self.keys[evt.keyCode]) return;
    self.keys[evt.keyCode].down = true;
}

Input.prototype.inputUp = function(evt) {
    if (!self.keys[evt.keyCode]) return;
    self.keys[evt.keyCode].down = false;
}

Input.prototype.isDown = function(name) {
    for (var i in this.keys) if (this.keys[i].name == name && this.keys[i].down) return true;
    return false;
}

Input.prototype.addDpad = function(keys,place) {
    window.addEventListener("touchstart", this.handleToutch, false);
    window.addEventListener("touchend", this.handleToutch, false);
    window.addEventListener("touchcancel", this.handleToutch, false);
    window.addEventListener("touchmove", this.handleToutch, false);
    this.dPad = {main:new Image(),up:keys.up,down:keys.down,left:keys.left,right:keys.right};
    this.dPad.main.style[["left","right","left","right"][place]] = "10px";
    this.dPad.main.style[["top","top","bottom","bottom"][place]] = "10px";
    this.dPad.main.style.position = "fixed";
    this.dPad.main.style.opacity = ".5";
    this.dPad.main.style.height = "25%";
    this.dPad.main.style.width = "25%";
    for (var i = 0;i < 4;i++) {
        var dpd = this.dPad.main.cloneNode();
        dpd.style.display = "none";
        dpd.src = "lib/assets/input/arrow/" + (i+1) + ".png";
        document.body.appendChild(dpd);
        this.dPad[["left","down","right","up"][i]].img = dpd;
        this.addKey(keys[["up","down","left","right"][i]].name,keys[["up","down","left","right"][i]].code);
    }
    this.dPad.main.src = "lib/assets/input/arrow/0.png";
    document.body.appendChild(this.dPad.main);
}

Input.prototype.pd = {};
Input.prototype.handleToutch = function (evt) {
    var d = {};
    for (var i in evt.touches) {
        var cd = self.isOnDpad(evt.touches[i].pageX, evt.touches[i].pageY);
        for (var x in cd) d[x] = d[x] || cd[x];
    }

    for (var i in d) {
        console.debug(self.pd[i] && d[i])
        if (self.pd[i] && !d[i]) self.inputUp({keyCode:self.dPad[i].code});
        if (!self.pd[i] && d[i]) self.inputDown({keyCode:self.dPad[i].code});
    }

    self.pd = d;
    self.updateDpad(d);
    if (d.left || d.right || d.up || d.down) evt.preventDefault();
}

Input.prototype.isOnDpad = function(x,y) {
    var bb = this.dPad.main.getBoundingClientRect();
    var d = {};
    d.left = x > bb.left && x < bb.left + bb.width / 3 && y > bb.top && y < bb.top + bb.height;
    d.right = x > bb.left + bb.width / 3 * 2 && x < bb.left + bb.width && y > bb.top && y < bb.top + bb.height;
    d.up = y > bb.top && y < bb.top + bb.height / 3 && x > bb.left && x < bb.left + bb.width;
    d.down = y > bb.top + bb.height / 3 * 2 && y < bb.top + bb.height && x > bb.left && x < bb.left + bb.width;
    return d;
}

Input.prototype.updateDpad = function(d) {
    this.dPad.up.img.style.display = d.up ? "block" : "none";
    this.dPad.down.img.style.display = d.down ? "block" : "none";
    this.dPad.left.img.style.display = d.left ? "block" : "none";
    this.dPad.right.img.style.display = d.right ? "block" : "none";
}

window.engine.Input = Input;

window.scriptLoading = false;
    })()
