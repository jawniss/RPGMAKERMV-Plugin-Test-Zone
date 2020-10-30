// key P
Input.keyMapper["80"] = "customMenu";

_alias_scene_map_update = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() 
{
    _alias_scene_map_update.call( this );
    if( Input.isTriggered( "customMenu" ) ) SceneManager.push( Scene_CustomMenu );
};

function Scene_CustomMenu() 
{
    this.initialize.apply( this, arguments );
}

Scene_CustomMenu.prototype = Object.create( Scene_MenuBase.prototype );
Scene_CustomMenu.prototype.constructor = Scene_CustomMenu;

Scene_CustomMenu.prototype.initialize = function() 
{
    Scene_MenuBase.prototype.initialize.call( this );
};

Scene_CustomMenu.prototype.create = function() 
{
    Scene_MenuBase.prototype.create.call( this );
    this._customWindow = new Window_Custom( 0, 0, 320, 240 );
    ImageManager.reserveFace( "Actor3" );
    ImageManager.reserveCharacter( "People1" );
    this.addWindow( this._customWindow );
    
    this._customSelectableWindow = new Window_CustomSelectable( 0, 0, 180, 180 );
    this._customSelectableWindow.hide();
    this._customSelectableWindow.select( 0 );
    // this._customSelectableWindow.deactivate();
    this._customSelectableWindow.setHandler( "ok", this.command1.bind( this ) );
    this._customSelectableWindow.setHandler( "cancel", this.popScene.bind( this ) );
    ImageManager.reserveFace( "Actor2" );
    this.addWindow( this._customSelectableWindow );
    
    this._customCommandWindow = new Window_CustomCommand( 0, 0 );
    this._customCommandWindow.setHandler( "command1", this.command1.bind( this ) );
    this._customCommandWindow.setHandler( "command2", this.command2.bind( this ) );
    this._customCommandWindow.setHandler( "command3", this.command3.bind( this ) );
    this._customCommandWindow.setHandler( "command4", this.command4.bind( this ) );
    this.addWindow( this._customCommandWindow );
    // this._customCommandWindow.deactivate();

    this._customHorzCommandWindow = new Window_CustomHorzCommand( 0, 0 );
    this._customHorzCommandWindow.setHandler( "command1", this.command1.bind( this ) );
    this._customHorzCommandWindow.setHandler( "command2", this.command2.bind( this ) );
    this._customHorzCommandWindow.setHandler( "command3", this.command3.bind( this ) );
    this._customHorzCommandWindow.setHandler( "command4", this.command4.bind( this ) );
    this.addWindow( this._customHorzCommandWindow );
    // this._customHorzCommandWindow.deactivate();

    // this.customButton = new Sprite_CustomButton( ImageManager.loadBitmap( "img/pictures/", "pd", 0, true ) );
    // this.addChild( this.customButton );
}


/**
 * This is each of the different options' commands
 */
// Return to game screen WORKING
Scene_CustomMenu.prototype.command1 = function() 
{
    if( this._customCommandWindow.visible ) this._customCommandWindow.activate();
    else if( this._customHorzCommandWindow.visible ) this._customHorzCommandWindow.activate();
    else this._customSelectableWindow.activate();
    console.log( "Returning to game screen" );
    SceneManager.goto( Scene_Map );
}


// Change timer length NOT WORKING
Scene_CustomMenu.prototype.command2 = function() 
{
    if( this._customCommandWindow.visible ) this._customCommandWindow.activate();
    else this._customHorzCommandWindow.activate();
    console.log( "Changing timer length" );
    console.log( $gameVariables.value( 1 ) );
    SceneManager.push( Change_Timer_Length_Menu );
}


// Reload current stage NOT WORKING
// in hybrid under player damage
Scene_CustomMenu.prototype.command3 = function() 
{
    if( this._customCommandWindow.visible ) this._customCommandWindow.activate();
    else this._customHorzCommandWindow.activate();

    // var id = $gameVariables.value( 1 );
    // if( !$gameActors.actor( id ) ) return;
    // $gameActors.actor( id )._hp -= 50;
    // console.log( "hp: ", $gameActors.actor( id )._hp );





    // this should work
    
    console.log( "Restarting stage" );
    // for (var e of BMM.TRAN.level.events) {
    //     e.destroy();
    // }
    if ( DataManager.loadGame( 1 ) ) 
    {
        $gamePlayer.reserveTransfer($gameMap.mapId(), $gamePlayer.x, $gamePlayer.y);
        $gamePlayer.requestMapReload();
        SceneManager.goto( Scene_Map );
    }
    // BMM.HYB.playerHP = BMM.HYB.playerMaxHP;
    

}


