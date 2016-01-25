// The Game state
// handles sprite creation and game logic
(function() {

  var GRAVITY = 1945;

  var INITIAL_POSITIONS = [
    // player 1
    { x : 100, y : 100 },
    // player 2
    { x : 600, y : 100 }
  ];

  var MATCH = {
    PRE : "PRE",
    IN_PROGRESS : "IN_PROGRESS",
    RESOLVED : "RESOLVED"
  };

  var FLASH_MESSAGE_STYLE = {
    font: "65px Arial",
    fill: "#ff0044",
    align: "center"
  };

  var DEFAULT_FLASH_TIME = 3000; // ms

  // class constructor
  kickface.Game = function() {

    this.player_1;
    this.player_2;
    this.input;
    this.match_state;
  };

  kickface.Game.FLOOR_Y = 400;

  kickface.Game.prototype.create = function() {

    this.match_state = MATCH.IN_PROGRESS;

    this.game.add.tileSprite(0, 0, kickface.ASSETS.IMAGE.BG.width,
    	kickface.ASSETS.IMAGE.BG.height, kickface.ASSETS.IMAGE.BG.name);

    this.player_1 = new kickface.Player( this.game, 0);
    this.player_2 = new kickface.Player( this.game, 1);
    this.game.add.existing(this.player_1);
    this.game.add.existing(this.player_2);

    // position players
    this.player_1.x = INITIAL_POSITIONS[0].x;
    this.player_1.y = INITIAL_POSITIONS[0].y;
    this.player_2.x = INITIAL_POSITIONS[1].x;
    this.player_2.y = INITIAL_POSITIONS[1].y;

    // initialize input handler
    this.input = new kickface.GameInput(this);

  };

  kickface.Game.prototype.update = function() {

    // set facing direction
    if ( this.player_1.x < this.player_2.x ){ // player 1 is on the left side
      this.player_1.facing = kickface.Player.FACING.RIGHT;
      this.player_2.facing = kickface.Player.FACING.LEFT;
    } else { // player 1 is on the right side
      this.player_1.facing = kickface.Player.FACING.LEFT;
      this.player_2.facing = kickface.Player.FACING.RIGHT;
    }

    // for both players
    [this.player_1, this.player_2].forEach(function(player){

      // touching land or falling
      if(player.body.y > kickface.Game.FLOOR_Y){
        player.body.y = kickface.Game.FLOOR_Y;
        player.body.velocity.y = 0;
        player.body.acceleration.y = 0;
      }else{
        player.body.acceleration.y = GRAVITY;
      }

    });

    // update physics
    this.game.physics.arcade.collide(this.player_1, this.player_2, players_collide, should_players_collide, this);

  };

  function players_collide(player_1, player_2){
    // check if both are diving
    if(player_1.is_diving && player_2.is_diving){
      // higher player wins
      if( player_1.body.y < player_2.body.y ){
        this.resolve_match(player_1, player_2);
        player_1.victory();
        player_2.defeat();
      }else{
        this.resolve_match(player_2, player_1);
        player_1.defeat();
        player_2.victory();
      }
    } else { // only one player is diving
      // the player diving wins
      if(player_1.is_diving){
        this.resolve_match(player_1, player_2);
      } else { // player 2 is diving
        this.resolve_match(player_2, player_1);
      }
    }

  }

  function should_players_collide(player_1, player_2){
    return this.match_state == MATCH.IN_PROGRESS &&
      [player_1, player_2].some(function(player){
        return player.is_diving;
      });
  }

  kickface.Game.prototype.resolve_match = function(victor, loser){
    victor.victory();
    loser.defeat();
    this.match_state = MATCH.RESOLVED;

    this.flash(victor.name + ' wins!!!', this.enable_restart_game.bind(this));
  };

  kickface.Game.prototype.flash = function(message, cb){

    var text = this.game.add.text(0, 0, message, FLASH_MESSAGE_STYLE);
    text.x = this.game.world.centerX - text.width/2;

    setTimeout(function(){
      text.destroy();
      if(cb) cb();
    }, DEFAULT_FLASH_TIME);
  };

  kickface.Game.prototype.enable_restart_game = function(){
    this.flash('press [enter] to play again');

  };

  kickface.Game.prototype.shutdown = function() {

  };

  // Input actions
  kickface.Game.prototype.continue = function() {
    if(this.match_state === MATCH.RESOLVED){
      this.state.start(kickface.STATES.BOOT);
    }
  };

})();