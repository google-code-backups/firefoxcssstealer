// This function retrieves the current preferences and populates the preferences dialog
function onLoadPrefs() {

  //  set the value of the path textbox
	var pathBox = document.getElementById("path");	
	pathBox.value = getPath();

  // get the multiple files preference
  var fileGenMenu = document.getElementById("FileGen");
  var multipleFiles = getMultipleFiles();
    
  // set the multiple files drop down list
  if (multipleFiles == true) {
    fileGenMenu.selectedIndex = 1;
  } else {
    fileGenMenu.selectedIndex = 0;
  }    
}

// This function closes the preferences dialog
function closePrefs() {
	this.close();
}

// This function displays the preferences dialog
function showPrefs() 
{	
  var win = window.openDialog("chrome://css_stealer/content/prefs_window.xul",  "prefs_window", "chrome,centerscreen", {}); 
}

// This function sets the multiple files preference
function setMult(stValue) {
	try {
    // get an instance of the preferences component
		var obj = Components.classes["@mozilla.org/myprefs;1"].createInstance(Components.interfaces.nsIMyPrefs);
    
    // prepare values for the set function
		var saved = {};
		var value = false;

    // set the value to true if the input value is true
		if (stValue == 'true') 
    {
      value = true;
    }
		  
    // attempt to set multiple files
		var result = obj.setMultipleFiles(value, saved);
    
    // if there was a failure alert the user
		if (result == false)
    {
			alert("There was an error in the XPCOM component");
		}
	}
	catch (e) { alert("there was an error/JS exception "+e); }
}

// This function will set the path preferences
function setPath(path) {
	try {
    // get an instance of the preferences component
		var obj = Components.classes["@mozilla.org/myprefs;1"].createInstance(Components.interfaces.nsIMyPrefs);
    
    // get the text box with the path
		var pathTextBox = document.getElementById("path");
		
		var saved = {};
		  
    // attempt to the set the path
		var result = obj.setPath(path, saved);
    
    // if the path was set sucessfully then see if it was valid
		if (result == true) {					
      // if the path was valid then save it
			if (saved.value) 
      {
        pathTextBox.value = path;
			} 
      // otherwise inform the user it was invalid
      else 
      {
				alert("The path does not exist, please choose a different path");				
			}
		} 
     // if there was a failure alert the user
    else {
			alert("There was an error in the XPCOM component");
		}
	}
	catch (e) { alert("there was an error/JS exception "+e); }
}

// This function checks if the preferences have been set
function checkDefaultPrefs() {
	try {
    // get an instance of the preferences component
		var obj = Components.classes["@mozilla.org/myprefs;1"].createInstance(Components.interfaces.nsIMyPrefs);
    
		var userDefined = {};
    
    // attempt to the get the user set value
		var result = obj.getUserSet(userDefined);
    
    // if it was sucessful return the value
		if (result == true) {		
      return userDefined.value;
		} 
    // otherwise alert the user
    else 
    {
			alert("There was an error in the XPCOM component");
		}
	} catch (e) { alert("there was an error/JS exception "+e); }
}

function getPath() {
	var retVal = "";
  
	try {
		// get an instance of the preferences component
    var obj = Components.classes["@mozilla.org/myprefs;1"].createInstance(Components.interfaces.nsIMyPrefs);
    
		var path = {};
		
    // attempt to the get the path
		var result = obj.getPath(path);
		
    // if it was sucessful set the return value
		if (result == true) 
    {		
			retVal = path.value;
		} 
    // otherwise alert the user
    else 
    {
			alert("There was an error in the XPCOM component");
		}
	}
	catch (e) { alert("there was an error/JS exception "+e); }
  
  return retVal;
}

function getMultipleFiles() {
	var retVal = false;
  
	try {
    // get an instance of the preferences component
		var obj = Components.classes["@mozilla.org/myprefs;1"].createInstance(Components.interfaces.nsIMyPrefs);
    
		var files = {};
    
    // attempt to the get the multiple files value
		var result = obj.getMultipleFiles(files);
    
    // if it was sucessful set the return value
		if (result == true) 
    {		
			retVal = files.value;
		} 
    // otherwise alert the user
    else
    {
			alert("There was an error in the XPCOM component");
		}
	}
	catch (e) { alert("there was an error/JS exception "+e); }
  
  return retVal;
}

// This function runs the directory selector
function selectDirectory()
{
  const nsIFilePicker = Components.interfaces.nsIFilePicker;
  // get an instance of the file picker
  var fp = Components.classes["@mozilla.org/filepicker;1"]
               .createInstance(nsIFilePicker);
               
  // initialize the file picker
  fp.init(window, "Dialog Title", nsIFilePicker.modeGetFolder);  
  
  // popup the file picker
  var rv = fp.show();
  
  // if the user selected a directory then set it as the path
  if (rv == nsIFilePicker.returnOK || rv == nsIFilePicker.returnReplace) 
  {
    var file = fp.file;
    setPath(file.path);
  }

}
