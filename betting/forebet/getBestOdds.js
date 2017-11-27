var count = 30;
var bet = 25;
var state = 0;
var stats;
var interv;

function print(){
	console.log("Bet: "+bet);
	console.log("Count: "+count);
}

function AI(){
	try{
		if(bet>=30){
			print();
			clearInterval(interv);
			return;
		}
		if(state == 0){
			getNextMatch();
		}else if(state == 1){
			getBestOdd();
		}
	}catch(e){
		print();
		clearInterval(interv);
	}
}

function getNextMatch(){
	var odds = document.getElementsByClassName("market-open");
	var matches = document.querySelectorAll("div[class=moremarkets]");
	if(odds && odds.length > 0) return;
	if(!matches || matches.length==0) return;
	getStats(document.getElementsByClassName("match-row")[2+count].getAttribute('mid'));
	matches[count].click();
	state++;
}
function getLowestOdd(){
	var odds = document.getElementsByClassName("market-open");
	var matches = document.querySelectorAll("div[class=moremarkets]");
	if(matches && matches.length > 0) return;
	if(!odds || odds.length==0) return;
	var min=0;
	var p=document.getElementsByClassName("selection");
	for(var i=0;i<p.length;i++){
		if(!isNaN(p[i].innerHTML)){
			if(parseFloat(p[i].innerHTML)<parseFloat(p[min].innerHTML))min =i;
		}
	}
	if(parseFloat(p[min].innerHTML)<1.10 && min>5){
		p[min].click();
		bet++;
	}
	document.getElementsByClassName("go-back")[0].click();
	count++;
	state=0;
}


function getBestStats(mid){
	stats="";
	
}


interv=setInterval(AI,100);