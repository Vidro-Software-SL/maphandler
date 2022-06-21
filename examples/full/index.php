<html>
  <head>
    <title>🛠️ MAP TESTER</title>
    <link rel="stylesheet" href="../tester.css"></link>
    <link rel="icon" type="image/png" href="https://www.vidrosoftware.com/favicon/favicon-32x32.png" sizes="32x32" />
    <link rel="icon" type="image/png" href="https://www.vidrosoftware.com/favicon/favicon-16x16.png" sizes="16x16" />
  </head>
  <body onload="checkToken()">
    <div class="form">
      <div>
        Api URL <input type="text" name="apiurl" id="apiurl" value="http://localhost" size="30"> 
      </div>
      <div>
        User token: <input type="text" name="usertoken" id="usertoken" disabled size="40" value="<?php echo getUserToken(); ?>"> - <button id="btLoginAgain">Login again</button>
      </div>
    </div>
    <div class="error hide" id="errorContainer">Errr</div>
    <div class="form hide" id="loginContainer"> 
      User: <input type="text" name="user" id="user" value="">
      Password: <input type="password" name="pwd" id="pwd" value="">
      <button id="btLogin">Log in</button>
    </div>

    <div class="form" id="userData">
      <h1>Map Properties</h1>
      <div>
        Project ID 
        <select id="selectProject">
          <?php 
          $cachedProjects = getCachedProjects(); 
          if(count($cachedProjects)>0){
            foreach ($cachedProjects as $pr) {
              ?>
              <option id="<?php echo $pr; ?>"><?php echo $pr; ?></option>
              <?php
            }
            ?>
            <?php
          }
          ?>
        </select>
      </div>
      <div>
        Zoom: <input type="text" name="zoom" id="zoom" size="5" value=""> <small>Override default zoom level</small>
      </div> 
      <div>
        Custom logo: <input type="text" name="logo" id="logo" size="25" value=""> <small>Customize logo</small>
      </div> 
      <div>
        Show Layers: <input type="text" name="show_layers" id="show_layers" size="25" value="" placeholder="Arc,LOT"> <small>Show layers on map load</small>
      </div>
      <div>
        Active layer: <input type="text" name="active_layer" id="active_layer" size="25" value=""> <small>Set a layer as active layer on map load</small>
      </div>
      <div>
        Use Giswater tiled:  <input type="checkbox" name="use_giswater_tiled" id="use_giswater_tiled" size="5"   value=""> <small>If tiled background available, load it with map render</small>
      </div>
      <div>
       Override Capabitilites extent: <input type="text" name="extent" id="extent" size="55" value="" placeholder="397663,4615771,406392,4623596"> <small>Override project extent</small>
      </div>
      <div>
       Override Capabitilites SRID: <input type="text" name="srid" id="srid" size="10" value="" placeholder="EPSG:2831"> <small>Override project srid</small>
      </div>
      <hr>
      <h5>Development parameters</h5>
      <div>
       Override iframe url: <input type="text" name="overrideHost" id="overrideHost" size="35" value="http://localhost:3000" placeholder="http://localhost:3000"> <small>Override map component url</small>
      </div>
      <div>
        Debug
        <button id="btDebug">Debug</button>  
        <select id="debug">
          <option id="1" selected value=1>Show logs</option>
          <option id="0" value=0>Hide logs</option>
        </select> <small>Show/hide component logs</small>
      </div>
      <hr>
      <div>
       <button id="btLoadMap">Load Map</button> - 
       <button id="btLoadProjectLayers">Load Project layers</button>
      </div>
    </div>
  
    <div id="mapContainer" class="hide">
      <div id="Error_container"></div>
      <div id="sessionToken"></div>
      <div id="iframes-container">
        <iframe id="map-frame" name="map-frame" src="" style="width:100%; height:600px;" allow="geolocation"></iframe>
      </div>
      <hr />
      <pre id="Result_container"></pre>
      <hr/>
       <h2>Layers</h2>

      Project Layers:  <select id="projectlayers"></select> - <small>click on "Load Project Layers button</small>  <button id="btToggleLayer">Add / Remove Layer</button><br><br>
      Displayed Layers: <select id="layers"></select> - 
      <button id="btActiveLayer">Set Active Layer</button>
      <button id="btGetActiveLayer">Get Active Layer</button>
      <span id="currentActiveLayer"></span>
      <button id="btReloadDisplayedLayers">Reload displayed layers</button>
      <br><br>
      Get TOC:  <button id="btGetToc">Get TOC</button>
      <br><br>
       Override layer properties (gutter, single/multi tile, transparent)
