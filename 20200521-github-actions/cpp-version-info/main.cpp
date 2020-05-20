#include <iostream>
#include "version.h"

using namespace std;

int main(int argc, char **argv) {
  if ((argc == 2) && (string(argv[1]) == "--version")) {
      cout << "Version: " << MYAPP_VERSION << endl;
      return 0;
  }

  cout << "hello world:" << argc << endl;
  return 0;
}
