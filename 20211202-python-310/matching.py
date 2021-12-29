def do_something_with_strings_or_numbers(x):
    match x:
        case int(7):
            print("Boom!")
        case int()
            print(x+1)
        case str():
            print(f"Hello {x}")

do_something_with_strings_or_numbers(10)
do_something_with_strings_or_numbers("ynon")
do_something_with_strings_or_numbers(7)
do_something_with_strings_or_numbers(False)
do_something_with_strings_or_numbers([])


match [10, 20, 30, 31]:
    case [*_, x, y] if x == y:
        print("last two items are equal")
    case [*_, x, y]:
        print("last two items are different")

