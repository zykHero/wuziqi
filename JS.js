var color=true;
var over=false;//表示棋局是否结束，开始时flase表示没结束
var count=0;//计数：赢法的个
var sign=0;
var chess=document.getElementById('chess');
var context=chess.getContext('2d');//指定2维绘图
drawChessBoard();

//棋盘数组
var chessBoard=[];
//赢法数组
var wins=[];
//赢法统计数组
var myWin=[];
var computerWin=[];
//初始化chessBoadr[][]数组
for(var i=0;i<15;i++){
	chessBoard[i]=[];
	for(var j=0;j<15;j++){
		chessBoard[i][j]=0;
	}
}
//初始化数组wins[]
for(var i=0;i<15;i++){
	wins[i]=[];
	for(var j=0;j<15;j++){
		wins[i][j]=[];
	}
}

//所有横线
for(var i=0;i<15;i++){
	for(var j=0;j<11;j++){
		for(var k=0;k<5;k++){
			wins[i][j+k][count]=true;
		}
			count++;
	}
}
//所有竖线
for(var i=0;i<15;i++){
	for(var j=0;j<11;j++){
		for(var k=0;k<5;k++){
			wins[j+k][i][count]=true;
		}
			count++;
	}
}
//所有斜线
for(var i=0;i<11;i++){
	for(var j=0;j<11;j++){
		for(var k=0;k<5;k++){
			wins[i+k][j+k][count]=true;
		}
		count++;
	}
}
//所有反斜线[有错]
for(var i=0;i<11;i++){
	for(var j=14;j>3;j--){
		for(var k=0;k<5;k++){
			wins[i+k][j-k][count]=true;
		}
		count++;
	}
}
//初始化数组myWin[]、computerWin[]
for(var i=0;i<count;i++){
	myWin[i]=0;
	computerWin[i]=0;
}

//棋盘的画法
function drawChessBoard(){
	for(var i=0;i<15;i++){
		  //纵向线
			context.moveTo(15+30*i,15);
			context.lineTo(15+30*i,435);
			context.stroke();//进行输出线条（画线）
			//横向线
			context.moveTo(15,15+30*i);
			context.lineTo(435,15+30*i);
			context.stroke();//进行输出线条（画线)
			context.strokeStyle="#BFBFBF";//设置画的线的颜色
	}
	
}

//创建棋子
function oneStep(i,j,color){//i，j是棋盘上的索引[与棋盘中for循环中的一致]，me代表棋子颜色	
			context.beginPath();
			context.arc(15+30*i,15+30*j,13,0,2*Math.PI);
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
	}

//鼠标点击落子
chess.onclick=function(e){
	if(over){//如果结束就return
		return;
	}
	if(!color){//如果不是我方下棋，就return
		return;
	}
	a:for(var i=0;i<15;i++){//全局棋子，和棋判断
			for(var j=0;j<15;i++){
				if(chessBoard[i][j]==0){
					sign=-1;
					break a;
				}else{
					sign=1;
				}
			}
	}
	if(sign==1){
		alert("已和棋，请重新开始！");
	}
	//获得鼠标的x,y的坐标
	var x=e.offsetX,
			y=e.offsetY;
//找到鼠标在棋盘（网格）中对应的点
	var i=Math.floor(x/30),
			j=Math.floor(y/30);
	if(chessBoard[i][j]==0){//如果棋盘数组元组是0
			oneStep(i,j,color);//点击第一下是color=true，
				/*if(color){
					chessBoard[i][j]=1;
				}else{
					chessBoard[i][j]=2;
				}*/
			chessBoard[i][j]=1;//说明棋盘中i、j点有子了
		
			for(var k=0;k<count;k++){
				if(wins[i][j][k]){
					myWin[k]++;
					computerWin[k]=6;//设为异常，表示白棋不可能赢了
					if(myWin[k]==5){
						window.alert("你赢了！");
						over=true;//棋局结束
					}
				}
			}
			if(!over){
				color=!color;//设定color是flase，所以是白棋
				computerAI();
			}
	}
}
function computerAI(){
	var myScore=[];//人的分数
	var computerScore=[];//电脑的分数
	var max=0;//定义最高分数
	var u=0,//定义最高分数点的坐标
			v=0;
	for(var i=0;i<15;i++){
		myScore[i]=[];
		computerScore[i]=[]
		for(var j=0;j<15;j++){
			myScore[i][j]=0;
			computerScore[i][j]=0;
		}
	}
	//遍历整个棋盘
	for(var i=0;i<15;i++){
		for(var j=0;j<15;j++){
			if(chessBoard[i][j]==0){
				for(var k=0;k<count;k++){
					if(wins[i][j][k]){//如果wins[i][j][k]=true,赢法存在
						if(myWin[k]==1){//黑棋是一颗子
							myScore[i][j]+=200;//加分
						}else if(myWin[k]==2){//黑棋是两颗子
							myScore[i][j]+=400;//若是电脑不拦截则加400分
						}else if(myWin[k]==3){
							myScore[i][j]+=2000;
						}else if(myWin[k]==4){
							myScore[i][j]+=10000;
						}
						if(computerWin[k]==1){
							computerScore[i][j]+=220;//加分
						}else if(myWin[k]==2){//白棋是两颗子
							computerScore[i][j]+=420;//若是电脑不拦截则加420分
						}else if(myWin[k]==3){
							computerScore[i][j]+=2200;
						}else if(myWin[k]==4){
							computerScore[i][j]+=20000;
						}
					}
				}
				//找出得分最高的点u，v
				if(myScore[i][j]>max){
					max=myScore[i][j];
					u=i;
					v=j;
				}else if(myScore[i][j]==max){
					if(computerScore[i][j]>computerScore[u][v]){
						u=i;
						v=j;
					}
				}
				if(computerScore[i][j]>max){
					max=computerScore[i][j];
					u=i;
					v=j;
				}else if(computerScore[i][j]==max){
					if(myScore[i][j]>myScore[u][v]){
						u=i;
						v=j;
					}
				}
			}
		}
	}
	oneStep(u,v,false);
	chessBoard[u][v]=2;
	//计算机下完棋，也要更新赢法的统计数组
	for(var k=0;k<count;k++){
				if(wins[u][v][k]){
					computerWin[k]++;
					myWin[k]=6;//设为异常，表示白棋不可能赢了
					if(computerWin[k]==5){
						window.alert("计算机赢了！");
						over=true;//棋局结束
					}
				}
			}
			if(!over){
				color=!color;//设定color是flase，所以是白棋
	}
}










//加水印，不成功
/*var logo=new Image();
logo.src="G:\站点\兴趣\五子棋\imges\5.gif";
logo.onload=function(){
	context.drawImage(logo,0,0,450,450);//object.drawImage(图片名,起始点（x,y）,终点（x,y）)
	drawChessBoard();//防止logo在棋盘之上
}
*/





