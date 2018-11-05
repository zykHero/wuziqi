// JavaScript Document
var chess=document.getElementById('chess');
var context=chess.getContext('2d');//指定2维绘图
var color=true;
var m=-1,
		n=-1;
var chessBoard=[];
for(var i=0;i<5;i++){
	chessBoard[i]=[];
	for(var j=0;j<5;j++){
		chessBoard[i][j]=0;
	}
}
dreawchsee()

function dreawchsee(){
	for(var i=0;i<5;i++){
		context.moveTo(15+30*i,15);
		context.lineTo(15+30*i,135);
		context.stroke();
		
		context.moveTo(15,15+30*i);
		context.lineTo(135,15+30*i);
		context.stroke();
		context.strokeStyle="#BFBFBF";
	}
}
function oneStep(i,j,color){//i，j是棋盘上的索引[与棋盘中for循环中的一致]，me代表棋子颜色	
			context.beginPath();
			context.arc(15+30*i,15+30*j,13,0,2*Math.PI);
			context.stroke();
			context.closePath();	
			var gradient=context.createRadialGradient(15+30*i-2,15+30*j-2,13,15+30*i+2,15+30*j+2,0);	
			if(color==true){//黑棋创建
				gradient.addColorStop(0,"#0A0A0A");
				gradient.addColorStop(1,"#636766");		
		}else {//白棋创建
				gradient.addColorStop(0,"#D1D1D1");
				gradient.addColorStop(1,"#F9F9F9");
			}
			context.fillStyle=gradient;
			context.fill();
/*			context.strokeStyle="#EE2C2C";*/
	}
	
chess.onclick=function(e){
 a:for(var i=0;i<5;i++){//和棋判断
		for(var j=0;j<5;j++){
			if(chessBoard[i][j]==0){
					sign=-1;
					break a;
		}else{
			sign=1;
		}
	}
}	
	if(sign==1){
			alert("和棋！");
}	

	var x=e.offsetX,
			y=e.offsetY;
	var i=Math.floor(x/30),
			j=Math.floor(y/30);
	if(chessBoard[i][j]==0){
			oneStep(i,j,color);
			
			chessBoard[i][j]=1;
			color=!color;
		}
}
