This is the approximate API of the COM component. All methods return true/false, which indicates if there was an error.

## CSS Stealer Functionality ##


_getCSS(in htmlDoc, out elementsArray, out classesArray, out idsArray)_

Takes the current HTML document and returns three arrays of different types of CSS items (elements, classes and ids). The returned arrays might be empty.

_steal(in elementsArray, in classesArray, in idsArray)_

Takes three arrays of the selected CSS items (elements, classes and ids) and saves the rules for the indicated items into one file or several files depending on the settings in the preferences.

_createCSSSample(in elementsArray, in classesArray, in idsArray, out filePath)_

Takes three arrays of CSS items and creates a template HTML file with embedded CSS of the selected elements.

_stealAll()_

Saves the whole CSS file on the hard drive in the indicated directory


## Preferences Functionality ##

_setPath(in path)_

Sets the path of the directory on the hard drive, where the CSS and HTML files are saved.

_getPath(out path)_

Returns the path of the directory, where the CSS and HTML files are saved, or NULL of the path is empty.

_setMultipleFiles(in value)_

If the function is set to TRUE, then a separate CSS file is created for each item selected. Otherwise, all CSS rules are saved into one file.

_getMultipleFiles(out value)_

Returns the value of the preference, if the CSS rules are saved in one file or multiple files.

_getUserSet(out value)_

Returns true if the user has already set the path and false otherwise (if the path preference has the default value). The function is used in the first run of the extension to prompt user to enter the path

## JavaScript Functionality ##

The functions that need to be implemented in JavaScript

_displayNodes(in htmlDoc, out documentString)_

Takes the HTML document as an input and produces a tree-like string, where each HTML element is indented with tabs, based on it's position in the DOM tree. For each element we display the following parameters: name, label if exists, class, id.