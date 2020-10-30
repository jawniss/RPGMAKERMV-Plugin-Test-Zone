// // key P
// Input.keyMapper["80"] = "customMenu";

// _alias_scene_map_update = Scene_Map.prototype.update;
// Scene_Map.prototype.update = function() {
//     _alias_scene_map_update.call( this );
//     if( Input.isTriggered( "customMenu" ) ) SceneManager.push( Restart_Yes_No_Menu );
// };

function Restart_Yes_No_Menu() 
{
    this.initialize.apply( this, arguments );
}

Restart_Yes_No_Menu.prototype = Object.create( Scene_MenuBase.prototype );
Restart_Yes_No_Menu.prototype.constructor = Restart_Yes_No_Menu;

Restart_Yes_No_Menu.prototype.initialize = function() 
{
    Scene_MenuBase.prototype.initialize.call( this );
};

Restart_Yes_No_Menu.prototype.create = function() 
{
    Scene_MenuBase.prototype.create.call( this );
    this._customWindow = new Window_Restart_Yes_No( 0, 0, 320, 240 );
    ImageManager.reserveFace( "Actor3" );
    ImageManager.reserveCharacter( "People1" );
    this.addWindow( this._customWindow );
    
    this._customSelectableWindow = new Window_Restart_Yes_NoSelectable( 0, 0, 180, 180 );
    this._customSelectableWindow.hide();
    this._customSelectableWindow.select( 0 );
    // this._customSelectableWindow.deactivate();
    this._customSelectableWindow.setHandler( "ok", this.command1.bind( this ) );
    this._customSelectableWindow.setHandler( "cancel", this.popScene.bind( this ) );
    ImageManager.reserveFace( "Actor2" );
    this.addWindow( this._customSelectableWindow );
    
    this._customCommandWindow = new Window_Restart_Yes_NoCommand( 0, 0 );
    this._customCommandWindow.setHandler( "command1", this.command1.bind( this ) );
    this._customCommandWindow.setHandler( "command2", this.command2.bind( this ) );
    this.addWindow( this._customCommandWindow );
    // this._customCommandWindow.deactivate();

    this._customHorzCommandWindow = new Window_Restart_Yes_NoHorzCommand( 0, 0 );
    this._customHorzCommandWindow.setHandler( "command1", this.command1.bind( this ) );
    this._customHorzCommandWindow.setHandler( "command2", this.command2.bind( this ) );
    this.addWindow( this._customHorzCommandWindow );
    // this._customHorzCommandWindow.deactivate();

    // this.customButton = new Sprite_CustomButton( ImageManager.loadBitmap( "img/pictures/", "pd", 0, true ) );
    // this.addChild( this.customButton );
}

Restart_Yes_No_Menu.prototype.command1 = function() 
{
    if( this._customCommandWindow.visible ) this._customCommandWindow.activate();
    else if( this._customHorzCommandWindow.visible ) this._customHorzCommandWindow.activate();
    else this._customSelectableWindow.activate();
    $gameVariables.setValue( 1, $gameVariables.value( 1 ) + 1 );
    console.log( "Game vari 1: ", $gameVariables.value( 1 ) );
}


Restart_Yes_No_Menu.prototype.command2 = function() 
{
    if( this._customCommandWindow.visible ) this._customCommandWindow.activate();
    else this._customHorzCommandWindow.activate();
    $gameVariables.setValue( 1, $gameVariables.value( 1 ) - 1 );
    console.log( "Game vari 1: ", $gameVariables.value( 1 ) );

}


Restart_Yes_No_Menu.prototype.start = function() 
{
    Scene_MenuBase.prototype.start.call( this );
    this._customWindow.drawAllItems();
    this._customSelectableWindow.refresh();
    this._customCommandWindow.refresh();
};

Restart_Yes_No_Menu.prototype.update = function() 
{
    Scene_MenuBase.prototype.update.call( this );
    if( Input.isTriggered( "cancel" ) ) this.popScene();
}




function Window_Restart_Yes_No() 
{
    this.initialize.apply( this, arguments );
}

Window_Restart_Yes_No.prototype = Object.create( Window_Base.prototype );
Window_Restart_Yes_No.prototype.constructor = Window_Restart_Yes_No;

Window_Restart_Yes_No.prototype.initialize = function( x, y, width, height ) 
{
    Window_Base.prototype.initialize.call( this, x, y, width, height );
}

