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

