from typing import Union

def count_even_strings(*x: list[str,int]):
    return sum(float(i) for i in x)

x: Union[int,float] = 10
y: int|float = 10

print(count_even_strings(10, "2", 4, "9", 12))


