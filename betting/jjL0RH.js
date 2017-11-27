var betSites=["stoiximan","meridianbet","winmasters","sportingbet"];
var oddsTextFiles=["DobNp3.txt","q66rj5.txt","0lQ24o.txt","EPDFGB.txt"];
function readOdds(file)
{
    var odds;
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                odds= allText.split("\n");
            }
        }
    }
    rawFile.send(null);
    var res="";
    for(var i=0;i<odds.length;i++){
        if(i%7==0){
            res+="Match: "+odds[i++]+" v "+odds[i];
        }
        else if(i%7==2){
            res+="<br>Odds:<br>"+"| 1 : "+odds[i++]+" | X : "+odds[i++]+" | 2 : "+odds[i]+" |";
        }
        else{
            res+="<br>| Over : "+odds[i++]+" | Under : "+odds[i]+" |<br>******************<br><br>"
        }
    }
    document.getElementById("res").innerHTML=res;
}

function readScript(file)
{
    var script;
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                script= allText.split("\n");
            }
        }
    }
    rawFile.send(null);
    var res="";
    for(var i=0;i<script.length;i++){
        if(i>0)
            res+="<br>";
        res+=script[i];
    }
    document.getElementById("res").innerHTML=res;
}

function getSureBets(){
    document.getElementById("res").innerHTML="Under Construction.";
    var mc = [];//new MatchCollection();
    var odds;
    for(var i=0;i<oddsTextFiles.length;i++){
        odds=readFile(oddsTextFiles[i]);
        for(var j=0;j<odds.length;j++){
            try{
                var homeTeam=odds[j++].toLowerCase().split(" ");
                var awayTeam=odds[j++].toLowerCase().split(" ");
                var oddsHome=odds[j++];
                var oddsDraw=odds[j++];
                var oddsAway=odds[j++];
                var oddsOver=odds[j++];
                var oddsUnder=odds[j];
                var matchIndex=getIndex(homeTeam,awayTeam,mc);
                mc[matchIndex].Home[i]=oddsHome;
                mc[matchIndex].Draw[i]=oddsDraw;
                mc[matchIndex].Away[i]=oddsAway;
                mc[matchIndex].Over[i]=oddsOver;
                mc[matchIndex].Under[i]=oddsUnder;
            }catch(e){
                break;
            }
        }

    }
    console.log(mc);
    document.getElementById("res").innerHTML=mc;
    var res="";
    for(var i=0;i<mc.length;i++){
        if(i==1){
            console.log("debug");
        }
        var OU=getOU(mc[i].Over,mc[i].Under).split(" ");
        res+="<br>"+mc[i].HomeTeam.toString().toUpperCase()+" vs "+mc[i].AwayTeam.toString().toUpperCase();
        var o=parseInt(OU[0]);
        var u=parseInt(OU[1]);
        res+="<br>Over - Under:<br>"+betSites[o]+": "+mc[i].Over[o]+"("+OU[2]+") - "+betSites[u]+": "+mc[i].Under[u]+"("+OU[3]+") -> ";
        console.log(mc[i].HomeTeam);
        var profit=((parseFloat(OU[2])*mc[i].Over[o])-100);
        if(profit>0)
            res+="+"+profit+"%<br>******************<br>";
        else
            res+=profit+"%<br>******************<br>";

    }
    document.getElementById("res").innerHTML=res;

}
var count=0;
function openSites(){
    window.open("https://www.stoiximan.com.cy");
    window.open("https://www.meridianbet.com.cy");
    window.open("https://www.winmasters.com.cy");
    window.open("https://www.sportingbet.com.cy");
}

function saveOdds(site,pwd){
    var res='<textarea rows="21" cols="50"></textarea><br><button onclick="save(\''+site+'\',\''+pwd+'\')">Save Odds</button>';
    document.getElementById("res").innerHTML=res;
}

function save(site,pwd){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        alert(this.responseText);
      }
    };
    xhttp.open("POST", "oddsManager.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send('pwd='+pwd+'&site='+site+'&odds='+document.getElementById("res").children[0].value);           
}

function MatchCollection(){
    this.HomeTeam=[];
    this.AwayTeam=[];
    this.Home=[];
    this.Draw=[];
    this.Away=[];
    this.Over=[];
    this.Under=[];
}

function readFile(file){
    var odds;
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                odds= allText.split("\n");
            }
        }
    }
    rawFile.send(null);
    return odds;
}

function getIndex(HomeTeam,AwayTeam,MC){
    for(var i=0; i<MC.length; i++){
        for(var h=0;h<HomeTeam.length;h++){
            if(HomeTeam[h].length>=3 && MC[i].HomeTeam.indexOf(HomeTeam[h])!=-1){
                for(var a=0;a<AwayTeam.length;a++){
                    if(AwayTeam[a].length>=3 && MC[i].AwayTeam.indexOf(AwayTeam[a])!=-1){
                        return i;
                    }
                }
            }
        }
    }
    var index=MC.length;
    MC[index]=new MatchCollection();
    MC[index].HomeTeam=HomeTeam;
    MC[index].AwayTeam=AwayTeam;
    return index;
}

function getOU(Over,Under){
    var budget=100;
    var over=0;
    var under=0;
    var maxProfit=0;
    var c1=0;
    var c2=0;
    var maxOver=0;
    var minOver=0;
    var maxUnder=0;
    var minUnder=0;
/*    for(var i=1;i<Over.length;i++){
        if(Over[i]){
            if(!Over[maxOver]||parseFloat(Over[maxOver])<parseFloat(Over[i])){
                maxOver=i;
            }
            if(!Under[maxUnder]||parseFloat(Under[maxUnder])<parseFloat(Under[i])){
                maxUnder=i;
            }
            if(!Over[minOver]||parseFloat(Over[minOver])>parseFloat(Over[i])){
                minOver=i;
            }
            if(!Under[minUnder]||parseFloat(Under[minUnder])>parseFloat(Under[i])){
                minUnder=i;
            }
        }
    }*/

    for(var i=0;i<Over.length;i++){
        if(Over[i]){
            for(var j=0;j<Under.length;j++){
                if(Under[j]){
                    c1=(budget*parseFloat(Under[j]))/(parseFloat(Over[i])+parseFloat(Under[j]));
                    if(maxProfit<c1*Over[i]){
                        maxProfit=c1*Over[i];
                        over=i;
                        under=j;
                    }
                }
            }
        }
  /*  var c1=(budget*parseFloat(Under[minUnder]))/(parseFloat(Over[maxOver])+parseFloat(Under[minUnder]));
    var c2=budget-c1;
    var c11=(budget*parseFloat(Under[maxUnder]))/(parseFloat(Over[minOver])+parseFloat(Under[maxUnder]));
    var c12=budget-c11;
    if(c1*Over[maxOver]>c11*Over[minOver]){
        return maxOver+" "+minUnder+" "+c1+" "+c2;
    }else{
        return minOver+" "+maxUnder+" "+c11+" "+c12;
    }*/
    }
    c1=(budget*parseFloat(Under[under]))/(parseFloat(Over[over])+parseFloat(Under[under]));
    c2=budget-c1;
    return over+" "+under+" "+c1+" "+c2;


}