from functools import partial
from operator import mul

nthice = [partial(mul, n) for n in range(1, 10)]
print(nthice[2](3))

