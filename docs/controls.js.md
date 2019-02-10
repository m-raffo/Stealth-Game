<a name="controls"></a>

## controls : <code>Object</code>
Provides control functionalityAllows for easy customization of the controls, and a centralized control  system

**Kind**: global variable  

* [controls](#controls) : <code>Object</code>
    * [.bindings](#controls.bindings) : <code>Object</code>
    * [.isControlPressed(control)](#controls.isControlPressed) ⇒ <code>Boolean</code>
    * [.logControls()](#controls.logControls) ⇒ <code>undefined</code>

<a name="controls.bindings"></a>

### controls.bindings : <code>Object</code>
Contains the key bindings for all of the controls of the game

**Kind**: static property of [<code>controls</code>](#controls)  
<a name="controls.isControlPressed"></a>

### controls.isControlPressed(control) ⇒ <code>Boolean</code>
Checks if the given control is currently pressed.If a nonexistant control is passed, False is returned

**Kind**: static method of [<code>controls</code>](#controls)  
**Returns**: <code>Boolean</code> - True if the key is pressed, False if it is not  

| Param | Type | Description |
| --- | --- | --- |
| control | <code>String</code> | the name of the control (as a string) |

<a name="controls.logControls"></a>

### controls.logControls() ⇒ <code>undefined</code>
Logs all of the controls and if they are currently pressed or not (For debugging)

**Kind**: static method of [<code>controls</code>](#controls)  
**Returns**: <code>undefined</code> - No return value  
