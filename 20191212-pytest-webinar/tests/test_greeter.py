from greeter import Greeter, texts
import io, sys
import pytest

@pytest.fixture()
def greeter():
    g = Greeter()
    yield g
    # clean up after you're done


def test_hi(capfd, greeter):
    greeter.hi()
    text_written_to_stdout = capfd.readouterr().out
    assert text_written_to_stdout == texts['hello'] + "\n"


def test_age(capfd, monkeypatch, greeter):
    monkeypatch.setattr(sys, 'stdin', io.StringIO('5\n'))
    greeter.how_old_are_you()
    text_written_to_stdout = capfd.readouterr().out
    assert "60" in text_written_to_stdout
