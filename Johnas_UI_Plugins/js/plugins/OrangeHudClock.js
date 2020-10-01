/*=============================================================================
 * Orange - Clock HUD
 * By HUDell - www.hudell.com
 * OrangeHudClock.js
 * Version: 1.5
 * Free for commercial and non commercial use.
 *=============================================================================*/
/*:
 * @plugindesc Adds a new Variable to Orange Hud
 * @author Hudell
 *
 * @param GroupName
 * @desc The name of the HUD group where this line should be displayed
 * @default main
 *
 * @param Pattern
 * @desc The pattern of the line that will be drawn
 * @default %1:%2:%3
 *
 * @param VariableHour
 * @desc The number of the variable that holds the Hour value.
 * @default 0
 *
 * @param VariableMinute
 * @desc The number of the variable that holds the Minute value.
 * @default 0
 *
 * @param VariableSecond
 * @desc The number of the variable that holds the Second value.
 * @default 0
 *
 * @param SwitchId
 * @desc Set this to a switch number to use it to control the visibility of this line
 * @default 0
 *
 * @param X
 * @desc The X position of the variable line inside the HUD
 * @default 
 *
 * @param Y
 * @desc The Y position of the variable line inside the HUD
 * @default 
 *
 * @param FontFace
 * @desc The font face to use. Leave empty to use the HUD default
 * @default 
 *
 * @param FontSize
 * @desc The font size to use. Leave empty to use the HUD default
 * @default
 *
 * @param FontColor
 * @desc The font color to use. Leave empty to use the HUD default
 * @default
 *
 * @param FontItalic
 * @desc Should use italic? Leave empty to use the HUD default
 * @default
 *
 * @param ScriptPattern
 * @desc A script call to be used instead of the Pattern
 * @default 
 *
 * @help
 * ============================================================================
 * My Blog:
 * ============================================================================
 * http://hudell.com
 * */

var Imported = Imported || {};

/**
 * Trying to get the timer object from the BMM_TimingBelt.js file
 */


if (Imported["OrangeHud"] === undefined) {
  throw new Error("Please add OrangeHud before OrangeHudClock!");
}

var OrangeHudClock = OrangeHudClock || {};

if (Imported["OrangeHudClock"] === undefined) {
  OrangeHudClock.validateParams = function(line) {
    line.GroupName = line.GroupName || "main";
    
    if (line.ScriptPattern !== undefined && line.ScriptPattern.trim() === "") {
      line.ScriptPattern = undefined;
    }

    if (line.Pattern === undefined) {
      line.Pattern = "%1:%2:%3";
    } else if (line.Pattern.trim() === "") {
      line.Pattern = "";
    }

    // I think line is the object, and Number() converts string
    // to numeric integer
    line.VariableHour = Number(line.VariableHour || 0);
    line.VariableMinute = Number(line.VariableMinute || 0);
    line.VariableSecond = Number(line.VariableSecond || 0);

    if (line.FontFace === undefined || line.FontFace.trim() === "") {
      line.FontFace = OrangeHud.Param.DefaultFontFace;
    }

    if (line.FontColor === undefined || line.FontColor.trim() === "") {
      line.FontColor = OrangeHud.Param.DefaultFontColor;
    }

    line.FontSize = Number(line.FontSize || OrangeHud.Param.DefaultFontSize);
    line.X = Number(line.X || 0);
    line.Y = Number(line.Y || 0);

    if (line.FontItalic === undefined || line.FontItalic.trim() === "") {
      line.FontItalic = OrangeHud.Param.DefaultFontItalic;
    } else {
      line.FontItalic = line.FontItalic == "true";
    }

    line.SwitchId = Number(line.SwitchId || 0);
  };

  OrangeHudClock.drawLine = function(window, variableData) {
    if (variableData.SwitchId > 0) {
    if (!$gameSwitches.value(variableData.SwitchId)) {
    return;
    }
  }

  var line = this.getValue(variableData);

  window.contents.fontFace = variableData.FontFace;
  window.contents.fontSize = variableData.FontSize;
  window.contents.fontItalic = variableData.FontItalic;
  window.changeTextColor(variableData.FontColor);

  window.drawTextEx(line, variableData.X, variableData.Y);

  window.resetFontSettings();
  };

    OrangeHudClock.getValue = function(variableData) {
    var pattern = variableData.Pattern;
    if (variableData.ScriptPattern !== undefined) {
      pattern = Function("return " + variableData.ScriptPattern)();
    }

    var hour = '';
    var minute = '';
    var second = '';

    if (variableData.VariableHour > 0) {
      // hour = Number($gameVariables.value(variableData.VariableHour)).padZero(2);
      hour = 10;
    }

    if (variableData.VariableMinute > 0) {
      // minute = Number($gameVariables.value(variableData.VariableMinute)).padZero(2);
      minute = 20;
    }

    if (variableData.VariableSecond > 0) {
      // second = Number($gameVariables.value(variableData.VariableSecond)).padZero(2);
      second = 30;
    }

    /**
     * This hardcodes the display clock as 10:20:30, doesn't move.
     * I think what to do: grab the time object from BMM_TimingBelt,
     * set an in game variable to seconds of TimingBelt, then use that
     * variable here in OrangeHudClock
     * -> hopefully it will update and count down
     */
    hour = 10;
    minute = 20;
    second = 30;

    return pattern.format(hour, minute, second);
  };

  OrangeHudClock.getKey = function(variableData) {
    return variableData.VariableHour + ',' + variableData.VariableMinute + ',' + variableData.VariableSecond;
  };

  OrangeHud.registerLineType('OrangeHudClock', OrangeHudClock);
  Imported["OrangeHudClock"] = 1.5;
}