(function(){
	//private static variable
	var ANIMATIONS = {
		IDLE : {
			name: "idle",
			frames : [0, 1, 2, 3],
			fps : 5
		},
		 WALK : {
      name : 'walk',
      frames : [4,5],
      fps : 10
    },
    JUMP : {
      name : 'jump',
      frames : [6],
      fps : 1
    },
    DIVE : {
      name : 'dive',
      frames : [7],
      fps : 1
    },
    DEAD : {
      name : 'dead',
      frames : [8],
      fps : 1
    }
	};

	var FACING_FACTOR = {
		LEFT: -1,
		RIGHT: 1
	};

	var WALK_SPEED = 500;

	var JUMP_HEIGHT = 1000;

	var DIVE_SPEED = 400;

	var DIVE_DISTANCE = 400; // horizontal "steps" per frame

	
	var DIVE_JUMP_TIMEOUT = 125; //ms after a dive that counts as a dive still happening(and can jump)

	function select_sprite_row(player_id){
		return function(frame_id){
			return frame_id + player_id * 
			kickface.ASSETS.SPRITESHEET.PLAYER.frames_per_row;
		};
	}
	// sprite class constructor
	// 0id is 0 index based
	kickface.Player = function (game, id, name) {
		this.game = game;
		this.id = id;
		this.name = name? name : 'Player '+(id+1);
		this.facing; //direction that player is facing
		this.is_diving = false;

		//super constructor call
		Phaser.Sprite.call(this, game, 0, 0, kickface.ASSETS.SPRITESHEET.PLAYER.name);

		//enable physics (adds this.body)
		this.game.physics.enable(this, Phaser.Physics.ARCADE);

		//use stage bounding box
		this.body.collideWorlBounds = true;

	

		// set center registration point
		this.anchor = {x : 0.5, y: 0.5};

		// play animations
		this.animations.play(ANIMATIONS.IDLE.name, 
			ANIMATIONS.IDLE.fps, true
		);

		//public static variable
		kickface.Player.FACING = {
			LEFT: 'LEFT',
			RIGHT: 'RIGHT'
		};

			// extends Sprite protype

		kickface.Player.prototype = Object.create	(Phaser.Sprite.prototype, {
			constructor: {
				value: kickface.Player
			}
		});


		// initial animation state
		
		
			this.animations.add(ANIMATIONS.IDLE.name, 
				ANIMATIONS.IDLE.frames.map(select_sprite_row(this.id))
			);
			this.animations.add(ANIMATIONS.WALK.name, 
				ANIMATIONS.WALK.frames.map(select_sprite_row(this.id))
			);
	    this.animations.add(ANIMATIONS.JUMP.name, 
	    	ANIMATIONS.JUMP.frames.map(select_sprite_row(this.id))
	    );
	    this.animations.add(ANIMATIONS.DIVE.name, 
	    	ANIMATIONS.DIVE.frames.map(select_sprite_row(this.id))
	    );
	    this.animations.add(ANIMATIONS.DEAD.name, 
	    	ANIMATIONS.DEAD.frames.map(select_sprite_row(this.id))
	    );
  	
		
	};
	

	//invoked on every frame
	kickface.Player.prototype.update = function() {
		
		// low acceleration(gravity) while diving
		if(this.diving){
			this.body.accerleration.y = 1000;
		}	

		// update facing
    if( this.alive ){
      this.scale.x = FACING_FACTOR[ this.facing ];
    }
		
		// update animations
    if(!this.alive){
      this.animations.play(ANIMATIONS.DEAD.name);
    }else if(this.is_diving){
      this.animations.play(ANIMATIONS.DIVE.name);
    }else{
      if(this.body.y < kickface.Game.FLOOR_Y){ // in the air
        this.animations.play(ANIMATIONS.JUMP.name);
      } else if(this.body.velocity.x !== 0){ // running
        this.animations.play(ANIMATIONS.WALK.name, ANIMATIONS.WALK.fps, true);
      } else {
        this.animations.play(ANIMATIONS.IDLE.name, ANIMATIONS.IDLE.fps, true);
      }
    }
	};

	kickface.Player.prototype.victory = function() {
		this.is_diving = false;
	};

	kickface.Player.prototype.defeat = function(){

    // stop all input
    this.alive = false;

    //make animation
    this.animation.play(ANIMATIONS.DEAD.name);
  };

	//Input actions

	kickface.Player.prototype.jump = function(){
		if(!this.alive) return;

		 // allow jumping from the floor (not in mid air)
    if( this.body.y === kickface.Game.FLOOR_Y ){
      this.body.velocity.y = -JUMP_HEIGHT;
    } else if( this.is_diving ){ // allow jump after dive (in mid air)
      this.body.velocity.y = -JUMP_HEIGHT*(this.body.y/kickface.Game.FLOOR_Y);
    }
	};
	
	kickface.Player.prototype.dive = function() {
		if(!this.alive) return;

		if( this.body.y < kickface.Game.FLOOR_Y ){
      this.body.velocity.y = DIVE_SPEED;
      this.body.velocity.x = DIVE_DISTANCE * FACING_FACTOR[ this.facing ];
      this.is_diving = true;
    }else{
      this.body.velocity.y = 0;
      this.body.velocity.x = 0;
      this.is_diving = false;
    }
	};

	kickface.Player.prototype.dive_stop = function() {
		// reset velocity
    this.body.velocity.x = 0;
    this.body.velocity.y = 0;
    setTimeout(function(){
      this.is_diving = false;
    }.bind(this), DIVE_JUMP_TIMEOUT);
	};

	kickface.Player.prototype.step_left = function() {
		if(!this.alive) return;
		this.body.velocity.x = -WALK_SPEED;
	};

	kickface.Player.prototype.step_right = function() {
		if(!this.alive) return;
		this.body.velocity.x = WALK_SPEED;

	};

	//stop stepping left or right
	kickface.Player.prototype.stop = function() {
		this.body.velocity.x = 0;
	};




})();


