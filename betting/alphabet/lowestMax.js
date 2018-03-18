var count = 0;
var bet = 0;
var state = 0;
var interv;
var sun = 1.1;
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
			getLowestOdd();
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
function getLowestOdd(){
	var odds = document.getElementsByClassName("market-open");
	var matches = document.querySelectorAll("div[class=moremarkets]");
	if(matches && matches.length > 0) return;
	if(!odds || odds.length==0) return;
	var min=0;
	var p=document.getElementsByClassName("selection");
	for(var i=0;i<p.length;i++){
		if(!isNaN(p[i].innerHTML)){
			if(isValid(parseFloat(p[i].innerHTML),parseFloat(p[min].innerHTML)))min =i;
		}
	}
	if(!isFootball() || ( parseFloat(p[min].innerHTML)<=sun && min>5 ) ){
		p[min].click();
		bet++;
	}
	document.getElementsByClassName("go-back")[0].click();
	count++;
	state=0;
}
function kids(){
	var kidNames=["YOUTH", "ESTUDAN", "UNIV", "U17", "U19", "U20", "U21"];
	var matchNames = getMatchNames();
	for(var i=0; i< kidNames.length; i++){
		if(matchNames.includes(kidNames[i]))
			return true;
	}
	return false;
};
function getMatchNames(){
	return document.getElementsByClassName("match-name-link")[count].innerHTML;
}
function isFootball(){
	return document.getElementsByClassName("sports-menu-item")[0].className.indexOf("selected") > -1;
}

function isValid(a,b){
	return (a<b&&b>sun) || (a>b&&a<=sun);
}
function clearDirt(){
	dirty="Ημίχρονο - Under/Over 2.5";
	try{
		var selections=document.getElementsByClassName('lines')[0]; 
		var i =0;
		while(i < selections.children.length){
			console.log(selections.getElementsByClassName('label')[i].children[0].innerHTML);
			if(selections.getElementsByClassName('label')[i].children[0].innerHTML.includes(dirty)){
				selections.getElementsByClassName('del')[i].click();
				i=0;
				selections=document.getElementsByClassName('lines')[0];
			}else i++;
		}
	}catch(e){

	}
}
function isClean(s){
	dirt=["Ημίχρονο - Under/Over 2.5","Under/Over 1.5: Over"];
	for(var i=0;i<dirt.length;i++){
		if(s.includes(dirt[i])){
			return false;
		}
	}
	return true;
}
interv=setInterval(AI,100);

