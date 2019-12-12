from greeter import Greeter, texts
import io, sys

def test_hi(capfd):
    g = Greeter()
    g.hi()
    text_written_to_stdout = capfd.readouterr().out
    assert text_written_to_stdout == texts['hello'] + "\n"


def test_age(capfd, monkeypatch):
    monkeypatch.setattr(sys, 'stdin', io.StringIO('5\n'))
    g = Greeter()
    g.how_old_are_you()
    text_written_to_stdout = capfd.readouterr().out
    assert "60" in text_written_to_stdout
