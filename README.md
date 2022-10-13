# Map Handler

#### Version 1.0.12 - June 2022

Tool to achieve the easiest way of communication with the map iframe.

- [Installation](#Installation)
- [Events](#Events)
- [Methods](#Methods)

Some of the multiple use case flows are documented in [flows.md](flows.md)

## TL;DR

```
<html>
  <body>
    <iframe id="map-frame" name="map-frame" src=""></iframe>
    <button id="btZoomIn">Zoom In</button>
    <script src="https://unpkg.com/@vidro/map-handler@1.0.5/dist/map-handler.js"></script> -->
    <script>
      var loadMapReq = new XMLHttpRequest();
      loadMapReq.addEventListener("load", function(){
        communicator = new VidroMaps.Communicator({this.responseText.message.sessionToken});
        document.querySelector("#map-frame").src = `${this.responseText.message.iframe}?sessionToken=${this.responseText.message.sessionToken}`;

        document.querySelector("#btZoomIn").addEventListener("click", function(){
          communicator.ZoomIn();
        });

      }
      loadMapReq.open("GET", "http://APIURL/map/PROJECT_ID",true);
      loadMapReq.setRequestHeader('Content-type', 'application/json');
      loadMapReq.setRequestHeader('Authorization',`Bearer ${USER_TOKEN}`);
      loadMapReq.send();
    </script>
  </body>
</html>
```

## Installation

### 0. Pre-requisites

You should have one iframe already created on the DOM with the attributes `name="map-frame" id="map-frame"`. 

### 1. Include the library:

You can do this inyecting directly to window:

    <script src="path/to/lib.js"></script>
    <script src="path/to/your.js"></script>

Or if you're working with NPM / ES6:

    npm install --save @vidro/map-handler
    ...
    import { Communicator } from "@vidro/map-handler";

### 2. Instance the communicator with the sessionToken in options object:

If you are inyecting into window:

    var communicator = new VidroMaps.Communicator({
      sessionToken: sessionToken
    });

Or if you're working with NPM / ES6:

    const communicator = new Communicator({
        sessionToken: "sessionToken"
    });

### Logs

If you want to see `console.logs`, you can activate logs with `setDebug` method. Once map is loaded, invoke this method. Will create or remove a cookie. After calling `setDebug` reload the map.

Logs are deactivated by default.

`setDebug(debug)`

>E.G.

``` 
//activate
setDebug(1);

//deactivate
setDebug(0);
```

## Events

### How to listen

    communicator.on("onZoomChange", function(data){
      console.log("onZoomChange event",data);
    });
   

### Available events

##### onZoomChange

Notifies zoom level changed

##### geomAdded

Notifies geometry added to map, as string

> E.G.

```
POINT(418925 4577135)

POLYGON((418391.8715694032 4576832.484383419,418721.82301488414 4577299.667608328,418727.18131229794 4576947.724919814,418391.8715694032 4576832.484383419))

MULTILINESTRING((419268.8979576373 4577019.482027252,419146.6929889547 4577457.250226778,418798.40365705814 4577415.776056751))
```
##### loaded

Notifies when map or layers are loaded.

There're two types of events:

- `map` is dispatched when map (with background) is loaded.
- `layer` is dispatched when a layer is loaded

> `map` E.G:

```
{what:'map'}
```

> `layer` E.G:

```
{what:'layer'
name:'Arc'}
```

##### layers

Notifies an array of displayed layers

##### geoJSONlayers

Notifies an array of displayed GeoJSON layers

##### activeLayer

Notifies wich layer is marked as active

##### WMSInfoAvailable

Notifies when WMS is available for this map

##### availableWMSLayers

List of available layers from WMS server

##### getToc

Formatted Layers TOC (table of contents)

##### coordinates

Notifies clicked coordinates (x,y)

First coordinate is X value.

> E.G:

```
{coordinates: (2) [419463.63262834214, 4577166.970846243]
type: "coordinates"}
```

##### info

Notifies info results. There're 2 availables infos `wms` and `giswater`

> E.G `wms`:

```
{type: "info", infoType: "wms", data: "<GetFeatureInfoResponse>↵ <Layer name="Incidencia_…  </Feature>↵ </Layer>↵</GetFeatureInfoResponse>↵"}
```

> E.G `giswater`:

```
{type: "info", infoType: "giswater", data: {…}}
```

##### layerElements

Receives a list of elements from a `getElementsFromLayer request

```
{type: "layerElements", data: {xml or json}}
```

##### geolocation

Notifies user position, coordinates (x,y)

First coordinate is X value.

> E.G

```

{type: "geolocation", coordinates: Array(2)}
coordinates: (2) [419297.8249458591, 4576821.519666988]
```

##### Giswater tiled background

Giswater's tiled background has two events, one for notify if is available or not, and a another one for notify if is rendered or not

`giswaterTiledBackgroundAvailable` and `giswaterTiledBackgroundDisplayed`

```
{type: "giswaterTiledBackgroundAvailable", available: true/false}

{type: "giswaterTiledBackgroundDisplayed", visible: true/false}
```

##### Giswater layer Available filters

List of available filters for a Giswater layer

```
{type: "GiswaterLayerAvailableFilters", filters: array}

```

##### error

Notifies errors

> E.G.

```
{type: "error", error: "No clicked coordinates"}
```

## Methods

##### ZoomIn()

##### ZoomOut()

##### zoomToExtent()

##### zoomToCoordinates(coordinates,zoomLevel)

Zooms to given coordinates

> Params

- lat (x) `<integer>` 
- long (y) `<integer>`
- zoomLevel `<integer>` - zoom level 

> E.G.

```
zoomToCoordinates(419006.12985785044, 4576698.8136144625,18);

```

##### AddGeom(string)

Launches drawing tools with the geometry type

> Params

- geom `<string>` - geometry type `Point` | `Line` | `Polygon`

> E.G.

```
AddGeom('Point');

AddGeom('Line');

AddGeom('Polygon');
```

An `geomAdded` event will be received after calling the method.

##### clear()

Clears drawn geometries

##### toggleLayer

Shows/hides a layer

> Params

- layerName `<string>` - layer name
- properties `<object>` - _optional_ layer properties 
	- gutter `<integer>` - The size in pixels of the gutter around image tiles to ignore, only applies for multitile layer
	- singletile `<boolean>` - SingleTile Layer
	- transparent `<boolean>` - Transparent Layer

By default, layer properties will be:

`gutter: 0`

`singletile: false` - will render a multitile layer

`transparent: true` 

> E.G.

With no properties

```
toggleLayer('somelayer_name');
```

With properties

```
toggleLayer('somelayer_name', {gutter: 10, transparent: false, singletile: false);
```

##### setActiveLayer()

Sets a layer as acticve layer, used for infos

> E.G.

```
setActiveLayer('somelayer_name');
```

##### reloadDisplayedLayers

Reloads displayed layers

> E.G.

```
reloadDisplayedLayers();
```

##### loadWMSAvailableLayers

Gets a list of available layers from WMS server

> E.G.

```
loadWMSAvailableLayers();
```

An `availableWMSLayers ` event will be received after calling the method.

##### getToc

Gets a formatted Layers TOC (Table of contents)

> E.G.

```
getToc();
```

An `getToc ` event will be received after calling the method.

##### getElementsFromLayer

Gets a list of elements from a layer, based on a WMS request

```
getElementsFromLayer(layer,limit,format) 
```

> Params

- layer `<string>` - layer name
- limit `<integer>` - limit output number of elements (default 100)
- format `<string>` - output format
	- `xml` - default
  	- `json` 


##### infoFromCoordinates

There're two available info from coordinates `wms` or `giswater`.

**Important** a `click on the map` must be done before calling this method.
If you don't specify a layer, will use the layer setted as `Active layer`

> Params

- type `<string>` - info type

  - `wms` - wms info

  - `giswater` - giswater info

- layer `<string>` _optional_ layer name to do info. If null, will use current active layer.
- hitTolerance `<integer>` _optional_ for geoJSON Info, pixels inside the radius around the given will be checked for features. Default `5`.
- format `<string>` _optional_ - output format for WMS requests
	- `xml` - default
  	- `json` 

> E.G.

```
infoFromCoordinates('wms'); //will use active layer

infoFromCoordinates('giswater');
infoFromCoordinates('giswater','Arc');
infoFromCoordinates('wms','Arc',null,'json'); //will use active layer and json output
```

An `info` event will be received after calling the method.

##### Geolocalize

Geolocalizes user. Will dispatch `geolocation` event .

> Params

- toggle `<Boolean>` - starts or cancels geolocation

> E.G.

```
//start
Geolocalize(true)

//cancel
Geolocalize(false)
```

**Important** Add ` allow="geolocation"` to html iframe tag.

##### Higlight

Highlights a geometry

Params

- options `<object>` highlight options

  - geom `<string>` - geometry string

  - zoom `<object>`

    - zoom.type `<string>` - `level | element`

      _level_ will zoom to zoomLevel

      _element_ geometry center

    - zoom.zoomLevel `<integer>` 1 to 28

> E.G.

```
//Highlight a line and zoom to level 6

let options = {
	'geom': 'MULTILINESTRING((418596.62555076234 4577083.383681167,419026.2319996517 4577216.795306675))',
	'zoom':{
		'type':'level',
		'zoomLevel':6
	}
}

Highlight(options);

//Highlight a line to geometry center

let options = {
	'geom': 'MULTILINESTRING((418596.62555076234 4577083.383681167,419026.2319996517 4577216.795306675))',
	'zoom':{
		'type':'element'
	}
}

Highlight(options);
```

##### toggleGiswaterTiled

Only for Giswater's maps. Toggles tiled background (in case tiled background is configured)

Params

- toggle `<boolean>` shows/hides tiled background

> E.G.

```
toggleGiswaterTiled(true);

```

##### addGeoJSON

Adds geoJSON layer

Params

- geoJSON `<geoJSON>` geoJSON data

- options `<json>` layer options

  - fillcolor `<string>` fill color. If null will use red color (#ff0000)
  - strokecolor `<string>` strokecolor color. If null will use red color (#ff0000)

- name `<string>` geoJson layer name, if null will use a random string

> E.G.

```
addGeoJSON(geoJSON,options, name);


addGeoJSON('GeoJSONContent',{},null);

const options = {
	fillcolor:'#e3ff00',
	strokecolor: '#e3ff00'
}

addGeoJSON('GeoJSONContent', options,'name');

```

##### removeGeoJSONLayer

Removes a GeoJSON Layer

```
removeGeoJSONLayer(layerName);

removeGeoJSONLayer('somename');
```

##### clearGeoJSON

Clears geoJSON layers

> E.G.

```
clearGeoJSON();
```

##### setGiswaterFilters

Set Giswater's filters for displayed layers

Filters must be a JSON with valid fields. Available layer filters can be obtained with method `getGiswaterLayerAvailableFilters`

```
setGiswaterFilters(JSON);
```

> E.G.

```
setGiswaterFilters({"expl_id":[1,2,3]});
```

##### getGiswaterLayerAvailableFilters

Get available WMTS filters for a Giswater layer

```
getGiswaterLayerAvailableFilters(layername);
```

> E.G.

```
getGiswaterLayerAvailableFilters("Arc");
```

##### setCustomColors

Sets colors and stroke width for added & highlight geometries.

Properties:

- `geom_stroke_color` - stroke color in RGB format
- `geom_fill_color` - fill color in RGB format
- `geom_stroke_width` - stroke width in pixels, default 1.
- `geom_shape` - shape por point, `circle`(default) or `square`
- `geom_radius` - point radius or square side in pixels. Default 4.

```
setCustomColors({geom_stroke_color, geom_fill_color, geom_stroke_width,geom_shape});
```

> E.G.

```
setCustomColors({
		geom_stroke_color: 'rgb(19, 39, 99,0.5)',
		geom_fill_color: 'rgb(19, 39, 99,0.5)',
    	geom_stroke_width: 1,
    	geom_shape: 'circle',
    	geom_radius: 2
    	});
```

On Bmaps projects, default values are taken from Backoffice:

```
geom_stroke_color -> Bmaps: geom_select_stroke_color
geom_fill_color -> Bmaps: geom_select_fill_color
```



### Multiple iframes

Is possible to use multiple iframe on a single page, follow this steps.

- Set to your `iframe` tags the id & value 
- Add to each `iframe.src` `&domId=IFRAME_ID`
- Instantiate each iframe:

```
var communicator = new VidroMaps.Communicator({
      sessionToken: sessionToken,
      id:'IFRAME_ID'
});
```

## Examples

### Simple

`examples/simple/`

A simple integration with just zoom buttons

##### How it works

1. Gets user, password and API url from the url
2. Request a user token to the API
3. Loads the first map of the user

[https://www.vidrosoftware.com/examples/simple/?user=USER&pwd=USER_PASWORD&api=API_URL]()

### Full

`examples/full/`

Full integration

##### How it works

1. User, password and API url are defined on the html form
2. Stores token and last map loaded in a fake cache
3. There's a form for choosing map and customize map parameters

[https://www.vidrosoftware.com/examples/full/]()

### Vidromaps

`examples/vidromaps/`

Vidromaps integration

##### How it works

1. Paste iframe code

[https://www.vidrosoftware.com/examples/vidromaps/]()

### Serverless

`examples/serveLess/`

Server less sample integration

##### How it works

1. Gets user, password and API url from the url
2. Request a user token to the API
3. Loads the first map of the user with one layer rendered
4. On map click, performs an wms info, displays one attribute, highlights the clicked point and centers map on that point

### Mutiple iframes

`examples/multipleiframes/`

Multiple iframes integration

##### How it works

1. Replace `YOUR_SESSION_TOKEN` with your session token code on both inputs `code1` and `code2`.

[https://www.vidrosoftware.com/examples/multipleiframes/]()

### Known issues

- **Custom logo is not displayed**

Could be CORS issue. Check the headers sent by your server. 

With Apache can be solved with and `.htaccess` file with this content:

```
Header set Access-Control-Allow-Origin "*"
Header add Cross-Origin-Resource-Policy: "cross-origin"
Header add Cross-Origin-Embedder-Policy: "require-corp"
```

- **QGIS Broken symbology**

QGIS multi tile layers could show broken symbology:

![](doc/multiTileNoGutter.png)

This can be solved using `singletile: true` or adding `gutter: value in pixels` if is a multitiule layer, on toggleLayer method.

Is if is a Giswwater project, you can set this options (`Render mode` and `Gutter`) on Bmaps backoffice.

![](doc/multiTile.png)
