(function(win){
    var pbox = document.getElementById("adplayer");
    var canvas = document.createElement("canvas");
    canvas.width = 600;
    canvas.height = 300;
    pbox.insertBefore(canvas,pbox.firstChild);
    var g = canvas.getContext("2d");
    g.lineStyle(4,"#ff0000");
    g.drawRect(0,0,400,300);
})(window);
