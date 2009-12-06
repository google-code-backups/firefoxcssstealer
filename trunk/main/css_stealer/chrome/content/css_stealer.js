// This function populates the list of selectable CSS rules
function onLoadMain() 
{   
	if("arguments" in window && window.arguments.length > 0) 
	{
		var cssList = document.getElementById("rulesList");	
		
    // create a header for the IDs
		var idTitle = document.createElement("listitem");
		idTitle.setAttribute("label", "IDs");
		idTitle.setAttribute("class", "listCaption");	
		cssList.appendChild(idTitle);		

    // loop through all of the IDs and create listItems for each
		for (var i = 0; i < window.arguments[0].ids.length; ++ i)
		{
			var idItem = document.createElement("listitem");
			idItem.setAttribute("label", window.arguments[0].ids[i]);
			idItem.setAttribute("value", window.arguments[0].rulesID[i]);
			idItem.setAttribute("type", "checkbox");

			var idAttribute =  "id" + i.toString();
			idItem.setAttribute("id", idAttribute);
			
			cssList.appendChild(idItem);
		}

    // create a header for the Elements
		var elementTitle = document.createElement("listitem");
		elementTitle.setAttribute("label", "Elements");
		elementTitle.setAttribute("class", "listCaption");	
		cssList.appendChild(elementTitle);		

    // loop through all of the Elements and create listItems for each
		for (var i = 0; i < window.arguments[0].elements.length; ++ i)
		{
			var elementItem = document.createElement("listitem");
			elementItem.setAttribute("label", window.arguments[0].elements[i]);
			elementItem.setAttribute("value", window.arguments[0].rulesElement[i]);
			elementItem.setAttribute("type", "checkbox");
			var idAttribute =  "class" + i.toString();
			elementItem.setAttribute("id", idAttribute);
				
			cssList.appendChild(elementItem);
		}

    // create a header for the Classes
		var classTitle = document.createElement("listitem");
		classTitle.setAttribute("label", "Classes");
		classTitle.setAttribute("class", "listCaption");	
		cssList.appendChild(classTitle);		

    // loop through all of the Classes and create listItems for each
		for (var i = 0; i < window.arguments[0].classes.length; ++ i)
		{
			var classItem = document.createElement("listitem");
			classItem.setAttribute("label", window.arguments[0].classes[i]);
			classItem.setAttribute("type", "checkbox");
			classItem.setAttribute("value", window.arguments[0].rulesClass[i]);

			var idAttribute =  "elem" + i.toString();
			classItem.setAttribute("id", idAttribute);
			
			cssList.appendChild(classItem);
		}
			
	}    
}
	
// This function retrieves all of the CSS rules and passes them to the dialog
function clickStealer() {
	var sheet;
	var selector;

  // create arrays that will hold the names and rules for all of the CSS rules
	var idArray = new Array();
	var classArray = new Array();
	var elementArray = new Array();
	var idRules = new Array();
	var classRules = new Array();
	var elementRules = new Array();

  // get the current browser's content
	var browser = gBrowser.mCurrentBrowser;
	var doc = browser.contentDocument;

  // loop through all of the current browser's stylesheets
	for (var i=0; i < doc.styleSheets.length; ++i)
	{	
		var sheet = doc.styleSheets[i].cssRules;

    // loop through all of the rules in each sheet
		for (var j = 0; j < sheet.length; ++j)
		{			
      // get the name of the rule and the text
			var selector = sheet[j].selectorText;
			var ruleText = sheet[j].cssText;

      // if the rule is valid
			if (selector)
			{
        // if the rule starts with a '#' then it is an ID
				if (selector.charAt(0) == '#')
				{
					// put into id
					idArray.push(selector);
					idRules.push(ruleText);
				}
        // if the rule starts with a '.' it is a class
				else if (selector.charAt(0) == '.')
				{
					// put into class
					classArray.push(selector);
					classRules.push(ruleText);
				}
        // otherwise it is an element
				else
				{
					// put into element
					elementArray.push(selector);
					elementRules.push(ruleText);
				}
			}
		}

	}

  // open the CSS Stealer dialog and pass in the arrays
	var win = window.openDialog("chrome://css_stealer/content/css_stealer.xul",  "css_stealer", "chrome,centerscreen", {ids: idArray, classes: classArray, elements: elementArray, rulesID: idRules, rulesClass: classRules, rulesElement: elementRules}); 
}

