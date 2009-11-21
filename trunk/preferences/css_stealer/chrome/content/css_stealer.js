function clickStealer() {
	var win = window.openDialog("chrome://css_stealer/content/css_stealer.xul", 
                      "css_stealer", "chrome,centerscreen",
					  {}); 
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

function doSteal (){
	alert("Steal CSS");
}

function setMult(stValue) {
	try {
		var obj = Components.classes["@mozilla.org/myprefs;1"].createInstance(Components.interfaces.nsIMyPrefs);
		var saved = {};
		var value = false;
		alert("value passed "+stValue);
		if (stValue == 'true') value = true;
		  
		var result = obj.setMultipleFiles(value, saved);
		if (result == true) {		
			alert("Result "+saved.value);
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
			alert("Result "+saved.value);
		} else {
			alert("There was an error in the XPCOM component");
		}
	}
	catch (e) { alert("there was an error/JS exception "+e); }
}

function getPath() {
	try {
		var obj = Components.classes["@mozilla.org/myprefs;1"].createInstance(Components.interfaces.nsIMyPrefs);
		var path = {};
		  
		var result = obj.getPath(path);
		if (result == true) {		
			alert("Current path "+path.value);
		} else {
			alert("There was an error in the XPCOM component");
		}
	}
	catch (e) { alert("there was an error/JS exception "+e); }
}