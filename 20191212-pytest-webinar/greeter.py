texts = {
    'hello': "Hello world!"
}

class Greeter:
    def hi(self):
        print(texts['hello'])

    def how_old_are_you(self):
        print("How old are you? (in years)")
        age_in_years = input()
        age_in_months = int(age_in_years) * 12
        print(f"Wow that's {age_in_months} months")
