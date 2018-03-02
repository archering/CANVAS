var canvas = document.getElementById("me");
var ctx = canvas.getContext("2d");



ctx.save();
ctx.font = "20px Arial";
ctx.strokeStyle = "blue";
ctx.strokeText("Hello World",100,200);
ctx.restore();

ctx.save();
ctx.font = "20px Arial";
ctx.fillStyle = "green";
ctx.fillText("Hello World",100,230);
ctx.restore();

ctx.save();
ctx.font = "30px Arial";
ctx.fillStyle = "#717171";
ctx.lineWidth = 4;
ctx.strokeStyle = "#ccc";
ctx.strokeText("Hello World",100,270);
ctx.stroke();
ctx.fillText("Hello World",100,270);
ctx.restore();


//上下 左右居中文字
ctx.save();
ctx.fillStyle = "#717171";
ctx.strokeStyle = "#ccc";
ctx.strokeRect(600,200,200, 40);
ctx.stroke();
ctx.restore();
ctx.lineWidth = 4;
ctx.save();
ctx.textBaseline = "middle";
ctx.textAlign = "center";
ctx.lineWidth = 2;
ctx.font = "30px Arial";
ctx.strokeText("Hello World",600 + 200/2,200 + 40/2);
ctx.fillText("Hello World",600 + 200/2,200 + 40/2);
ctx.stroke();
ctx.restore();


//文字颜色渐变
ctx.save();
var fde = ctx.createLinearGradient(300,200,500,200);//x,y,起始点，问
fde.addColorStop(0,"red");
fde.addColorStop(0.5,"blue");
fde.addColorStop(1,"purple");
ctx.lineWidth = 2;
ctx.font = "20px Arial";
ctx.strokeStyle = fde;
ctx.strokeText("Hello World this is a test",300,200);
ctx.stroke();
ctx.restore();


ctx.save();
var fde = ctx.createLinearGradient(300,300,400,300);//y值不变， 渐变色会按照 下面的stop 一步步来，y值不变，x渐变，就是在这一区域内横向慢慢过渡到红绿紫色
  fde.addColorStop(0,'rgb(192, 80, 77)');    // 红
  fde.addColorStop(0.5,'rgb(155, 187, 89)'); // 绿
  fde.addColorStop(1,'rgb(128, 100, 162)');  // 紫
ctx.fillStyle = fde;
ctx.fillRect(300,300,100,200);
ctx.fill();
ctx.restore();

ctx.save();
var fde = ctx.createLinearGradient(500,300,500,500);//x 值不变，y变，纵向慢慢渐变到 紫色
  fde.addColorStop(0,'rgb(192, 80, 77)');    // 红
  fde.addColorStop(0.5,'rgb(155, 187, 89)'); // 绿
  fde.addColorStop(1,'rgb(128, 100, 162)');  // 紫
ctx.fillStyle = fde;
ctx.fillRect(500,300,100,200);
ctx.fill();
ctx.restore();

ctx.save();
var fde = ctx.createLinearGradient(700,300,800,500);//x，y 值都变， 颜色x方向和y方向同时慢慢渐变
  fde.addColorStop(0,'rgb(192, 80, 77)');    // 红
  fde.addColorStop(0.5,'rgb(155, 187, 89)'); // 绿
  fde.addColorStop(1,'rgb(128, 100, 162)');  // 紫
ctx.fillStyle = fde;
ctx.fillRect(700,300,100,200);
ctx.fill();
ctx.restore();
