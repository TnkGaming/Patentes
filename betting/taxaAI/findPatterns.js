var Leagues = [];
function getPattern(){
	Leagues = [];
	//var history = document.getElementById("results").innerHTML.split("<br>");
	console.log("Predicting Odds...");
	document.getElementById("results").innerHTML="Predicting Odds...";
	var history = predictAll().split("<br>");
	console.log("Checking Odds...");
	document.getElementById("results").innerHTML="Checking Odds...";
	history = checkThis(history,true).split("\n");
	console.log("Finding Patterns...");
	document.getElementById("results").innerHTML="Finding Patterns...";
	history.forEach(function (line, index){
		if(index%2==0 && history[index]!="" && history[index+1]!="***UNFINISHED***"){
			findPattern(line.split(",")[0],history[index+1].split(" - "));
		}
	});
	document.getElementById("results").innerHTML=toElements(Leagues.sort( (a,b) => a.Usage < b.Usage ));
}
function getReadyPattern(){
	document.getElementById("results").innerHTML=toElements(JSON.parse(patterns).sort( (a,b) => a.Usage < b.Usage ));
}
function findPattern(league,odds){
	var currLeague = Leagues.find( l => l.Name == league);
	if(currLeague == null)
		currLeague = Leagues[Leagues.push(new League(league))-1];
	currLeague.Usage++;
	fixPattern(currLeague.FT,odds.find(o => o.includes("1(") || o.includes("X(") || o.includes("2(")));
	fixPattern(currLeague.GG,odds.find(o => o.includes("GG") || o.includes("NG")));
	fixPattern(currLeague.OU15,odds.find(o => o.includes("1.5")));
	fixPattern(currLeague.OU25,odds.find(o => o.includes("2.5")));
	fixPattern(currLeague.OU35,odds.find(o => o.includes("3.5")));
	if(league == "International-AFC_Champions_League_Qualification")console.log(currLeague.Usage);
}
function fixPattern(input,data){
	if(data == null)return;
	var dataSplit = data.split("(");
	var percentage = parseInt(dataSplit[1].split("%)")[0]);
	var secondaryPercentage = dataSplit.length==4 ? parseInt(dataSplit[2].split("%)")[0]) : 0;
	var wasCorrect = dataSplit[dataSplit.length-1].split(")")[0] == "O" ;
	if(input[percentage+secondaryPercentage]!=null){
			if(wasCorrect)
				input[percentage+secondaryPercentage].Correct() 
			else
				input[percentage+secondaryPercentage].Wrong();
	}
	else{
		input[percentage+secondaryPercentage]=new Odd();
			if(wasCorrect)
				input[percentage+secondaryPercentage].Correct() 
			else
				input[percentage+secondaryPercentage].Wrong();
	}
}
function toElements(obj){
	var out = "<div>";
	for(prop in obj){
		if(obj[prop] != null){
			if(typeof obj[prop] == "object" && !obj[prop].Color){
				out+=obj[prop].Name ? obj[prop].Name : prop;
				out+=toElements(obj[prop]);
			}else if(prop!="Name" && prop!="Usage"){
				out+="<span style=\"border:solid;"+(obj[prop].T>=5?"":"background:grey;")+"color:"+obj[prop].Color+"; font-weight:bold;\">"+prop;
				out+="</span>";
			}
		}
	}
	out+="</div>";
	return out;
}