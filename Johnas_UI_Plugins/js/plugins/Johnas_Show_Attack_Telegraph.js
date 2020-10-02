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

/**
 * Input.keyMapper[ "80" ] = "customMenu";

    _alias_scene_map_update = Scene_Map.prototype.update;
    Scene_Map.prototype.update = function() {
        _alias_scene_map_update.call( this );
        if( Input.isTriggered( "customMenu" ) )
        {
            SceneManager.push( Scene_CustomMenu );
        }
    };
 */




( function() 
{  
	var parameters = PluginManager.parameters('Show_Attack_Telegraph');
       

    // 74 is key "J"
    Input.keyMapper[ "74" ] = "activate";

    // Have to watch out - _alias .. is used in hearts_working so have to
    // have different names
    _alias_scene_map_update2 = Scene_Map.prototype.update;
    Scene_Map.prototype.update = function() {
        _alias_scene_map_update2.call( this );
        if( Input.isTriggered( "activate" ) )
        {
            console.log( "pressed j" );



            /**
             * $game_map.tile_id(x, y, layer)
             * Should return the tileID of the selected tile
             */
            console.log( $game_map.tile_id(x, y, layer) );
            // $game_map.data[11,5,0] = 2816;


            var myInterpreter = new Game_Interpreter()
            myInterpreter.pluginCommand('ChangeTile', ['3', '2', '0', '4']);
            /**
             * ChangeTile 4 3 0 1
             * Changetile( x, y, z, tileID );
             */



            console.log( "done" );
            



        }
    };




})();  // dont touch this.