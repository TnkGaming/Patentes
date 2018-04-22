var dataToManipulate = data.split("\n");
var teams = [];
manipulate();
function manipulate(){
	dataToManipulate.forEach(function(match){
		match = match.split(',');
		fixTeams(match[1],match[0],true,[parseInt(match[3]),parseInt(match[4])]);
		fixTeams(match[2],match[0],false,[parseInt(match[3]),parseInt(match[4])]);
	});
}
function fixTeams(team, league, isHome, score){
		var currTeam = teams.find( t => t.Name == team );
		if(currTeam == null){
			var teamPlacement = teams.push(new Team(team));
			currTeam = teams[teamPlacement-1];
		}
		currTeam.fix(league,isHome,score);
}
function getTodaysMatches(){
	getAllOdds(todaysMatches);
}
function predictAll(){
	return getAllOdds(data.split("\n"));
}
function getAllOdds(matches){
	var out="";
	matches.forEach(match => {out+= match+"<br>"+getOdds(match)+"<br>"});
	document.getElementById("results").innerHTML = out;
	return out;
}
function getOdds(match){
	match = match.split(',');
	var ft = [getAverageFT1(match[1],match[2],match[0]),getAverageFTX(match[1],match[2],match[0]), getAverageFT2(match[1],match[2],match[0])];
	var gg = getAverageGG(match[1],match[2],match[0]);
	var ou15 = getAverageOU15(match[1],match[2],match[0]);
	var ou25 = getAverageOU25(match[1],match[2],match[0]);
	var ou35 = getAverageOU35(match[1],match[2],match[0]);
	var out = "";
	out+= get1X2(ft) + " - ";
	out+= getGG(gg) + " - ";
	out+= getOU(ou15) + "1.5 - ";
	out+= getOU(ou25) + "2.5 - ";
	out+= getOU(ou35) + "3.5";
	return out;
}
function getAverageFT1(home,away,league){
	var sum = 0;
	var count = 0;
	homeTeam = teams.find( t => t.Name == home);
	awayTeam = teams.find( t => t.Name == away);
	if(homeTeam != null && homeTeam.Rank.T > 0){
		sum += homeTeam.Rank.W / homeTeam.Rank.T;
		count++;
		if(homeTeam.HRank.T > 0){
			sum += homeTeam.HRank.W / homeTeam.HRank.T;
			count++;
		}
		homeLeague = homeTeam.Leagues.find( l => l.Name == league );
		if(homeLeague != null && homeLeague.Rank.T > 0){
			sum += homeLeague.Rank.W / homeLeague.Rank.T;
			count++;
			if(homeLeague.HRank.T > 0){
				sum += homeLeague.HRank.W / homeLeague.HRank.T;
				count++;
			}
		}
	}
	if(awayTeam != null && awayTeam.Rank.T > 0){
		sum += awayTeam.Rank.L / awayTeam.Rank.T;
		count++;
		if(awayTeam.ARank.T > 0){
			sum += awayTeam.ARank.L / awayTeam.ARank.T;
			count++;
		}
		awayLeague = awayTeam.Leagues.find( l => l.Name == league );
		if(awayLeague != null && awayLeague.Rank.T > 0){
			sum += awayLeague.Rank.L / awayLeague.Rank.T;
			count++;
			if(awayLeague.ARank.T > 0){
				sum += awayLeague.ARank.L / awayLeague.ARank.T;
				count++;
			}
		}
	}
	return sum / count;
}
function getAverageFTX(home,away,league){
	var sum = 0;
	var count = 0;
	homeTeam = teams.find( t => t.Name == home);
	awayTeam = teams.find( t => t.Name == away);
	if(homeTeam != null && homeTeam.Rank.T > 0){
		sum += homeTeam.Rank.D / homeTeam.Rank.T;
		count++;
		if(homeTeam.HRank.T > 0){
			sum += homeTeam.HRank.D / homeTeam.HRank.T;
			count++;
		}
		homeLeague = homeTeam.Leagues.find( l => l.Name == league );
		if(homeLeague != null && homeLeague.Rank.T > 0){
			sum += homeLeague.Rank.D / homeLeague.Rank.T;
			count++;
			if(homeLeague.HRank.T > 0){
				sum += homeLeague.HRank.D / homeLeague.HRank.T;
				count++;
			}
		}
	}
	if(awayTeam != null && awayTeam.Rank.T > 0){
		sum += awayTeam.Rank.D / awayTeam.Rank.T;
		count++;
		if(awayTeam.ARank.T > 0){
			sum += awayTeam.ARank.D / awayTeam.ARank.T;
			count++;
		}
		awayLeague = awayTeam.Leagues.find( l => l.Name == league );
		if(awayLeague != null && awayLeague.Rank.T > 0){
			sum += awayLeague.Rank.D / awayLeague.Rank.T;
			count++;
			if(awayLeague.ARank.T > 0){
				sum += awayLeague.ARank.D / awayLeague.ARank.T;
				count++;
			}
		}
	}
	return sum / count;
}
function getAverageFT2(home,away,league){
	var sum = 0;
	var count = 0;
	homeTeam = teams.find( t => t.Name == home);
	awayTeam = teams.find( t => t.Name == away);
	if(homeTeam != null && homeTeam.Rank.T > 0){
		sum += homeTeam.Rank.L / homeTeam.Rank.T;
		count++;
		if(homeTeam.HRank.T > 0){
			sum += homeTeam.HRank.L / homeTeam.HRank.T;
			count++;
		}
		homeLeague = homeTeam.Leagues.find( l => l.Name == league );
		if(homeLeague != null && homeLeague.Rank.T > 0){
			sum += homeLeague.Rank.L / homeLeague.Rank.T;
			count++;
			if(homeLeague.HRank.T > 0){
				sum += homeLeague.HRank.L / homeLeague.HRank.T;
				count++;
			}
		}
	}
	if(awayTeam != null && awayTeam.Rank.T > 0){
		sum += awayTeam.Rank.W / awayTeam.Rank.T;
		count++;
		if(awayTeam.ARank.T > 0){
			sum += awayTeam.ARank.W / awayTeam.ARank.T;
			count++;
		}
		awayLeague = awayTeam.Leagues.find( l => l.Name == league );
		if(awayLeague != null && awayLeague.Rank.T > 0){
			sum += awayLeague.Rank.W / awayLeague.Rank.T;
			count++;
			if(awayLeague.ARank.T > 0){
				sum += awayLeague.ARank.W / awayLeague.ARank.T;
				count++;
			}
		}
	}
	return sum / count;
}
function getAverageGG(home,away,league){
	var sum = 0;
	var count = 0;
	homeTeam = teams.find( t => t.Name == home);
	awayTeam = teams.find( t => t.Name == away);
	if(homeTeam != null && homeTeam.G.TG.T > 0){
		sum += homeTeam.G.TG.G / homeTeam.G.TG.T;
		count++;
		if(homeTeam.G.HG.T > 0){
			sum += homeTeam.G.HG.G / homeTeam.G.HG.T;
			count++;
		}
		homeLeague = homeTeam.Leagues.find( l => l.Name == league );
		if(homeLeague != null && homeLeague.G.HG.T > 0){
			sum += homeLeague.G.TG.G / homeLeague.G.HG.T;
			count++;
			if(homeLeague.G.HG.T > 0){
				sum += homeLeague.G.HG.G / homeLeague.G.HG.T;
				count++;
			}
		}
	}
	if(awayTeam != null && awayTeam.G.TG.T > 0){
		sum += awayTeam.G.TG.G / awayTeam.G.TG.T;
		count++;
		if(awayTeam.G.AG.T > 0){
			sum += awayTeam.G.AG.G / awayTeam.G.AG.T;
			count++;
		}
		awayLeague = awayTeam.Leagues.find( l => l.Name == league );
		if(awayLeague != null && awayLeague.G.TG.T > 0){
			sum += awayLeague.G.TG.G / awayLeague.G.TG.T;
			count++;
			if(awayLeague.G.AG.T > 0){
				sum += awayLeague.G.AG.G / awayLeague.G.AG.T;
				count++;
			}
		}
	}
	return sum / count;
}
function getAverageOU15(home,away,league){
	var sum = 0;
	var count = 0;
	homeTeam = teams.find( t => t.Name == home);
	awayTeam = teams.find( t => t.Name == away);
	if(homeTeam != null && homeTeam.OU15.TOU.T > 0){
		sum += homeTeam.OU15.TOU.O / homeTeam.OU15.TOU.T;
		count++;
		if(homeTeam.OU15.HOU.T > 0){
			sum += homeTeam.OU15.HOU.O / homeTeam.OU15.HOU.T;
			count++;
		}
		homeLeague = homeTeam.Leagues.find( l => l.Name == league );
		if(homeLeague != null && homeLeague.OU15.TOU.T > 0){
			sum += homeLeague.OU15.TOU.O / homeLeague.OU15.TOU.T;
			count++;
			if(homeLeague.OU15.HOU.T > 0){
				sum += homeLeague.OU15.HOU.O / homeLeague.OU15.HOU.T;
				count++;
			}
		}
	}
	if(awayTeam != null && awayTeam.OU15.TOU.T > 0){
		sum += awayTeam.OU15.TOU.O / awayTeam.OU15.TOU.T;
		count++;
		if(awayTeam.OU15.AOU.T > 0){
			sum += awayTeam.OU15.AOU.O / awayTeam.OU15.AOU.T;
			count++;
		}
		awayLeague = awayTeam.Leagues.find( l => l.Name == league );
		if(awayLeague != null && awayLeague.OU15.TOU.T > 0){
			sum += awayLeague.OU15.TOU.O / awayLeague.OU15.TOU.T;
			count++;
			if(awayLeague.OU15.AOU.T > 0){
				sum += awayLeague.OU15.AOU.O / awayLeague.OU15.AOU.T;
				count++;
			}
		}
	}
	return sum / count;
}
function getAverageOU25(home,away,league){
	var sum = 0;
	var count = 0;
	homeTeam = teams.find( t => t.Name == home);
	awayTeam = teams.find( t => t.Name == away);
	if(homeTeam != null && homeTeam.OU25.TOU.T > 0){
		sum += homeTeam.OU25.TOU.O / homeTeam.OU25.TOU.T;
		count++;
		if(homeTeam.OU25.HOU.T > 0){
			sum += homeTeam.OU25.HOU.O / homeTeam.OU25.HOU.T;
			count++;
		}
		homeLeague = homeTeam.Leagues.find( l => l.Name == league );
		if(homeLeague != null && homeLeague.OU25.TOU.T > 0){
			sum += homeLeague.OU25.TOU.O / homeLeague.OU25.TOU.T;
			count++;
			if(homeLeague.OU25.HOU.T > 0){
				sum += homeLeague.OU25.HOU.O / homeLeague.OU25.HOU.T;
				count++;
			}
		}
	}
	if(awayTeam != null && awayTeam.OU25.TOU.T > 0){
		sum += awayTeam.OU25.TOU.O / awayTeam.OU25.TOU.T;
		count++;
		if(awayTeam.OU25.AOU.T > 0){
			sum += awayTeam.OU25.AOU.O / awayTeam.OU25.AOU.T;
			count++;
		}
		awayLeague = awayTeam.Leagues.find( l => l.Name == league );
		if(awayLeague != null && awayLeague.OU25.TOU.T > 0){
			sum += awayLeague.OU25.TOU.O / awayLeague.OU25.TOU.T;
			count++;
			if(awayLeague.OU25.AOU.T > 0){
				sum += awayLeague.OU25.AOU.O / awayLeague.OU25.AOU.T;
				count++;
			}
		}
	}
	return sum / count;
}
function getAverageOU35(home,away,league){
	var sum = 0;
	var count = 0;
	homeTeam = teams.find( t => t.Name == home);
	awayTeam = teams.find( t => t.Name == away);
	if(homeTeam != null && homeTeam.OU35.TOU.T > 0){
		sum += homeTeam.OU35.TOU.O / homeTeam.OU35.TOU.T;
		count++;
		if(homeTeam.OU35.HOU.T > 0){
			sum += homeTeam.OU35.HOU.O / homeTeam.OU35.HOU.T;
			count++;
		}
		homeLeague = homeTeam.Leagues.find( l => l.Name == league );
		if(homeLeague != null && homeLeague.OU35.TOU.T > 0){
			sum += homeLeague.OU35.TOU.O / homeLeague.OU35.TOU.T;
			count++;
			if(homeLeague.OU35.HOU.T > 0){
				sum += homeLeague.OU35.HOU.O / homeLeague.OU35.HOU.T;
				count++;
			}
		}
	}
	if(awayTeam != null && awayTeam.OU35.TOU.T > 0){
		sum += awayTeam.OU35.TOU.O / awayTeam.OU35.TOU.T;
		count++;
		if(awayTeam.OU35.AOU.T > 0){
			sum += awayTeam.OU35.AOU.O / awayTeam.OU35.AOU.T;
			count++;
		}
		awayLeague = awayTeam.Leagues.find( l => l.Name == league );
		if(awayLeague != null && awayLeague.OU35.TOU.T > 0){
			sum += awayLeague.OU35.TOU.O / awayLeague.OU35.TOU.T;
			count++;
			if(awayLeague.OU35.AOU.T > 0){
				sum += awayLeague.OU35.AOU.O / awayLeague.OU35.AOU.T;
				count++;
			}
		}
	}
	return sum / count;
}
function get1X2(ft){
	var out = "";
	if(ft[0] >= ft[1] && ft[0] >= ft[2]){
		out += "1("+parseInt(ft[0]*100)+"%)";
		if(ft[1] > 0.3 && ft[1] >= ft[2])
			out+="X("+parseInt(ft[1]*100)+"%)";
		else if(ft[2] > 0.3 && ft[2] >= ft[1])
			out+="2("+parseInt(ft[2]*100)+"%)";
	}else if(ft[1] > ft[0] && ft[1] >= ft[2]){
		out += "X("+parseInt(ft[1]*100)+"%)";
		if(ft[0] > 0.3 && ft[0] >= ft[2])
			out="1("+parseInt(ft[0]*100)+"%)"+out;
		else if(ft[2] > 0.3 && ft[2] > ft[0])
			out="2("+parseInt(ft[2]*100)+"%)"+out;
	}else if(ft[2] > ft[0] && ft[2] > ft[1]){
		out += "2("+parseInt(ft[2]*100)+"%)";
		if(ft[0] > 0.3 && ft[0] >= ft[1])
			out="1("+parseInt(ft[0]*100)+"%)"+out;
		else if(ft[1] > 0.3 && ft[1] > ft[0])
			out+="X("+parseInt(ft[1]*100)+"%)";
	}
	return out;
}
function getGG(gg){
	if(gg>0.5) return "GG("+parseInt(gg*100)+"%)";
	else return "NG("+parseInt((1-gg)*100)+"%)";
}
function getOU(ou){
	if(ou>0.5) return "Over("+parseInt(ou*100)+"%)";
	else return "Under("+parseInt((1-ou)*100)+"%)";
}
function check(){
	checkThis(toCheck.split("\n"), false);
}
function checkThis(toCheck, checkingAll){
	var out="";
	var resultsToCheck = checkingAll ? getResults(toCheck) : results.split("\n");
	var score = [];
	toCheck.forEach(function (line, index){
	console.log((100*(index/toCheck.length))+"%");
		if(line.includes(" - ")){
			if(score.length > 0)
				out+=wasCorrect(line.split(" - "),score)+"\n";
			else
				out+="***UNFINISHED***\n";
			score=[];
		}else{
			try{
				var lineChecked = line.split(",");
				var matchString = resultsToCheck.find( m => m.split(",")[0] == lineChecked[0] && m.split(",")[1] == lineChecked[1] && m.split(",")[2] == lineChecked[2] );
				var match = checkingAll? line.split(",") : matchString.split(",");
				if(match.length==5)
					score = [parseInt(match[3]),parseInt(match[4])];
				out+=matchString+"\n";
			}catch{
				out+=line+"\n";
			}
		}		
	});
	document.getElementById("results").innerHTML = out.replace(/[(]O[)]/g,"<span style=\"border:solid;color:green; font-weight:bold;\">O</span>").replace(/[(]X[)]/g,"<span style=\"border:solid;color:red; font-weight:bold;\">X</span>").replace(/[\n]/g,"<br>");
	return out;
}
function getResults(toCheck){
	var results=[];
	toCheck.forEach(function(line){
		if(line.split(",").length == 5) results.push(line);
	});
	return results;
}
function wasCorrect(predictions,score){
	var out="";
	predictions.forEach(function(pred,index){
		var predPrefix = pred.replace(/[(][0-9][0-9][%][)]/g,"");
		if(index == 0){
			if(predPrefix == "1")
				out+=pred+"("+(score[0]>score[1]?"O":"X")+") - ";
			else if(predPrefix == "2")
				out+=pred+"("+(score[0]<score[1]?"O":"X")+") - ";
			else if(predPrefix == "X")
				out+=pred+"("+(score[0]==score[1]?"O":"X")+") - ";
			else if(predPrefix == "1X")
				out+=pred+"("+(score[0]>=score[1]?"O":"X")+") - ";
			else if(predPrefix == "12")
				out+=pred+"("+(score[0]!=score[1]?"O":"X")+") - ";
			else if(predPrefix == "2X")
				out+=pred+"("+(score[0]<=score[1]?"O":"X")+") - ";
		}else if(index == 1){
			if(predPrefix == "GG")
				out+=pred+"("+(score[0]>0&&score[1]>0?"O":"X")+") - ";
			else if(predPrefix == "NG")
			out+=pred+"("+(score[0]*score[1]==0?"O":"X")+") - ";
		}else if(index == 2){
			if(predPrefix == "Over1.5")
				out+=pred+"("+(score[0]+score[1]>1.5?"O":"X")+") - ";
			else if(predPrefix == "Under1.5")
				out+=pred+"("+(score[0]+score[1]<1.5?"O":"X")+") - ";
		}else if(index == 3){
			if(predPrefix == "Over2.5")
				out+=pred+"("+(score[0]+score[1]>2.5?"O":"X")+") - ";
			else if(predPrefix == "Under2.5")
				out+=pred+"("+(score[0]+score[1]<2.5?"O":"X")+") - ";
		}else if(index == 4){
			if(predPrefix == "Over3.5")
				out+=pred+"("+(score[0]+score[1]>3.5?"O":"X")+")";
			else if(predPrefix == "Under3.5")
				out+=pred+"("+(score[0]+score[1]<3.5?"O":"X")+")";
		}
	});
	return out;
}