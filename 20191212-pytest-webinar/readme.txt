PyTest Webinar
Ynon Perek

All code is available on github:
https://github.com/tocodeil/webinar-live-demos

Agenda:

1. Hello pytest
  unittest
    comes with python

  pytest
    features
    easy to start
    no boilerplate
    plugin based


2. A first test program
  1. Install pytest (pycharm / external environment)
  2. From pycharm -> Settings -> Tools -> Python Integrated Tools -> pytest
  3. From cmd -> python -m pytest [-k name]

3. Running the test (from pycharm and cmd)

4. Parameterized test
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


5. Monkey patching
  def test_age(capfd, monkeypatch):
      monkeypatch.setattr(sys, 'stdin', io.StringIO('5\n'))
      g = Greeter()
      g.how_old_are_you()
      text_written_to_stdout = capfd.readouterr().out
      assert "60" in text_written_to_stdout


===> 6. Fixtures
  https://www.tocode.co.il/blog/2019-12-pytest-fixtures 
  @pytest.fixture()
  def greeter():
      g = Greeter()
      yield g
      # clean up after you're done
    

7. Testing external API with requests

