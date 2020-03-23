import numpy as np

# Mutable Code
arr = np.arange(100, dtype=float).reshape(10, 10)
arr[arr % 2 == 0] /= 2
print(arr)

# Immutable Code
arr = np.arange(100).reshape(10, 10)
brr = np.where(arr % 2 == 0, arr / 2, arr)
print(brr)

