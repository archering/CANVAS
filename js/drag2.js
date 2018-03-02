var canvas = document.getElementById("me");
var ctx = canvas.getContext("2d");

var elems = [];



draw({x:30,y:20,w:100,h:80,fill:true,color:"rgba(255, 107, 28, 1)"});
elems.push({x:30,y:20,w:100,h:80,fill:true,color:"rgba(255, 107, 28, 1)"});
draw({x:130,y:120,w:100,h:80,fill:false,color:"green"});
elems.unshift({x:130,y:120,w:100,h:80,fill:false,color:"green"});

function draw(o){
	ctx.save();
	ctx.beginPath();//这个很重要，要不然会删除不掉原点的图形
	if(o.fill){
		ctx.fillStyle = o.color;
		ctx.fillRect(o.x,o.y,o.w,o.h);
		ctx.fill();
	}else{
		ctx.strokeStyle = o.color;
		ctx.strokeRect(o.x,o.y,o.w,o.h);
		ctx.restore();
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

var draging = false;

canvas.onmousedown = function(e){
    var x = e.x || e.clientX;
    var y = e.y || e.clientY;
    var loc = turntoLOC(this,x,y);  
	for(var i=0;i<elems.length;i++){
		var the = elems[i];
		ctx.beginPath();
		ctx.rect(the.x,the.y,the.w,the.h);//这个地方用的方法是 rect  不是strokeRect  或者fillRect
		ctx.closePath();
		if(ctx.isPointInPath(loc.x,loc.y)){
			draging = true;//loc 是拖动点， the.x y 是图形的起始点
			elems.active = {the:the,w1:loc.x - the.x,h1:loc.y - the.y};
			elems.splice(i,1);
			break;
		}
	}
}

//在move 过程中 重绘原图形
function update(loc){
	var act = elems.active;
	var x0 = loc.x - act.w1; 
	var y0 = loc.y - act.h1;
	draw(Object.assign(act.the,{x:x0,y:y0}));
}


function putback(){
	elems.forEach(function(dat){
		draw(dat);
	});
}

canvas.onmousemove = function(e){
    if(draging){
		var x = e.x || e.clientX;
		var y = e.y || e.clientY;
		var loc = turntoLOC(this,x,y);
		ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);//清屏
		putback();
		update(loc);
	}
}

canvas.onmouseup = function(e){
    var x = e.x || e.clientX;
    var y = e.y || e.clientY;
    var loc = turntoLOC(this,x,y);
	
	if(draging){
		elems.unshift(elems.active.the);
		elems.active = null;
		draging = false;
	}
}

canvas.onmouseout = function(e){
	if(draging){
		elems.unshift(elems.active.the);
		elems.active = null;
		draging = false;
	}
}



