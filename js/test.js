var tcanvas = document.getElementById("tool_bar"),
    dcanvas = document.getElementById("canvas_area"),
    tctx = tcanvas.getContext("2d"),
    dctx = dcanvas.getContext("2d");




setGrid(dctx);

/***
** 设置绘图区域的经纬线背景
***/
function setGrid(ctx){
    ctx.save();
    ctx.globalAlpha = 0.1;
    ctx.strokeStyle = "red";
    
    drawHorizontalLines(ctx);
    drawVerticalLines(ctx);
    
    ctx.restore();
}

/****
** 绘制经度线
***/
function drawHorizontalLines(ctx){
    var h = ctx.canvas.height;
    var step = 10;
    while(step<h){
        ctx.moveTo(0,step);
        ctx.lineTo(ctx.canvas.width,step);
        step +=10;
    }
    ctx.stroke();
}
/***
** 绘制维度线
***/
function drawVerticalLines(ctx){
    var w = ctx.canvas.width;
    var step = 10;
    while(step<w){
        ctx.moveTo(step,0);
        ctx.lineTo(ctx.canvas.width,step);
        step +=10;
    }
    ctx.stroke();    
}