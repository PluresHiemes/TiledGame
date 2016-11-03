//var TopDownGame = TopDownGame || {};
//title screen
TopDownGame.Game = function () {};
TopDownGame.Game.prototype = {
    create: function () {
        
        this.game.physics.arcade.gravity.y = 300;
        this.map = this.game.add.tilemap('map');
        //the first parameter is the tileset name as specified in Tiled, the second is the key to the asset
        this.map.addTilesetImage('tiles', 'gameTiles');
        //create layer
        
        //player
          
        
        this.backgroundlayer = this.map.createLayer('backgroundLayer');
        this.blockedLayer = this.map.createLayer('collideLayer');
        //collision on blockedLayer
      
        
        //resizes the game world to match the layer dimensions
        this.backgroundlayer.resizeWorld();
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.map.setCollisionBetween(1,1000, true, 'collideLayer');
        //this.map.setCollision("")
        //this.createItems();
        //this.createDoors();    
        //create player
        var result = this.findObjectsByType('playerStart', this.map, 'player')
        this.player = this.game.add.sprite(result[0],result[1], 'player');
      
        this.game.physics.arcade.enable(this.player);
        this.player.body.velocity.y =0;
       
        //the camera will follow the player in the world
        this.game.camera.follow(this.player);
        //move player with cursor keys
        this.cursors = this.game.input.keyboard.createCursorKeys();
    }
    , createItems: function () {
        //create items
        this.items = this.game.add.group();
        this.items.enableBody = true;
        var item;
        result = this.findObjectsByType('item', this.map, 'objectsLayer');
        result.forEach(function (element) {
            this.createFromTiledObject(element, this.items);
        }, this);
    }
    , createDoors: function () {
        //create doors
        this.doors = this.game.add.group();
        this.doors.enableBody = true;
        result = this.findObjectsByType('door', this.map, 'objectsLayer');
        result.forEach(function (element) {
            this.createFromTiledObject(element, this.doors);
        }, this);
    }
    , //find objects in a Tiled layer that containt a property called "type" equal to a certain value
    findObjectsByType: function (type, map, layer) {
        var result = new Array();
        map.objects[layer].forEach(function (element) {
            if (element.properties.type === type) {
                //Phaser uses top left, Tiled bottom left so we have to adjust
                //also keep in mind that the cup images are a bit smaller than the tile which is 16x16
                //so they might not be placed in the exact position as in Tiled
                element.y -= map.tileHeight;
                result.push(element);
            }
        });
        return result;
    }
    , //create a sprite from an object
    createFromTiledObject: function (element, group) {
        var sprite = group.create(element.x, element.y, element.properties.sprite);
        //copy all properties to the sprite
        Object.keys(element.properties).forEach(function (key) {
            sprite[key] = element.properties[key];
        });
    }
    , update: function () {
        //collision
         this.player.body.velocity.x = 0;
        
        
        this.player.body.gravity.y = 200; 
        this.game.physics.arcade.collide(this.player,this.blockedLayer );
        this.game.physics.arcade.overlap(this.player, this.items, this.collect, null, this);
        this.game.physics.arcade.overlap(this.player, this.doors, this.enterDoor, null, this);
        //player movement
        
        if (this.cursors.up.isDown) {
            if (this.player.body.velocity.y == 0) this.player.body.velocity.y = -100;
        }
        else if (this.cursors.down.isDown) {
            if (this.player.body.velocity.y == 0) this.player.body.velocity.y = 50;
        }
        else {
            //xhis.player.body.velocity.y = 0;
        }
        if (this.cursors.left.isDown) {
            this.player.body.velocity.x = -100;
        }
        else if (this.cursors.right.isDown) {
            this.player.body.velocity.x = 100;
        }
    }
    , collect: function (player, collectable) {
        console.log('yummy!');
        //remove sprite
        collectable.destroy();
    }
    , enterDoor: function (player, door) {
        console.log('entering door that will take you to ' + door.targetTilemap + ' on x:' + door.targetX + ' and y:' + door.targetY);
    }
, };