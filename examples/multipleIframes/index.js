var communicatorIframe1 = new VidroMaps.Communicator({'sessionToken':sessionToken,'id':'map-frame-one'});
var communicatorIframe2 = new VidroMaps.Communicator({'sessionToken':sessionToken,'id':'map-frame-two'});

var sessionToken = document.querySelector("#sessionToken");
var mapContainer = document.querySelector("#mapContainer");
var code1 = document.querySelector("#code1");
var code2 = document.querySelector("#code2");
var iframesContainer1 = document.querySelector("#iframes-container1");
var iframesContainer2 = document.querySelector("#iframes-container2");

var iframe = document.querySelector("#map-frame");
var host = document.querySelector("#overrideHost");
var btLoadIframe = document.querySelector("#btLoadIframe");

var btZoomIn1 = document.querySelector("#btZoomIn1");
var btZoomIn2 = document.querySelector("#btZoomIn2");
var btZoomOut1 = document.querySelector("#btZoomOut1");
var btZoomOut2 = document.querySelector("#btZoomOut2");
var btAddPoint1 = document.querySelector("#btAddPoint1");
var btAddPoint2 = document.querySelector("#btAddPoint2");

communicatorIframe1.on("loaded", function(data){
 	console.log("iframe 1 loaded",data);
});
communicatorIframe2.on("loaded", function(data){
 	console.log("iframe 2 loaded",data);
});
communicatorIframe2.on("coordinates", function(data){
 	console.info("map2 coordinates",data);
 	alert("map2 click")
});
communicatorIframe1.on("coordinates", function(data){
 	console.info("map1 coordinates",data);
 	alert("map1 click")
});

communicatorIframe1.on("geomAdded", function(data){
 	console.log("geomAdded to map1",data);
 	
});

communicatorIframe2.on("geomAdded", function(data){
 	console.log("geomAdded to map2",data);
});

//************** MAP EXAMPLE

if(btLoadIframe){
	btLoadIframe.addEventListener("click", function (evt) {
		if(code1.value!=""){
			console.log('btLoadIframe',code1.value,typeof code1.value);
			iframesContainer1.innerHTML = code1.value;
		}
		if(code2.value!=""){
			console.log('btLoadIframe',code2.value,typeof code2.value);
			iframesContainer2.innerHTML = code2.value;
		}
	});
}

btZoomIn1.addEventListener("click", function(){
  return communicatorIframe1.ZoomIn();
});
btZoomIn2.addEventListener("click", function(){
  return communicatorIframe2.ZoomIn();
});
btZoomOut1.addEventListener("click", function(){
  communicatorIframe1.ZoomOut();
});
btZoomOut2.addEventListener("click", function(){
  communicatorIframe2.ZoomOut();
});
if(btAddPoint1){
	btAddPoint1.addEventListener("click", function(){
	  communicatorIframe1.AddGeom('Point');
	});
}
if(btAddPoint2){
	btAddPoint2.addEventListener("click", function(){
	  communicatorIframe2.AddGeom('Point');
	});
}