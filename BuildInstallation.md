# Download #

The entire source can be retrieved from the SVN.  The main branch is the only branch that is stable and ready for release.  The other branches are used for prototyping, and will not have full functionality.

The necessary files for a full installation can also be retrieved in a zip file from the Downloads section.

# Build #

In order to use this extension, a Firefox development build is necessary.  See http://developer.mozilla.org/en/Build_Documentation for details.  Once Firefox has been downloaded and built, follow these steps.

  1. Copy the myPrefs directory to the root directory of your Firefox source.
  1. Open the toolkit-makefiles.sh file found in the toolkit directory.
  1. Copy the following lines into the toolkit-makefiles.sh before the Conditional Makefiles section.
```
MAKEFILES_myPrefs="
  myPrefs/Makefile
"
```
  1. Copy the following into the add\_makefiles section
```
$MAKEFILES_myPrefs 
```
  1. Save the changes made to toolkit-makefiles.sh.
  1. Open a command prompt.
  1. Go to the root of your Firefox source.
  1. Run "configure".
  1. Go to the myPrefs directory.
  1. Run "make".

Once these steps have been completed, the component is ready to be used.

# Install #

Installing the extension is easy.

  1. Open Firefox
  1. Go to File->Open.
  1. Select the css\_stealer.xpi file found in the css\_stealer directory.
  1. Restart Firefox when prompted to do so.

Once Firefox restarts you are ready to use the component.