var out={};
var data=new Array();
var all = new Array();
collectData();
fillOutput();
printOut();


function printOut(){
	var toPrint="";
	toPrint+=1+"\n";
	for(var i = 0; i< out.home.length; i ++){
		toPrint+="{x:"+out.home[i].x+",y:"+out.home[i].y+"},\n";
	}
	toPrint+="X"+"\n";
	for(var i = 0; i< out.draw.length; i ++){
		toPrint+="{x:"+out.draw[i].x+",y:"+out.draw[i].y+"},\n";
	}
	toPrint+=2+"\n";
	for(var i = 0; i< out.away.length; i ++){
		toPrint+="{x:"+out.away[i].x+",y:"+out.away[i].y+"},\n";
	}
	console.log(toPrint);
}
function fillAll(odds,evens){
	for(var i =0;i<evens.length;i++){
		all[i*2]=evens[i];
		if(odds[i])all[i*2+1]=odds[i]
	}
}
function digNumber(a){
	if(a.children[0] == undefined){
		return parseInt(a.innerHTML);
	}else return digNumber(a.children[0]);
}
function collectData(){
	var table= document.getElementsByClassName("schema")[0];
	var evens = table.getElementsByClassName("tr_0");
	var odds = table.getElementsByClassName("tr_1");
	fillAll(odds, evens);
	fillData();
}
function fillData(){
	for(var i =0;i<all.length;i++){
		try{
			data[i]={
				x: digNumber(all[i].children[1]),
				y: digNumber(all[i].children[3]),
				o: getScore(all[i])
			}
		}catch(e){}
	}
}
function getScore(a){
	var score = a.getElementsByClassName("l_scr")[0].innerHTML.split("-");
	if(parseInt(score[0])>parseInt(score[1])) return '1';
	else if(parseInt(score[0])<parseInt(score[1])) return '2';
	else return 'X';
}
function fillOutput(){
	var h = gatherHome();
	var d = gatherDraw();
	var a = gatherAway();
	out={
		home: h,
		draw: d,
		away: a
	}
}
function gatherHome(){
	return gather('1');
}

function gatherDraw(){
	return gather('X');
}

function gatherAway(){
	return gather('2');
}
function gather(s){
	var gatheredData= new Array();
	var count=-1;
	for(var i =0; i<data.length;i++){
		try{
			if(data[i].o==s){
				gatheredData[(count+=1)]={
					x:data[i].x,
					y:data[i].y
				}
			}
		}catch(e){}
	}
	return gatheredData;
}