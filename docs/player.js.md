## Members

<dl>
<dt><a href="#player">player</a> : <code>Object</code></dt>
<dd><p>The object for the main player of the game.</p>
</dd>
</dl>

## Constants

<dl>
<dt><a href="#MOVE_SPEED_WALK">MOVE_SPEED_WALK</a> : <code>Number</code></dt>
<dd><p>The walking speed of the player
The average human walking speed is 1.4 meters/second ~ 0.14 cm/millisecond</p>
</dd>
<dt><a href="#MOVE_SPEED_CROUCH">MOVE_SPEED_CROUCH</a> : <code>Number</code></dt>
<dd><p>The movement speed of the player when crouched</p>
</dd>
<dt><a href="#MOVE_SPEED_RUN">MOVE_SPEED_RUN</a> : <code>Number</code></dt>
<dd><p>The movement speed of the player when running</p>
</dd>
<dt><a href="#ACCEL_SPEED_WALK">ACCEL_SPEED_WALK</a> : <code>Number</code></dt>
<dd><p>Number of milliseconds needed to get to full walking speed</p>
</dd>
</dl>

<a name="player"></a>

## player : <code>Object</code>
The object for the main player of the game.

**Kind**: global variable  
<a name="player.move"></a>

### player.move() ⇒ <code>undefined</code>
Calculates the player's movement based on the currently pressed controls

**Kind**: static method of [<code>player</code>](#player)  
**Returns**: <code>undefined</code> - No return value  
<a name="MOVE_SPEED_WALK"></a>

## MOVE\_SPEED\_WALK : <code>Number</code>
The walking speed of the playerThe average human walking speed is 1.4 meters/second ~ 0.14 cm/millisecond

**Kind**: global constant  
**Default**: <code>0.7</code>  
<a name="MOVE_SPEED_CROUCH"></a>

## MOVE\_SPEED\_CROUCH : <code>Number</code>
The movement speed of the player when crouched

**Kind**: global constant  
**Default**: <code>0.25</code>  
<a name="MOVE_SPEED_RUN"></a>

## MOVE\_SPEED\_RUN : <code>Number</code>
The movement speed of the player when running

**Kind**: global constant  
**Default**: <code>1</code>  
<a name="ACCEL_SPEED_WALK"></a>

## ACCEL\_SPEED\_WALK : <code>Number</code>
Number of milliseconds needed to get to full walking speed

**Kind**: global constant  
**Default**: <code>100</code>  
