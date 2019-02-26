<a name="game"></a>

## game : <code>object</code>
The global namespace for all game variables

**Kind**: global namespace  

* [game](#game) : <code>object</code>
    * [.canvas](#game.canvas) : <code>object</code>
        * [.element](#game.canvas.element) : <code>Object</code>
        * [.ctx](#game.canvas.ctx) : <code>Object</code>
        * [.fillBackground(color)](#game.canvas.fillBackground) ⇒ <code>undefined</code>
        * [.resizeCanvas(newWidth, newHeight)](#game.canvas.resizeCanvas) ⇒ <code>undefined</code>

<a name="game.canvas"></a>

### game.canvas : <code>object</code>
The namespace for all of the canvas related elements

**Kind**: static namespace of [<code>game</code>](#game)  

* [.canvas](#game.canvas) : <code>object</code>
    * [.element](#game.canvas.element) : <code>Object</code>
    * [.ctx](#game.canvas.ctx) : <code>Object</code>
    * [.fillBackground(color)](#game.canvas.fillBackground) ⇒ <code>undefined</code>
    * [.resizeCanvas(newWidth, newHeight)](#game.canvas.resizeCanvas) ⇒ <code>undefined</code>

<a name="game.canvas.element"></a>

#### canvas.element : <code>Object</code>
The canvas that the game is drawn on

**Kind**: static property of [<code>canvas</code>](#game.canvas)  
<a name="game.canvas.ctx"></a>

#### canvas.ctx : <code>Object</code>
The context of the canvas

**Kind**: static property of [<code>canvas</code>](#game.canvas)  
<a name="game.canvas.fillBackground"></a>

#### canvas.fillBackground(color) ⇒ <code>undefined</code>
Fills the entire canvas with the given color

**Kind**: static method of [<code>canvas</code>](#game.canvas)  
**Returns**: <code>undefined</code> - no return value  

| Param | Type | Description |
| --- | --- | --- |
| color | <code>string</code> | the color to fill the background with |

<a name="game.canvas.resizeCanvas"></a>

#### canvas.resizeCanvas(newWidth, newHeight) ⇒ <code>undefined</code>
Resizes the game canvas to the given size

**Kind**: static method of [<code>canvas</code>](#game.canvas)  
**Returns**: <code>undefined</code> - no return value  

| Param | Type | Description |
| --- | --- | --- |
| newWidth | <code>number</code> | the new width of the canvas |
| newHeight | <code>number</code> | the new height of the canvas |

