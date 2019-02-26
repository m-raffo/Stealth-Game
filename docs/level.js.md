## Classes

<dl>
<dt><a href="#Level">Level</a></dt>
<dd></dd>
</dl>

## Members

<dl>
<dt><a href="#currentLevel">currentLevel</a> : <code>Object</code></dt>
<dd><p>Reference to the current level the player is on</p>
</dd>
</dl>

<a name="Level"></a>

## Level
**Kind**: global class  

* [Level](#Level)
    * [new Level(name)](#new_Level_new)
    * [.name](#Level+name) : <code>String</code>
    * [.allItems](#Level+allItems) : <code>Array.&lt;Item&gt;</code>
    * [.addItem(toAdd)](#Level+addItem) ⇒ <code>undefined</code>

<a name="new_Level_new"></a>

### new Level(name)
Contains all of the data about the world and the "stuff" (items, weapons,etc.) contained within it.


| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | the name of the level |

<a name="Level+name"></a>

### level.name : <code>String</code>
Name of the level, for identification purposes

**Kind**: instance property of [<code>Level</code>](#Level)  
<a name="Level+allItems"></a>

### level.allItems : <code>Array.&lt;Item&gt;</code>
An array containing all of the items in the world

**Kind**: instance property of [<code>Level</code>](#Level)  
<a name="Level+addItem"></a>

### level.addItem(toAdd) ⇒ <code>undefined</code>
Adds an item to the function

**Kind**: instance method of [<code>Level</code>](#Level)  
**Returns**: <code>undefined</code> - no return value  

| Param | Type | Description |
| --- | --- | --- |
| toAdd | <code>Object</code> | the object to add |

<a name="currentLevel"></a>

## currentLevel : <code>Object</code>
Reference to the current level the player is on

**Kind**: global variable  
