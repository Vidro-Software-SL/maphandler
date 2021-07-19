// Config:
const urlParams = new URLSearchParams(window.location.search);
const user = urlParams.get('user');
const pwd = urlParams.get('pwd');
const apiQuery = urlParams.get('api');

if(apiQuery) document.querySelector("#apiurl").value = apiQuery;
var apiUrl = document.querySelector("#apiurl").value;
if(user) document.querySelector("#user").value = user;
if(pwd) document.querySelector("#pwd").value = pwd;


// UI:
var usertoken = document.querySelector("#usertoken");
var errorContainer = document.querySelector("#errorContainer");
var loginContainer = document.querySelector("#loginContainer");
var btLoginAgain = document.querySelector("#btLoginAgain");
var btLoadMap = document.querySelector("#btLoadMap");
var btLoadProjectLayers = document.querySelector("#btLoadProjectLayers");
var projectlayers = document.getElementById("projectlayers");
var userData = document.querySelector("#userData");


var btLogin = document.querySelector("#btLogin");

var projects_select = document.getElementById("selectProject");
var sessionToken = document.querySelector("#sessionToken");
var mapContainer = document.querySelector("#mapContainer");
var iframe = document.querySelector("#map-frame");

mapContainer.classList.add("hide");

//show login form
btLoginAgain.addEventListener("click", function (evt) {
  usertoken.value = "";
  loginContainer.classList.remove("hide");
  errorContainer.classList.add("hide");
});

//************** LOGIN EXAMPLE

btLogin.addEventListener("click", function (evt) {
  apiUrl = document.querySelector("#apiurl").value;
  //Build XMLHttpRequest for login
  //form values
  var user = document.querySelector("#user").value;
  var pwd = document.querySelector("#pwd").value;
  var data = { user: user, pwd: pwd };
  var oReq = new XMLHttpRequest();
  oReq.addEventListener("load", reqListener);
  oReq.open("POST", `${apiUrl}letsgo`, true);
  oReq.setRequestHeader("Content-type", "application/json");
  oReq.send(JSON.stringify(data));
  console.log("Attem to log in", `${apiUrl}letsgo`, data);
});

function reqListener() {
  if (this.status === 200) {
    console.log("Login response", this.responseText);
    var res = JSON.parse(this.responseText);
    //store token value on dom
    usertoken.value = res.message.token;
    //hide login form
    loginContainer.classList.add("hide");
    //simulate cache token
    storeToken(res.message);
    //fill user projects selector
    fillUserProjects(res.message.projects);
  } else {
    console.error(this.status);
    var res = JSON.parse(this.responseText);
    console.log(res.error);
    //show DOM error element
    errorContainer.innerHTML = res.error;
    errorContainer.classList.remove("hide");
  }
}
//************** END LOGIN EXAMPLE

//************** SIMULATE CACHE
function storeToken(result) {
  //call a php script for simulate a token cache
  //get current url
  var uri = window.location.href.split("/");
  uri.pop();
  var uristr = uri.join("/");
  var uriForCache = uristr.split("?");
  var oReq = new XMLHttpRequest();
  console.log(uristr);
  oReq.open(
    "GET",
    `${uriForCache[0]}/storeToken.php?token=${result.token}&data=${result.projects}`,
    true
  );

  oReq.setRequestHeader("Content-type", "application/json");
  oReq.send();
}
//************** END SIMULATE CACHE

//************** CHECK TOKEN
function checkToken() {
  //Check if user token is valid
  console.log("checkToken", usertoken.value);
  if (usertoken.value != "") {
    //build XMLHttpRequest for checking token
    var oReq = new XMLHttpRequest();
    oReq.addEventListener("load", tokenListener);
    oReq.open("GET", `${apiUrl}token/${usertoken.value}`, true);
    oReq.setRequestHeader("Content-type", "application/json");
    oReq.send();
    console.log("Chek token", `${apiUrl}token/${usertoken.value}`);
  } else {
    //show login form in case usertoken input is empty
    loginContainer.classList.remove("hide");
  }
}
function tokenListener() {
  if (this.status === 200) {
    var res = JSON.parse(this.responseText);
    console.log("Valid user token", res.message);
    //get from localstorage last iframe selected
    var cachedMap = localStorage.getItem("iframe");
    if (cachedMap) {
      errorContainer.classList.add("hide");
      mapContainer.classList.remove("hide");
      iframe.src = cachedMap;
      sessionToken.innerHTML = localStorage.getItem("sessionToken");
      var selectedProjectId = localStorage.getItem("selectedProjectId");
      if (selectedProjectId) {
        selectProject(selectedProjectId);
      }
    }
  } else {
    //if token is invalid, show login form
    console.error(this.status);
    var res = JSON.parse(this.responseText);
    console.log(res.error);
    loginContainer.classList.remove("hide");
    usertoken.value = "";
  }
}

//************** END CHECK TOKEN

//************** User projects SELECT

