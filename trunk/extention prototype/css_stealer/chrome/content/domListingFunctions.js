var XmlDoc;
var NodesAsList = "";

function parseNodes()
{
	var browser = gBrowser.mCurrentBrowser;	
	alert('parse Nodes '+browser);
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
    alert('create window');
    try
    {
		alert("1 ");
		my_window = window.open ("", "mywindow1","status=1,width=350,height=150"); 
		alert("2 "+my_window.document);
		//my_window.document.write('<H1>Popup Test!</H1>');  		
		my_window.document.write("<h1>Out with the old - in with the new!</h1>");
		//my_window.close();
		alert("3");
        //win = window.open("", "PopUp", "menubar=no,width=430,height=360,toolbar=no");
		
		//var win = window.openDialog("chrome://css_stealer/content/window.html", 
        //             "window_structure", "chrome,centerscreen",
		//			  {html: NodesAsList}); 
		//alert('win '+win);
		//win.document.bgcolor = "red";
		//alert('bg color '+win.document.bgcolor);
        //win.document.write('text');
		//popUp.document.writeln(NodesAsList);
    }
    catch (exception)
    {
        //document.getElementById("divXml").innerHTML = NodesAsList;
		alert('Exception '+exception);
    }
    
}
