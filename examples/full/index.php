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
        Zoom: <input type="text" name="zoom" id="zoom" size="5" value="">
      </div>
      <div>
        Custom logo: <input type="text" name="logo" id="logo" size="25" value="">
      </div>
      <div>
        Show Layers: <input type="text" name="show_layers" id="show_layers" size="25" value="">
      </div>
      <div>
        Active layer: <input type="text" name="active_layer" id="active_layer" size="25" value="">
      </div>

      <div>
       Override Capabitilites extent: <input type="text" name="extent" id="extent" size="55" value="" placeholder="397663,4615771,406392,4623596">
      </div>
      <div>
       Override Capabitilites SRID: <input type="text" name="srid" id="srid" size="10" value="" placeholder="EPSG:2831">
      </div>
      <hr>
      <h5>Development parameters</h5>
      <div>
       Override iframe url: <input type="text" name="overrideHost" id="overrideHost" size="35" value="">
      </div>
      <div>
       Override API url: <input type="text" name="overrideApi" id="overrideApi" size="55" value="">
      </div>
      <div>
        Debug
        <select id="debug">
          <option id="1"  value=1>True</option>
          <option id="0" selected value=0>False</option>
        </select>
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
      <h2>Zoom</h2>
      <button id="btZoomIn">Zoom In</button>
      <button id="btZoomOut">Zoom Out</button>
      <button id="btZoomToExtent">Zoom to extent</button>  
      <h2>Add geometry</h2>
      <button id="btAddPoint">Add point</button>
      <button id="btAddPolygon">Add polygon</button>
      <button id="btAddLine">Add line</button>
      <button id="btClear">Clear geometries</button>
      <h2>Info</h2>
      <button id="btWMSInfo">WMS Info</button>
      <button id="btGiswaterInfo">Giswater Info</button>
      <h2>Layers</h2>
      Project Layers:  <select id="projectlayers"></select> - <small>click on "Load Project Layers button</small>  <button id="btToggleLayer">Add / Remove Layer</button><br><br>
      Displayed Layers: <select id="layers"></select> - 
      <button id="btActiveLayer">Set Active Layer</button>
      <button id="btGetActiveLayer">Get Active Layer</button>
      <span id="currentActiveLayer"></span>
    </div>
    <h2>Geolocation</h2>
    <button id="btGeolocalize">Geolocalize User</button>
    <button id="btStopGeolocalize">Cancel Geolocalize</button>

    <h2>Highlight</h2>
    <button id="btHighlight">Highlight geom</button>
     Geom: <input type="text" name="geom" id="geom" size="25" value="">
     <br>
     Highlight to zoom level: <input type="text" name="zoomLevel" id="zoomLevel" size="5" value=""> or Zoom to geometry: <input type="checkbox" name="zoomToHighlightCheck" id="zoomToHighlightCheck" size="5" value=""> 
    <script src="https://unpkg.com/@vidro/map-handler@1.0.2/dist/map-handler.js"></script>
    <!--<script src="../../dist/map-handler.js"></script>-->
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