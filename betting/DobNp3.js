var matches = document.getElementsByClassName("js-event-click");
var odds=document.getElementsByClassName("a84");
var overUnder= document.getElementsByClassName("zn");
var out="";
var matchOdds={
		odd1: " ",
		oddX: " ",
		odd2: " ",
		Over: " ",
		Under: " "
};
var matchName;
for(var i=0;i<matches.length;i++){
	matchName = matches[i].children[0].children[0].innerText;
	console.log(matchName);
	out+=matchName.split(" - ")[0]+"\n"+matchName.split(" - ")[1]+"\n";
	matchOdds.odd1= odds[i*3].children[0].children[0].children[0].innerText;
	matchOdds.oddX= odds[i*3+1].children[0].children[0].children[0].innerText;
	matchOdds.odd2= odds[i*3+2].children[0].children[0].children[0].innerText;
	matchOdds.Over= overUnder[i*2].children[0].children[1].innerText;
	matchOdds.Under= overUnder[i*2].children[1].children[1].innerText;
	console.log(matchOdds);
	out+=matchOdds.odd1+"\n"+matchOdds.oddX+"\n"+matchOdds.odd2+"\n"+matchOdds.Over+"\n"+matchOdds.Under+"\n";
}
console.log(out);
//stoiximan