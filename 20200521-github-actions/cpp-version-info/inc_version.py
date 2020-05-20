import fileinput, re, sys

for line in fileinput.input(inplace=True):
    m = re.search(r"#define MYAPP_VERSION (\d+)", line)
    if m:
        version = int(m.group(1))
        sys.stdout.write(f"#define MYAPP_VERSION {version+1}\n")
    else:
        sys.stdout.write(line)