function fillUserProjects(options) {
  //empty previous options
  var length = projects_select.options.length;
  for (i = length - 1; i >= 0; i--) {
    projects_select.options[i] = null;
  }
  for (var i = 0; i < options.length; i++) {
    var opt = options[i];
    var el = document.createElement("option");
    el.textContent = opt;
    el.value = opt;
    projects_select.appendChild(el);
  }
}

function selectProject(id) {
  document.getElementById("selectProject").value = id;
}

//************** END User projects SELECT

//************** MAP EXAMPLE

btLoadMap.addEventListener("click", function (evt) {
  apiUrl = document.querySelector("#apiurl").value;
  var debug = parseInt(document.getElementById("debug").value);
  //Build XMLHttpRequest for map
  var selectedProjectId =
    projects_select.options[projects_select.selectedIndex].value;
  localStorage.setItem("selectedProjectId", selectedProjectId);
  //form values
  var zoom = document.querySelector("#zoom").value;
  var data = { zoom: zoom, token: usertoken.value };
  var uri = `${apiUrl}map/${selectedProjectId}?`;
  if (zoom) {
    uri += `&zoom=${zoom}`;
  }
  if (debug) {
    uri += `&debug=${debug}`;
  }
  var logo = document.querySelector("#logo").value;
  if (logo) {
    uri += `&logo=${logo}`;
  }
  var active_layer = document.querySelector("#active_layer").value;
  if (active_layer) {
    uri += `&active_layer=${active_layer}`;
  }
  var overrideHost = document.querySelector("#overrideHost").value;
  if(overrideHost){
    uri += `&overrideHost=${overrideHost}`;
    data.overrideHost = overrideHost;
  }

  var show_layers = document.querySelector("#show_layers").value;
  if (show_layers) {
    uri += `&show_layers=${show_layers}`;
  }

  var extent = document.querySelector("#extent").value;
  if (extent) {
    uri += `&extent=${extent}`;
  }

  var srid = document.querySelector("#srid").value;
  if (srid) {
    uri += `&srid=${srid}`;
  }
  var use_giswater_tiled = document.querySelector("#use_giswater_tiled");
  if (use_giswater_tiled && use_giswater_tiled.checked) {
    uri += `&use_giswater_tiled=${use_giswater_tiled.checked}`;
    data.use_giswater_tiled = use_giswater_tiled.checked;
  }

  console.log(uri)
  var oReq = new XMLHttpRequest();
  oReq.addEventListener("load", mapListener);
  oReq.open("GET", uri, true);
  oReq.setRequestHeader('Authorization',`Bearer ${usertoken.value}`);
  oReq.setRequestHeader("Content-type", "application/json");
  oReq.send(JSON.stringify(data));
  console.log("Attempt to load map", `${apiUrl}map/${selectedProjectId}`, data);
});

function mapListener() {
  if (this.status === 200) {
    console.log("mapListener response", this.responseText);
    var res = JSON.parse(this.responseText);
    errorContainer.classList.add("hide");
    mapContainer.classList.remove("hide");
    iframe.src = `${res.message.iframe}?sessionToken=${res.message.sessionToken}`;
    sessionToken.innerHTML = res.message.sessionToken;
    localStorage.setItem("iframe", iframe.src);
    localStorage.setItem("sessionToken", res.message.sessionToken);
  } else {
    console.error(this.status);
    var res = JSON.parse(this.responseText);
    console.error(res.error);
    //show DOM error element
    errorContainer.innerHTML = res.error;
    errorContainer.classList.remove("hide");
    mapContainer.classList.add("hide");
  }
}
//************** END MAP EXAMPLE

//************** PROJECT LAYER

btLoadProjectLayers.addEventListener("click", function (evt) {
  apiUrl = document.querySelector("#apiurl").value;
 
  //Build XMLHttpRequest for project layers
  var selectedProjectId =
    projects_select.options[projects_select.selectedIndex].value;

  var uri = `${apiUrl}layers/${selectedProjectId}`;
 

  var oReq = new XMLHttpRequest();
  oReq.addEventListener("load", layersListener);
  oReq.open("GET", uri, true);
  oReq.setRequestHeader('Authorization',`Bearer ${usertoken.value}`);
  oReq.setRequestHeader("Content-type", "application/json");
  oReq.send();
  console.log("Attempt to load project layers", uri);
});
function layersListener() {
  if (this.status === 200) {
    console.log("layersListener response", this.responseText);
    var res = JSON.parse(this.responseText);
    var length = projectlayers.options.length;
    console.log(res)
    for (i = length-1; i >= 0; i--) {
      projectlayers.options[i] = null;
    }
    for(var i = 0; i < res.message.length; i++) {
        var opt = res.message[i].qgis_name;
        var el = document.createElement("option");
        el.textContent = opt;
        el.value = opt;
        projectlayers.appendChild(el);
    }
  } else {
    console.error(this.status);
    var res = JSON.parse(this.responseText);
    console.log(res.error);
    //show DOM error element
    errorContainer.innerHTML = res.error;
    errorContainer.classList.remove("hide");
    mapContainer.classList.add("hide");
  }
}

function fillLayersSelect(options){
  //empty previous options

}
