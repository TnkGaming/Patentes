var months=[31,28,31,30,31,30,31,31,30,31,30,31];
var date = '01-01';
var today =new Date();
var interv;
var output= null;
var newWindow = null;
var leagues=[];
var state=0;
var dataToPrint='';
function dataMine(){
	try{
		if( isUpToDate() ){	
			if(state == 0){
				openWindow();
				getNextDay();
			}
			else 
				Mine();
		}else {
			console.log(dataToPrint);
			console.log("done.");
			clearInterval(interv);
		}
	}catch(e){
		console.log(dataToPrint);
		console.log("stopped at "+date+" cause of:");
		console.log(e);
		clearInterval(interv);
	}
}
function openWindow(){
	console.log("enter " + date);
	output='data';
	newWindow = window.open('http://www.soccervista.com/soccer_games.php?date=2018-'+date, "mywin", '');
}
function getNextDay(){
	var nextDate = parseDate(date.split('-'));
	DateArrayToString(nextDate);
	state = 1;
}
function parseDate(nextDate){
	var day = setDay(nextDate[1]);
	var date = setDate(day,nextDate[0]);
	return date;
}
function setDay(day){
	return parseInt(day)+1;
}
function setDate(day,month){
	var parsedMonth = parseInt(month);
	if(months[parsedMonth-1]<day){
		parsedMonth++;
		day = 1;
	}
	return [parsedMonth,day];
}
function DateArrayToString(newDate){
	date='';
	date+=ProperDateFormat(newDate[0]);
	date+='-'+ProperDateFormat(newDate[1]);
}
function ProperDateFormat(toFormat){
	return 	toFormat<10?'0'+toFormat:''+toFormat;
}
function Mine(){
	if(notReady())return;
	debugger;
	var table = newWindow.document.getElementsByClassName('main')[0].children[0];
	getData(table);
	closeWindow();
	state = 0;
}
function notReady(){
	if(newWindow == null)
		return true;
	if(document.getElementById('col1')==undefined)
		return true;
	if(newWindow.document.getElementsByClassName('main')[0]==undefined)
		return true;
	return false;
}
function getData(table){
	var league='';
	var homeTeam = '';
	var awayTeam = '';
	var score= '';
	for(var i=0;i<table.children.length;i++){
		row=table.children[i];
		if(row.className == 'headupe'){
			league=findCountryLeague(row);
		}else if(row.className == 'onem' || row.className == 'twom' ){
			homeTeam = getHomeTeam(row);
			awayTeam = getAwayTeam(row);
			score = getScore(row);
			dataToPrint+=league+','+homeTeam+','+awayTeam+','+score+'\n';
		}
	}
}
function findCountryLeague(row){
	var href = row.getElementsByTagName('a')[0].href;
	href = href.split('/');
	countryleageHtml = href[href.length-1];
	countryleague = countryleageHtml.split('-');
	return countryleague[0]+'-'+countryleague[1];
}
function getHomeTeam(row){
	return parseName(row.getElementsByClassName("home")[0].innerHTML);
}
function getAwayTeam(row){
	return parseName(row.getElementsByClassName("away")[1].innerHTML);
}
function parseName(name){
	var newName = name.replace(/&nbsp;/g,"");
	newName = newName.replace(/<span.*<[/]span>/g,"");
	return newName;
}
function getScore(row){
	try{
		var score = row.getElementsByTagName('strong')[0].innerHTML;
		if(score=='-:-')return ',';
		else return score.replace(':',',');
	}catch(e){
		return ',';
	}
}
function setData(league, prediction, score){
	var scores=score.split(':');
	if(scores[0]=='-1' || prediction == 'X')
		return;
	setBet(league,prediction,parseInt(scores[0]),parseInt(scores[1]),0);
	setBet(league,prediction,parseInt(scores[0]),parseInt(scores[1]),1);
	setBet(league,prediction,parseInt(scores[0]),parseInt(scores[1]),2);
	leage.total++;
}
function setBet(l,p,h,a,b){
	switch(p){
		case 1:{
			if(a-h<b)l.bets[b]++;
			break;
		}
		case 2:{
			if(h-a<b)l.bets[b]++;
			break;
		}
	}
}
function closeWindow(){
	newWindow.dataFromParent = null;
	newWindow.close();
	newWindow=null;
	output=null;
}
function isUpToDate(){
	//return (parseInt(date.split('-')[0])<=today.getMonth()+1)||(parseInt(date.split('-')[1])<today.getDate());
	return ( ( parseInt(date.split('-')[0])*31 ) + ( parseInt(date.split('-')[1]) ) ) <= ( ( ( today.getMonth()+1 )*31 ) + today.getDate() );
}
function gatherAll(){
	interv = setInterval(dataMine,100);
}
function MineCurrent(){
	var table = document.getElementsByClassName('main')[0].children[0];
	getData(table);
	console.log(dataToPrint);
}