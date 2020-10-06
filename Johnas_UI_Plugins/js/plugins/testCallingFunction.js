
( function() 
{  


    // 74 is key "J"
    Input.keyMapper[ "74" ] = "SHOW MELEE ATTACKS";

    // 75 is key "K"
    Input.keyMapper[ "75" ] = "REMOVE MELEE ATTACKS";

    // Have to watch out - _alias .. is used in hearts_working so have to
    // have different names
    _alias_scene_map_melee = Scene_Map.prototype.update;
    Scene_Map.prototype.update = function() {
      _alias_scene_map_melee.call( this );
        if( Input.isTriggered( "SHOW MELEE ATTACKS" ) )
        {
            console.log( "The J button has been pressed" );

            /**
             * Working function that works as "Plugin command"
             */
            var meleeInterpreter = new Game_Interpreter()
            meleeInterpreter.pluginCommand( 'MELEE', [ '5', '5', '0', 'SHOW' ] );

            console.log( "Done the 'Pressed J' comand" );
        } else if( Input.isTriggered( "REMOVE MELEE ATTACKS" ) ) {
            console.log( "The K button has been pressed" );

            /**
             * Working function that works as "Plugin command"
             */
            var meleeInterpreter = new Game_Interpreter()
            meleeInterpreter.pluginCommand( 'MELEE', [ '5', '5', '0', 'REMOVE' ] );

            console.log( "Done the 'Pressed K' comand" );
        }
    };
})();  // dont touch this.
