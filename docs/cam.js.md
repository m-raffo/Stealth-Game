## Members

<dl>
<dt><a href="#cam">cam</a> : <code>Object</code></dt>
<dd><p>The camera object for the world.</p>
</dd>
</dl>

## Constants

<dl>
<dt><a href="#CAM_TARGET_HEIGHT">CAM_TARGET_HEIGHT</a> : <code>Number</code></dt>
<dd><p>The ideal height for the camera, it is adjusted to meet the player&#39;s screen
  dimentions</p>
</dd>
<dt><a href="#CAM_TARGET_WIDTH">CAM_TARGET_WIDTH</a> : <code>Number</code></dt>
<dd><p>The ideal width for the camera, it is adjusted to meet the player&#39;s screen
  dimentions</p>
</dd>
</dl>

<a name="cam"></a>

## cam : <code>Object</code>
The camera object for the world.

**Kind**: global variable  

* [cam](#cam) : <code>Object</code>
    * [.x](#cam.x) : <code>Number</code>
    * [.y](#cam.y) : <code>Number</code>
    * [.width](#cam.width) : <code>Number</code>
    * [.height](#cam.height) : <code>Number</code>
    * [.onScreen(pointX, pointY)](#cam.onScreen) ⇒ <code>Boolean</code>
    * [.objectOnScreen(item)](#cam.objectOnScreen) ⇒ <code>Boolean</code>
    * [.originX()](#cam.originX) ⇒ <code>Number</code>
    * [.originY()](#cam.originY) ⇒ <code>Number</code>
    * [.getOnscreenX(pointX)](#cam.getOnscreenX) ⇒ <code>Number</code>
    * [.getOnscreenY(pointY)](#cam.getOnscreenY) ⇒ <code>Number</code>
    * [.updateSize()](#cam.updateSize) ⇒ <code>undefined</code>
    * [.drawItem(item)](#cam.drawItem) ⇒ <code>undefined</code>
    * [.drawLevel(level)](#cam.drawLevel) ⇒ <code>undefined</code>

<a name="cam.x"></a>

### cam.x : <code>Number</code>
x position of the camera in the world (from the center)

**Kind**: static property of [<code>cam</code>](#cam)  
**Default**: <code>0</code>  
<a name="cam.y"></a>

### cam.y : <code>Number</code>
y position of the camera in the world (from the center)

**Kind**: static property of [<code>cam</code>](#cam)  
**Default**: <code>0</code>  
<a name="cam.width"></a>

### cam.width : <code>Number</code>
width of the camera (in world units, not pixels)

**Kind**: static property of [<code>cam</code>](#cam)  
<a name="cam.height"></a>

### cam.height : <code>Number</code>
height of the camera (in world units, not pixels)

**Kind**: static property of [<code>cam</code>](#cam)  
<a name="cam.onScreen"></a>

### cam.onScreen(pointX, pointY) ⇒ <code>Boolean</code>
Determines if a point is on screen

**Kind**: static method of [<code>cam</code>](#cam)  
**Returns**: <code>Boolean</code> - True if on the screen, False if not  

| Param | Type | Description |
| --- | --- | --- |
| pointX | <code>Number</code> | x coordinate of the point |
| pointY | <code>Number</code> | y coordinate of the point |

<a name="cam.objectOnScreen"></a>

### cam.objectOnScreen(item) ⇒ <code>Boolean</code>
Determines if the object if on the onScreen

**Kind**: static method of [<code>cam</code>](#cam)  
**Returns**: <code>Boolean</code> - True if onscreen, False if not  

| Param | Type | Description |
| --- | --- | --- |
| item | <code>Object</code> | the item to be checked |

<a name="cam.originX"></a>

### cam.originX() ⇒ <code>Number</code>
Returns the x coordinate in the world of the upper-left corner of the  camera

**Kind**: static method of [<code>cam</code>](#cam)  
**Returns**: <code>Number</code> - x coordinate  
<a name="cam.originY"></a>

### cam.originY() ⇒ <code>Number</code>
Returns the y coordinate in the world of the upper-left corner of the  camera

**Kind**: static method of [<code>cam</code>](#cam)  
**Returns**: <code>Number</code> - y coordinate  
<a name="cam.getOnscreenX"></a>

### cam.getOnscreenX(pointX) ⇒ <code>Number</code>
Gets the pixel position on the screen for a given x coordinate in the worldReturns undefined in the point is not onscreen

**Kind**: static method of [<code>cam</code>](#cam)  
**Returns**: <code>Number</code> - The X coordinate of the pixel position on screen  

| Param | Type | Description |
| --- | --- | --- |
| pointX | <code>Number</code> | X coordinate to get |

<a name="cam.getOnscreenY"></a>

### cam.getOnscreenY(pointY) ⇒ <code>Number</code>
Gets the pixel position on the screen for a given y coordinate in the worldReturns undefined in the point is not onscreen

**Kind**: static method of [<code>cam</code>](#cam)  
**Returns**: <code>Number</code> - The Y coordinate of the pixel position on screen  

| Param | Type | Description |
| --- | --- | --- |
| pointY | <code>Number</code> | Y coordinate to get |

<a name="cam.updateSize"></a>

### cam.updateSize() ⇒ <code>undefined</code>
Updates the size of the camera to match the size of the window.Aims to keep the screen in a proportion of 1920*1080.Keeps the ratio of the sides square, to prevent dilation in one axis.

**Kind**: static method of [<code>cam</code>](#cam)  
**Returns**: <code>undefined</code> - No return value  
<a name="cam.drawItem"></a>

### cam.drawItem(item) ⇒ <code>undefined</code>
Draws an item on the screen using the correct scaling and position

**Kind**: static method of [<code>cam</code>](#cam)  
**Returns**: <code>undefined</code> - No return value  

| Param | Type | Description |
| --- | --- | --- |
| item | <code>Object</code> | item to be drawn |

<a name="cam.drawLevel"></a>

### cam.drawLevel(level) ⇒ <code>undefined</code>
Draws the the level to the screen

**Kind**: static method of [<code>cam</code>](#cam)  
**Returns**: <code>undefined</code> - no return value  

| Param | Type | Description |
| --- | --- | --- |
| level | <code>object</code> | the level to be drawn |

<a name="CAM_TARGET_HEIGHT"></a>

## CAM\_TARGET\_HEIGHT : <code>Number</code>
The ideal height for the camera, it is adjusted to meet the player's screen  dimentions

**Kind**: global constant  
<a name="CAM_TARGET_WIDTH"></a>

## CAM\_TARGET\_WIDTH : <code>Number</code>
The ideal width for the camera, it is adjusted to meet the player's screen  dimentions

**Kind**: global constant  
