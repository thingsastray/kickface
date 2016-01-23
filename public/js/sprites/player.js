(function(){
	//private static variable
	var ANIMATIONS = {
		IDLE : {
			name: "idle",
			frames : [0, 1, 2, 3],
			fps : 5
		}
	};

	var FACING_FACTOR = {
		LEFT: -1,
		RIGHT: 1
	};
	
	// sprite class constructor
	// 0id is 0 index based
	kickface.Player = function (game, id, name) {
		this.game = game;
		this.id = id;
		this.name = name? name : 'Player '+(id+1);
		this.facing; //direction that player is facing

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

	//public static variable
	kickface.Player.FACING = {
		LEFT: 'LEFT',
		RIGHT: 'RIGHT'
	};

	//invoked on every frame
	kickface.Player.prototype.update = function() {
		
		//update facing
		this.scale.x = FACING_FACTOR[ this.facing];
	
	};

})();


