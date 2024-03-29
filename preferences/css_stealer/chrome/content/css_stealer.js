function onLoadMain() 
{   
	if("arguments" in window && window.arguments.length > 0) 
	{
		var cssList = document.getElementById("rulesList");	
		
		var idTitle = document.createElement("listitem");
		idTitle.setAttribute("label", "IDs");
		idTitle.setAttribute("class", "listCaption");	
		cssList.appendChild(idTitle);		

		for (i = 0; i < window.arguments[0].ids.length; ++ i)
		{
			var idItem = document.createElement("listitem");
			idItem.setAttribute("label", window.arguments[0].ids[i]);
			idItem.setAttribute("value", window.arguments[0].rulesID[i]);
			idItem.setAttribute("type", "checkbox");

			var idAttribute =  "id" + i.toString();
			idItem.setAttribute("id", idAttribute);
			
			cssList.appendChild(idItem);
		}

		var elementTitle = document.createElement("listitem");
		elementTitle.setAttribute("label", "Elements");
		elementTitle.setAttribute("class", "listCaption");	
		cssList.appendChild(elementTitle);		

		for (i = 0; i < window.arguments[0].elements.length; ++ i)
		{
			var elementItem = document.createElement("listitem");
			elementItem.setAttribute("label", window.arguments[0].elements[i]);
			elementItem.setAttribute("value", window.arguments[0].rulesElement[i]);
			elementItem.setAttribute("type", "checkbox");
			var idAttribute =  "class" + i.toString();
			elementItem.setAttribute("id", idAttribute);
				
			cssList.appendChild(elementItem);
		}

		var classTitle = document.createElement("listitem");
		classTitle.setAttribute("label", "Classes");
		classTitle.setAttribute("class", "listCaption");	
		cssList.appendChild(classTitle);		

		for (i = 0; i < window.arguments[0].classes.length; ++ i)
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

function onLoadPrefs() {

	var pathBox = document.getElementById("path");	
	var path = getPath();
	pathBox.value = path;
    //pathBox.setAttribute("value", path);
	//pathBox.setAttribute("value", "test");

    var fileGenMenu = document.getElementById("FileGen");
    var multipleFiles = getMultipleFiles();
    
    if (multipleFiles == true) {
      fileGenMenu.selectedIndex = 1;
    } else {
      fileGenMenu.selectedIndex = 0;
    }    
}

function closePrefs() {
	this.close();
}
	
function clickStealer() {
	var sheet;
	var selector;

	var idArray = new Array();
	var classArray = new Array();
	var elementArray = new Array();
	var idRules = new Array();
	var classRules = new Array();
	var elementRules = new Array();

	var browser = gBrowser.mCurrentBrowser;
	var doc = browser.contentDocument;

	for (i=0; i < doc.styleSheets.length; ++i)
	{	
		sheet = doc.styleSheets[i].cssRules;

		for (j = 0; j < sheet.length; ++j)
		{			
			selector = sheet[j].selectorText;
			ruleText = sheet[j].cssText;

			if (selector)
			{
				if (selector.charAt(0) == '#')
				{
					// put into id
					idArray.push(selector);
					idRules.push(ruleText);
				}
				else if (selector.charAt(0) == '.')
				{
					// put into class
					classArray.push(selector);
					classRules.push(ruleText);
				}
				else
				{
					// put into element
					elementArray.push(selector);
					elementRules.push(ruleText);
				}
			}
		}

	}

	var win = window.openDialog("chrome://css_stealer/content/css_stealer.xul",  "css_stealer", "chrome,centerscreen", {ids: idArray, classes: classArray, elements: elementArray, rulesID: idRules, rulesClass: classRules, rulesElement: elementRules}); 
}

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


function steal()
{
	var data = "";
	var stolenID = 1;
    var multipleFiles = false;
  
	// Retrieve the File Path Preference setting
	var filePath = getPath();
  
	if (filePath == "") {
		alert("Error: Path not set.  No files generated.");
		return;
	}
  
	if (filePath.charAt(filePath.length-1) != '\\') {
		filePath = filePath + "\\";
	}
    
	// Retrieve the Multiple Files Preference Setting
	var multipleFiles = getMultipleFiles();

	var item;
	//check elements
	var name = "elem";
	var index = 0;
	item = document.getElementById(name+index);	
	while (item != null) {
		if (item.getAttribute("checked").length == 4) {
			//alert(item.getAttribute("value"));
			data = data + item.getAttribute("value") + "\n";
      
			if (multipleFiles == true) {
				var fileName = filePath + "Stolen" + (stolenID).toString() + ".css";
				writeCSSToFile(item.getAttribute("value"), fileName);
				++stolenID;
			}
		}
    
		index++;
		item = document.getElementById(name+index);
	}
	//check ids
	index = 0;
	name = "id";
	item = document.getElementById(name+index);
	while (item != null) {
		if (item.getAttribute("checked").length == 4) {
			//alert(item.getAttribute("value"));
			data = data + item.getAttribute("value") + "\n";
      
			if (multipleFiles == true) {
				var fileName = filePath + "Stolen" + (stolenID).toString() + ".css";
				writeCSSToFile(item.getAttribute("value"), fileName);
				++stolenID;
			}      
		}
    
		index++;
		item = document.getElementById(name+index);
	}
	//check classes
	index = 0;
	name = "class";
	item = document.getElementById(name+index);
	while (item != null) {
		if (item.getAttribute("checked").length == 4) {
			//alert(item.getAttribute("value"));
			data = data + item.getAttribute("value") + "\n";
      
			if (multipleFiles == true) {
				var fileName = filePath + "Stolen" + (stolenID).toString() + ".css";
				writeCSSToFile(item.getAttribute("value"), fileName);
				++stolenID;
			}      
		}
    
		index++;
		item = document.getElementById(name+index);
	}
  
	if (multipleFiles == false) {
		var fileName = filePath + "Stolen.css";
		writeCSSToFile(data, fileName);
	}
}

function writeCSSToFile(data, filePath)
{
	var file = Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsILocalFile);
	var foStream = Components.classes["@mozilla.org/network/file-output-stream;1"]
                         .createInstance(Components.interfaces.nsIFileOutputStream);
	file.initWithPath(filePath);
	if ( file.exists() == false ) {
		file.create(file.NORMAL_FILE_TYPE, 0666);  
	}

	foStream.init(file, 0x02 | 0x10| 0x20, 0666, 0);
	foStream.write(data, data.length);
	foStream.close(); 
}

function showPrefs() {	
	var win = window.openDialog("chrome://css_stealer/content/prefs_window.xul",  "prefs_window", "chrome,centerscreen", {}); 
}

function setMult(stValue) {
	try {
		var obj = Components.classes["@mozilla.org/myprefs;1"].createInstance(Components.interfaces.nsIMyPrefs);
		var saved = {};
		var value = false;

		if (stValue == 'true') value = true;
		  
		var result = obj.setMultipleFiles(value, saved);
		if (result == true) {
			if (value) {
				alert("Generating multiple files.");
			} else {
				alert("Generating one file.");
			}
		} else {
			alert("There was an error in the XPCOM component");
		}
	}
	catch (e) { alert("there was an error/JS exception "+e); }
}

function setPath() {
	try {
		var obj = Components.classes["@mozilla.org/myprefs;1"].createInstance(Components.interfaces.nsIMyPrefs);
		var pathTextBox = document.getElementById("path");
		var path = pathTextBox.value;
		
		var saved = {};
		  
		var result = obj.setPath(path, saved);
		if (result == true) {					
			if (saved.value) {
				alert("File path saved");
			} else {
				alert("The path does not exist, please choose a different path");				
			}
		} else {
			alert("There was an error in the XPCOM component");
		}
	}
	catch (e) { alert("there was an error/JS exception "+e); }
}

function getPath() {
	var retVal = "";
	try {
		var obj = Components.classes["@mozilla.org/myprefs;1"].createInstance(Components.interfaces.nsIMyPrefs);
    
		var path = {};
		
		var result = obj.getPath(path);
		
		if (result == true) {		
			retVal = path.value;
		} else {
			alert("There was an error in the XPCOM component");
		}
	}
	catch (e) { alert("there was an error/JS exception "+e); }
  return retVal;
}

function getMultipleFiles() {
	var retVal = false;
	try {
		var obj = Components.classes["@mozilla.org/myprefs;1"].createInstance(Components.interfaces.nsIMyPrefs);
    
		var files = {};
		  
		var result = obj.getMultipleFiles(files);
		if (result == true) {		
			retVal = files.value;
		} else {
			alert("There was an error in the XPCOM component");
		}
	}
	catch (e) { alert("there was an error/JS exception "+e); }
  
  return retVal;
}