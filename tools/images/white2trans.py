from PIL import Image
import sys

print(sys.argv)
img = Image.open('img.png')
img = img.convert("RGBA")

pixdata = img.load()

width, height = image.size
for y in xrange(height):
    for x in xrange(width):
        if pixdata[x, y] == (255, 255, 255, 255):
            pixdata[x, y] = (255, 255, 255, 0)

img.save("img2.png", "PNG")
