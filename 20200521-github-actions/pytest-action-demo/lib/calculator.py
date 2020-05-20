import sqlite3

class Calculator:
    def __init__(self, filename=None, *args, reporter=None):
        if reporter is not None:
            self.reporter = reporter
        elif filename is not None:
            self.reporter = FileReporter(filename)
        else:
            raise Exception("Must specifiy either a file name or a reporter")

    def add(self, x, y):
        self._report(f'{x} + {y} = {x + y}')

    def sub(self, x, y):
        self._report(f'{x} - {y} = {x - y}')

    def _report(self, line):
        self.reporter.report(line)


class FileReporter:
    def __init__(self, filename):
        self.filename = filename

    def report(self, line):
        with open(self.filename, 'w') as fout:
            fout.write(line)
            fout.write('\n')


class DBReporter:
    def __init__(self, db):
        self.db = db
        self.cursor = self.db.cursor()
        self.cursor.execute("CREATE TABLE IF NOT EXISTS log (ID INTEGER PRIMARY KEY AUTOINCREMENT, message TEXT)")

    def report(self, line):
        self.cursor.execute("INSERT INTO log (message) VALUES (?)", (line,))