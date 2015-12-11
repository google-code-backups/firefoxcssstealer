# Usage #

## Before using the extension ##

After you have built the C++ XPCOM component and installed the CSS Stealer extension to your build of Mozilla Firefox, you can run the Firefox (or Minefield) and find the CSS Stealer in the Tools menu.

## Overview ##

CSS Stealer is a tool for web programmers and web designers which allows to see the structure of the current HTML document and to save the CSS styles used in the page.

## How to use the CSS Stealer ##

  1. Open the Tools menu and click on CSS Stealer.
http://firefoxcssstealer.googlecode.com/svn/trunk/images/screen1.PNG
  1. When you run the extension for the first time, you will see a message saying that you need to set up the path in the Preference window.
http://firefoxcssstealer.googlecode.com/svn/trunk/images/screen2.PNG
  1. You will see the main CSS Stealer window with the Preferences button on the bottom. Click that.
http://firefoxcssstealer.googlecode.com/svn/trunk/images/screen3.PNG
  1. In the Preferences window choose that path, where the CSS files will be stored. Then select if you want the CSS rules to be saved in one file or in separate files, one for each rule. The saved files will have the following names: Stolen.css or Stolen1.css, Stolen2.css, etc.
http://firefoxcssstealer.googlecode.com/svn/trunk/images/screen4.PNG
  1. In the other window you will see the HTML structure of the current document. It is useful to see which classes, ids or elements are used where.
http://firefoxcssstealer.googlecode.com/svn/trunk/images/screen5.PNG
  1. In the main CSS Stealer window you can check the styles you want to steal (you can also use Select/Deselect All buttons) and then click the 'Steal' button. The files will be saved in the folder, that you indicated in the preference.
http://firefoxcssstealer.googlecode.com/svn/trunk/images/screen6.PNG


When you use the CSS Stealer again, those files would be overwritten. So, make sure you copy the rules you need somewhere else!