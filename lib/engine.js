(function(){
var engine;
window.engine = engine = {};

engine.version = "0.0.1";


// asset manager
//
engine.loading = true;
engine.assetManager = function AssetManeger() {
    var self = this;
    this.list = [];
    this.add = function add(direct) {
        var list = Array.prototype.slice.call(arguments);
        
        function add(l) {
            if (typeof l == "string") self.list.push(l); else for (var a in l) add(l[a]);
        }
        
        add(list);
        
        return self.list;
    }
    
    this.cash = [];
    this.start = function start(_calback) {
        for (var i in this.list) {
            this.download(this.list[i],_calback);
            return;
        }
        if (typeof _calback == "function") _calback();
    }
    
    this.download = function download(item,_calback) {
        var type = item.split(".").pop();
        var download;
        
        switch(type) {
            case "js":
                download = document.createElement("script");
                download.onload = waitForScript;
                window.scriptLoading = true;
                function waitForScript() {
                    if (window.scriptLoading) setTimeout(waitForScript,100); else self.start(_calback);
                }
                download.src = item;
                document.head.appendChild(download)
                break;
            case "css":
                download = document.createElement("link");
                download.rel = "stylesheet";
                download.onload = function() {self.start(_calback);}
                download.href = item;
                document.head.appendChild(download)
                break;
            case "png":
                download = new Image();
                download.onload = function() {self.start(_calback);}
                download.src = item;
                break;
        }
        this.cash.push(download);
        this.list.splice(this.list.indexOf(item),1);
    }
}
})()