Window_Restart_Yes_No.prototype.drawAllItems = function() 
{
    this.contents.clear();
    this.drawText( $gameVariables.value( 2 ), 0, 0, this.width - this.padding * 2, "center" );
    this.drawIcon( 45, 48, 48 );
    this.drawFace( "Actor3", 5, 96, 96, 144, 144 );
    this.drawCharacter( "People1", 0, this.padding, this.padding + 96 );
    this.drawGauge( 0, 0, 100, 1, "#ff0000", "#00ff00" );
}

function Window_Restart_Yes_NoSelectable() 
{
    this.initialize.apply( this, arguments );
}

Window_Restart_Yes_NoSelectable.prototype = Object.create( Window_Selectable.prototype );
Window_Restart_Yes_NoSelectable.prototype.constructor = Window_Selectable;

Window_Restart_Yes_NoSelectable.prototype.initialize = function( x, y, width, height ) {
    Window_Selectable.prototype.initialize.call( this, x, y, width, height );
    this.refresh();
    this.hide();
}

Window_Restart_Yes_NoSelectable.prototype.maxItems = function() 
{
    return 3;
}

Window_Restart_Yes_NoSelectable.prototype.maxPageRows = function() 
{
    return 2;
}

Window_Restart_Yes_NoSelectable.prototype.maxPageItems = function() 
{
    return this.maxPageRows() * this.maxCols();
}

Window_Restart_Yes_NoSelectable.prototype.drawItem = function( index ) 
{
    var itemRect = this.itemRect( index );
    this.drawFace( "Actor2", 3 + index, itemRect.x, itemRect.y, itemRect.width / 2, itemRect.height / 2 );
}

Window_Restart_Yes_NoSelectable.prototype.itemHeight = function() {
    return( this.height - this.padding * 2 ) / this.maxPageRows();
};



function Window_Restart_Yes_NoCommand() 
{
    this.initialize.apply( this, arguments );
}

Window_Restart_Yes_NoCommand.prototype = Object.create( Window_Command.prototype );
Window_Restart_Yes_NoCommand.prototype.constructor = Window_Restart_Yes_NoCommand;

Window_Restart_Yes_NoCommand.prototype.initialize = function( x, y ) 
{
    Window_Command.prototype.initialize.call( this, x, y );
    this.opacity = 0;
} 

Window_Restart_Yes_NoCommand.prototype.makeCommandList = function() 
{
    this.addCommand( "Yes, restart the stage!", "command1" );
    this.addCommand( "On second thought, don't restart", "command2" );
};

Window_Restart_Yes_NoCommand.prototype.drawItem = function( index ) 
{
    var itemRect = this.itemRect( index );
    this.drawFace( "Actor2", 3 + index, itemRect.x, itemRect.y, 144, itemRect.height );
    Window_Command.prototype.drawItem.call( this, index );
}

Window_Restart_Yes_NoCommand.prototype.windowWidth = function()
{
    return Graphics.boxWidth;
}

Window_Restart_Yes_NoCommand.prototype.windowHeight = function() 
{
    return Graphics.boxHeight;
}

Window_Restart_Yes_NoCommand.prototype.itemRect = function( index ) 
{
    var rect = {};
    if( index == 0 ) 
    {
        rect.x = 0;
        rect.y = 0;
        rect.width = 240;
        rect.height = 40;
    } else if( index == 1 ) {
        rect.x = 20;
        rect.y = 200;
        rect.width = 240;
        rect.height = 40;
    }
    return rect;
};


function Window_Restart_Yes_NoHorzCommand() 
{
    this.initialize.apply( this, arguments );
}

Window_Restart_Yes_NoHorzCommand.prototype = Object.create( Window_HorzCommand.prototype );
Window_Restart_Yes_NoHorzCommand.prototype.constructor = Window_Restart_Yes_NoHorzCommand;

Window_Restart_Yes_NoHorzCommand.prototype.initialize = function( x, y ) 
{
    Window_HorzCommand.prototype.initialize.call( this, x, y );
    this.hide();
}

Window_Restart_Yes_NoHorzCommand.prototype.makeCommandList = function() 
{
    this.addCommand( "Yes, restart the stage!", "command1" );
    this.addCommand( "On second thought, don't restart", "command2" );
};

Window_Restart_Yes_NoHorzCommand.prototype.windowWidth = function() 
{
    return Graphics.boxWidth;
}