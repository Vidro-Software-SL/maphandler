
var sessionToken = document.querySelector("#sessionToken");
var mapContainer = document.querySelector("#mapContainer");
var codeContent = document.querySelector("#code");
var iframesContainer = document.querySelector("#iframes-container");

var iframe = document.querySelector("#map-frame");
var host = document.querySelector("#overrideHost");
var btLoadIframe = document.querySelector("#btLoadIframe");


//************** MAP EXAMPLE

//iframe.src = `${host.value}?sessionToken=${sessionToken.value}`;


if(btLoadIframe){
	btLoadIframe.addEventListener("click", function (evt) {
		if(code.value!=""){
		console.log('btLoadIframe',code.value,typeof code.value);
		iframesContainer.innerHTML = code.value;
	}
	});
}





