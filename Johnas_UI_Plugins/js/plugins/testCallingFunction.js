
( function() 
{  


    // 76 is key "L"
    Input.keyMapper[ "76" ] = "MELEE ATTACKS";
    // Have to watch out - _alias .. is used in hearts_working so have to
    // have different names
    _alias_scene_map_melee = Scene_Map.prototype.update;
    Scene_Map.prototype.update = function() {
      _alias_scene_map_melee.call( this );
        if( Input.isTriggered( "MELEE ATTACKS" ) )
        {
            console.log( "The L button has been pressed" );

            /**
             * Working function that works as "Plugin command"
             */
            var meleeInterpreter = new Game_Interpreter()
            meleeInterpreter.pluginCommand( 'MELEE', [ '5', '5', '0', 'SHOW' ] );

            console.log( "Done the 'Pressed L' comand" );
        }
    };
})();  // dont touch this.
