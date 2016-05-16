(function(){
var LS = {};

LS.c = document.createElement('div');
LS.c.className = 'loadingScreen';
LS.c.id = 'loadingScreen';
LS.c.style.display = 'block';
LS.sc = document.createElement('div');
LS.sc.className = 'gauge-container';
LS.s = document.createElement('div');
LS.s.className = 'gauge-loader';
LS.t = document.createElement('div');
LS.t.className = 'gauge-text';
LS.t.id = 'loadingScreenText';
LS.sc.appendChild(LS.t);
LS.sc.appendChild(LS.s);
LS.c.appendChild(LS.sc);
document.body.appendChild(LS.c);

LS.open = function () {
    console.log('loading screen open');
    LS.c.style.display = 'block';
}
LS.close = function () {
    console.log('loading screen close');
    LS.c.style.display = 'none';
}
LS.updateLoadingSign = function (text) {
    LS.t.textContent = text;
}

LS.updateLoadingSign('hy');

    
window.engine.LS = LS;
window.scriptLoading = false;
    })()