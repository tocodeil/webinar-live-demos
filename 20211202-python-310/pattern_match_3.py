import math
from dataclasses import dataclass

def area(shape):
    match shape:
        case Circle(_, _, r):
            return r * math.pi * math.pi
            
        case Square(_, _, w, h):
            return w * h

@dataclass
class Circle:
    cx: float
    cy: float
    radius: float


@dataclass(match_args=False)
class Square:
    __match_args__ = ('x', 'y', 'w', 'h')
    x: float
    y: float
    w: float
    h: float

c = Circle(0, 0, 10)
s = Square(0, 0, 10, 10)

print(area(c))
print(area(s))
