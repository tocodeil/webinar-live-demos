# Build On Github Actions

Our project includes a small C++ app with a build script.
Normally the app will just print "hello world", but when executed with a "-version" flag it will print its current version number.
The version is determined at compile time using this line in the file version.h

```
#define MYAPP_VERSION 1
```

Every build we use a python script to increase the version number. The python script is called `inc_version.py`.

We use a Makefile to build the app, so from the command line we can write:

```
$ make
```

To build the app with the value currently written in version.h, or:

```
$ make version
```

To automatically run the python script and increase version number in version.h
(Of course we'll also need to run normal `make` afterwards to build the program).

## Moving To Github Actions
Your task is to move this project to Github Actions, so that each commit will automatically trigger a version bump and build:

1. Copy this folder to a new folder and create a new github project from it.

2. On Github website, open your project and click "actions" tab.

3. Select the suggested workflow: C/C++ with Make.

4. We need to make some modifications:
  - Remove configure action as we don't use it
  - Add make version to bump version number
  - Remove make check and make distcheck
  - Commit and build

5. That was great, but where's the result file?
  - Let's use Create Release action to create a release
  - Visit Create Release page here: https://github.com/marketplace/actions/create-release
  - Click on "Use latest version" green button. Copy the instructions to your workflow (after the build)
  - Change your "on" block to match create-release example (a tag is mandatory)
  - Type in the token and artifacts values
  - Save and commit

6. Try to find out: How to trigger a build? Where is the artifact now?

7. Setup build on Windows:
  - Change runner to windows-latest
  - Build will fail because the Makefile specified "python3", but in Windows the python executable is simply named "python"
  - Change the Makefile, commit and see that it worked.

8. Setup build on Linux (again):
  - Now try to change runner back to ubuntu-latest.
  - Build failed: looks like linux needs to use "python3" as the python executable name. Let's fix it.
  - Setup python3 on the Linux and Mac workflows using the instructions here:
    https://help.github.com/en/actions/language-and-framework-guides/using-python-with-github-actions
  - Build on ubuntu and mac verify see they both work

9. Bonus - Using tag name as the version number
  - Modify the python script to take version number from an environment variable if defined (instead of reading it from the file)
  - Use this workflow demo to get current tag name and create an environment variable from it:
    https://stackoverflow.com/questions/58177786/get-the-current-pushed-tag-in-github-actions
  - Download your built artifact and verify it was built with the correct version      
