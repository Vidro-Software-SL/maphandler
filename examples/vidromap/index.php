<html>
  <head>
    <title>🛠️ MAP TESTER - Vidro Map</title>
    <link rel="stylesheet" href="../tester.css"></link>
    <link rel="icon" type="image/png" href="https://www.vidrosoftware.com/favicon/favicon-32x32.png" sizes="32x32" />
    <link rel="icon" type="image/png" href="https://www.vidrosoftware.com/favicon/favicon-16x16.png" sizes="16x16" />
  </head>
  <body>



    <div class="form" id="userData">
      <h1>Vidromap</h1>

      <div id="sessionToken"></div>
      <div>
        Paste your code here:<br> <textarea name="code" id="code" rows="10" cols="100" placeholder=""></textarea> 
      </div>
        <div>
        Debug
        <button id="btDebug">Debug</button>  
        <select id="debug">
          <option id="1" selected value=1>Show logs</option>
          <option id="0" value=0>Hide logs</option>
        </select> <small>Show/hide component logs</small>
      </div>
    </div>
    <div>
       <button id="btLoadIframe">Load Map</button> - 
       <button id="btLoadWMSLayers">Load layers from wms</button>
      </div>
    <div id="Error_container"></div>
    <div id="mapContainer">

      <div id="iframes-container">
      
      </div>
      <hr />
      <pre id="Result_container"></pre>
      <hr/>
      <h2>Zoom</h2>
      <button id="btZoomIn">Zoom In</button>
      <button id="btZoomOut">Zoom Out</button>
      <button id="btZoomToExtent">Zoom to extent</button>  
      <br><br>
      <button id="btZoomToCoordinates">Zoom to coordinates</button>  
      ZoomToCoordinates level: <input type="text" name="zoomLevelToCoordinates" id="zoomLevelToCoordinates" size="5" value="4">
      <h2>Add geometry</h2>
      <button id="btAddPoint">Add point</button>
      <button id="btAddPolygon">Add polygon</button>
      <button id="btAddLine">Add line</button>
      <button id="btClear">Clear geometries</button>
      <h2>Info</h2>
      <button id="btWMSInfo" disabled="true">WMS Info</button>
      <h2>Layers</h2>
      Project Layers:  <select id="projectlayers"></select> - <small>click on "Load Project Layers button</small>  <button id="btToggleLayer">Add / Remove Layer</button><br><br>
      Displayed Layers: <select id="layers"></select> - 
      <button id="btActiveLayer">Set Active Layer</button>
      <button id="btGetActiveLayer">Get Active Layer</button>
      <span id="currentActiveLayer"></span>

    <h2>Geolocation</h2>
    <button id="btGeolocalize">Geolocalize User</button>
    <button id="btStopGeolocalize">Cancel Geolocalize</button>

    <h2>Highlight</h2>
    <button id="btHighlight">Highlight geom</button>
     Geom: <input type="text" name="geom" id="geom" size="25" value="">
     <br>
     Highlight to zoom level: <input type="text" name="zoomLevel" id="zoomLevel" size="5" value=""> or Zoom to geometry: <input type="checkbox" name="zoomToHighlightCheck" id="zoomToHighlightCheck" size="5" value=""> 
      <h2>GeoJSON</h2>
      
      <input type="file" id="geojsonfile" name="geojsonfile" accept="application/json"><small> Select geoJSON file</small><br><br>
      <small>Or paste geoJSON content</small><br><br>
      <textarea name="geojsondata" id="geojsondata" rows="10" cols="80" placeholder=""></textarea> <br><br>
   <button id="btAddGeoJSON">Add GeoJSON </button><br><br>
    </div>
    
    <script src="https://unpkg.com/@vidro/map-handler@1.0.7/dist/map-handler.js"></script>
    <script src="../full/tester.js"></script>
    <script src="./index.js"></script>
  </body>
</html>
