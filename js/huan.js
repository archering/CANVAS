var canvas = document.getElementById("me");
var ctx = canvas.getContext("2d");

//绘制圆环 其实就是绘制一个粗边框的圆，不填充
ctx.save();
ctx.beginPath();
ctx.lineWidth = 20;
ctx.strokeStyle = "#ccc";
ctx.arc(200,200,100,0,2*Math.PI);
ctx.stroke();
ctx.restore();


function setPercent(){
	ctx.clearRect(150,150,100,100);
	ctx.save();
	ctx.strokeStyle = "green";
	ctx.beginPath();
	ctx.textAlign = "center";
	ctx.textBaseline = "middle";
	ctx.lineWidth = 2;
	ctx.font = "40px Arial";
	ctx.strokeText(val+"%",200,200);
	ctx.stroke();
	ctx.restore();

}
function drawCicle(){
	ctx.save();
	ctx.beginPath();
	ctx.strokeStyle = "#ac1616";
	ctx.lineWidth = 20;

	//直角坐标系，是逆时针的，但是现实中人喜欢看顺时针的和表盘一样， 我们以12 点为0点，顺时针走
	ctx.arc(200,200,100,-90*Math.PI/180,(3.6*val-90)*Math.PI/180);
	ctx.stroke();
	setPercent();
	window.requestAnimationFrame(drawCicle);
}

var val = 1;
var a = setInterval(function(){
	drawCicle();
	val++;
},1000);
