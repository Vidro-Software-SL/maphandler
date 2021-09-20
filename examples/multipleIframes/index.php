<html>
  <head>
    <title>🛠️ MAP TESTER - Multiple Iframes</title>
    <link rel="stylesheet" href="../tester.css"></link>
    <link rel="icon" type="image/png" href="https://www.vidrosoftware.com/favicon/favicon-32x32.png" sizes="32x32" />
    <link rel="icon" type="image/png" href="https://www.vidrosoftware.com/favicon/favicon-16x16.png" sizes="16x16" />
    <style>
    .iframes-container{
      width: 320px;
      height: 240;
    }
    </style>
  </head>
  <body>



    <div class="form" id="userData">
      <h1>Vidromap</h1>

      <div id="sessionToken"></div>
      <div>
        Paste your first code here (Map 1):<br> <textarea name="code1" id="code1" rows="10" cols="100" placeholder=""><iframe id="map-frame-one" name="map-frame-one" width="100%" height="240" src="https://component.vidrosoftware.com?sessionToken=YOUR_SESSION_TOKEN&domId=map-frame-one"></iframe></textarea> 
        <br>
        Paste your second code here (Map 2):<br> <textarea name="code2" id="code2" rows="10" cols="100" placeholder=""><iframe id="map-frame-two" name="map-frame-two" width="100%" height="240" src="https://component.vidrosoftware.com?sessionToken=YOUR_SESSION_TOKEN&domId=map-frame-two"></iframe></textarea> 
      </div>
        <div>
        
      </div>
    </div>
    <div>
       <button id="btLoadIframe">Load Maps</button> - 
      </div>
    <div id="Error_container"></div>
    <div id="mapContainer">
      <div id="iframes-container1" class="iframes-container"></div>
      <h2>Map 1</h2>
      <button id="btZoomIn1">Zoom In</button>
      <button id="btZoomOut1">Zoom Out</button>
      <button id="btAddPoint1">Add point map 1</button>  
      <div id="iframes-container2" class="iframes-container"></div>
      <h2>Map 2</h2>
      <button id="btZoomIn2">Zoom In</button>
      <button id="btZoomOut2">Zoom Out</button>
      <button id="btAddPoint2">Add point map 2</button>

    </div>
    
    <script src="https://unpkg.com/@vidro/map-handler@1.0.7/dist/map-handler.js"></script>
    <script src="./index.js"></script>
  </body>
</html>
