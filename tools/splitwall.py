x = int(input('x of wall: '))
y = int(input('y of wall: '))
width = int(input('width of wall: '))
height = int(input('height of wall: '))
#
# x = -25
# y = -25
# width = 1550
# height = 50

DOOR_WIDTH = 75
DOOR_SPACE = 400

walls = ''
tempwall = '''		new Wall({0}, {1}, {2}, {3}),
'''

tempdoor = '''      new Door({0}, {1}, {2}, {3}, {4}, {5})
'''

doors = ''

vorh = input('Vertical or horizontal: ')

upordown = input("Door open '+' or '-':")

split = int(input('Where to split: '))
#
# vorh = 'h'
#
# upordown = '+'
#
# split = 500
if 'v' in vorh:
    doorTop = split + DOOR_SPACE / 2
    doorBottom = split - DOOR_SPACE / 2
    walls += tempwall.format(x, y, width, height - (doorTop - y))

    if('-' in upordown):
        walls += tempwall.format(x, y + height - (doorTop - y) + DOOR_SPACE, width, y + height - (y + height - (doorTop - y) + DOOR_SPACE))

        doors += tempdoor.format(x - 12, y + height - (doorTop - y) - 10, x - 12, y + height - (doorTop - y) - 10 + DOOR_SPACE, DOOR_WIDTH, DOOR_SPACE + 20)
    else:
        walls += tempwall.format(x, y + height - (doorTop - y) + DOOR_SPACE, width, y + height - (y + height - (doorTop - y) + DOOR_SPACE))

        doors += tempdoor.format(x - 12, y + height - (doorTop - y) - 10, x - 12, y + height - (doorTop - y) - 10 - DOOR_SPACE, DOOR_WIDTH, DOOR_SPACE + 20)
else:
    doorTop = split + DOOR_SPACE / 2
    doorBottom = split - DOOR_SPACE / 2
    walls += tempwall.format(x, y, width - (doorTop - x), height)

    if('-' in upordown):
        walls += tempwall.format(x + width - (doorTop - x) + DOOR_SPACE, y,  x + width - (x + width - (doorTop - x) + DOOR_SPACE), height)

        doors += tempdoor.format(x  + width - (doorTop - x) - 10, y - 12, x + width - (doorTop - x) - 10 + DOOR_SPACE, y - 12, DOOR_SPACE + 20, DOOR_WIDTH)
    else:
        walls += tempwall.format(x + width - (doorTop - x) + DOOR_SPACE, y,  x + width - (x + width - (doorTop - x) + DOOR_SPACE), height)

        doors += tempdoor.format(x + width - (doorTop - x) - 10, y - 12, x + width - (doorTop - x) - 10 - DOOR_SPACE, y - 12, DOOR_SPACE + 20, DOOR_WIDTH)






print(walls)
print(doors)
