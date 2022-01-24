
var sessionToken = document.querySelector("#sessionToken");
var mapContainer = document.querySelector("#mapContainer");
var codeContent = document.querySelector("#code");
var iframesContainer = document.querySelector("#iframes-container");

var iframe = document.querySelector("#map-frame");
var host = document.querySelector("#overrideHost");
var btLoadIframe = document.querySelector("#btLoadIframe");


//************** MAP EXAMPLE

if(btLoadIframe){
	btLoadIframe.addEventListener("click", function (evt) {
		if(codeContent.value!=""){
			iframesContainer.innerHTML = codeContent.value;
		}
	});
}