<input type="checkbox" name="overrideLayerProperties" id="overrideLayerProperties" value="">
  <div id="containerOverride" style="display: none;">____________________________________________________<br><br>
        Gutter: <input type="text" name="gutter" id="gutter" size="5" value="">
        <br><br>
          Transparent layer: 
    <input type="checkbox" name="toggleTransparentLayer" id="toggleTransparentLayer" checked value=""><br><br>
          SingleTile layer: 
    <input type="checkbox" name="toggleSingleTile" id="toggleSingleTile" checked value=""><br>
   <br>
    ____________________________________________________
    </div>

      <h4>Tiled layer</h4>
      <button id="btToggleGiswaterTiled" disabled="true">Show/hide tiled Giswater tiled background</button>
      <input type="checkbox" name="toggleGiswaterTiledCheck" id="toggleGiswaterTiledCheck" size="5" value=""><br><br>
      <small>only for giswater projects with tiled enabled</small>
    </div>
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
      <button id="btGiswaterInfo">Giswater Info</button>
     
    <h2>Geolocation</h2>
    <button id="btGeolocalize">Geolocalize User</button>
    <button id="btStopGeolocalize">Cancel Geolocalize</button>

    <h2>Highlight</h2>
    <button id="btHighlight">Highlight geom</button>
     Geom: <input type="text" name="geom" id="geom" size="25" value="">
     <br>
     Highlight to zoom level: <input type="text" name="zoomLevel" id="zoomLevel" size="5" value=""> or Zoom to geometry: <input type="checkbox" name="zoomToHighlightCheck" id="zoomToHighlightCheck" size="5" value=""> 
    <h2>Giswater Filters</h2>
    <button id="btsetGiswaterFilters">Set giswater filters</button> - <button id="btgetGiswaterFilters">Get giswater layer available filters</button><br><br>
    <textarea name="giswaterFilters" id="giswaterFilters" rows="10" cols="20">{"expl_id":[1,2,3]}</textarea> 
    <h2>GeoJSON</h2>
      <input type="file" id="geojsonfile" name="geojsonfile" accept="application/json"><small> Select geoJSON file</small><br><br>
      <small>Load a geojson from a Giswater layer<b><span id="currentActiveLayerForGeoJSON"></span></b></span></small> <button id="btAddGeoJSONFromGiswater" disabled>Add GeoJSON from Giswater Layer </button> 
      <input type="hidden" name="geojsondata" id="geojsondata"/>
      <br><br>
      <b>Options</b><br><br>
       Stroke color: <input type="text" name="strokecolor" id="strokecolor" size="10" value="#994d4d" placeholder="#000000"> <small>Override stroke color, desfault #ff0000</small><br>
       Fill color: <input type="text" name="fillcolor" id="fillcolor" size="10" value="#4d995c" placeholder="#000000"> <small>Override fill color, desfault #ff0000</small><br><br>
        <button id="btAddGeoJSON">Add GeoJSON Layer</button> <button id="btClearGeoJSON">Clear GeoJSON Layers</button><br><br>
      <input type="text" name="hitTolerance" id="hitTolerance" size="5" value="" placeholder="5"> <small>Override hit tolerance</small><br><br>

      Selected GeoJSON Layer: <select id="geojsonlayers"></select> -   <button id="btGeoJSONInfo" disabled="true">GeoJSON Info</button> <button id="btRemoveGeoJSONLayer" disabled="true">Remove GeoJSON Layer</button><br><br>
 
     
    <script src="https://unpkg.com/@vidro/map-handler@1.0.12/dist/map-handler.js"></script>
    <script src="./tester.js"></script>
    <script src="./apidemo.js"></script>
  </body>
</html>
<?php
function getCachedProjects(){

  $cacheFileName = "cachedTokenData.dat";
  if(file_exists($cacheFileName) && time() - filemtime($cacheFileName) < 86400){ // 24 hours
    $chachedProjects = file_get_contents($cacheFileName);
  }
  return explode(",",$chachedProjects);
}


function getUserToken(){

  $cacheFileName = "cachedToken.dat";
  if(file_exists($cacheFileName) && time() - filemtime($cacheFileName) < 86400){ // 24 hours
    $userToken = file_get_contents($cacheFileName);
  }
  return $userToken;
}
?>