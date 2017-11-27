var matches = document.getElementsByClassName("columns");
var out="";
var i=1;
var mutexPage=true;
var mutexData=true;
var matchOdds={
		odd1: " ",
		oddX: " ",
		odd2: " ",
		Over: " ",
		Under: " "
};
var matchName = "";
var intervalOdds = setInterval(getOdds,100);
var newWindow;

function getOdds(){
	if(i>=matches.length){
		console.log(out);
		clearInterval(intervalOdds);
	}
	else if(mutexPage){
		mutexPage=false;
		console.log("enter" + i);
		matchName = matches[i].children[0].children[0].children[0].children[0].children[0].innerHTML;
		console.log(matchName);
		out+=matchName.split(" v ")[0]+"\n"+matchName.split(" v ")[1]+"\n";
		var output = "data";
		newWindow = window.open(matches[i].children[3].children[0].href, "mywin", '');
	}
	else if(mutexData){
		mutexData=false;
		try{
			newWindow.dataFromParent = output; // dataFromParent is a variable in child.html
			matchOdds.odd1= newWindow.document.getElementsByClassName("home")[0].innerText.split("\n")[0],
			matchOdds.oddX= newWindow.document.getElementsByClassName("draw")[0].innerText.split("\n")[0],
			matchOdds.odd2= newWindow.document.getElementsByClassName("away")[0].innerText.split("\n")[0],
			matchOdds.Over= newWindow.document.getElementsByClassName("half")[5].children[1].children[0].innerText.split("\n")[0],
			matchOdds.Under= newWindow.document.getElementsByClassName("half")[6].children[1].children[0].innerText.split("\n")[0];
			if(matchOdds.Under==" "){
				mutexData=true;
				return;
			}
			console.log(matchOdds);
			out+=matchOdds.odd1+"\n"+matchOdds.oddX+"\n"+matchOdds.odd2+"\n"+matchOdds.Over+"\n"+matchOdds.Under+"\n";
			//var xhttp = new XMLHttpRequest();
			//xhttp.open("POST", "demo_post.asp", true);
			//xhttp.send('site=spb&match='+matchName+'&odds='+matchOdds.odd1+' '+matchOdds.oddX+' '+matchOdds.odd2+' '+matchOdds.Over+' '+matchOdds.Under+'&count='+i);
			console.log("leave "+ i);
			i++;
			newWindow.dataFromParent = null;
			newWindow.close();
			newWindow=null;
			matchOdds.odd1= " ",
			matchOdds.oddX= " ",
			matchOdds.odd2= " ",
			matchOdds.Over= " ",
			matchOdds.Under= " ";
			mutexPage=true;
			mutexData=true;
		}catch(e)
		{
			mutexData=true;
		}
	}
}

//spbt