// Config:
var communicator = null;
var usertoken = null;
var sessionToken = null;
var iframe = document.querySelector("#map-frame");
const urlParams = new URLSearchParams(window.location.search);
const user = urlParams.get('user');
const pwd = urlParams.get('pwd');
const apiUrl = urlParams.get('api');

//************** Simple example

function loadMap(){

	//************************************************
	//************************************************
	//*************                     **************
	//*************  1. Get user token  **************
	//*************                     **************
	//************************************************
	//************************************************

	var data = { 'user': user, 'pwd': pwd }
	//Build XMLHttpRequest to API
	var oReq = new XMLHttpRequest();
	oReq.open("POST", `${apiUrl}letsgo`,true);
	oReq.setRequestHeader('Content-type', 'application/json');
	oReq.send(JSON.stringify(data));
 	console.log("Attempt to get user token",`${apiUrl}letsgo`,data);
 	oReq.addEventListener("load", function(){
 		console.log("Get user token response",this.responseText);
  		var res = JSON.parse(this.responseText);
  		//store token
   		usertoken = res.message.token;
		var dataForMap = { 'token': usertoken }
		
		//************************************************
		//************************************************
		//*************                     **************
		//*************      2. Get MAP     **************
		//*************                     **************
		//************************************************
		//************************************************

		//Build XMLHttpRequest to API
		var uri = `${apiUrl}map/${res.message.projects[0]}?token=${usertoken}` 
		var loadMapReq = new XMLHttpRequest();
		loadMapReq.addEventListener("load", function(){
			console.log("Map response",this.responseText);
			var res = JSON.parse(this.responseText);
			sessionToken = res.message.sessionToken;
			
			//start JS Communicator 
			communicator = new VidroMaps.Communicator({sessionToken});
			
			//Load iframne
			iframe.src = `${res.message.iframe}?sessionToken=${sessionToken}`;

			// Map events
			communicator.on("onZoomChange", function(data){
				console.log("communicator->onZoomChange",data);
			});

			// Map Actions
			btZoomIn.addEventListener("click", function(){
			  communicator.ZoomIn();
			});

			btZoomOut.addEventListener("click", function(){
			  communicator.ZoomOut();
			});
			btZoomToExtent.addEventListener("click", function(){
			  communicator.zoomToExtent();
			});


		});
		loadMapReq.open("GET", uri,true);
		loadMapReq.setRequestHeader('Content-type', 'application/json');
		loadMapReq.send(JSON.stringify(dataForMap));
 	});
};