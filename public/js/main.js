// create a single global class

window.kickface = {
	ASSETS: {},

	STAGE: {
		WIDTH: 900,
		HEIGHT: 600
	},

	STAGE_ID: 'game',

	STATES: {
		BOOT: 'Boot',
		GAME: 'Game'
	}
};

// Load Phaser on window load
window.onload = function (){
	kickface.game = new Phaser.Game(kickface.STAGE.WIDTH,
		kickface.STAGE.HEIGHT, Phaser.AUTO, kickface.STAGE_ID
		);
	kickface.game.state.add(kickface.STATES.BOOT, kickface.Boot);
	kickface.game.state.add(kickface.STATES.GAME, kickface.Game);
	kickface.game.state.start(kickface.STATES.BOOT);
};