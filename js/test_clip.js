var canvas = document.getElementById("me"),ctx = canvas.getContext("2d");

var w = canvas.width,h = canvas.height;
ctx.save();
ctx.strokeStyle="red";
ctx.arc(w/2,h/2,40,0,Math.PI*2);
ctx.stroke();
ctx.restore();
ctx.clip();

drawGrid(ctx);




function drawGrid(ctx){
    ctx.save();
    ctx.fillStyle = "white";
    ctx.fillRect(w/2 - 50,h/2 - 50, 100,100);
    ctx.fill();
    
    var step = 10;
        
    ctx.beginPath();
    ctx.strokeStyle = "rgba(0, 0, 255, 0.37)";
    while(step<100){
        ctx.moveTo(w/2 - 50,h/2 - 50 + step);
        ctx.lineTo(w/2 + 50,h/2 - 50+ step);
        ctx.stroke();
        
        ctx.moveTo(w/2 - 50 + step,h/2 - 50);
        ctx.lineTo(w/2 - 50 + step,h/2 + 50);
        ctx.stroke();        

        step +=10;
        
    }
    ctx.closePath();
    ctx.restore();
       
}