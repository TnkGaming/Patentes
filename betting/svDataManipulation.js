var Leagues=[];

init();

function init(){
	var splitData = data.split('\n');
	for(var i=0;i<splitData.length;i++){
		manipulateData(splitData[i]);
	}
}
function manipulateData(data){
	var splitData = data.split(',');
	var properties = ['H','HD','D','DA','A','O','U','HO','HDO','DO','DAO','AO','HU','HDU','DU','DAU','AU']
	var league = getLeague(splitData[0],splitData[1]);
	if(league == null){
		league = createLeague(splitData[0],splitData[1]);
	}
	if(isValid(splitData)){
		var toUpdate = determinePropertiesToUpdate(properties,splitData[2],splitData[3]);
		league.updateProperties(toUpdate,splitData[4],splitData[5]);
	}
}
function getLeague(country,league){
	return Leagues.find(function (cl) { return cl.country == country && cl.league == league;});
}
function createLeague(country,league){
	return Leagues[Leagues.push(new League(country,league))-1];
}
function isValid(data){
	return ( (data[2]!=''||data[3]!='') && (data[4]!=''&&data[5]!='') );
}
function determinePropertiesToUpdate(properties,fp,fou){
	var toUpdate = [];
	var property='';
	if(fp!=''){
		if(fp.includes('1'))
			property+='H';
		if(fp.includes('X'))
			property+='D';
		if(fp.includes('2'))
			property+='A';
		toUpdate.push(property);
	}
	if(fou!=''){
		toUpdate.push(fou);
	}
	if(fp!='' && fou!=''){
		toUpdate.push(property+''+fou);
	}
	return toUpdate;
}
function getBetsByName(country,league,fp,fou){
 	var properties = determinePropertiesToUpdate(fp,fou);
 	var League = getLeague(country,league);
 	console.log(League.country+'-'+League.league+' '+fp+','+fou+':');
	var list =League[fp+''+fou];
	list = Object.keys(list).sort(function(a,b){return list[b]-list[a]});
	for(var i =0; i< list.length;i++){
		console.log(list[i] +": "+League[fp+''+fou][list[i]]);
	}
}
function getBetsByIndex(index,fp,fou){
	var properties = determinePropertiesToUpdate(fp,fou);
	console.log(Leagues[index].country+'-'+Leagues[index].league+':');
	var list =Leagues[index][fp+''+fou];
	list = Object.keys(list).sort(function(a,b){return list[b]-list[a]});
	for(var i =0; i< list.length;i++){
		console.log(list[i] +": "+Leagues[index][fp+''+fou][list[i]]);
	}
}
function getBetsByText(){
	var data= document.getElementById('dataInput').value.split('\n');
	var L = [];
	fillL(data,L);
	printTodaysBets(L);
}
function fillL(data,L){
	for(var i = 0 ; i < data.length; i++){
		data[i] = fixInput(data[i]);
		var currl = data[i].split(',');
		if(currl.length == 5){
			if( L.find(function (l){	return l == currl;	}) == null && (currl[3]!='' || currl[4]!='') ){
				L.push(currl);
			}
		}
	}
}
function printTodaysBets(L){
	for(var i =0;i<L.length;i++){
		try{
			getBetsByName(L[i][0],L[i][1],L[i][4],L[i][3]);
		}catch(e){}
	}
}
function fixInput(input){
	input = input.replace(/1/g,'H');
	input = input.replace(/2/g,'A');
	input = input.replace(/X/g,'D');
	return input;
}