/*global define, $, brackets, window */

/* Adds shortcuts for typing whatever you want. (intented for greek letters) 
    
    Notes:
        -if you change shortcut keys (ex: "OPT-T") but not what it types, you have to reset brackets (Debug->Reload With Extensions)
        -if you delete a shortcut, you need to reload brackets for it to register

*/
define(function (require, exports, module) {
    "use strict";

    var CommandManager = brackets.getModule("command/CommandManager"),
        Menus          = brackets.getModule("command/Menus"),
        EditorManager   = brackets.getModule('editor/EditorManager'),
        PreferencesManager = brackets.getModule("preferences/PreferencesManager");
    
    
    window.editor = EditorManager.getActiveEditor();
    var menu = Menus.getMenu(Menus.AppMenuBar.EDIT_MENU);
    
    
    
    /* *************************************************
        Preferences
        -Sets prefs
        -gets prefs
    */
    var prefs = PreferencesManager.getExtensionPrefs("theta");
    
    // set default preferences
    prefs.definePreference( "shortcuts", "object", {OPT_T:"ϴ", 
                                                    OPT_H:"hello world",
                                                    OPT_C:"console.log("},
                            { description: "Add shortcut as Key and what it types as the value" }
    );
    //object of shortcuts
    var shortcuts = prefs.get("shortcuts");
    

    
    
    
    /* ************************************************
        Adds Chars after cursor when shortcut is pressed
    */
    function appendChars(toInsert) {
    
        if( editor ) {
            var doc = editor.document;
            var cpos = editor._codeMirror.getCursor(true);

            doc.replaceRange(toInsert, cpos, cpos);
            editor.setSelection(cpos);
            editor.setCursorPos(cpos.line,cpos.ch+toInsert.length);
        }

    }
    
    
    
    /* ************************************************
        Creates Shortcuts and their respective functions
        -Then call function
    */
    var funcs = {};
    function buildCommands(shortcuts){
        
        for(var key in shortcuts){
            
            //funcs.OPT_T = ϴ;
            eval("funcs." + key + " = shortcuts[key]");
            var funcName = "char" + key;
            eval("funcs." + funcName + " = function(){ appendChars(funcs." + key + "); }");
            

            var MY_COMMAND_ID = "pk.charShortcuts" + key;
            var name = "char: " + shortcuts[key];

            //Register Command
            CommandManager.register(name, MY_COMMAND_ID, funcs[funcName]);
            
            var keys = key.replace(/_/g, '-');
            //add menu item and shortcut
            menu.addMenuItem(MY_COMMAND_ID, keys);

       }
    }
    
    buildCommands(shortcuts);
    
    
    
    /* ************************************************
        Adds a listener for changes in preferences
    */
    prefs.on("change", function () {
        var shortcutsNow = prefs.get("shortcuts");
        var newShortcuts = {};
        
        for(var key in shortcutsNow){
            if(typeof shortcuts[key] == 'undefined'){
                newShortcuts[key] = shortcutsNow[key];
            }
        }
        
        buildCommands(newShortcuts);
        shortcuts = shortcutsNow;
    });
    
    
});


