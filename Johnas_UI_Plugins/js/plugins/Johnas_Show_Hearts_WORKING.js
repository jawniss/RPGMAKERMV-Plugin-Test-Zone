
//=============================================================================
// Toms_Example Template
// by Faytless / Thomas Pham
// Date: 10/25/2015  
//============================================================================= 
/*: * @plugindesc xxxxx   
// Describe your plugin * @author yyyy        
// your name goes here * * @param xxxxx      
//name of a parameter you want the user to edit * @desc yyyyy       
//short description of the parameter * @default zzzzz    
// set default value for the parameter */    
// NOTE: THIS WILL NOT MAKE YOU A DARK WIZARD. HERE ARE SOME BASE FOR YOU TO LAY A FOUNDATION FOR PLUGINS!   


( function() 
{  
	var parameters = PluginManager.parameters('Show_Hearts');

	/*
	"$gameScreen.showPicture(pictureId, name, origin, x, y, scaleX, scaleY, opacity, blendMode)"
	*/

	/**
	 * gonna have to make it so that there's a global variable for number of heart containers
	 * otherwise every time picks up hp, can go past the max
	 */
	_alias_scene_map_update = Scene_Map.prototype.update;
	Scene_Map.prototype.update = function() 
	{
		_alias_scene_map_update.call( this );
		if( $gameVariables.value( 1 ) == 3 )
		{
			$gameScreen.erasePicture( 3 );
			$gameScreen.erasePicture( 2 );
			$gameScreen.erasePicture( 1 );

			$gameScreen.showPicture( 1, "pixel_heart", 1, 20, 20, 5, 5, 500, 2 );

			$gameScreen.showPicture( 2, "pixel_heart", 1, 60, 20, 5, 5, 500, 2 );

			$gameScreen.showPicture( 3, "pixel_heart", 1, 100, 20, 5, 5, 500, 2 );

		} else if( $gameVariables.value( 1 ) == 2 ) {
			$gameScreen.erasePicture( 3 );

			$gameScreen.showPicture( 1, "pixel_heart", 1, 20, 20, 5, 5, 500, 2 );

			$gameScreen.showPicture( 2, "pixel_heart", 1, 60, 20, 5, 5, 500, 2 );
		} else if( $gameVariables.value( 1 ) == 1 ) {
			$gameScreen.erasePicture( 3 );
			$gameScreen.erasePicture( 2 );
			$gameScreen.showPicture( 1, "pixel_heart", 1, 20, 20, 5, 5, 500, 2 );
		} else if( $gameVariables.value( 1 ) == 0 ) {
			$gameScreen.erasePicture( 3 );
			$gameScreen.erasePicture( 2 );
			$gameScreen.erasePicture( 1 );
		} else if( $gameVariables.value( 1 ) < 0 ) {
			$gameVariables.setValue( 1, 0 ) 
		} else if( $gameVariables.value( 1 ) > 3 ) {
			$gameVariables.setValue( 1, 3 ) 
		}
	};

       
})();  // dont touch this.