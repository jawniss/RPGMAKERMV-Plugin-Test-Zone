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

    - Figure out how to do the dredrawing, if another method? Issue with that is that
      how does the new method know the old tileId's?

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
       
/////////////////////////////////////////////////////////////////////////////////
    // 74 is key "J"
    Input.keyMapper[ "74" ] = "TileID Checker ( 0, 0, 0 )";
    // Have to watch out - _alias .. is used in hearts_working so have to
    // have different names
    _alias_scene_map_draw_attack_tiles = Scene_Map.prototype.update;
    Scene_Map.prototype.update = function() {
      _alias_scene_map_draw_attack_tiles.call( this );
        if( Input.isTriggered( "TileID Checker ( 0, 0, 0 )" ) )
        {
            console.log( "The J button has been pressed" );
            console.log( "Tile ID at 0, 0, 0" );
            console.log( $gameMap.tileId( 0, 0, 0 ) );

            console.log( "Done the 'Pressed J' comand" );
        }
    };
/////////////////////////////////////////////////////////////////////////////////





    /**
     * Need to put in perimetre checking for if attack would go off map
     * 
     * For the redraw, hacky bad way is to do globals under the interpreter
     * part --> i could extract out a function that's just getting the stuff
     * like a function object property
     * https://stackoverflow.com/questions/407048/accessing-variables-from-other-functions-without-using-global-variables
     * top answer second point
     * 
     * but with that there's the issue of 2 being drawn at the same time and the global object
     * being rewritten
     * 
     * I THINK I NEED TO DO A DICTIONARY/VECTOR TO STORE THE COORDINATES AND SUCH
     * FOR HANDLING OF MULTIPLE AT ONCE
     * 
     * I THINK JUST NEED A 2 KEY DICTIONARY: 
     *  KEY 1: ATTACK NUMBER ID
     *  KEY 2: OLD TILES
     * 
     * I CAN HAVE DIFFERENT DICITONARYS FOR EACH ATTACK SO
     * MELEE_DICT
     * RANGE_DICT
     * 
     * 
     * OR The file calling to show the attack will do this:
     * Show_attack( 1 );
     * Turn ends;
     * Remove_attack( 1 );
     * ++i; 
     * and only in remove_attack, delete the key from the dict
     * --> so the file calling the function would have the double increments
     *  show_attack increment starts at 0, remove_attack starts at 1
     *  remove_attack( i );
     *  if( i < show_attack_i )
     *  {
     *    ++i;
     *  } 
     * 
     * 
     * 
     *  Have the file callling the functions to use the x, y, z as coordinates
     * then put it into a dict with the coords as the key, then have 4 values associated
     * with it (top, left, right, bottom tiles)
     */
    showMeleeAttack = function( args )
    {
      /**
       * I could reuse this structure if I put an array into the dict
       */
      var x = eval(args.shift());
      var y = eval(args.shift());
      var z = eval(args.shift());

      console.log( "Showing melee attack" );

      console.log( "Tile ", x, " ", y, " ", z, " is centre of attack" );
      // var oldTileLeft = $gameMap.tileId( x - 1, y, z );
      // var oldTileRight = $gameMap.tileId( x + 1, y, z );
      // var oldTileUp = $gameMap.tileId( x, y - 1, z );
      // var oldTileDown = $gameMap.tileId( x, y + 1, z );
      
      // var xString = x.toString();
      // var xLeftString = ( x - 1 ).toString();
      // var xRightString = ( x + 1 ).toString();

      // var yString = y.toString();
      // var yUpString = ( y - 1 ).toString();
      // var yDownString = ( y + 1 ).toString();

      // var zString = z.toString();

      var myInterpreter = new Game_Interpreter();

      // myInterpreter.pluginCommand('ChangeTile', [ xLeftString, yString, zString, '2386' ] );
      // myInterpreter.pluginCommand('ChangeTile', [ xRightString, yString, zString, '2386' ] );
      // myInterpreter.pluginCommand('ChangeTile', [ xString, yUpString, zString, '2386' ] );
      // myInterpreter.pluginCommand('ChangeTile', [ xString, yDownString, zString, '2386' ] );

      console.log( "Done showing melee attack" );
    }

    removeMeleeAttack = function() 
    {

    }

    var redrawMeleeAttackDict = [];
    var meleeAttackRedrawCounter = 1;

    meleeAttackDict = function( args )
    {


      var x = eval(args.shift());
      var y = eval(args.shift());
      var z = eval(args.shift());

      /**
       * tileId's of the tiles being changed that need to be redrawn after
       */
      var idOldTileLeft = $gameMap.tileId( x - 1, y, z );
      var idOldTileRight = $gameMap.tileId( x + 1, y, z );
      var idOldTileUp = $gameMap.tileId( x, y - 1, z );
      var idOldTileDown = $gameMap.tileId( x, y + 1, z );

      /**
       * Getting coordinates of the affected tiles
       */
      var xString = x.toString();
      var xLeftString = ( x - 1 ).toString();
      var xRightString = ( x + 1 ).toString();

      var yString = y.toString();
      var yUpString = ( y - 1 ).toString();
      var yDownString = ( y + 1 ).toString();

      var zString = z.toString();

      var oldLeft = [ xLeftString, yString, zString, idOldTileLeft ];
      var oldRight = [ xRightString, yString, zString, idOldTileRight ];
      var oldUp = [ xString, yUpString, zString, idOldTileUp ];
      var oldDown = [ xString, yDownString, zString, idOldTileDown ];

      redrawMeleeAttackDict.push( 
        {
          meleeAttackId: meleeAttackRedrawCounter,
          oldLeftTile: oldLeft,
          oldRightTile: oldRight,
          oldUpTile: oldUp,
          oldDownTile: oldDown
        }
      )

      console.log( redrawMeleeAttackDict[ 0 ].meleeAttackId );
      console.log( redrawMeleeAttackDict[ 0 ].oldLeftTile );
      console.log( redrawMeleeAttackDict[ 0 ].oldRightTile );
      console.log( redrawMeleeAttackDict[ 0 ].oldUpTile );
      console.log( redrawMeleeAttackDict[ 0 ].oldDownTile );

      ++meleeAttackRedrawCounter;
    }


    // 75 is key "K"
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
            var myInterpreter = new Game_Interpreter();
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



    /**
     * Taking care of the "plugin command" command
     */
    var _Johnas_Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    // Game_Interpreter.prototype.pluginCommand = function( command, args ) 
    Game_Interpreter.prototype.pluginCommand = function( command, args ) 
    {
        switch( command.toUpperCase() ) 
        {
            case 'MELEE':
                // $gameMap.copyTiles();
                console.log( "MELEE CASE" );
                meleeAttackDict( args );
                break;
            // case 'CHANGETILE':
            //     $gameMap.changeTile(args);
            //     break;
            default:
                // _Johnas_Game_Interpreter_pluginCommand.call(this, command, args);
                console.log( "No case detected" );
                // _Johnas_Game_Interpreter_pluginCommand.call( this, command, args );
        }
    };

})();  // dont touch this.