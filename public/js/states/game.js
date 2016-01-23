// class constructor

kickface.Game = function (){

	this.player_1;

};


kickface.Game.prototype.create = function() {

	this.player_1 = new kickface.Player( this.game, 0);
	this.game.add.existing(this.player_1);

};

kickface.Game.prototype.update = function() {
	
};

kickface.Game.prototype.shutdown = function() {
	
};
