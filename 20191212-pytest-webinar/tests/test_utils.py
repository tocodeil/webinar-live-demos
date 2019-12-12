import utils

def test_twice_1():
    assert utils.twice(2) == 4

def test_twice_2():
    assert utils.twice(0) == 0

def test_twice_3():
    assert utils.twice(-5) == -10
