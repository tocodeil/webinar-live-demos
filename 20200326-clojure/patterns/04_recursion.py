"""
Iteration (looping) in functional languages is usually accomplished 
via recursion.
Recursive functions invoke themselves,
letting an operation be repeated until it reaches the base case.
"""

import os.path

# Iterative code
def find_available_filename_iter(base):
    i = 0
    while os.path.exists(f"{base}_{i}"):
        i += 1
    return f"{base}_{i}"
   
print(find_available_filename_iter('hello'))




# ---
# Recursive code
def find_available_filename_rec(base, i=0):
    name = f"{base}_{i}"
    if not os.path.exists(name):
        return name

    return find_available_filename_rec(base, i + 1)

print(find_available_filename_rec('hello'))
