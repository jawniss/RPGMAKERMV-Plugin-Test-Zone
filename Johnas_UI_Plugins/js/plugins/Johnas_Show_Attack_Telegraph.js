
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
	var parameters = PluginManager.parameters('Show_Attack_Telegraph');

	_alias_scene_map_update = Scene_Map.prototype.update;
	Scene_Map.prototype.update = function() 
	{
		_alias_scene_map_update.call( this );
		
	};

       
})();  // dont touch this.