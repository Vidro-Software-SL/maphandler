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

    var communicator = new PWPlayer.Communicator({
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

- onZoomChange

- geomAdded

- layers



## Methods

  > ZoomIn()
  
  > ZoomOut()
  
  > zoomToExtent()
  
  > AddGeom(string) - `Point` | `Line` | `Polygon` 
  
  Launch drawing tools
  
  > toggleLayer(string) - Layer name
  
  Shows/hides a layer
  
  > clear()
  
  Clears drawn geometries
  
## Examples

### Simple 

`examples/simple/` 

A simple integration with just zoom buttons

##### How it works

1. Gets user, password and API url from the url
2. Request a user token to the API
3. Loads the first map of the user

[http://www.vidrosoftware.com/examples/simple/?user=USER&pwd=USER_PASWORD&api=API_URL
](http://www.vidrosoftware.com/examples/simple/?user=test@bgeo.es&pwd=test.12345&api=http://bmaps.bgeo.es/api/)

### Full 

`examples/full/` 

Full integration

##### How it works

1. User, password and API url are defined on the html form
2. Stores token and last map loaded in a fake cache
3. There's a form for choosing map and customize map parameters

[http://www.vidrosoftware.com/examples/full/]()
