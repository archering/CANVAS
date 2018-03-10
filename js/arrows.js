var canvas = document.getElementById("me"),ctx = canvas.getContext("2d");

ctx.save();
ctx.beginPath();
ctx.lineWidth = 0.2;
ctx.moveTo(0,canvas.height/2);
ctx.lineTo(canvas.width,canvas.height/2);
ctx.moveTo(canvas.width/2,0);
ctx.lineTo(canvas.width/2,canvas.height);
ctx.stroke();
ctx.restore();

//画十字坐标
function cross(p,len){
    ctx.save();
    ctx.beginPath();
    ctx.lineWidth = 0.2;
    ctx.strokeStyle = "#2e4b00";
    ctx.moveTo(p.x-len,p.y);
    ctx.lineTo(p.x+len,p.y);
    ctx.moveTo(p.x,p.y-len);
    ctx.lineTo(p.x,p.y+len);
    ctx.stroke();
    ctx.restore();   
}

//画两点之间的直线
function drawLine(p0,p1,opts){
    ctx.save();
    ctx.beginPath();
    ctx.lineWidth = (opts&&opts.lineWidth)||1;
    ctx.strokeStyle = (opts&&opts.style)||"#006bb9";   
    ctx.moveTo(p0.x,p0.y);
    ctx.lineTo(p1.x,p1.y);
    ctx.stroke();
    ctx.restore();
}

//画一个点，半径5个圆
function point(x,y){
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = "rgba(242, 24, 108, 0.5)";
    ctx.arc(x,y,5,0,2*Math.PI);
    ctx.fill();
    ctx.closePath();
    ctx.restore();
}

//延长线
//angle 是弧度
function extLine(p0,p1,len,opts){
    var α =  slope(p0,p1)*Math.PI/180;
    ctx.save();
    ctx.beginPath(); 
    ctx.strokeStyle = (opts&&opts.color)||"#fd5307";
    ctx.setLineDash([5,5]);
    ctx.moveTo(p1.x,p1.y);
    ctx.lineTo(p1.x + len*Math.cos(α),p1.y+len*Math.sin(α));
    ctx.stroke();
    ctx.restore();
    
}

//延长线上一点
function extLineP(p0,p1,len){
    var α =  slope(p0,p1)*Math.PI/180;
    return {x:p1.x + len*Math.cos(α),y:p1.y+len*Math.sin(α)};
}

//角度  使用时换成弧度
function slope(p0,p1){
    return Math.atan2(p1.y-p0.y,p1.x-p0.x)*180/Math.PI;
}

function arrow(p0,p1,r,θ){
    var α =  slope(p0,p1);
    var x0 = p1.x - r*Math.cos((α-θ)*Math.PI/180);
    var y0 = p1.y - r*Math.sin((α-θ)*Math.PI/180);
    drawLine(p1,{x:x0,y:y0});
    
    var x1 = p1.x - r*Math.cos((α+θ)*Math.PI/180);
    var y1 = p1.y - r*Math.sin((α+θ)*Math.PI/180);  
    drawLine(p1,{x:x1,y:y1});
    return {x0:x0,y0:y0,x1:x1,y1:y1}
}

var num = 0;
//写角度值
function angleText(rp,r,sa,a,c){
    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle = c||"red";
    ctx.arc(rp.x,rp.y,r,sa*Math.PI/180,(sa+a)*Math.PI/180);
    ctx.stroke();
    ctx.restore();

    ctx.save();
    ctx.beginPath();
    ctx.textAlign="center";
    ctx.textBaseline = "middle";
    ctx.strokeText("θ"+num,rp.x + (r+10)*Math.cos((sa+a/2)*Math.PI/180),rp.y + (r+10)*Math.sin((sa+a/2)*Math.PI/180));
    
    ctx.stroke();
    ctx.restore();
    
    num++;
}

function fillArrow(p0,p1,p2){
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(p0.x,p0.y);
    ctx.lineTo(p1.x,p1.y);
    ctx.lineTo(p2.x,p2.y);
    ctx.arcTo(p1.x,p1.y,p0.x,p0.y,30);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
}


drawLine({x:200,y:600},{x:680,y:200});
cross({x:680,y:200},200);

var pos = arrow({x:200,y:600},{x:680,y:200},60,30);
var pos2 = arrow({x:680,y:200},{x:200,y:600},60,30);
fillArrow({x:pos2.x0,y:pos2.y0},{x:200,y:600},{x:pos2.x1,y:pos2.y1});
extLine({x:pos.x0,y:pos.y0},{x:680,y:200},200);// 画延长线

angleText({x:680,y:200},50,slope({x:pos.x0,y:pos.y0},{x:680,y:200}),30);// 画延长线 弧度表示

extLine({x:200,y:600},{x:680,y:200},200,{color:"#032ee3"});

angleText({x:680,y:200},50,slope({x:200,y:600},{x:680,y:200}),-slope({x:200,y:600},{x:680,y:200}),"#032ee3");

point(680,200);
// 画弧度线的箭头，也是需要知道 弧度上这一点的 切线

ctx.save();
ctx.beginPath();

ctx.arc(200,210,120,100*Math.PI/180,300*Math.PI/180,false);
ctx.stroke();
ctx.restore();

var px0 = {x:200-120*Math.cos(100*Math.PI/180),y:210-120*Math.sin(100*Math.PI/180)}
point(px0.x,px0.y);

var px1 = {x:200-120*Math.cos(300*Math.PI/180),y:210-120*Math.sin(300*Math.PI/180)}

point(px1.x,px1.y);

cross({x:200,y:210},150);

//经过圆上一点的切线方程
//(px0.x-200)*(x-200) + (px0.y-210)*(y-210) = Math.pow(120,2) - ;

function getY(p,x){
    return (Math.pow(120,2) - (p.x-200)*(x-200))/(p.y-210) + 210
}

var y8 = getY(px0,px0.x+10);
    x8 = px0.x+10;

arrow({x:x8,y:y8},px0,20,30);
var y9 = getY(px1,px1.x+10);
    x9 = px1.x+10;
arrow({x:x9,y:y9},px1,20,30);