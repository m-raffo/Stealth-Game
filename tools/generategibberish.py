import string
import random

print(''.join(random.choices(string.digits + string.ascii_letters + string.punctuation, k=1000)))
