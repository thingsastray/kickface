// Responsible for preloading asset and switching to the game state

// class constructor
kickface.Boot = function (){

};

kickface.Boot.prototype.preload = function() {
	// will preload all assets
};

kickface.Boot.prototype.create = function() {
	
	//switch to the game state
	this.state.start(kickface.STATES.GAME);

};