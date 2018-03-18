function League(country,league){
	this.country = country;
	this.league = league;
	this.H = new PredictionOutcomeCollection();
	this.D = new PredictionOutcomeCollection();
	this.A = new PredictionOutcomeCollection();
	this.HD = new PredictionOutcomeCollection();
	this.DA = new PredictionOutcomeCollection();
	this.U = new PredictionOutcomeCollection();
	this.O = new PredictionOutcomeCollection();

	this.HO = new PredictionOutcomeCollection();
	this.DO = new PredictionOutcomeCollection();
	this.AO = new PredictionOutcomeCollection();
	this.HDO = new PredictionOutcomeCollection();
	this.DAO = new PredictionOutcomeCollection();

	this.HU = new PredictionOutcomeCollection();
	this.DU = new PredictionOutcomeCollection();
	this.AU = new PredictionOutcomeCollection();
	this.HDU = new PredictionOutcomeCollection();
	this.DAU = new PredictionOutcomeCollection();

	this.updateProperties= function(properties, homeScore, awayScore){
		for(var i =0; i < properties.length; i++){
			this.getFTResult(properties[i],homeScore,awayScore);
			this.getOUResult(properties[i],homeScore,awayScore);
			this.getEUResult(properties[i],homeScore,awayScore);
			this.getGGResult(properties[i],homeScore,awayScore);
		}
	};
	this.getFTResult = function (property, homeScore,awayScore){
		homeScore > awayScore ? this[property].H++ : homeScore == awayScore ? this[property].D++ : this[property].A++;
	}
	this.getOUResult = function (property, homeScore,awayScore){
		var totalScore = homeScore + awayScore;
		this[property].total++;
		totalScore > 1.5 ? this[property].O15++ : this[property].U15++;
		totalScore > 2.5 ? this[property].O25++ : this[property].U25++;
		totalScore > 3.5 ? this[property].O35++ : this[property].U35++;
	}
	this.getEUResult = function (property, homeScore,awayScore){
		if(homeScore > awayScore){
			this[property].E101++;
			this[property].E201++;
			if(homeScore - awayScore == 1){
				this[property].E01X++;
				this[property].E022++;
			}
			else if(homeScore - awayScore == 2)
				this[property].E02X++;
		}else if(homeScore < awayScore){
			this[property].E012++;
			this[property].E022++;
			if(homeScore - awayScore == 1){
				this[property].E10X++;
				this[property].E202++;
			}
			else if(homeScore - awayScore == 2)
				this[property].E20X++;
		}else{
			this[property].E101++;
			this[property].E201++;
			this[property].E012++;
			this[property].E022++;
		}
	}
	this.getGGResult = function (property, homeScore,awayScore){
		homeScore > 0 && awayScore > 0 ? this[property].GG++ : this[property].NG++;
	}
}
function PredictionOutcomeCollection(){
	this.H=0;
	this.D=0;
	this.A=0;
	this.E101=0;
	this.E201=0;
	this.E011=0;
	this.E021=0;
	this.E10X=0;
	this.E20X=0;
	this.E01X=0;
	this.E02X=0;
	this.E102=0;
	this.E202=0;
	this.E012=0;
	this.E022=0;
	this.O15=0;
	this.O25=0;
	this.O35=0;
	this.U15=0;
	this.U25=0;
	this.U35=0;
	this.GG=0;
	this.NG=0;
	this.total=0;
}