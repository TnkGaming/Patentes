var gg = [1.40,1.45];
var ng = [1.40,1.45,1.5,1.6];
var count = 0;
var bet = 0;
var state = 0;
var interv;

function print(){
	console.log("Bet: "+bet);
	console.log("Count: "+count);
}

function AI(){
	try{
		if(bet>=4){
			print();
			clearInterval(interv);
			return;
		}
		if(state == 0){
			getNextMatch();
		}else if(state == 1){
			getGG();
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
	if(!kids()){
		matches[count].click();
		state++;}
	else 
		count++;
}
function kids(){
	var kidNames=["YOUTH", "ESTUDAN", "UNIV", "U17", "U19", "U20", "U21"];
	var matchNames = getMatchNames();
	for(var i=0; i< kidNames.length; i++){
		if(matchNames.includes(kidNames[i]))
			return true;
	}
	return false;
}
function getMatchNames(){
	return document.getElementsByClassName("match-name-link")[count].innerHTML;
}

function getGG(){
	if(!ready())return;
	if(!GG(gg,'Yes'))
		GG(ng,'No');
	document.getElementsByClassName("go-back")[0].click();
	count++;
	state=0;
}
function GG(validOdds, type){
	var ggOdd =	document.getElementsByClassName('out-43-'+type)[0];
	if(validOdds.includes(parseFloat(ggOdd.innerHTML))){
		ggOdd.click();
		bet++;
		return true;
	}
	return false;
}

function ready(){
	var odds = document.getElementsByClassName("market-open");
	var matches = document.querySelectorAll("div[class=moremarkets]");
	if(matches && matches.length > 0) return false;
	if(!odds || odds.length==0) return false;
	return true;
}
interv=setInterval(AI,100);