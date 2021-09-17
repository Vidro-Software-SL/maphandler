// Config:

var sessionToken = document.querySelector("#sessionToken").textContent;
var communicator = new VidroMaps.Communicator({sessionToken});
var clickedCoordinates = null;
// UI buttons:

var btZoomIn = document.querySelector("#btZoomIn");
var btZoomOut = document.querySelector("#btZoomOut");
var btAddPoint = document.querySelector("#btAddPoint");
var btAddPolygon = document.querySelector("#btAddPolygon");
var btAddLine = document.querySelector("#btAddLine");
var btClear = document.querySelector("#btClear");
var btToggleLayer = document.querySelector("#btToggleLayer");
var btZoomToExtent = document.querySelector("#btZoomToExtent");
var btZoomToCoordinates = document.querySelector("#btZoomToCoordinates");
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
var btReloadDisplayedLayers = document.querySelector("#btReloadDisplayedLayers");
var btAddGeoJSON = document.querySelector("#btAddGeoJSON");
var btClearGeoJSON = document.querySelector("#btClearGeoJSON");
var geoJSONFileContent = document.getElementById("geojsonfile");
var Result_container = document.querySelector("#Result_container");
var hitTolerance = document.querySelector("#hitTolerance");
var btGeoJSONInfo = document.querySelector("#btGeoJSONInfo");
var btRemoveGeoJSONLayer = document.querySelector("#btRemoveGeoJSONLayer");
var btsetGiswaterFilters = document.querySelector("#btsetGiswaterFilters");
var btgetGiswaterFilters = document.querySelector("#btgetGiswaterFilters");
var btLoadWMSLayers = document.querySelector("#btLoadWMSLayers");
var btDebug = document.querySelector("#btDebug");

var geoJSONName = null; //geoJSON file name
var geoJSONContent = null; // geojson file content
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

communicator.on("loaded", function(data){
 	console.log("loaded",data);
});

communicator.on("layers", function(data){
 	console.log("layers received",data);
 	fillDisplayedLayersSelect(data);
});

communicator.on("geoJSONlayers", function(data){
 	console.log("geoJSONlayers received",data);
 	fillGeoJSONLayersSelect(data);
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
 	clickedCoordinates = [data.coordinates[0],data.coordinates[1]]
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
});

communicator.on("GiswaterLayerAvailableFilters", function(data){
 	console.info("GiswaterLayerAvailableFilters",data);
 	cleanContainers();
 	Result_container.innerHTML = data.filters;
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
 		var use_giswater_tiled = document.querySelector("#use_giswater_tiled");
  		if (use_giswater_tiled) {
 			toggleGiswaterTiledCheck.checked = use_giswater_tiled.checked;
 		}
 	}
});
communicator.on("WMSInfoAvailable", function(){
 	console.log("WMSInfoAvailable");
 	if(btWMSInfo) btWMSInfo.disabled = false;
});
communicator.on("availableWMSLayers", function(data){
 	console.log("availableWMSLayers",data);
 	fillLayersSelect(data);
});

function fillLayersSelect(options) {
	console.log('fillLayersSelect',options)
	var projectlayers = document.getElementById("projectlayers");
	if(projectlayers){


    var length = projectlayers.options.length;

    for (i = length-1; i >= 0; i--) {
      projectlayers.options[i] = null;
    }
    for(var i = 0; i < options.length; i++) {
        var opt = options[i];
        var el = document.createElement("option");
        el.textContent = opt;
        el.value = opt;
        projectlayers.appendChild(el);
    }
  }
}

