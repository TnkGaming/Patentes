var matches=document.getElementsByClassName("team_betting");
var matchNames=[];
var out="";
for(var i = 0; i< matches.length ; i++){
	matchNames[i]=matches[i].children[0].innerText;
}
var HXW=null;
var OU=null;
var odds=[];
// for(var i = 0; i< matches.length ; i++){
// 	//click more
// 	document.getElementsByClassName("more")[0].children[1].click();
// 	console.log(matchNames[i]);
// 	HXW=document.getElementsByClassName("types_bg")[1].children[0].children[0].children[0];
// 	OU=document.getElementsByClassName("types_bg")[2].children[0].children[0];
// 	var matchOdds={
// 			odd1: HXW.children[0].children[0].children[1].innerText,
// 			oddX: HXW.children[1].children[0].children[1].innerText,
// 			odd2: HXW.children[2].children[0].children[1].innerText,
// 			Over: OU.children[0].children[0].children[1].innerText,
// 			Under: OU.children[1].children[0].children[1].innerText
// 	};
// 	console.log(matchOdds);
// 	odds[i]=matchOdds;
// 	//clickback
// 	document.getElementsByClassName("x")[0].click();
// 	out+=matchNames[i].split(" vs ")[0]+"\n"+matchNames[i].split(" vs ")[1]+matchOdds.odd1+"\n"+matchOdds.oddX+"\n"+matchOdds.odd2+"\n"+matchOdds.Over+"\n"+matchOdds.Under+"\n";
// }
var intervalOdds= setInterval(getOdds,100);
var i=0;
var mutexMore=true;
var mutexOdds=true;
function getOdds(){
	if(i>=matchNames.length){
		//console.log("how did i get here with only "+i+" out of "+matches.length);
		console.log(out);
		clearInterval(intervalOdds);
	}
	else if(mutexMore){
		mutexMore=false;
		try{
			//console.log("trying to click");
			document.getElementsByClassName("more")[i].children[1].click();
		}catch(e){
			mutexMore=true;
		}
	}else if(mutexOdds){
		mutexOdds=false;
		try{
			//console.log("stuck");
			HXW=document.getElementsByClassName("types_bg")[1].children[0].children[0].children[0];
			OU=document.getElementsByClassName("types_bg")[2].children[0].children[0];
			var matchOdds={
			odd1: HXW.children[0].children[0].children[1].innerText,
			oddX: HXW.children[1].children[0].children[1].innerText,
			odd2: HXW.children[2].children[0].children[1].innerText,
			Over: OU.children[0].children[0].children[1].innerText,
			Under: OU.children[1].children[0].children[1].innerText
			};
			console.log(matchOdds.Under);
			if(matchOdds.Under==" ")throw 0;
			odds[i]=matchOdds;
			out+=matchNames[i].split(" vs  ")[0]+"\n"+matchNames[i].split(" vs  ")[1]+"\n"+matchOdds.odd1+"\n"+matchOdds.oddX+"\n"+matchOdds.odd2+"\n"+matchOdds.Over+"\n"+matchOdds.Under+"\n";
			HXW=null;
			OU=null;
			document.getElementsByClassName("x")[0].click();
			//console.log("bye bye "+i+" of "+matches.length);
			i++;
			mutexMore=true;
			mutexOdds=true;
		}catch(e){
			console.log(e);
			mutexOdds=true;
		}
	}
}
//winmasters