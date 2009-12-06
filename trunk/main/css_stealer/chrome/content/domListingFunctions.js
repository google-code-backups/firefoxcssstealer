var XmlDoc;
var NodesAsList = "";
// This funtion prepares and creates the preview window and 
function parseNodes()
{
	var browser = gBrowser.mCurrentBrowser;	
	displayNodes(browser.contentDocument);
	createWindow();
}

//Walks the dom tree and displays elements in red, Text in blue, ID in green, and Class Name in purple
//This is a recursive function
function displayNodes(DOC)

{
    NodesAsList += "<ol>";
    
    // Loop through all of the children of the current node
    for (var i = 0; i < DOC.childNodes.length; i++)
    {
        var Node = DOC.childNodes[i];                
        
        // If the node is valid then write its data
        if (Node)
        {
          var Class = (Node.nodeType == 3) ? "TextNode" : "NonTextNode";

          NodesAsList += "<li class=" + Class + ">";
          NodesAsList += "<font color='red'>Element: " + Node.nodeName +
                        //"</font><font color='blue'>  Text: " + Node.innerText +
                        "</font><font color='Green'>  ID: " + Node.id + 
                        "</font><font color='purple'>  Class: " + Node.className + "</font>";
                        
          // If the node has any children then process each of them
          if (Node.hasChildNodes())
          {
              displayNodes(Node);
          }
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
      // get the content of the browser window
      var a = gBrowser.mCurrentBrowser;
      var doc = a.contentDocument;
      
      // write the preview window data and open the window
      var keyHtml = "<!DOCTYPE html PUBLIC '-//W3C//DTD HTML 4.01 Transitional//EN'><html><head><title></title></head><body>" + NodesAsList + "</body></html>";
      var path = writeToFile(keyHtml);
      window.open ("file://"+path, "Page Elements, Classes, and ID's","status=1,width=350,height=200,scrollbars=1"); 
    }
    catch (exception)
    {
      alert('Exception '+exception);
    }
}

// This function write the preview window file
function writeToFile(data)
{
  // create the file
  var file = Components.classes["@mozilla.org/file/directory_service;1"].
                     getService(Components.interfaces.nsIProperties).
                     get("ProfD", Components.interfaces.nsIFile);
 	file.append("sitePreview.html");
  
  // create the file stream
  var foStream = Components.classes["@mozilla.org/network/file-output-stream;1"]
                         .createInstance(Components.interfaces.nsIFileOutputStream);

  // if the file exists remove it
  if(file.exists())
  {
    file.remove(false);
  }
  
  // create a new file
  if ( file.exists() == false ) {
    file.create(file.NORMAL_FILE_TYPE, 0666);  
  }

  // initialize the file stream and write the file and close it
  foStream.init(file, 0x02 | 0x10| 0x20, 0666, 0);
  foStream.write(data, data.length);
  foStream.close(); 
  
  // return the file path
  return file.path;
}