// Return to main menu WORKING
Scene_CustomMenu.prototype.command4 = function() 
{
    if( this._customCommandWindow.visible ) this._customCommandWindow.activate();
    else this._customHorzCommandWindow.activate();
    console.log( "Returning to main menu" );
    SceneManager.goto( Scene_Title )
}


Scene_CustomMenu.prototype.start = function() 
{
    Scene_MenuBase.prototype.start.call( this );
    this._customWindow.drawAllItems();
    this._customSelectableWindow.refresh();
    this._customCommandWindow.refresh();
};


Scene_CustomMenu.prototype.update = function() 
{
    Scene_MenuBase.prototype.update.call( this );
    if( Input.isTriggered( "cancel" ) ) this.popScene();
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
}


Window_Custom.prototype.drawAllItems = function() 
{
    this.contents.clear();
    this.drawText( $gameVariables.value( 2 ), 0, 0, this.width - this.padding * 2, "center" );
    this.drawIcon( 45, 48, 48 );
    this.drawFace( "Actor3", 5, 96, 96, 144, 144 );
    this.drawCharacter( "People1", 0, this.padding, this.padding + 96 );
    this.drawGauge( 0, 0, 100, 1, "#ff0000", "#00ff00" );
}

function Window_CustomSelectable() 
{
    this.initialize.apply( this, arguments );
}

Window_CustomSelectable.prototype = Object.create( Window_Selectable.prototype );
Window_CustomSelectable.prototype.constructor = Window_Selectable;

Window_CustomSelectable.prototype.initialize = function( x, y, width, height ) 
{
    Window_Selectable.prototype.initialize.call( this, x, y, width, height );
    this.refresh();
    this.hide();
}

Window_CustomSelectable.prototype.maxItems = function() 
{
    return 3;
}

Window_CustomSelectable.prototype.maxPageRows = function() 
{
    return 2;
}

Window_CustomSelectable.prototype.maxPageItems = function() 
{
    return this.maxPageRows() * this.maxCols();
}

Window_CustomSelectable.prototype.drawItem = function( index ) 
{
    var itemRect = this.itemRect( index );
    this.drawFace( "Actor2", 3 + index, itemRect.x, itemRect.y, itemRect.width / 2, itemRect.height / 2 );
}

Window_CustomSelectable.prototype.itemHeight = function() 
{
    return( this.height - this.padding * 2 ) / this.maxPageRows();
};



function Window_CustomCommand() 
{
    this.initialize.apply( this, arguments );
}

Window_CustomCommand.prototype = Object.create( Window_Command.prototype );
Window_CustomCommand.prototype.constructor = Window_CustomCommand;

Window_CustomCommand.prototype.initialize = function( x, y ) 
{
    Window_Command.prototype.initialize.call( this, x, y );
    this.opacity = 0;
} 

Window_CustomCommand.prototype.makeCommandList = function() 
{
    this.addCommand( "Return to game", "command1" );
    this.addCommand( "Change timer length", "command2" );
    this.addCommand( "Restart stage", "command3" );
    this.addCommand( "Return to main menu", "command4" );
};

Window_CustomCommand.prototype.drawItem = function( index ) 
{
    var itemRect = this.itemRect( index );
    this.drawFace( "Actor2", 3 + index, itemRect.x, itemRect.y, 144, itemRect.height );
    Window_Command.prototype.drawItem.call( this, index );
}

Window_CustomCommand.prototype.windowWidth = function() 
{
    return Graphics.boxWidth;
}

Window_CustomCommand.prototype.windowHeight = function() 
{
    return Graphics.boxHeight;
}

Window_CustomCommand.prototype.itemRect = function( index ) 
{
    var rect = {};
    if( index == 0 ) 
    {
        rect.x = 0;
        rect.y = 0;
        rect.width = 240;
        rect.height = 40;
    } else if( index == 1 ) {
        rect.x = 0;
        rect.y = 50;
        rect.width = 240;
        rect.height = 40;
    } else if( index == 2 ) {
        rect.x = 0;
        rect.y = 100;
        rect.width = 240;
        rect.height = 40;
    } else {
        rect.x = 0;
        rect.y = 150;
        rect.width = 240;
        rect.height = 40;
    }
    return rect;
};



function Window_CustomHorzCommand() 
{
    this.initialize.apply( this, arguments );
}

Window_CustomHorzCommand.prototype = Object.create( Window_HorzCommand.prototype );
Window_CustomHorzCommand.prototype.constructor = Window_CustomHorzCommand;

Window_CustomHorzCommand.prototype.initialize = function( x, y ) 
{
    Window_HorzCommand.prototype.initialize.call( this, x, y );
    this.hide();
}

