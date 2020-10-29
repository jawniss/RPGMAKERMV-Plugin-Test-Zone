// C key
Input.keyMapper[ "67" ] = "Custom Pause Menu";

_alias_scene_map_update_pause_menu = Scene_Map.prototype.update;

Scene_Map.prototype.update = function()
{
    _alias_scene_map_update_pause_menu.call( this );
    if( Input.isTriggered("Custom Pause Menu" ) )
    {
        SceneManager.push( Scene_CustomPauseMenu );
    }
}


function Scene_CustomPauseMenu()
{
    this.initialize.apply( this, arguments );
}


Scene_CustomPauseMenu.prototype = Object.create( Scene_MenuBase.prototype );
Scene_CustomPauseMenu.prototype.constructor = Scene_CustomPauseMenu;

Scene_CustomPauseMenu.prototype.initialize = function()
{
    Scene_MenuBase.prototype.initialize.call( this );
}


Scene_CustomPauseMenu.prototype.create = function()
{
    Scene_MenuBase.prototype.create.call( this );
    this._customWindow = new Window_Custom( 0, 0, 320, 240 );
    this.addWindow( this._customWindow );
}


Scene_CustomPauseMenu.prototype.update = function()
{
    if( !this.drawnWindows )
    {
        this._customWindow.drawAllItems();
        this.drawnWindows = true;
    }
}


function Window_Custom()
{
    this.initialize.apply( this, arguments );
}


Window_Custom.prototype = Object.create( Window_Base.prototype );
Window_Custom.prototype.constructor = Window_Custom;

Window_Custom.prototype.initialize = function( x, y, width, height )
{
    Window_Base.prototype.initialize.call( this, x, y, width, height );
    this.drawAllItems();
}


Window_Custom.prototype.drawAllItems = function()
{
    this.contents.clear();
    // this.drawText();
}