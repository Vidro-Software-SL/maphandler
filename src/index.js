import { EventEmitter } from "events"
import { sendMessageToMap } from "./shared/iframe-communicator";

class Communicator extends EventEmitter {

  constructor({ sessionToken }){
    super();

    if(typeof window === 'undefined'){
      return;
    };

    window.addEventListener("message", e => this.onMessageReceived(e));
    this.sessionToken = sessionToken;

  }

  onMessageReceived = e => {
    switch(e.data.type){
      case "onZoomChange": this.emit("onZoomChange", e.data.zoom); break;
      case "geomAdded": this.emit("geomAdded", e.data.geom_astext); break;
      case "layers": this.emit("layers", e.data.layers); break;  
      case "geoJSONlayers": this.emit("geoJSONlayers", e.data.layers); break;     
      case "info": this.emit("info", e.data); break;    
      case "error": this.emit("error", e.data); break;  
      case "coordinates": this.emit("coordinates", e.data); break;  
      case "activeLayer": this.emit("activeLayer", e.data); break;  
      case "geolocation": this.emit("geolocation", e.data); break; 
      case "WMSInfoAvailable": this.emit("WMSInfoAvailable", e.data); break;  
      case "giswaterTiledBackgroundDisplayed": this.emit("giswaterTiledBackgroundDisplayed", e.data); break; 
      case "giswaterTiledBackgroundAvailable": this.emit("giswaterTiledBackgroundAvailable", e.data); break;  
      case "GiswaterLayerAvailableFilters": this.emit("GiswaterLayerAvailableFilters", e.data); break;  
              
    }
  }

  ZoomIn = () => {
    sendMessageToMap({
      type: "zoomIn",
      sessionToken: this.sessionToken,
    });   
  }
  
  ZoomOut = () => {
    sendMessageToMap({
      type: "zoomOut",
      sessionToken: this.sessionToken,
    });   
  }

  AddGeom = (geomtype) => {
    sendMessageToMap({
      type: "AddGeom",
      geom: geomtype,
      sessionToken: this.sessionToken,
    });   
  }

  toggleLayer = (layer) => {
    sendMessageToMap({
      type: "toggleLayer",
      layer: layer,
      sessionToken: this.sessionToken,
    });   
  }

  setActiveLayer = (layer) => {
    sendMessageToMap({
      type: "setActiveLayer",
      layer: layer,
      sessionToken: this.sessionToken,
    });   
  }

  getActiveLayer = () => {
    sendMessageToMap({
      type: "getActiveLayer",
      sessionToken: this.sessionToken,
    });   
  }

  clear = () => {
    sendMessageToMap({
      type: "clear",
      sessionToken: this.sessionToken,
    });   
  }

  Highlight = (options) => {
    sendMessageToMap({
      type: "highlight",
      geom: options.geom,
      zoom: options.zoom,
      sessionToken: this.sessionToken,
    });   
  }

  zoomToExtent = () => {
    sendMessageToMap({
      type: "zoomToExtent",
      sessionToken: this.sessionToken,
    });   
  }

  infoFromCoordinates = (type,layer,hitTolerance) => {
    const _layer = (typeof layer=='undefined') ? null : layer
    sendMessageToMap({
      type: "infoFromCoordinates",
      info: type,
      layer: _layer,
      hitTolerance: (typeof hitTolerance!='undefined') ? parseInt(hitTolerance) : 5,
      sessionToken: this.sessionToken,
    });   
  }

  Geolocalize = (toggle) => {
    sendMessageToMap({
      type: "Geolocalize",
      toggle: toggle,
      sessionToken: this.sessionToken,
    });   
  }

  toggleGiswaterTiled = (toggle) => {
    sendMessageToMap({
      type: "toggleGiswaterTiled",
      toggle: toggle,
      sessionToken: this.sessionToken,
    });   
  }

  reloadDisplayedLayers = ()=>{
    return sendMessageToMap({
      type: "reloadDisplayedLayers",
      sessionToken: this.sessionToken,
    });  
  }

  addGeoJSON = (geoJSON,options, name)=>{
    if(geoJSON){
      return sendMessageToMap({
        type: "addGeoJSON",
        geoJSON: geoJSON,
        options: (typeof options!='undefined') ? options : {fillcolor:null,strokecolor:null},
        name: name ? name: Math.random().toString(36).substring(7),
        sessionToken: this.sessionToken,
      });  
    }else{
      this.emit("error",{error:"No geoJSON data"});
      return;
    }
  }

 clearGeoJSON = ()=>{
    return sendMessageToMap({
      type: "clearGeoJSON",
      sessionToken: this.sessionToken,
    });  
  }

 removeGeoJSONLayer = (name)=>{
    if(name){
      return sendMessageToMap({
        type: "removeGeoJSONLayer",
        name: name,
        sessionToken: this.sessionToken,
      });  
    }else{
      this.emit("error",{error:"No geoJSON data"});
      return;
    }
  }
  
  setGiswaterFilters = (filters)=>{
    var filtersJson = filters;
    if(filters){
      if(typeof filters!="object"){
        filters = filters.trim()
        filters = filters.replace(/^\s+|\s+$/g, '');
        filters = filters.replace(/\\/g, '');
        try{
          filtersJson = JSON.parse(filters); 
        }catch(e){
          this.emit("error",{error:"Filters is not a valid JSON"});
          return;
        }
      }
 
      return sendMessageToMap({
        type: "setGiswaterFilters",
        filters: filtersJson,
        sessionToken: this.sessionToken,
      }); 
    }else{
      this.emit("error",{error:"No filters"});
      return;
    }
  }

  getGiswaterLayerAvailableFilters = (layer_name)=>{
    if(layer_name){
     return sendMessageToMap({
        type: "getGiswaterLayerAvailableFilters",
        name: layer_name,
        sessionToken: this.sessionToken,
      }); 
    }else{
      this.emit("error",{error:"No layer_name"});
      return;
    }
  }

  
}

export {
  Communicator,
}