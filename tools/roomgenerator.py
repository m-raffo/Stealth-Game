import os

def copy(data):
	os.system("echo '%s' | pbcopy" % data)

temproom = '''
new Room({0}, {1}, {2}, {3}, [
{4}
	]
),

'''

temproom = '''        new Room({0}, {1}, {2}, {3}, [
{4}
        	],

          [
            // doors
          ]
        ),
'''

tempwall = '''          new Wall({0}, {1}, {2}, {3}),
'''

WALL_WIDTH = 50


x = int(input('x of room: '))
y = int(input('y of room: '))
width = int(input('width of room: '))
height = int(input('height of room: '))

walls = ''

# top wall
walls += tempwall.format(x - (WALL_WIDTH / 2), y - (WALL_WIDTH / 2), width + WALL_WIDTH, WALL_WIDTH)

# bottom wall
walls += tempwall.format(x - (WALL_WIDTH / 2), y + height - (WALL_WIDTH / 2), width + WALL_WIDTH, WALL_WIDTH)

# left wall
walls += tempwall.format(x - (WALL_WIDTH / 2), y - (WALL_WIDTH / 2), WALL_WIDTH, height + WALL_WIDTH)

# right wall
walls += tempwall.format(x + width - (WALL_WIDTH / 2), y - (WALL_WIDTH / 2), WALL_WIDTH, height + WALL_WIDTH)

print(temproom.format(x, y, width, height, walls))
copy(temproom.format(x, y, width, height, walls))
print("Copied to clipboard!")
