with (
        open("/etc/shells") as input,
        open("./copy", "w") as output):
    for line in input:
        output.write(line)


