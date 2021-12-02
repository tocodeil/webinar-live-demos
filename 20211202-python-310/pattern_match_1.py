from math import sqrt

def sqrt_with_negatives(x: int):
    match x:
        case int() if x > 0:
            return sqrt(x)

        case int() if x < 0:
            return sqrt(-x)

        case 0:
            return 0

print(sqrt_with_negatives(10))
print(sqrt_with_negatives(-4))
print(sqrt_with_negatives(0))
