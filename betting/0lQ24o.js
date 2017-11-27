var matches=document.getElementsByClassName("rivals-wrapper");
var HXW=document.getElementsByClassName("three");
var OU=document.getElementsByClassName("two");
var matchName;
var matchOdds={
		odd1: " ",
		oddX: " ",
		odd2: " ",
		Over: " ",
		Under: " "
};
var out="";
for(var i=0;i<matches.length;i++){
	matchName= matches[i].children[0].innerText+" v "+matches[i].children[1].innerText;
	out+=matchName.split(" v ")[0]+"\n"+matchName.split(" v ")[1]+"\n";
	matchOdds.odd1= HXW[i*2].children[0].children[0].children[1].innerText;
	matchOdds.oddX= HXW[i*2].children[1].children[0].children[1].innerText;
	matchOdds.odd2= HXW[i*2].children[2].children[0].children[1].innerText;
	matchOdds.Over= OU[i*3].children[1].children[0].children[1].innerText;
	matchOdds.Under= OU[i*3].children[0].children[0].children[1].innerText;
	out+=matchOdds.odd1+"\n"+matchOdds.oddX+"\n"+matchOdds.odd2+"\n"+matchOdds.Over+"\n"+matchOdds.Under+"\n";
}
console.log(out);
//meridian