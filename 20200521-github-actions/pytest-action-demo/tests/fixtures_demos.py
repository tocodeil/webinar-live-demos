import tempfile, os
import pytest
from lib.calculator import Calculator, DBReporter
from pathlib import Path
import sqlite3

@pytest.fixture()
def tempdir():
    previous_dir = os.getcwd()
    with tempfile.TemporaryDirectory() as d:
        os.chdir(d)
        yield d

    os.chdir(previous_dir)


@pytest.fixture()
def tempdb():
    with tempfile.NamedTemporaryFile() as tf:
        db = sqlite3.connect(tf.name)
        yield db


def test_add(tempdir):
    c = Calculator('output.txt')
    c.add(10, 20)
    text_string = Path('output.txt').read_text()
    assert text_string == "10 + 20 = 30\n"


@pytest.mark.xfail
def test_no_previous_output(tempdir):
    text_string = Path('output.txt').read_text()
    assert text_string == "10 + 20 = 30\n"


def test_add_db(tempdb):
    c = Calculator(reporter=DBReporter(tempdb))
    c.add(10, 20)
    [message, *_] = tempdb.cursor().execute("SELECT message FROM log").fetchone()
    assert message == "10 + 20 = 30"


def test_no_previous_output(tempdb):
    with pytest.raises(sqlite3.OperationalError):
        tempdb.cursor().execute("SELECT message FROM log").fetchone()
