<a name="Item"></a>

## Item
**Kind**: global class  

* [Item](#Item)
    * [new Item(name, x, y, imagePath, width, height)](#new_Item_new)
    * [.name](#Item+name) : <code>String</code>
    * [.x](#Item+x) : <code>Number</code>
    * [.y](#Item+y) : <code>Number</code>
    * [.image](#Item+image) : <code>Image</code>
    * [.width](#Item+width) : <code>Number</code>
    * [.height](#Item+height) : <code>Number</code>
    * [.collisionPlayer](#Item+collisionPlayer) : <code>Boolean</code>
    * [.collisionBullet](#Item+collisionBullet) : <code>Boolean</code>
    * [.collisionSight](#Item+collisionSight) : <code>Boolean</code>
    * [.collisionShape](#Item+collisionShape) : <code>String</code>
    * [.checkCollisionPoint(targetX, targetY)](#Item+checkCollisionPoint) ⇒ <code>Boolean</code>

<a name="new_Item_new"></a>

### new Item(name, x, y, imagePath, width, height)
The constructor for an item object. Items are things in the world that the
  player will interact with, but are smaller than rooms or sections.


| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | the name of the object |
| x | <code>Number</code> | x position in the world (from center) |
| y | <code>Number</code> | y position in the world (from center) |
| imagePath | <code>String</code> | path to the image of the file |
| width | <code>Number</code> | width of the object |
| height | <code>Number</code> | height of the object |

<a name="Item+name"></a>

### item.name : <code>String</code>
Name of the object, mostly for identification purposes

**Kind**: instance property of [<code>Item</code>](#Item)  
<a name="Item+x"></a>

### item.x : <code>Number</code>
x position of the object in the world (based on the center)

**Kind**: instance property of [<code>Item</code>](#Item)  
<a name="Item+y"></a>

### item.y : <code>Number</code>
y position of the object in the world (based on the center)

**Kind**: instance property of [<code>Item</code>](#Item)  
<a name="Item+image"></a>

### item.image : <code>Image</code>
Image for the items

**Kind**: instance property of [<code>Item</code>](#Item)  
<a name="Item+width"></a>

### item.width : <code>Number</code>
Width of the item

**Kind**: instance property of [<code>Item</code>](#Item)  
<a name="Item+height"></a>

### item.height : <code>Number</code>
Height of the item

**Kind**: instance property of [<code>Item</code>](#Item)  
<a name="Item+collisionPlayer"></a>

### item.collisionPlayer : <code>Boolean</code>
Determines if the object collides with the player

**Kind**: instance property of [<code>Item</code>](#Item)  
**Default**: <code>true</code>  
<a name="Item+collisionBullet"></a>

### item.collisionBullet : <code>Boolean</code>
Determines if the item collides with bullets

**Kind**: instance property of [<code>Item</code>](#Item)  
**Default**: <code>false</code>  
<a name="Item+collisionSight"></a>

### item.collisionSight : <code>Boolean</code>
Determines if the item blocks line-of-sight

**Kind**: instance property of [<code>Item</code>](#Item)  
**Default**: <code>true</code>  
<a name="Item+collisionShape"></a>

### item.collisionShape : <code>String</code>
Determines the shape for the collision detection box.
"box" for a box hitbox matching the dimentions of the item
"circle" for a circular hitbox with a radius of width / 2

**Kind**: instance property of [<code>Item</code>](#Item)  
<a name="Item+checkCollisionPoint"></a>

### item.checkCollisionPoint(targetX, targetY) ⇒ <code>Boolean</code>
Determines if the given point is in collision with the item

**Kind**: instance method of [<code>Item</code>](#Item)  
**Returns**: <code>Boolean</code> - true if there is a collision, false if not  

| Param | Type | Description |
| --- | --- | --- |
| targetX | <code>Number</code> | x position of the point to check |
| targetY | <code>Number</code> | y position of the point to check |

