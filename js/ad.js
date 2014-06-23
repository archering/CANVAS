;(function(win){
    var pbox = document.getElementById("adplayer");
    var canvas = document.createElement("canvas");
    canvas.width = "960";
    canvas.height = "540";
    canvas.id = "ad";
    pbox.insertBefore(canvas,pbox.firstChild);
    var g = canvas.getContext("2d");
    g.drawRect(0,0,400,300);
    g.lineStyle(4,"#ff0000");//要写在下面
    g.beginFill("#00ff00",0.1);//要写在填充的下面
}(window));
