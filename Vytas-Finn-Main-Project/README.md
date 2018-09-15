Contents
==========

<br> &nbsp;1.PHP
<br> &nbsp;2.Require.js
<br> &nbsp;3.Browserify
<br> &nbsp;4.Foundation (Frame work)
<br> &nbsp;5.NPM (module manager)
<br> &nbsp;6.Js.Node
<br> &nbsp;7.GDAL
<br> &nbsp;8.org2org
<br> &nbsp;9.TopoJson
<br> &nbsp;10.FWTools (command line)
<br> &nbsp;11.GitBash (command line)
<br> &nbsp;12.HTML
<br> &nbsp;13.CSS
<br> &nbsp;14.JavaScript (D3)
<br> &nbsp;15.JSON, TopoJson, GEOJson
<br> &nbsp;16.Conclusion


PHP
======
Php database consists of 3 scripts connect, stockDownloader and analysis_a.
Connect script simply connects to database named rainbow_candy, stockDownloader goes on yahoo Finance website and downloads stock information on specified companies , which are in tickerMaster and places them in txtFiles folder. Than information is parsed so it can be stored in database once it’s stored some analysis is performed.


Problems connecting to to Php database using JavaScript posed quiet an issue there were few solution how to solve this problem;


Require.js
=======
http://requirejs.org/

Require.js use the key word require to require modules to the browser you simply go to website download require.js class and placed in your js folder but the problem posed with this was that require.js class is 38 thousands lines of code and error is thrown in there it fails to download sql module so sql commands are not recognized.

Browserify
=======
http://browserify.org/

Browserify bundles up modules together in to one bundle so instead acquiring modules like jQuery, d3, foundation, including sql etc. You simply install Browserify using npm throw gitBash (which proved to be best command line tool).But this posed same problem error would be thrown in bundle which contains 30k+ lines of code

Foundation (Frame work)
=======
http://foundation.zurb.com/

Npm (module manager)
=======

GDAL
=======
http://www.gdal.org/

GDAL was needed to implement org2org to run TopoJson to make JSON files from shape files and merge Json files so the include county name etc.
Command to install
Brew install gdal 
(Brew is installation for Mac Json file creation was done on Mac)

org2org 
=======

Node.js
========
https://nodejs.org/

Used to build server and router, so the website could be ruined on port, eliminates using Wamp localhost service.

TopoJson
=======
Npm install –g topojson  command to install topojson 
org2org
http://www.gdal.org/ogr2ogr.html
Part of GDAL used to merge files

FWTools
=======

GitBash
=======
https://openhatch.org/

Command line tool used to implement all commands like installing sql module (npm install sql)

HTML
=======

CSS
=======

JavaScript (D3)
=======


JSON, TopoJson, GeoJson, ShapeFile (.shp)
=======
Used to draw maps and represent information, GeoJson is used for representing country’s and geographical structures its stores information a bit more efficient than JSON format. To represent all other data we used data from this website.
http://www.cso.ie/webserviceclient/
All data is in JSON format on following website so some parsing was done that data was represented using D3 visualization.

Conclusion
=======
