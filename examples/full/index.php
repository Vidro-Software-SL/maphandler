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

    <div class="form hide" id="loginContainer">
      <div class="error hide" id="errorContainer">Errr</div>
      User: <input type="text" name="user" id="user" value="">
      Password: <input type="password" name="pwd" id="pwd" value="">
      <button id="btLogin">Log in</button>
    </div>

    <div class="form" id="userData">
      <h1>Map data</h1>
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
       Override iframe url: <input type="text" name="overrideHost" id="overrideHost" size="25" value="">
      </div>
      
       <div>
        Active layer: <input type="text" name="active_layer" id="active_layer" size="25" value="">
      </div>


      <div>
        Debug
        <select id="debug">
          <option id="1"  value=1>True</option>
          <option id="0" selected value=0>False</option>
        </select>
      </div>
       <div>
       <button id="btLoadMap">Load Map</button> - 
       <button id="btLoadProjectLayers">Load Project layers</button>
      </div>
    </div>
  
    <div id="mapContainer" class="hide">
      <div id="Error_container"></div>
      <div id="sessionToken"></div>
      <div id="iframes-container">
        <iframe id="map-frame" name="map-frame" src="" style="width:100%; height:600px;" ></iframe>
      </div>
      <button id="btZoomIn">Zoom In</button>
      <button id="btZoomOut">Zoom Out</button>
      <button id="btZoomToExtent">Zoom to extent</button>  
      <button id="btAddPoint">Add point</button>
      <button id="btAddPolygon">Add polygon</button>
      <button id="btAddLine">Add line</button>
      <button id="btClear">Clear geometries</button>

      <button id="btWMSInfo">WMS Info</button>
      <button id="btGiswaterInfo">Giswater Info</button>
      <br>Layers: <br>
      Project Layers:  <select id="projectlayers"></select> - <small>click on "Load Project Layers" button</small>  <button id="btToggleLayer">Add / Remove Layer</button><br><br>
      Displayed Layers: <select id="layers"></select>
      <button id="btActiveLayer">Set Active Layer</button>
      <button id="btGetActiveLayer">Get Active Layer</button>
    </div>
    <hr />
    <pre id="Result_container"></pre>
   
    <!--<script src="https://unpkg.com/@vidro/map-handler@1.0.0/dist/map-handler.js"></script>-->
    <script src="../../dist/map-handler.js"></script>
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