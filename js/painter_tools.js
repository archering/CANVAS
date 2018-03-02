/*****
** 这个js 主要用来处理，工具栏的绘画和交互
****/ 
var tcanvas = document.getElementById("tool_bar"),tctx = tcanvas.getContext("2d");


var tools = [];
var selectedIndex = null;
function setActiveToolShadow(ctx){
    ctx.shadowColor = "#656565";
    ctx.shadowOffsetX = 4;
    ctx.shadowOffsetY = 4;
    ctx.shadowBlur = 5;
}

function setCommonToolShadow(ctx){
    ctx.shadowColor = "#8b8b8b";
    ctx.shadowOffsetX = 1;
    ctx.shadowOffsetY = 1;
    ctx.shadowBlur = 2;     
    
}
//DOM坐标转换成 CANVAS坐标
function turntoLOC(canvas,x,y){
    var bound = canvas.getBoundingClientRect();
    //很有可能canvas的宽高和包含他的dom的宽高不一样，所以需要进行比例换算
    x = x - bound.left * (canvas.width / bound.width);
    y = y - bound.top * (canvas.height / bound.height);
    return  {x:x,y:y};
}
/***
** 设置工具栏
***/
function setTools(ctx){
    ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
    setBlock(ctx);
}

function setBlock(ctx){   
    for(var i=0;i<9;i++){
        var x = 15,y = i*50+10*(i+1)+20;
        drawBlock(ctx,x,y,i);//画矩形外框
        drawIcon(ctx,x,y,i);//在外框里面画图标
        tools.push({index:i,x:x,y:y});
    }
}

function drawBlock(ctx,x,y,index){
    ctx.save();
    if(tools[index] && tools[index].active){
        setActiveToolShadow(ctx);
    }else{
        setCommonToolShadow(ctx);
    }
    ctx.lineJoin = "round";
    ctx.beginPath();   
        ctx.lineWidth = 1;
        ctx.fillStyle = "white";
        ctx.strokeRect(x,y,50,50);
        ctx.fillRect(x,y,50,50);
        ctx.stroke();
        ctx.fill();
    ctx.closePath(); 
        ctx.restore();    
}

function drawLine(ctx,x,y,step,gap){
    var gap = gap || 0;
    var step = step || 45;
    ctx.beginPath();
    ctx.moveTo(x+5,y+5);
    ctx.lineTo(x+step,y+step);
    ctx.closePath();
    ctx.stroke();      
}

function drawRect(ctx,x,y,step,gap,func){
    var gap = gap || 0;
    var w = (step && step.x)? (step && step.x) - (x-gap):40;
    var h = (step && step.y)? (step && step.y) - (y-gap):40;
    if(typeof(func)=="function") {
        func(ctx,x,y,w,h);
        return;
    }
    ctx.beginPath();
    ctx.strokeRect(x+gap,y+gap,w,h);
    ctx.closePath();
    ctx.stroke();      
}

//画左侧的工具栏里面的图标
function drawIcon(ctx,x,y,index){
    ctx.save(); 
    switch(index){
        case 0:// 画线
            drawLine(ctx,x,y);
            break;
        case 1://画矩形
           drawRect(ctx,x,y,0,5);
            break;
        case 2://画圆形
            ctx.beginPath();
            ctx.arc(x+(50/2),y+(50/2),20,0,360);
            ctx.closePath();
            ctx.stroke();               
            break;
        case 3:
            ctx.moveTo(x+10,y+10);
            ctx.lineTo(x+20,y+10);
            ctx.lineTo(x+42,y+5);
            ctx.lineTo(x+38,y+33);
            ctx.lineTo(x+45,y+33);
            ctx.lineTo(x+30,y+43);
            ctx.lineTo(x+10,y+43);
            ctx.lineTo(x+10,y+23);
//            ctx.closePath();
            ctx.stroke();
            break;
        case 4:
            ctx.beginPath();
            ctx.moveTo(x+10,y+10);
            ctx.lineTo(x+20,y+10);
            ctx.lineTo(x+42,y+5);
            ctx.lineTo(x+38,y+33);
            ctx.lineTo(x+45,y+33);
            ctx.lineTo(x+30,y+43);
            ctx.lineTo(x+10,y+43);
            ctx.lineTo(x+10,y+23);
            ctx.closePath();//线闭合
            ctx.stroke();            
            break;
        case 5:
            ctx.beginPath();
            ctx.font = "50px Arial";
            ctx.textAlign = "center";//字体会左右居中
            ctx.textBaseline = "middle";//字体会上下居中
            ctx.strokeText("T",x + (50/2),y + (50/2));
            ctx.fillText("T",x + (50/2),y + (50/2));
            break;
        case 6:
            drawCurveIcon(ctx,x,y);
            break;
        case 7:
            drawSlinkyIcon(ctx,x,y);
            break;
        case 8:
            drawEraseIcon(ctx,x,y);
            break;      
    }
    ctx.restore(); 
}

