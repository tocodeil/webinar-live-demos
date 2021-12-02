def count_even_strings(*x: list[str|int]):
    return sum(float(i) for i in x)

print(count_even_strings(10, "2", 4, "9", 12))


