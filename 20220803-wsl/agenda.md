# WSL Webinar

0. Check status
```
wsl --status
wsl -l
```

1. Start Ubuntu on Windows

```
wsl
```

2. Run GUI apps

```
export DISPLAY=:0
xeyes
```

2a. Run full desktop

```
kex --win -s
```

3. List available distros and install another one

```
wsl -l -o
```

4. Install some

```
wsl --install -d kali-linux
```

5. Close a distro

```
wsl -t kali-linux
```

Shutdown WSL itself (closing all distros)

```
wsl --shutdown
```

6. Use VSCode to write linux apps with the remote extensions
  - ~/myapp/nodeapp
  - ~/myapp/webapp1

7. Tutorials / Guides:
https://docs.microsoft.com/en-us/windows/wsl/setup/environment

8. WSL Config
https://docs.microsoft.com/en-us/windows/wsl/wsl-config#wslconfig

9. Problems / Missing Features
  - No support for USB devices:
    https://devblogs.microsoft.com/commandline/connecting-usb-devices-to-wsl/

  - Some problems with copy/paste in GUI apps
    https://github.com/microsoft/wslg/issues/15
    https://github.com/microsoft/wslg/issues/196

  - Some people complain about resource usage
    https://github.com/microsoft/WSL/issues/4166
    
