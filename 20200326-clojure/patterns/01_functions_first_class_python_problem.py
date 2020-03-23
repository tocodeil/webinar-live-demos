# Can you see the bug?
nthice = [lambda x: x * n for n in range(1, 10)]
print(nthice[2](3))
