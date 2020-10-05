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

    - Make different cases for the different enemy attacks

    - Find/think out how the other files will access the functions in here
      - I'm thinking do via plugin command, 
        var myInterpreter = new Game_Interpreter()
        myInterpreter.pluginCommand('Show_Attack', ['x', 'y', 'z', 'type_of_attack']);

      - Have to learn how to do the args thing
    
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


( function() 
{  
	var parameters = PluginManager.parameters('Show_Attack_Telegraph');
       

    // 74 is key "J"
    Input.keyMapper[ "74" ] = "Attack Happening";
    // Have to watch out - _alias .. is used in hearts_working so have to
    // have different names
    _alias_scene_map_draw_attack_tiles = Scene_Map.prototype.update;
    Scene_Map.prototype.update = function() {
      _alias_scene_map_draw_attack_tiles.call( this );
        if( Input.isTriggered( "Attack Happening" ) )
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




    // 74 is key "K"
    Input.keyMapper[ "75" ] = "Attack Finished Redraw OG";
    // Have to watch out - _alias .. is used in hearts_working so have to
    // have different names
    _alias_scene_map_redraw_og_tiles = Scene_Map.prototype.update;
    Scene_Map.prototype.update = function() {
      _alias_scene_map_redraw_og_tiles.call( this );
        if( Input.isTriggered( "Attack Finished Redraw OG" ) )
        {
            console.log( "The K button has been pressed" );

            /**
             * Working function that works as "Plugin command"
             */
            var myInterpreter = new Game_Interpreter()
            myInterpreter.pluginCommand('ChangeTile', ['3', '2', '0', '2816']);
            /**
             * ChangeTile 4 3 0 1
             * Changetile( x, y, z, tileID );
             */

            console.log( "Tile ID at 3, 2, 0" );
            console.log( $gameMap.tileId( 3, 2, 0 ) );

            console.log( "Done the 'Pressed K' comand" );
        }
    };



    var _Johnas_Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    // Game_Interpreter.prototype.pluginCommand = function( command, args ) 
    Game_Interpreter.prototype.pluginCommand = function( command ) 
    {
        switch( command.toUpperCase() ) 
        {
            case 'MELEE':
                // $gameMap.copyTiles();
                console.log( "MELEE CASE" );
                break;
            // case 'CHANGETILE':
            //     $gameMap.changeTile(args);
            //     break;
            default:
                // _Johnas_Game_Interpreter_pluginCommand.call(this, command, args);
                console.log( "No case detected" );
                _Johnas_Game_Interpreter_pluginCommand.call( this, command );
        }
    };

})();  // dont touch this.