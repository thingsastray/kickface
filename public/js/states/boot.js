

kickface.Boot = function (){

};

kickface.Boot.prototype.preload = function() {
	// will preload all assets
	
	Object.keys(kickface.ASSETS).forEach(function(type){
		for( var asset in kickface.ASSETS[type]){
			kickface.game.load[ type.toLowerCase ()](
				kickface.ASSETS[type][asset].name,
				kickface.ASSETS[type][asset].path,
				kickface.ASSETS[type][asset].width,
				kickface.ASSETS[type][asset].height,
				kickface.ASSETS[type][asset].frames
			);
		}
	});
};

kickface.Boot.prototype.create = function() {
	
	this.state.start(kickface.STATES.GAME);

};