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
    // 70 is key "F"
    Input.keyMapper[ "70" ] = "TileID Checker ( 0, 0, 0 )";
    // Have to watch out - _alias .. is used in hearts_working so have to
    // have different names
    _alias_scene_map_draw_attack_tiles = Scene_Map.prototype.update;
    Scene_Map.prototype.update = function() {
      _alias_scene_map_draw_attack_tiles.call( this );
        if( Input.isTriggered( "TileID Checker ( 0, 0, 0 )" ) )
        {
            console.log( "The F button has been pressed" );
            console.log( "Tile ID at 0, 0, 0" );
            console.log( $gameMap.tileId( 0, 0, 0 ) );

            console.log( "Done the 'Pressed F' comand" );
        }
    };
/////////////////////////////////////////////////////////////////////////////////





    /**
     * Need to put in perimetre checking for if attack would go off map
     * 
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
     */
    showMeleeAttack = function( args )
    {
      /**
       * I could reuse this structure if I put an array into the dict
       */
      // var x = eval(args.shift());
      // var y = eval(args.shift());
      // var z = eval(args.shift());

      /**
       * JS DOES BY REFERENCE
       */
      // var localOldLeft = args.oldLeftTile;
      // var localOldRight = args.oldRightTile;
      // var localOldUp = args.oldUpTile;
      // var localOldDown = args.oldDownTile;


      var localOldLeft = Object.create( args.oldLeftTile );
      var localOldRight = Object.create( args.oldRightTile );
      var localOldUp = Object.create( args.oldUpTile );
      var localOldDown = Object.create( args.oldDownTile );



      console.log( "Inside showMeleeAttack" );
      // ["4", "5", "0", 2816]
      console.log( localOldLeft );
      console.log( localOldRight );
      console.log( localOldUp );
      console.log( localOldDown );

      /**
       * Redudnant, but i wanted to keep clarity
       */
      var newLeft = Object.create( localOldLeft );
      var newRight = Object.create( localOldRight );
      var newUp = Object.create( localOldUp );
      var newDown = Object.create( localOldDown );

      newLeft[ 3 ] = '2386';
      newRight[ 3 ] = '2386';
      newUp[ 3 ] = '2386';
      newDown[ 3 ] = '2386';

      // console.log( "New left" );
      // // ["4", "5", "0", "2386"]
      // console.log( newLeft );




      var myInterpreter = new Game_Interpreter();


      /**
       * For some reason it's removing the element from the dict here
       * IT'S CUS ALL THE NEW VARIABLES ARE BY REFERENCE 
       * SO VAR A = 100
       * VAR B = A
       * B EQUALS 100 IF DO
       * A = 20
       * B NOW EQUALS 20
       */

      // myInterpreter.pluginCommand('ChangeTile', [ xLeftString, yString, zString, '2386' ] );
      // myInterpreter.pluginCommand('ChangeTile', [ xRightString, yString, zString, '2386' ] );
      // myInterpreter.pluginCommand('ChangeTile', [ xString, yUpString, zString, '2386' ] );
      // myInterpreter.pluginCommand('ChangeTile', [ xString, yDownString, zString, '2386' ] );




      myInterpreter.pluginCommand('ChangeTile', newLeft );
      myInterpreter.pluginCommand('ChangeTile', newRight );
      myInterpreter.pluginCommand('ChangeTile', newUp );
      myInterpreter.pluginCommand('ChangeTile', newDown );


      console.log( "Done showing melee attack" );
    }








    removeMeleeAttack = function( args ) 
    {
      var localOldLeft = Object.create( args.oldLeftTile );
      var localOldRight = Object.create( args.oldRightTile );
      var localOldUp = Object.create( args.oldUpTile );
      var localOldDown = Object.create( args.oldDownTile );

      console.log( "Inside removeMeleeAttack" );
      // ["4", "5", "0", 2816]
      console.log( localOldLeft );
      console.log( localOldRight );
      console.log( localOldUp );
      console.log( localOldDown );

      var myInterpreter = new Game_Interpreter();

      // myInterpreter.pluginCommand('ChangeTile', [ xLeftString, yString, zString, '2386' ] );
      // myInterpreter.pluginCommand('ChangeTile', [ xRightString, yString, zString, '2386' ] );
      // myInterpreter.pluginCommand('ChangeTile', [ xString, yUpString, zString, '2386' ] );
      // myInterpreter.pluginCommand('ChangeTile', [ xString, yDownString, zString, '2386' ] );

      /**
       * I think this may theoretically remove it from the dict? cus it's so janky
       */
      myInterpreter.pluginCommand('ChangeTile', localOldLeft );
      myInterpreter.pluginCommand('ChangeTile', localOldRight );
      myInterpreter.pluginCommand('ChangeTile', localOldUp );
      myInterpreter.pluginCommand('ChangeTile', localOldDown );

      redrawMeleeAttackDict.pop();

      console.log( "Done removing melee attack" );
    }

    var redrawMeleeAttackDict = [];
    var meleeAttackRedrawCounter = 0;

    meleeAttackDict = function( args )
    {


      var x = eval(args.shift());
      var y = eval(args.shift());
      var z = eval(args.shift());

      console.log( x );
      console.log( y );
      console.log( z );
      // var showOrRemove = eval(args.shift());
      // var showOrRemove = args.shift();

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

      /***
       * Currently this dictionary holds the 
       *      []
       *    []  []
       *      []
       * coordinates and old tileId in an array
       */
      redrawMeleeAttackDict.push( 
        {
          meleeAttackId: meleeAttackRedrawCounter,
          oldLeftTile: oldLeft,
          oldRightTile: oldRight,
          oldUpTile: oldUp,
          oldDownTile: oldDown
        }
      )
      


      /**
       * I have to fix the counter - pretty sure it's not gonna line up
       */
      // if( showOrRemove == "SHOW" )
      // {
      //   showMeleeAttack( redrawMeleeAttackDict[ meleeAttackRedrawCounter ] );
      // } else if( showOrRemove == "REMOVE" ) {
      //   removeMeleeAttack( redrawMeleeAttackDict[ meleeAttackRedrawCounter ] );
      // }


      // /*
      for( var abc = 0; abc <= Object.keys( redrawMeleeAttackDict ).length - 1; ++abc )
      {
        console.log( "ABC: " );
        console.log( abc );
        console.log( redrawMeleeAttackDict[ abc ].meleeAttackId );
        console.log( redrawMeleeAttackDict[ abc ].oldLeftTile );
        console.log( redrawMeleeAttackDict[ abc ].oldRightTile );
        console.log( redrawMeleeAttackDict[ abc ].oldUpTile );
        console.log( redrawMeleeAttackDict[ abc ].oldDownTile );
      }

      // console.log( "x coord: " );
      // console.log( redrawMeleeAttackDict[ 0 ].oldLeftTile[ 0 ] );
      
      // console.log( "y coord: " );
      // console.log( redrawMeleeAttackDict[ 0 ].oldLeftTile[ 1 ] );

      // console.log( "Show or remove?" );
      // console.log( showOrRemove );
      // */

      // ++meleeAttackRedrawCounter;
    }








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
                // meleeAttackDict( args );

                var showOrRemove = args.slice( -1 ).pop();
                if( showOrRemove == "SHOW" )
                {
                  console.log( "Showing attack" );
                  meleeAttackDict( args );
                  var tempDictElement = redrawMeleeAttackDict[ meleeAttackRedrawCounter ];
                  showMeleeAttack( tempDictElement );





                } else if( showOrRemove == "REMOVE" ) {
                  console.log( "Removing attack" );
                  removeMeleeAttack( redrawMeleeAttackDict[ meleeAttackRedrawCounter ] );
                }
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