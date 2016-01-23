(function(){
	//private static variable
	var ANIMATIONS = {
		IDLE : {
			name: "idle",
			frames : [0, 1, 2, 3],
			fps : 5
		}
	};
	
	// sprite class constructor
	// 0id is 0 index based
	kickface.Player = function (game, id, name) {
		this.game = game;
		this.id = id;
		this.name = name? name : 'Player '+(id+1);

		//super constructor call
		Phaser.Sprite.call(this, game, 0, 0, 
			kickface.ASSETS.SPRITESHEET.PLAYER.name
		);

		// set animations
		this.animations.add(ANIMATIONS.IDLE.name, 
			ANIMATIONS.IDLE.frames
		);

		// play animations
		this.animations.play(ANIMATIONS.IDLE.name, 
			ANIMATIONS.IDLE.fps, true
		);
	};

	// extends Sprite protpye

	kickface.Player.prototype = Object.create	(Phaser.Sprite.prototype, {
		constructor: {
			value: kickface.Player
		}
	});
})();


