# C++ Component #

There was one C++ component that was created, and one that had to be abadoned due to implementation issues.  This component needs to be compiled and registered as a component of Firefox.

### Preferences Component ###

The C++ Component is used for managing preferences.  This component uses the nsIPrefsService to store two preferences, the folder path and whether to generate multiple files.  The nsIPrefsService ensures that these preferences persist through multiple runs of the extension.  They can be viewed through Firefox's about:config command.  The interface with this component is handled through prefs\_manager.js.

### Failed CSS Stealer Component ###

This component was originally planned to also handle the retrieval of the CSS data.  However, there were numerous problems encountered during the development of this component that made it impossible.  The first being the difficulty to get arrays to make the round-trip for C++ to Javascript.  After finally managing to get the arrays to work, it was discovered that there was no XPCOM equivalent interface for the CSS Stylesheets JavaScript interface.  Once this fact was discovered, there was no possible way to use a component and retrieve the necessary CSS data.  Since this extension is a CSS stealer, there was no part of implementation that could have been done in the component.

# JavaScript #

There are three JavaScript files that perform the majority of the CSS Stealer's functions.  These files are included in the content directory of the XPI extension along with the XUL files.  This extension is installed as an Add-On to Firefox.

### domListingFunctions.js ###

The domListingFunctions.js file traverses through the page loaded in the browser and builds a dialog window showing how the page is structured and where all of the CSS elements are being used.  The parseNodes is the primary driver of the DOM listing.  It gets the browser data and sends it to the displayNodes method.  The displayNodes method is a recursive method that builds an indented string of HTML that describes the current page's structure.  After displayNodes is finished, parseNodes calls createWindow.  The createWindow method calls writeToFile, which creates an HTML file with the displayNodes data.  Then createWindow opens this file.

This file does not handle any user input.  The parseNodes method is called at the beginning of the CSS Stealer's initialization and never again.

### prefs\_manager.js ###

The prefs\_manager.js file is used to interface with Preferences Component and the user.

The file interfaces with the component through the setMult, setPath, getPath, and checkDefaultPrefs methods.  These methods are simple getters and setters.  The preferences dialog calls the getters to populate the screen and then calls the setter depending on user input.  The css\_stealer.js file also uses the getters to determine how to save files.

There are also methods needed for the preferences dialog.  The showPrefs and closePrefs methods are used pop up and close the preferences dialog.  The onLoadPrefs dialog initializes the form elements in the preferences dialog with the current preference settings.  Finally, the selectDirectory method is used to let the user set the path.  It uses the nsIFilePicker interface defined in Mozilla to popup a directory selection dialog.  This ensures that the path will always be valid.

### css\_stealer.js ###

The css\_stealer.js file is used to grab all of the CSS data from the current browser page, populate the list of selectable CSS elements, and then save the CSS elements selected to file.

The clickStealer is the first function executed.  It retrieves all of the CSS rules from the page currently loaded in the browser.  It then opens the main dialog window and passes the arrays with the different rules.

The onLoadMain function is called when the main dialog window is opened.  It takes the arrays retrieved from the clickStealer method and populates the listbox with all of the CSS rules separated by type.

The steal method is called when the user wants to save the CSS elements that have been selected.  This method goes through the listbox and for every selected element will either write it to its own file or add it to a file that contains all selected CSS rules.  This is determined by the result of getMultipleFiles.  The file writing is handled by the writeCSSToFile method.  At the end the user is alerted as to how many files have been written.

The writeCSSToFile method takes in a filename and a string as parameters.  It appends the filename to the path retrieved from the getPath method.  Then it will create that file and write the string to it.

The selectAll method will either check all of the items in the listbox or uncheck them depending on the input parameter.

# XUL #

There are three XUL files that perform the majority of the CSS Stealer's functions.  These files are included in the content directory of the XPI extension along with the JavasScript files.  This extension is installed as an Add-On to Firefox.

### browserOverlay.xul ###

This file creates an option in the tools menu that will start the CSS Stealer.

This file uses methods from the css\_stealer.js and domListingFunctions.js files.

### prefs\_window.xul ###

This file defines the dialog that the user uses to set preferences.  It has an uneditable textbox that displays the current file path, and a button that will popup the directoy selector.  It also has a drop down list for choosing how many files to generate.

This file uses methods from the prefs\_manager.js file.

### css\_stealer.xul ###

This file defines the main dialog window for the CSS Stealer extension.  It contains a listbox that has all of the available CSS rules, along with checkboxes so that they can be individually selected.  It also has buttons to select all rules and deselect all rules. In addition, it has a button that will pop up the preferences dialog.  Most importantly, it has a Steal button that steals the CSS rules selected.

This file uses methods from the css\_stealer.js and prefs\_manager.js files.