// Function will check or uncheck all items in the listbox depending on the input
function selectAll(value) {
	var item;
	//check elements
	var name = "elem";
	var index = 0;
	item = document.getElementById(name+index);	
	while (item != null)
	{
		item.setAttribute("checked",value);
		index++;
		item = document.getElementById(name+index);
	}
	//check ids
	index = 0;
	name = "id";
	item = document.getElementById(name+index);
	while (item != null)
	{
		item.setAttribute("checked",value);
		index++;
		item = document.getElementById(name+index);
	}
	//check classes
	index = 0;
	name = "class";
	item = document.getElementById(name+index);
	while (item != null)
	{
		item.setAttribute("checked",value);
		index++;
		item = document.getElementById(name+index);
	}
}

// This function builds the data to be stored in the resulting files
function steal()
{
  // if the preferences have not been set then alert the user and retun
  if (false == checkDefaultPrefs())
  {
    alert("Please set your preferences.");
    return;
  }
  
	var data = "";
	var stolen = 0;
  var multipleFiles = false;
     
	// Retrieve the Multiple Files Preference Setting
	var multipleFiles = getMultipleFiles();

  // go through all of the elements and retrieve data for the ones that are selected
	var item;  
	var name = "elem";
	var index = 0;
	item = document.getElementById(name+index);	
  
  // while there are more elements to process
	while (item != null) {
		if (item.getAttribute("checked").length == 4) {
			data = data + item.getAttribute("value") + "\n";
      
      // if the user wants to generate multiple files, create a file for this element
			if (multipleFiles == true) {
				var fileName = filePath + "Stolen" + (stolen + 1).toString() + ".css";
				writeCSSToFile(item.getAttribute("value"), fileName);
				++stolen;
			}
		}
    
    // get the next element
		index++;
		item = document.getElementById(name+index);
	}
  
  // go through all of the IDs and retrieve data for the ones that are selected
	index = 0;
	name = "id";
	item = document.getElementById(name+index);
  
  // while there are more IDs to process
	while (item != null) {
		if (item.getAttribute("checked").length == 4) {
			data = data + item.getAttribute("value") + "\n";
      
      // if the user wants to generate multiple files, create a file for this ID
			if (multipleFiles == true) {
				var fileName = "Stolen" + (stolen + 1).toString() + ".css";
				writeCSSToFile(item.getAttribute("value"), fileName);
				++stolen;
			}      
		}
    
    // get the next ID
		index++;
		item = document.getElementById(name+index);
	}
  
  // go through all of the classes and retrieve data for the ones that are selected
	index = 0;
	name = "class";
	item = document.getElementById(name+index);
  
  // while there are more classes to process
	while (item != null) {
		if (item.getAttribute("checked").length == 4) {
			data = data + item.getAttribute("value") + "\n";
      
      // if the user wants to generate multiple files, create a file for this class
			if (multipleFiles == true) {
				var fileName = "Stolen" + (stolen + 1).toString() + ".css";
				writeCSSToFile(item.getAttribute("value"), fileName);
				++stolen;
			}      
		}
    
     // get the next class
		index++;
		item = document.getElementById(name+index);
	}

  // if multiple files are not being written then write one file with all of the data
	if (multipleFiles == false) {
		var fileName = "Stolen.css";
		writeCSSToFile(data, fileName);
    ++stolen;
	}

  // inform the user how many files were written and to what location
  if (stolen == 1)
  {
    alert("Saved " + (stolen).toString() + " file to " + getPath());
  }
  else
  {
    alert("Saved " + (stolen).toString() + " files to " + getPath());
  }
}

// This function handles file writing of the CSS data
function writeCSSToFile(data, fileName)
{
	// Retrieve the File Path Preference setting
	var filePath = getPath();

  // create a file using the path from the preferences and the supplied filename
	var file = Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsILocalFile);
	file.initWithPath(filePath);
	file.append(fileName)
  
  // create a output stream
  var foStream = Components.classes["@mozilla.org/network/file-output-stream;1"]
                         .createInstance(Components.interfaces.nsIFileOutputStream);

  // if the file does not exist create it
	if ( file.exists() == false ) {
		file.create(file.NORMAL_FILE_TYPE, 0666);  
	}

  // write data to the file
	foStream.init(file, 0x02 | 0x10| 0x20, 0666, 0);
	foStream.write(data, data.length);
	foStream.close(); 
}


