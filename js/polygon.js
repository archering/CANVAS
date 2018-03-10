var canvas = document.getElementById("me"),ctx = canvas.getContext("2d");

ctx.save();
ctx.beginPath();
ctx.lineWidth = 0.2;
ctx.moveTo(0,canvas.height/2);
ctx.lineTo(canvas.width,canvas.height/2);
ctx.moveTo(canvas.width/2,0);
ctx.lineTo(canvas.width/2,canvas.height);

ctx.moveTo(canvas.width/2,canvas.height/2);
ctx.arc(canvas.width/2,canvas.height/2,200,0,2*Math.PI);
ctx.stroke();
ctx.restore();


/****
**@param sa{角度} 启示角度
**@param po{Object} 圆心 
**/
function getPoints(po,sa,r,c){
    var points = [];
    for(var i=0;i<c;i++){
        var x = po.x - r*Math.cos((sa+i*360/c)*Math.PI/180);
        var y = po.y - r*Math.sin((sa+i*360/c)*Math.PI/180);
        points.push({x:x,y:y});
    }
    
    return points;
}

function polygon(po,sa,r,c){
    if(c<=2) return;
    var arr = getPoints(po,sa,r,c);
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(arr[0].x,arr[0].y);
    for(var i=1;i<arr.length;i++){
        var o = arr[i];
        ctx.lineTo(o.x,o.y);
    }
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
        
}

polygon({x:canvas.width/2,y:canvas.height/2},90,200,5);
polygon({x:canvas.width/2,y:canvas.height/2},90,150,6);
polygon({x:canvas.width/2,y:canvas.height/2},90,100,7);