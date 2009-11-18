var XmlDoc;
var NodesAsList = "";


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
        popUp = window.open("", "PopUp", "menubar=no,width=430,height=360,toolbar=no");
        popUp.document.writeln(NodesAsList);
    }
    catch (exception)
    {
        document.getElementById("divXml").innerHTML = NodesAsList;
    }
    
}
