from greeter import Greeter
import sys, io
import pytest

@pytest.fixture
def greeter():
    # setup code
    g = Greeter()

    # pass the result to the test
    yield g

    # free up resources if needed

def test_greeter_text(capfd, greeter):
    greeter.hi()
    outerr = capfd.readouterr()
    text = outerr.out
    assert text == "Hello World\n"


def test_greeter_age(capfd, monkeypatch, greeter):
    monkeypatch.setattr(sys, 'stdin', io.StringIO(u'5'))
    greeter.years_to_months()
    assert "60" in capfd.readouterr().out
