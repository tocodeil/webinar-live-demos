from datetime import datetime

x = [10, 20, 30, 40]
match x:
    case [*_, 30, last]:
        print(f"after 30 I found {last}")

match datetime.now():
    case datetime(year=2021, month=12, day=x):
        print(f"Today is December {x}")



