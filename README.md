# Map Handler

#### Version 1.0.5 - July 2021

Tool to achieve the easiest way of communication with the map iframe.

- [Installation](#Installation)
- [Events](#Events)
- [Methods](#Methods)

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

You should have one iframe already created on the DOM with the attributes `name="map-frame"`.

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

##### layers

Notifies an array of displayed layers

##### geoJSONlayers

Notifies an array of displayed GeoJSON layers

##### activeLayer

Notifies wich layer is marked as active

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
{type: "info", infoType: "wms", data: "<GetFeatureInfoResponse>??? <Layer name="Incidencia_???  </Feature>??? </Layer>???</GetFeatureInfoResponse>???"}
```

> E.G `giswater`:

```
{type: "info", infoType: "giswater", data: {???}}
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

> E.G.

```
toggleLayer('somelayer_name');
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

> E.G.

```
infoFromCoordinates('wms'); //will use active layer

infoFromCoordinates('giswater');
infoFromCoordinates('giswater','Arc');
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
	'type':'level',
	'zoomLevel':6
}

Highlight(options);

//Highlight a line to geometry center

let options = {
	'geom': 'MULTILINESTRING((418596.62555076234 4577083.383681167,419026.2319996517 4577216.795306675))',
	'type':'element'
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

## Examples

### Simple

`examples/simple/`

A simple integration with just zoom buttons

##### How it works

1. Gets user, password and API url from the url
2. Request a user token to the API
3. Loads the first map of the user

[http://www.vidrosoftware.com/examples/simple/?user=USER&pwd=USER_PASWORD&api=API_URL]()

### Full

`examples/full/`

Full integration

##### How it works

1. User, password and API url are defined on the html form
2. Stores token and last map loaded in a fake cache
3. There's a form for choosing map and customize map parameters

[http://www.vidrosoftware.com/examples/full/]()

### Serverless

`examples/serveLess/`

Server less sample integration

##### How it works

1. Gets user, password and API url from the url
2. Request a user token to the API
3. Loads the first map of the user with one layer rendered
4. On map click, performs an wms info, displays one attribute, highlights the clicked point and centers map on that point