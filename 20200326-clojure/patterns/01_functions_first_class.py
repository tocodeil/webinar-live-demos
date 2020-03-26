"""
First-class function
The language supports:
    1. passing functions as arguments to other functions
    2. returning them as the values from other functions
    3. assigning them to variables or storing them in data structures

"""

from math import sqrt, factorial
from functools import partial
from operator import add

# 1. Passing functions as arguments to other functions
print(list(map(factorial, range(10))))

# 2. Returning functions from other functions
plus_one = partial(add, 1)
print(plus_one(10))

# 3. Storing functions in variables and Data Structures
twice = lambda x: x * 2
print(twice(10))
