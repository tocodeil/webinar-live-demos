# Testing Python Automatically on Github
Using Github actions we can run our test suite with every commit. This is a python project which uses pytest. Normally I run the tests on my machine using:

```
$ python -m pytest
```

Pytest will automatically find all the tests and execute them, producing the following output:

```
============================================================= test session starts =============================================================
platform darwin -- Python 3.8.2, pytest-5.3.5, py-1.8.1, pluggy-0.13.1
rootdir: /Users/ynonperek/work/courses/webinar-live-demos/20200521-github-actions/pytest-action-demo
collected 10 items

tests/test_demo1.py .                                                                                                                   [ 10%]
tests/test_greeter.py ..                                                                                                                [ 30%]
tests/test_utils.py .......                                                                                                             [100%]

============================================================= 10 passed in 0.06s ==============================================================
```

We want to create a Github Action that will automatically run our tests on Github machine.

## Action Setup

1. Create a new Github project with the files and inside create a new workflow

2. We'll start with a linux machine:
  - Add python setup action to your workflow using the instructions here:
    https://github.com/marketplace/actions/setup-python
  - Start with a recent version of python, i.e. 3.8.2

3. The command "run" in a workflow executes a shell command. We use the following syntax to run multiple commands:

```
    - name: Do stuff
      run: |
        echo one
        echo two
```

4. In order to run a python project we first need to install its dependencies using the following shell commands:

```
python -m pip install --upgrade pip
pip install -r requirements.txt
```

So, create a "run" block that executes this command and installs the project's dependencies.

5. Create a second run block that starts pytest

6. Commit, push and verify your tests worked.

7. Now let's create a Test Matrix. This will allow us to test on multiple operating systems AND multiple python versions.

  - Add the following "Strategy" block to your workflow:

```
    strategy:
      matrix:
        python-version: [3.8, 3.7, 3.6]
        os: [ubuntu-latest, macos-latest, windows-latest]
```

  - Change the value of python-version to the expression: ${{ matrix.python-version }}
  - Change the value of runs-on to the expression: ${{ matrix.os }}

8. Commit and push, and verify your tests ran on all 3 operating systems with all 3 python versions (to a total of 9 test runs).

9. Bonus: The library pytest-cov will add coverage information to your project. The service codecov will give you a cool dashboard to watch its reports. Combine the two:
  - Create an account on https://codecov.io/ (sign in with your github account)
  - Add your python repository to codecov
  - Use the library pytest-cov to generate a coverage report (don't forget to add the pip to requirements.txt)
    https://pypi.org/project/pytest-cov/
  - Modify the workflow to generate coverage report, and use the action codecov to upload the reports to codecov:
    https://github.com/marketplace/actions/codecov


