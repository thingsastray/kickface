(function(){

	var INITIAL_POSTIONS = [
	//player 1
	{ x: 100, y: 100 },
	//player 2
	{ x: 600, y: 100 }
	];


	// class constructor
	kickface.Game = function (){

		this.player_1;
		this.player_2;
		

	};


	kickface.Game.prototype.create = function() {

		this.player_1 = new kickface.Player( this.game, 0);
		this.player_2 = new kickface.Player( this.game, 1);
		this.game.add.existing(this.player_1);
		this.game.add.existing(this.player_2);

		//position players
		this.player_1.x = INITIAL_POSTIONS[0].x;
		this.player_1.y = INITIAL_POSTIONS[0].y;
		this.player_2.x = INITIAL_POSTIONS[1].x;
		this.player_2.y = INITIAL_POSTIONS[1].y;

	};

	kickface.Game.prototype.update = function() {
		
		//set facing direction
		if(this.player_1.x < this.player_2.x){ //player 1 is on left side
			this.player_1.facing = kickface.Player.FACING.RIGHT;
			this.player_2.facing = kickface.Player.FACING.LEFT;
		} else{
			this.player_1.facing = kickface.Player.FACING.LEFT;
			this.player_2.facing = kickface.Player.FACING.RIGHT;
		}

	};

	kickface.Game.prototype.shutdown = function() {
		
	};
})();

