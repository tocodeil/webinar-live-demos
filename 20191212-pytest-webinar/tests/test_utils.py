import utils
import pytest


@pytest.mark.parametrize(
    "input,expected_output",
    [
        (2, 4),
        (0, 0),
        (-5, -10),
        (-7, -14)
    ]
)
def test_twice(input, expected_output):
    assert utils.twice(input) == expected_output


@pytest.mark.parametrize(
    "input,expected_output",
    [
        (2, 6),
        (0, 0),
        (-5, -15),
        (-7, -21)
    ]
)
def test_thrice(input, expected_output):
    assert utils.thrice(input) == expected_output
