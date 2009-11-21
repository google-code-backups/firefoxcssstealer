#include "nsIMyPrefs.h"

// Contract ID, specific to this implementation. UUID generated from
// botbot and broken apart for C++
// e54c42d4-1261-48d1-af63-62ce52ab0a6f
#define NS_MYPREFS_CID \
{0x4619b5ff, 0xe699, 0x43f4, {0xa4, 0x85, 0x73, 0x20, 0x5c, 0x4c, 0xf0, 0x9e}}

// our prog id for this class, here for convenience
#define NS_MYPREFS_PROG_ID "@mozilla.org/myprefs;1"


//
// class SimpleImpl
//
// A sample class declaration for the implementation of our component. It
// implements one interface (besides nsISupports, which is implicit), 
// nsISimple. 
//
class MyPrefsImpl : public nsIMyPrefs
{
public:
  // normal ctor and dtor. Factory pattern makes these generally usused
  MyPrefsImpl();
  virtual ~MyPrefsImpl();

  // pull in the prototypes for methods of nsISupports
  NS_DECL_ISUPPORTS

  // pull in the prototypes for methods of nsISimple
  NS_DECL_NSIMYPREFS
private:
};

