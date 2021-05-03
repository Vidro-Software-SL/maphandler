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
var btGeolocalize = document.querySelector("#btGeolocalize");
var btStopGeolocalize = document.querySelector("#btStopGeolocalize");
var btHighlight = document.querySelector("#btHighlight");
var zoomToHighlightCheck = document.querySelector("#zoomToHighlightCheck");
var btToggleGiswaterTiled = document.querySelector("#btToggleGiswaterTiled");
var toggleGiswaterTiledCheck = document.querySelector("#toggleGiswaterTiledCheck");


var Result_container = document.querySelector("#Result_container");

//local var for store active layer
var currentActiveLayer = null;
function cleanContainers(){
	Error_container.innerHTML = '';
	Result_container.innerHTML = '';
}

// Map events

communicator.on("onZoomChange", function(data){
 	console.log("onZoomChange",data);
 	if(document.getElementById('zoomLevel')){
	 	//Add current zoom Level to highlight input zoomlevel
	 	document.getElementById('zoomLevel').value = data;
	 }
 	cleanContainers();
 	Result_container.innerHTML = `Zoom level changed: ${data}`;
});

communicator.on("geomAdded", function(data){
 	console.log("geomAdded",data);
 	cleanContainers();
 	//show geometry on DOM
 	Result_container.innerHTML = data;
 	//Add current geom to highlight input geom
 	document.getElementById('geom').value = data;
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

communicator.on("geolocation", function(data){
 	console.info("geolocation",data);
 	cleanContainers();
 	//Result_container.innerHTML = data.activeLayer;
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

//giswater tiled background
communicator.on("giswaterTiledBackgroundDisplayed", function(data){
 	console.log("giswaterTiledBackgroundDisplayed",data);
 	if(toggleGiswaterTiledCheck){
 		toggleGiswaterTiledCheck.checked = data.visible;
 	}

});
communicator.on("giswaterTiledBackgroundAvailable", function(data){
 	console.log("giswaterTiledBackgroundAvailable",data);
 	if(btToggleGiswaterTiled && data.available){
 		btToggleGiswaterTiled.disabled = false;
 		toggleGiswaterTiledCheck.checked = true;
 	}

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
  return communicator.ZoomIn();
});

btZoomOut.addEventListener("click", function(){
  communicator.ZoomOut();
});
if(btAddPoint){
	btAddPoint.addEventListener("click", function(){
	  communicator.AddGeom('Point');
	});
}
if(btAddPolygon){
	btAddPolygon.addEventListener("click", function(){
	  communicator.AddGeom('Polygon');
	});
}
if(btAddLine){
	btAddLine.addEventListener("click", function(){
	  communicator.AddGeom('Line');
	});
}
if(btGeolocalize){
	btGeolocalize.addEventListener("click", function(){
	  communicator.Geolocalize(true);
	});
}
if(btStopGeolocalize){
	btStopGeolocalize.addEventListener("click", function(){
	  communicator.Geolocalize(false);
	});
}
if(btToggleLayer){
	btToggleLayer.addEventListener("click", function(){
	  communicator.toggleLayer(document.getElementById('projectlayers').value);
	});
}
if(btClear){
	btClear.addEventListener("click", function(){
		cleanContainers();
	  	communicator.clear();
	});
}
if(btZoomToExtent){
	btZoomToExtent.addEventListener("click", function(){
		cleanContainers();
	  	communicator.zoomToExtent();
	});
}
if(btWMSInfo){
	btWMSInfo.addEventListener("click", function(){
		cleanContainers();
	  	communicator.infoFromCoordinates('wms',document.getElementById('layers').value);
	});
}
if(btGiswaterInfo){
	btGiswaterInfo.addEventListener("click", function(){
		cleanContainers();
	  	communicator.infoFromCoordinates('giswater',document.getElementById('layers').value);
	});
}
if(btActiveLayer){
	btActiveLayer.addEventListener("click", function(){
		cleanContainers();
	 	communicator.setActiveLayer(document.getElementById('layers').value);
	 	currentActiveLayer = document.getElementById('layers').value;
	 	document.getElementById('currentActiveLayer').innerHTML = `<b>Active layer</b>: ${currentActiveLayer}`;
	});
}
if(btGetActiveLayer){
	btGetActiveLayer.addEventListener("click", function(){
		cleanContainers();
	 	communicator.getActiveLayer();
	});
}
if(btHighlight){
	btHighlight.addEventListener("click", function(){
		cleanContainers();
		var options = {
			geom: document.getElementById('geom').value
		}
		if(zoomToHighlightCheck.checked){
			options.zoom = {
				type: 'geom'
			};
		}else{
			options.zoom = {
				type: 'level',
				zoomLevel : document.getElementById('zoomLevel').value
			}	
		}
		communicator.Highlight(options);
	  	
	});
}
if(zoomToHighlightCheck){
	//disable/enable zoom level to highlight
	zoomToHighlightCheck.addEventListener("click", function(){
		document.getElementById('zoomLevel').disabled = zoomToHighlightCheck.checked;	
	});
}
//Giswater tiled background
if(btToggleGiswaterTiled && toggleGiswaterTiledCheck){
	btToggleGiswaterTiled.addEventListener("click", function(){
		cleanContainers();
	 	communicator.toggleGiswaterTiled(toggleGiswaterTiledCheck.checked);
	});
}


