// Config:

var sessionToken = document.querySelector("#sessionToken").textContent;
var communicator = new VidroMaps.Communicator({sessionToken});

// UI buttons:

var btZoomIn = document.querySelector("#btZoomIn");
var btZoomOut = document.querySelector("#btZoomOut");
var btAddPoint = document.querySelector("#btAddPoint");
var btAddPolygon = document.querySelector("#btAddPolygon");
var btAddLine = document.querySelector("#btAddLine");
var btClear = document.querySelector("#btClear");
var btToggleLayer = document.querySelector("#btToggleLayer");
var btZoomToExtent = document.querySelector("#btZoomToExtent");
var btWMSInfo = document.querySelector("#btWMSInfo");
var btGiswaterInfo = document.querySelector("#btGiswaterInfo");
var btActiveLayer = document.querySelector("#btActiveLayer");
var btGetActiveLayer = document.querySelector("#btGetActiveLayer");

var Error_container = document.querySelector("#Error_container");
var Result_container = document.querySelector("#Result_container");

function cleanContainers(){
	Error_container.innerHTML = '';
	Result_container.innerHTML = '';
}

// Map events

communicator.on("onZoomChange", function(data){
 	console.log("onZoomChange",data);
 	cleanContainers();
 	Result_container.innerHTML = `Zoom level changed: ${data}`;
});

communicator.on("geomAdded", function(data){
 	console.log("geomAdded",data);
 	cleanContainers();
 	//show geometry on DOM
 	Result_container.innerHTML = data;
});

communicator.on("layers", function(data){
 	console.log("layers received",data);

 	fillDisplayedLayersSelect(data)
});

//error event
communicator.on("error", function(data){
 	console.error("error",data);
 	cleanContainers();
 	Error_container.innerHTML = data.error;
});

//clicked coordinates
communicator.on("coordinates", function(data){
 	console.info("coordinates",data);
 	cleanContainers();
 	Result_container.innerHTML = `Clicked coordinates -> x: ${data.coordinates[0]}, y: ${data.coordinates[1]}`;
});
communicator.on("activeLayer", function(data){
 	console.info("activeLayer",data);
 	cleanContainers();
 	Result_container.innerHTML = data.activeLayer;
});


//info event
communicator.on("info", function(data){
 	console.log("info received",data);
 	var dataToRender = data.data;
 	//depending on infoType, data.data can be an string or a JSON
 	if(data.infoType==="giswater"){
		dataToRender = JSON.stringify(data.data)
 	}
 	cleanContainers();
 	Result_container.innerText = dataToRender;
});

function fillDisplayedLayersSelect(options){
	var layers_select = document.getElementById("layers");
	//empty previous options
	var length = layers_select.options.length;
	for (i = length-1; i >= 0; i--) {
	  layers_select.options[i] = null;
	}
	for(var i = 0; i < options.length; i++) {
	    var opt = options[i];
	    var el = document.createElement("option");
	    el.textContent = opt;
	    el.value = opt;
	    layers_select.appendChild(el);
	}
}


// Actions

btZoomIn.addEventListener("click", function(){
  communicator.ZoomIn();
});

btZoomOut.addEventListener("click", function(){
  communicator.ZoomOut();
});

btAddPoint.addEventListener("click", function(){
  communicator.AddGeom('Point');
});

btAddPolygon.addEventListener("click", function(){
  communicator.AddGeom('Polygon');
});
btAddLine.addEventListener("click", function(){
  communicator.AddGeom('Line');
});



btToggleLayer.addEventListener("click", function(){
  communicator.toggleLayer(document.getElementById('projectlayers').value);
});

btClear.addEventListener("click", function(){
	cleanContainers();
  	communicator.clear();
});

btZoomToExtent.addEventListener("click", function(){
	cleanContainers();
  	communicator.zoomToExtent();
});

btWMSInfo.addEventListener("click", function(){
	cleanContainers();
  	communicator.infoFromCoordinates('wms',document.getElementById('projectlayers').value);
});
btGiswaterInfo.addEventListener("click", function(){
	cleanContainers();
  	communicator.infoFromCoordinates('giswater',document.getElementById('projectlayers').value);
});

btActiveLayer.addEventListener("click", function(){
	cleanContainers();
 	communicator.setActiveLayer(document.getElementById('projectlayers').value);
});
btGetActiveLayer.addEventListener("click", function(){
	cleanContainers();
 	communicator.getActiveLayer();
});





