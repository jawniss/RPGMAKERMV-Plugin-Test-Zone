/*=============================================================================
 * Johnas' Attack Telegraphing Plugin
 * by Johnas Wong
 * Date: October 1, 2020 
 * Johnas_Show_Attack_Telegraph.js
 *=============================================================================*/
/*:
 * @plugindesc Shows the affected areas of an enemy's attacks
 * @author Johnas
 *
 * @param 
 * @desc 
 * @default 
 */

 /**
  * TO DO LIST:

    - Find the tileID of the tiles to be replaced
    
    - Put in waits after turning tile red before turning it back to old tile

    - Extra info section in the top comment blocks to say "Shaz's Shaz_TileChanger.js"
      is needed to be in the plugins

    - MAJOR POTENTIAL ISSUE: DOING THE PLUGIN COMMAND WITH THE BUILT IN DEFAULT
      RPG MAKER TILES, NOT SURE HOW IT WILL WORK WITH CUSTOM TILES THAT ARE IMPORTED
      INTO THE GAME
  */

/**
 * General idea for layout of this file:
 * have it act as a function that is called with the parameters of the 
 * location on the 2D grid (x and y coordinates) and the type of attack 
 * (melee, range, etc) so like telegraph( int x, int y, string attackType )
 * and so in the other enemy files whenever they attack, they just call this
 * function with the parameters from this file.
 * 
 * For now try to make general function where I can hard code the coordinates
 * and upon execution it'll make the four adjacent tiles red
 */


// function Game_Map() {
//   this.initialize.apply(this, arguments);
// }

// Game_Map.prototype.initialize = function() {
//   this._interpreter = new Game_Interpreter();
  // this._mapId = 0;
  // this._tilesetId = 0;
  // this._events = [];
  // this._commonEvents = [];
  // this._vehicles = [];
  // this._displayX = 0;
  // this._displayY = 0;
  // this._nameDisplay = true;
  // this._scrollDirection = 2;
  // this._scrollRest = 0;
  // this._scrollSpeed = 4;
  // this._parallaxName = '';
  // this._parallaxZero = false;
  // this._parallaxLoopX = false;
  // this._parallaxLoopY = false;
  // this._parallaxSx = 0;
  // this._parallaxSy = 0;
  // this._parallaxX = 0;
  // this._parallaxY = 0;
  // this._battleback1Name = null;
  // this._battleback2Name = null;
// };

// Game_Map.prototype.setup = function(mapId) {
//   if (!$dataMap) {
//       throw new Error('The map data is not available');
//   }
//   this._mapId = mapId;
//   this._tilesetId = $dataMap.tilesetId;
//   this._displayX = 0;
//   this._displayY = 0;
//   this._needsRefresh = false;
// };

( function() 
{  
	var parameters = PluginManager.parameters('Show_Attack_Telegraph');
       

    // 74 is key "J"
    Input.keyMapper[ "74" ] = "Change tiles";

    // Have to watch out - _alias .. is used in hearts_working so have to
    // have different names
    _alias_scene_map_update2 = Scene_Map.prototype.update;
    Scene_Map.prototype.update = function() {
        _alias_scene_map_update2.call( this );
        if( Input.isTriggered( "Change tiles" ) )
        {
            console.log( "The J button has been pressed" );



            /**
             * In rpg_objects.js there's the tileID function
             */
            console.log( "Tile ID at 0, 0, 0" );
            console.log( $gameMap.tileId( 0, 0, 0 ) );
            // $game_map.data[11,5,0] = 2816;


            console.log( "Tile ID at 1, 1, 0" );
            console.log( $gameMap.tileId( 1, 1, 0 ) );







            /**
             * Working function that works as "Plugin command"
             */
            var myInterpreter = new Game_Interpreter()
            myInterpreter.pluginCommand('ChangeTile', ['3', '2', '0', '4']);
            /**
             * ChangeTile 4 3 0 1
             * Changetile( x, y, z, tileID );
             */

            console.log( "Tile ID at 3, 2, 0" );
            console.log( $gameMap.tileId( 3, 2, 0 ) );

            console.log( "Done the 'Pressed J' comand" );
            



        }
    };




})();  // dont touch this.