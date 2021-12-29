with (open('/etc/passwd') as fi,
      open('./copy', 'w') as fo):
        for line in fi:
            fo.write(line)