Window_CustomHorzCommand.prototype.makeCommandList = function() 
{
    this.addCommand( "Return to game", "command1" );
    this.addCommand( "Change timer length", "command2" );
    this.addCommand( "Restart stage", "command3", false );
    this.addCommand( "Return to main menu", "command4", false );
};

Window_CustomHorzCommand.prototype.windowWidth = function() 
{
    return Graphics.boxWidth;
}














































// // key P
// Input.keyMapper["80"] = "customMenu";

// _alias_scene_map_update = Scene_Map.prototype.update;
// Scene_Map.prototype.update = function() {
//     _alias_scene_map_update.call(this);
//     if (Input.isTriggered("customMenu")) SceneManager.push(Change_Timer_Length_Menu);
// };

function Change_Timer_Length_Menu() {
    this.initialize.apply(this, arguments);
}

Change_Timer_Length_Menu.prototype = Object.create(Scene_MenuBase.prototype);
Change_Timer_Length_Menu.prototype.constructor = Change_Timer_Length_Menu;

Change_Timer_Length_Menu.prototype.initialize = function() {
    Scene_MenuBase.prototype.initialize.call(this);
};

Change_Timer_Length_Menu.prototype.create = function () {
    Scene_MenuBase.prototype.create.call(this);
    this._customWindow = new Window_Custom_Timer(0, 0, 320, 240);
    ImageManager.reserveFace("Actor3");
    ImageManager.reserveCharacter("People1");
    this.addWindow(this._customWindow);
    
    this._customSelectableWindow = new Window_Custom_TimerSelectable(0, 0, 180, 180);
    this._customSelectableWindow.hide();
    this._customSelectableWindow.select(0);
    // this._customSelectableWindow.deactivate();
    this._customSelectableWindow.setHandler("ok", this.command1.bind(this));
    this._customSelectableWindow.setHandler("cancel", this.popScene.bind(this));
    ImageManager.reserveFace("Actor2");
    this.addWindow (this._customSelectableWindow);
    
    this._customCommandWindow = new Window_Custom_TimerCommand(0, 0);
    this._customCommandWindow.setHandler("command1", this.command1.bind(this));
    this._customCommandWindow.setHandler("command2", this.command2.bind(this));
    this._customCommandWindow.setHandler("command3", this.command3.bind(this));
    this.addWindow(this._customCommandWindow);
    // this._customCommandWindow.deactivate();

    this._customHorzCommandWindow = new Window_Custom_TimerHorzCommand(0, 0);
    this._customHorzCommandWindow.setHandler("command1", this.command1.bind(this));
    this._customHorzCommandWindow.setHandler("command2", this.command2.bind(this));
    this._customHorzCommandWindow.setHandler("command3", this.command3.bind(this));
    this.addWindow(this._customHorzCommandWindow);
    // this._customHorzCommandWindow.deactivate();

    // this.customButton = new Sprite_CustomButton(ImageManager.loadBitmap("img/pictures/", "pd", 0, true));
    // this.addChild(this.customButton);
}

Change_Timer_Length_Menu.prototype.command1 = function () {
    if (this._customCommandWindow.visible) this._customCommandWindow.activate();
    else if (this._customHorzCommandWindow.visible) this._customHorzCommandWindow.activate();
    else this._customSelectableWindow.activate();
    $gameVariables.setValue(1, $gameVariables.value(1) + 1);
    console.log( "Game vari 1: ", $gameVariables.value(1) );
}

Change_Timer_Length_Menu.prototype.command2 = function () {
    if (this._customCommandWindow.visible) this._customCommandWindow.activate();
    else this._customHorzCommandWindow.activate();
    $gameVariables.setValue(1, $gameVariables.value(1) - 1);
    console.log( "Game vari 1: ", $gameVariables.value(1) );

}

Change_Timer_Length_Menu.prototype.command3 = function () {
    if (this._customCommandWindow.visible) this._customCommandWindow.activate();
    else this._customHorzCommandWindow.activate();
    var id = $gameVariables.value(1);
    if (!$gameActors.actor(id)) return;
    $gameActors.actor(id)._hp -= 50;
    console.log( "hp: ", $gameActors.actor(id)._hp );

}

Change_Timer_Length_Menu.prototype.start = function() {
    Scene_MenuBase.prototype.start.call(this);
    this._customWindow.drawAllItems();
    this._customSelectableWindow.refresh();
    this._customCommandWindow.refresh();
};

Change_Timer_Length_Menu.prototype.update = function () {
    Scene_MenuBase.prototype.update.call(this);
    if (Input.isTriggered("cancel")) this.popScene();
}




function Window_Custom_Timer () {
    this.initialize.apply(this, arguments);
}

