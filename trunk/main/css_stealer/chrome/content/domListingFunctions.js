var XmlDoc;
var NodesAsList = "";
function parseNodes()
{
	alert("parse nodes");
	var browser = gBrowser.mCurrentBrowser;	
	displayNodes(browser.contentDocument);
	createWindow();
}

//Walks the dom tree and displays elements in red, Text in blue, ID in green, and Class Name in purple
//This is a recursive function
function displayNodes(DOC)

{
    NodesAsList += "<ol>";
    for (var i = 0; i < DOC.childNodes.length; i++)
    {
        Node = DOC.childNodes[i];
        Class = (Node.nodeType == 3) ? "TextNode" : "NonTextNode";

        NodesAsList += "<li class=" + Class + ">";
        NodesAsList += "<font color='red'>Element: " + Node.nodeName +
                       "</font><font color='blue'>  Text: " + Node.innerText +
                       "</font><font color='Green'>  ID: " + Node.id + 
                       "</font><font color='purple'>  Class: " + Node.className + "</font>";
        if (Node.hasChildNodes())
        {
            displayNodes(Node);
        }
        NodesAsList += "</li>";
    }

    NodesAsList += "</ol>";	
}

//Seperate function to show the window.  This is needed because of the recursive function to get the nodes
function createWindow()
{
    try
    {
		var a = gBrowser.mCurrentBrowser;
		var doc = a.contentDocument;
		
		//var oldFile = Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsILocalFile);
		
		//alert(oldFile.path);
		//try{
			//oldFile.initWithPath(dir);
			//oldFile.remove(false);
		//}
		//catch(e){}
		var keyHtml = "<!DOCTYPE html PUBLIC '-//W3C//DTD HTML 4.01 Transitional//EN'><html><head><title></title></head><body>" + NodesAsList + "</body></html>";
		var path = writeToFile(keyHtml);
		my_window = window.open ("file://"+path, "Page Elements, Classes, and ID's","status=1,width=350,height=200,scrollbars=1"); 
    }
    catch (exception)
    {
		alert('Exception '+exception);
    }
    
}



function writeToFile(data)
{
  var file = Components.classes["@mozilla.org/file/directory_service;1"].
                     getService(Components.interfaces.nsIProperties).
                     get("ProfD", Components.interfaces.nsIFile);
  var foStream = Components.classes["@mozilla.org/network/file-output-stream;1"]
                         .createInstance(Components.interfaces.nsIFileOutputStream);
	alert(file);
	file.append("sitePreview.html");

  alert(file.path);
  //file.initWithPath("C:\\Users\\wilsoan4\\appdata\\Roaming\\Mozilla\\Firefox\\Profiles\\3tilxr35.default\\extensions\\css_stealer@group.net\\chrome\\content\\sitePreview.html");
  if(file.exists())
  {
	file.remove(false);
  }
  if ( file.exists() == false ) {
    file.create(file.NORMAL_FILE_TYPE, 0666);  
  }

  foStream.init(file, 0x02 | 0x10| 0x20, 0666, 0);
  foStream.write(data, data.length);
  foStream.close(); 
  return file.path;
}
