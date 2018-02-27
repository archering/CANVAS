var canvas = document.getElementById("me"),ctx = canvas.getContext("2d");

var elems = [];

var selected = {};
var dragging = false;
function draw(dat){
    ctx.save();
    ctx.beginPath();
    if(dat.fill){
        ctx.fillStyle = dat.color;
        ctx.fillRect(dat.x,dat.y,dat.w,dat.h);
        ctx.fill();
    }else{
        ctx.strokeStyle = dat.color;
        ctx.strokeRect(dat.x,dat.y,dat.w,dat.h);
        ctx.stroke();
    }
    ctx.closePath();
    ctx.restore(); 
}

function turntoLOC(canvas,x,y){
    var bound = canvas.getBoundingClientRect();
    //很有可能canvas的宽高和包含他的dom的宽高不一样，所以需要进行比例换算
    x = x - bound.left * (canvas.width / bound.width);
    y = y - bound.top * (canvas.height / bound.height);
    return  {x:x,y:y};
}
 
draw({x:100,y:50,w:100,h:50,fill:true,color:"red"});
elems.push({x:100,y:50,w:100,h:50,fill:true,color:"red"});

draw({x:200,y:150,w:100,h:150,fill:false,color:"green"});
elems.unshift({x:200,y:150,w:100,h:150,fill:false,color:"green"});

canvas.onmousedown = function(e){
     var x = e.x || e.clientX;
    var y = e.y || e.clientY;
    var loc = turntoLOC(this,x,y);
    
    for(var i=0;i<elems.length;i++){
        var the = elems[i];
        ctx.beginPath();
        ctx.rect(the.x,the.y,the.w,the.h);
        ctx.closePath();
        if(ctx.isPointInPath(loc.x,loc.y)){
            selected.index = i;
            selected.dat = the;
            selected.gap = {w:loc.x - the.x, h: loc.y - the.y};
            elems.splice(i,1);
            dragging = true;
            break;
        }
        
    }
    
}


canvas.onmousemove = function(e){
    if(dragging){
         var x = e.x || e.clientX;
        var y = e.y || e.clientY;
        var loc = turntoLOC(this,x,y);       
        ctx.clearRect(0,0,canvas.width,canvas.height);
        
        for(var i=0;i<elems.length;i++){
            var the = elems[i];
            draw(the);
            
        }
        
        
        
        
        var o = JSON.parse(JSON.stringify(selected.dat));
        o.x = loc.x - selected.gap.w;
        o.y = loc.y - selected.gap.h;
        draw(o);
        selected.dat = o;
    }
}

canvas.onmouseup = function(){
    if(dragging){
        elems.unshift(selected.dat);
        selected = {};
    } 
    dragging = false;
}










