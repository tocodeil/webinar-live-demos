import lib.utils as utils
import pytest
import json
from pathlib import Path
import codecs

datafile = Path(__file__).parent / 'data' / 'twice.json'
with codecs.open(str(datafile), encoding='utf8') as f:
    data = json.load(f)

@pytest.mark.parametrize(
    'input,expected_output', data)
def test_twice_1(input, expected_output):
    assert utils.twice(input) == expected_output

def test_thrice_1():
    assert utils.thrice(10) == 30, "thrice(10) != 30"

def test_thrice_2():
    assert utils.thrice(0) == 0, "thrice(0) != 0"

def test_thrice_3():
    assert utils.thrice(-5) == -15, "thrice(-5) != -15"