Window_Custom_Timer.prototype = Object.create(Window_Base.prototype);
Window_Custom_Timer.prototype.constructor = Window_Custom_Timer;

Window_Custom_Timer.prototype.initialize = function (x, y, width, height) {
    Window_Base.prototype.initialize.call(this, x, y, width, height);
}

Window_Custom_Timer.prototype.drawAllItems = function () {
    this.contents.clear();
    this.drawText ($gameVariables.value(2), 0, 0, this.width - this.padding * 2, "center");
    this.drawIcon (45, 48, 48);
    this.drawFace ("Actor3", 5, 96, 96, 144, 144);
    this.drawCharacter("People1", 0, this.padding, this.padding + 96);
    this.drawGauge(0, 0, 100, 1, "#ff0000", "#00ff00");
}

function Window_Custom_TimerSelectable () {
    this.initialize.apply (this, arguments);
}

Window_Custom_TimerSelectable.prototype = Object.create (Window_Selectable.prototype);
Window_Custom_TimerSelectable.prototype.constructor = Window_Selectable;

Window_Custom_TimerSelectable.prototype.initialize = function (x, y, width, height) {
    Window_Selectable.prototype.initialize.call(this, x, y, width, height);
    this.refresh();
    this.hide();
}

Window_Custom_TimerSelectable.prototype.maxItems = function () {
    return 3;
}

Window_Custom_TimerSelectable.prototype.maxPageRows = function () {
    return 2;
}

Window_Custom_TimerSelectable.prototype.maxPageItems = function () {
    return this.maxPageRows() * this.maxCols();
}

Window_Custom_TimerSelectable.prototype.drawItem = function (index) {
    var itemRect = this.itemRect(index);
    this.drawFace("Actor2", 3 + index, itemRect.x, itemRect.y, itemRect.width / 2, itemRect.height / 2);
}

Window_Custom_TimerSelectable.prototype.itemHeight = function() {
    return (this.height - this.padding * 2) / this.maxPageRows();
};



function Window_Custom_TimerCommand () {
    this.initialize.apply (this, arguments);
}

Window_Custom_TimerCommand.prototype = Object.create (Window_Command.prototype);
Window_Custom_TimerCommand.prototype.constructor = Window_Custom_TimerCommand;

Window_Custom_TimerCommand.prototype.initialize = function (x, y) {
    Window_Command.prototype.initialize.call (this, x, y);
    this.opacity = 0;
} 

Window_Custom_TimerCommand.prototype.makeCommandList = function() {
    this.addCommand ("Add 1 to var1", "command1");
    this.addCommand ("Sub 1 from var1", "command2");
    this.addCommand ("Sub 50 HP from hero (index = var1)", "command3");
};

Window_Custom_TimerCommand.prototype.drawItem = function (index) {
    var itemRect = this.itemRect(index);
    this.drawFace("Actor2", 3 + index, itemRect.x, itemRect.y, 144, itemRect.height);
    Window_Command.prototype.drawItem.call(this, index);
}

Window_Custom_TimerCommand.prototype.windowWidth = function () {
    return Graphics.boxWidth;
}

Window_Custom_TimerCommand.prototype.windowHeight = function () {
    return Graphics.boxHeight;
}

Window_Custom_TimerCommand.prototype.itemRect = function(index) {
    var rect = {};
    if (index == 0) {
        rect.x = 0;
        rect.y = 0;
        rect.width = 240;
        rect.height = 40;
    }else if (index == 1) {
        rect.x = 20;
        rect.y = 200;
        rect.width = 240;
        rect.height = 40;
    }else if (index == 2) {
        rect.x = 0;
        rect.y = 400;
        rect.width = Graphics.boxWidth;
        rect.height = 80;
    }
    return rect;
};



function Window_Custom_TimerHorzCommand () {
    this.initialize.apply (this, arguments);
}

Window_Custom_TimerHorzCommand.prototype = Object.create (Window_HorzCommand.prototype);
Window_Custom_TimerHorzCommand.prototype.constructor = Window_Custom_TimerHorzCommand;

Window_Custom_TimerHorzCommand.prototype.initialize = function (x, y) {
    Window_HorzCommand.prototype.initialize.call(this, x, y);
    this.hide();
}

Window_Custom_TimerHorzCommand.prototype.makeCommandList = function() {
    this.addCommand ("Add 1 to var1", "command1");
    this.addCommand ("Sub 1 from var1", "command2");
    this.addCommand ("Sub 50 HP from hero (index = var1)", "command3", false);
};

Window_Custom_TimerHorzCommand.prototype.windowWidth = function () {
    return Graphics.boxWidth;
}