//画橡皮擦图标
function drawEraseIcon(ctx,x,y){
    ctx.beginPath();
    ctx.arc(x + 50/2,y+50/2,20,0 ,Math.PI*2);
    ctx.stroke();
    ctx.closePath();
    ctx.clip();
    var step = 5;
    
     

    ctx.save();
    ctx.beginPath();   
    ctx.strokeStyle = "red";
    ctx.globalAlpha = 0.2;
    while(step<50){
        ctx.moveTo(x,y+step);
        ctx.lineTo(x+50,y+step);
        
        ctx.moveTo(x+step,y);
        ctx.lineTo(x+step,y+50);            
        step +=5;     
    }
    ctx.closePath();
    ctx.stroke();
    ctx.restore(); 
}

//画 贝塞尔曲线图标
function drawCurveIcon(ctx,x,y){
    ctx.beginPath();
    ctx.moveTo(x+10,y+10);
    ctx.quadraticCurveTo(x+35,y+5,x+35,y+40);
    ctx.stroke();
}
//画连环图标
function drawSlinkyIcon(ctx,x,y){
    for(var i=2;i<50/4 + 3;i+=1){
        if(i<50/6){
            var x1 = x + 50/3 + i + 50/8;
        }else{
            x1 = x + 50/3 + (50/3 - i) + 50/8;
         }     
        var y1 = y + 50/3 + i;
		ctx.beginPath();
		ctx.lineWidth = 0.5;
		ctx.strokeStyle = "rgb(32, 96, 240)";
		ctx.arc(x1,y1,12,0,Math.PI*2,false);
		ctx.stroke();
    }
}


// 启动绘画
setTools(tctx);




function updateToolIcon(ctx,rect){
    //删除原旧的图标
    ctx.clearRect(rect.x-2,rect.y-2,60,60);
    
    //重画block
    drawBlock(ctx,rect.x,rect.y,rect.index);
    //重画图标
    drawIcon(ctx,rect.x,rect.y,rect.index);
}

// 事件 以下是事件的工具栏图标 事件的相应处理
// 因为是和用户的交互，必须是用户可见的部分，必然在window的区域内，所以不用pageX
tcanvas.onclick = function(e){
    var ctx = this.getContext("2d");
    var x = e.x || e.clientX;
    var y = e.y || e.clientY;
    var loc = turntoLOC(this,x,y);
    var already = false;
    for(var i =0;i<tools.length;i++){
        var rect = tools[i];
        ctx.beginPath();
        ctx.rect(rect.x,rect.y,50,50);
        ctx.closePath();
        if(!already && ctx.isPointInPath(loc.x,loc.y)){
            selectedIndex = rect.index;
			if(selectedIndex !=5) str = "";
            if(rect.active) return;
            already = true;
            rect.active = true;
            updateToolIcon(ctx,rect);
        }else{
            if(rect.active){
                rect.active = false;
                updateToolIcon(ctx,rect);
                if(already) return;
            }
        }
    }
}
