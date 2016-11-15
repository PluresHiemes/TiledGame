var TopDownGame = TopDownGame || {};

//loading the game assets
TopDownGame.Preload = function(){};

TopDownGame.Preload.prototype = {
  preload: function() {
 

    //load game assets
    this.load.tilemap('map', 'assets/tilemaps/testmap.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.image('gameTiles', 'assets/images/tiles.png');

    this.load.image('player', 'assets/images/player.png');
    this.load.image('menuBackground', 'assets/images/MenuBackground.jpg')
    
  },
  create: function() {
    this.state.start('MainMenu');
  }
};