function fillDisplayedLayersSelect(options){
	var layers_select = document.getElementById("layers");
	if(layers_select){
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
}

if(btDebug){
	btDebug.addEventListener("click", function(){
		var debug = parseInt(document.getElementById("debug").value);
    communicator.setDebug(debug); 
	});	
}
// Actions
btZoomIn.addEventListener("click", function(){
  return communicator.ZoomIn();
});

btZoomOut.addEventListener("click", function(){
  communicator.ZoomOut();
});
if(btZoomToCoordinates){
	btZoomToCoordinates.addEventListener("click", function(){
		let level = 4;
		if(document.getElementById('zoomLevelToCoordinates')){
		 	//zoom Level
		 	level = document.getElementById('zoomLevelToCoordinates').value 
		 }
		if(clickedCoordinates){
			  communicator.zoomToCoordinates(clickedCoordinates[0],clickedCoordinates[1],level);
			}else{
				Error_container.innerHTML ="No coordinates provided";
			}
	});
}

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
if(btReloadDisplayedLayers){
	btReloadDisplayedLayers.addEventListener("click", function(){
	 	communicator.reloadDisplayedLayers();
	});
}
if(btLoadWMSLayers){
	btLoadWMSLayers.addEventListener("click", function (evt) {

		console.log('btLoadWMSLayers')
		communicator.loadWMSAvailableLayers();

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

//**********************************************************
//**************            GeoJSON         ****************
//**********************************************************

if(geoJSONFileContent){
	geoJSONFileContent.addEventListener("change", handleFiles, false);
	function handleFiles() {
		const fileList = this.files; 
	  	// use the 1st file from the list
		f = fileList[0];
		geoJSONName = f.name;
	    var reader = new FileReader();
	    // Closure to capture the file information.
	    reader.onload = (function(theFile) {
	        return function(e) {
				geoJSONContent = e.target.result;
	        };
	      })(f);

	      // Read in the image file as a data URL.
	      reader.readAsText(f);
	  
	}
}
if(btAddGeoJSON){
	btAddGeoJSON.addEventListener("click", function(){
		var geoToSend = null;
		var geojsondata = document.querySelector("#geojsondata");
		if(geojsondata){
			console.log("using geoJSON input");
			var cleanjson = geojsondata.value.replace(/(\r\n|\n|\r)/gm, "");
			geoToSend = cleanjson;
		}
		if(geoJSONContent){
			console.log("using geoJSON file");
			geoToSend = geoJSONContent;
			
		}
		var fillcolor = document.querySelector("#fillcolor");
		var strokecolor = document.querySelector("#strokecolor");
		
		//Check JSON 
		try{
			let options = {
				fillcolor: null,
				strokecolor: null
			}
			if(fillcolor){
				options.fillcolor = fillcolor.value;
			}
			if(strokecolor){
				options.strokecolor = strokecolor.value;
			}
			communicator.addGeoJSON(JSON.parse(geoToSend),options,geoJSONName);
		}catch(e){
			console.error("invalid geoJSON",e);
		}
	});
}

if(btClearGeoJSON){
	btClearGeoJSON.addEventListener("click", function(){
		communicator.clearGeoJSON();	
	});
}

if(btGeoJSONInfo){
	btGeoJSONInfo.addEventListener("click", function(){
		cleanContainers();
		let tolerance = 10;
		if(hitTolerance){
			//(typeof hitTolerance!='undefined') ? hitTolerance : 5,
			tolerance = (hitTolerance.value=='' || hitTolerance.value==null) ?  5 : parseInt(hitTolerance.value);

		}
	  	communicator.infoFromCoordinates('geojson',document.getElementById('geojsonlayers').value,tolerance);
	});
}

if(btRemoveGeoJSONLayer){
	btRemoveGeoJSONLayer.addEventListener("click", function(){
		cleanContainers();
	  	communicator.removeGeoJSONLayer(document.getElementById('geojsonlayers').value);
	});
}

function fillGeoJSONLayersSelect(options){
	var layers_select = document.getElementById("geojsonlayers");
	if(layers_select){
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
	if(btGeoJSONInfo && options.length>0){
		btGeoJSONInfo.disabled = false;
	}
	if(btRemoveGeoJSONLayer && options.length>0){
		btRemoveGeoJSONLayer.disabled = false;
	}	
}

//**********************************************************
//**************         END GeoJSON        ****************
//**********************************************************

//**********************************************************
//**************      GISWATER FILTERS      ****************
//**********************************************************


if(btsetGiswaterFilters){
	btsetGiswaterFilters.addEventListener("click", function(){
		var filters = document.getElementById('giswaterFilters').value;

		cleanContainers();
	  communicator.setGiswaterFilters(filters);
	});
}
if(btgetGiswaterFilters){
	btgetGiswaterFilters.addEventListener("click", function(){
		var layerName = document.getElementById('layers').value;
		cleanContainers();
	  communicator.getGiswaterLayerAvailableFilters(layerName);
	});
}


//**********************************************************
//**************     END GISWATER FILTERS   ****************
//**********************************************************
