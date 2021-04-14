# Map Handler

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
    <script src="https://unpkg.com/@vidro/map-handler@1.0.0/dist/map-handler.js"></script> -->
    <script>
      var loadMapReq = new XMLHttpRequest();
      loadMapReq.addEventListener("load", function(){
        communicator = new VidroMaps.Communicator({this.responseText.message.sessionToken});
        document.querySelector("#map-frame").src = `${this.responseText.message.iframe}?sessionToken=${this.responseText.message.sessionToken}`;
        
        document.querySelector("#btZoomIn").addEventListener("click", function(){
          communicator.ZoomIn();
        });
     
      }
      loadMapReq.open("GET", "http://APIURL/map/PROJECT_ID?token=USER_TOKEN",true);
      loadMapReq.setRequestHeader('Content-type', 'application/json');
      loadMapReq.send(JSON.stringify({ 'token': 'USER_TOKEN' }));
    </script>
  </body>
</html>
```

## Installation

### 0. Pre-requisites

You should have one iframes already created on the DOM with the attributes `name="map-frame"`.

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

    const communicator = new VidroMaps({
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

>E.G.

```
POINT(418925 4577135)

POLYGON((418391.8715694032 4576832.484383419,418721.82301488414 4577299.667608328,418727.18131229794 4576947.724919814,418391.8715694032 4576832.484383419))

MULTILINESTRING((419268.8979576373 4577019.482027252,419146.6929889547 4577457.250226778,418798.40365705814 4577415.776056751))
```

##### layers

Notifies an array of displayed layers

##### activeLayer

Notifies wich layer is marked as active


##### coordinates

Notifies clicked coordinates (x,y)

First coordinate is X value.

>E.G:

```
{coordinates: (2) [419463.63262834214, 4577166.970846243]
type: "coordinates"}
```

##### info

Notifies info results. There're 2 availables infos `wms` and `giswater`

>E.G `wms`:

```
{type: "info", infoType: "wms", data: "<GetFeatureInfoResponse>↵ <Layer name="Incidencia_…  </Feature>↵ </Layer>↵</GetFeatureInfoResponse>↵"}
```

>E.G `giswater`:

```
{type: "info", infoType: "giswater", data: {…}}
```

##### error

Notifies errors

>E.G.

```
{type: "error", error: "No clicked coordinates"}
```

## Methods

##### ZoomIn()
  
##### ZoomOut()
  
##### zoomToExtent()
  
##### AddGeom(string) - `Point` | `Line` | `Polygon`
  
Launches drawing tools with the geometry type

>E.G.

```
AddGeom('Point');

AddGeom('Line');

AddGeom('Polygon');
```
An `geomAdded` event will be received after calling the method.

#####clear()
  
Clears drawn geometries
 
##### toggleLayer(string) - Layer name
  
Shows/hides a layer

>E.G.

```
toggleLayer('somelayer_name');
```
  
#####setActiveLayer()

Sets a layer as acticve layer, used for infos

>E.G.

```
setActiveLayer('somelayer_name');
```

#####infoFromCoordinates

There're two available info from coordinates `wms` or `giswater`.

**Important** a `click on the map` must be done before calling this method.
If you don't specify a layer, will use the layer setted as  `Active layer` 


>E.G.

```
infoFromCoordinates('wms'); //will use active layer

infoFromCoordinates('giswater');
infoFromCoordinates('giswater','Arc');
```

An `info` event will be received after calling the method.
  
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
