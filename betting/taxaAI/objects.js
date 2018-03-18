function Team(name){
	this.Name = name;
	this.Leagues = [];
	this.Rank = new Rank();
	this.HRank = new Rank();
	this.ARank = new Rank();
	this.G = new G();
	this.OU15 = new OU(1.5);
	this.OU25 = new OU(2.5);
	this.OU35 = new OU(3.5);
	this.fix = function (league,isHome,score){
		if(league!=""){
			var leagueFix = this.Leagues.find(l => l.Name==league);
			if(leagueFix == null){
				var newIndex = this.Leagues.push(new Team(league));
				this.Leagues[newIndex-1].fix("",isHome,score);
            }else{
				leagueFix.fix("",isHome,score);
            }	        
		}
		setRankings(this.Rank,isHome,score);
		setRankings(isHome?this.HRank:this.ARank,isHome,score);
		this.G.fix(isHome,score);
		this.OU15.fix(isHome,score);
		this.OU25.fix(isHome,score);
		this.OU35.fix(isHome,score);
	}
	function setRankings(rank,isHome,score){
		var isWin = (isHome && score[0]>score[1]) || (!isHome && score[0]<score[1]);
		var isDraw = score[0] == score[1];
		var isLoss = (isHome && score[0]<score[1]) || (!isHome && score[0]>score[1]);
		rank.T++;
		if(isWin) rank.W++;
		else if(isDraw) rank.D++;
		else if(isLoss) rank.L++;
    }
}

function Rank(){
    this.T=0;
    this.W=0;
    this.D=0;
    this.L=0;
}

function G(){
	this.TG = new innerG();
	this.HG = new innerG();
	this.AG = new innerG();
	this.fix = function(isHome,score){
		setGG(this.TG,score);
		if(isHome)
			setGG(this.HG,score);
		else
			setGG(this.AG,score);
    }
	function setGG(G,score){
		G.T++;
		if(score[0]>0&&score[1]>0)G.G++;
		else G.N++;
    }
}

function innerG(){
	this.T=0;
	this.G=0;
	this.N=0;
}

function OU(toBeat){
	this.toBeat=toBeat; 
	this.TOU = new innerOU();
	this.HOU = new innerOU();
	this.AOU = new innerOU();
	this.fix = function(isHome,score){
		setOU(this.TOU,score);
		if(isHome)
			setOU(this.HOU,score);
		else
			setOU(this.AOU,score);
    }
	function setOU(OU,score){
		OU.T++;
		if(score[0]+score[1]>toBeat)OU.O++;
		else OU.U++;
    }
}

function innerOU(){
	this.T=0;
	this.O=0;
	this.U=0;
}
function League(name) {
	this.Name = name;
	this.Usage=0;
	this.FT=[];
	this.GG=[];
	this.OU15=[];
	this.OU25=[];
	this.OU35=[];
}
function Odd() {
	var dangerLevels=[0.11,0.6,0.7,0.8,0.9,2]
	var danger=["black","red","orange","yellow","lime","green"]
	this.T = 0;
	this.O = 0;
	this.X = 0;
	this.Color = danger[0];
	this.Correct = function(){
		this.T++;
		this.O++;
		this.setColor();
	}
	this.Wrong = function(){
		this.T++;
		this.X++;
		this.setColor();
	}
	this.setColor = function(){
		var perc = this.O/this.T;
		for(var i = 0; i< dangerLevels.length ; i++){
			if(perc<dangerLevels[i]){
				this.Color = danger[i];
				return;
			}
		}
	}
}