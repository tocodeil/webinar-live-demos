# An Object Oriented Based Solution to
# https://adventofcode.com/2017/day/12
class Registry:
    def __init__(self):
        self.programs = {}

    def program(self, id):
        if id not in self.programs:
            self.programs[id] = Program(id)

        return self.programs[id]

    def all_programs(self):
        return self.programs.values()

class Program:
    def __init__(self, id):
        self.friends = set([self])
        self.id = id
        self.group = None

    def connect(self, other_program):        
        self.friends.add(other_program)
        other_program.friends.add(self)

    def mark_friends(self, group):
        if self.group is not None:
            return

        self.group = group
        for p in self.friends:
            p.mark_friends(group)
            
class Parser:
    def read_file(self, registry, filename):
        with open(filename) as f:
            for line in f:
                left_id, right = line.strip().split(' <-> ')
                ids = right.split(', ')
                left = registry.program(left_id)
                for id in ids:
                    left.connect(registry.program(id))

r = Registry()
p = Parser()
p.read_file(r, 'input.txt')
r.program('0').mark_friends(0)
print(len([program for program in r.all_programs() if program.group == 0]))

