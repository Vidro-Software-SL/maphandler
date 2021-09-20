import { EventEmitter } from "events"
import { iframeCommunicator } from "./shared/iframe-communicator";
class Communicator extends EventEmitter {

  constructor(data){
    super();
    this.domId = 'map-frame';
    if(typeof window === 'undefined'){
      return;
    };
    if(typeof data.id==="string"){
      this.domId = data.id;
    } 
    this.com = new iframeCommunicator(data)
    window.addEventListener("message", e => this.onMessageReceived(e));
    this.sessionToken = data.sessionToken;
  }

  onMessageReceived = e => {
    switch(e.data.type){
      case "onZoomChange": this.emitEvent("onZoomChange", e.data.zoom,e.data.domId); break;
      case "geomAdded": this.emitEvent("geomAdded", e.data.geom_astext,e.data.domId); break;
      case "layers": this.emitEvent("layers", e.data.layers,e.data.domId); break;  
      case "geoJSONlayers": this.emitEvent("geoJSONlayers", e.data.layers,e.data.domId); break;     
      case "info": this.emitEvent("info", e.data,e.data.domId); break;    
      case "error": this.emitEvent("error", e.data,e.data.domId); break;  
      case "coordinates": this.emitEvent("coordinates", e.data,e.data.domId); break;  
      case "activeLayer": this.emitEvent("activeLayer", e.data,e.data.domId); break;  
      case "geolocation": this.emitEvent("geolocation", e.data,e.data.domId); break; 
      case "WMSInfoAvailable": this.emitEvent("WMSInfoAvailable", e.data,e.data.domId); break;  
      case "giswaterTiledBackgroundDisplayed": this.emitEvent("giswaterTiledBackgroundDisplayed", e.data,e.data.domId); break; 
      case "giswaterTiledBackgroundAvailable": this.emitEvent("giswaterTiledBackgroundAvailable", e.data,e.data.domId); break;  
      case "GiswaterLayerAvailableFilters": this.emitEvent("GiswaterLayerAvailableFilters", e.data,e.data.domId); break;  
      case "loaded": this.emitEvent("loaded", e.data,e.data.domId); break;  
      case "availableWMSLayers":    this.emitEvent("availableWMSLayers", e.data.layers,e.data.domId); break;       
    }
    
  }

  emitEvent = (type,data,domId)=>{
    if(domId===this.domId){
      delete data.domId;
      this.emit(type, data); 
    }
  }

  ZoomIn = () => {
    this.com.sendMessageToMap({
      type: "zoomIn",
      sessionToken: this.sessionToken,
    }); 

  }
  
  ZoomOut = () => {
    this.com.sendMessageToMap({
      type: "zoomOut",
      sessionToken: this.sessionToken,
    });   
  }

  AddGeom = (geomtype) => {
    this.com.sendMessageToMap({
      type: "AddGeom",
      geom: geomtype,
      sessionToken: this.sessionToken,
    });   
  }

  toggleLayer = (layer) => {
    this.com.sendMessageToMap({
      type: "toggleLayer",
      layer: layer,
      sessionToken: this.sessionToken,
    });   
  }

  setActiveLayer = (layer) => {
    this.com.sendMessageToMap({
      type: "setActiveLayer",
      layer: layer,
      sessionToken: this.sessionToken,
    });   
  }

  getActiveLayer = () => {
    this.com.sendMessageToMap({
      type: "getActiveLayer",
      sessionToken: this.sessionToken,
    });   
  }

  loadWMSAvailableLayers = () => {
    this.com.sendMessageToMap({
      type: "loadWMSAvailableLayers",
      sessionToken: this.sessionToken,
    });   
  }

  clear = () => {
    this.com.sendMessageToMap({
      type: "clear",
      sessionToken: this.sessionToken,
    });   
  }

  Highlight = (options) => {
    this.com.sendMessageToMap({
      type: "highlight",
      geom: options.geom,
      zoom: options.zoom,
      sessionToken: this.sessionToken,
    });   
  }

  zoomToExtent = () => {
    this.com.sendMessageToMap({
      type: "zoomToExtent",
      sessionToken: this.sessionToken,
    });   
  }

  zoomToCoordinates= (lat,lon,zoomLevel) => {
    if(!isNaN(parseInt(zoomLevel))){
      this.com.sendMessageToMap({
        type: "zoomToCoordinates",
        sessionToken: this.sessionToken,
        coordinates:[lat,lon],
        zoomLevel: zoomLevel
      });   
    }
  }

  infoFromCoordinates = (type,layer,hitTolerance) => {
    const _layer = (typeof layer=='undefined') ? null : layer
    this.com.sendMessageToMap({
      type: "infoFromCoordinates",
      info: type,
      layer: _layer,
      hitTolerance: (typeof hitTolerance!='undefined') ? parseInt(hitTolerance) : 5,
      sessionToken: this.sessionToken,
    });   
  }

  Geolocalize = (toggle) => {
    this.com.sendMessageToMap({
      type: "Geolocalize",
      toggle: toggle,
      sessionToken: this.sessionToken,
    });   
  }

  toggleGiswaterTiled = (toggle) => {
    this.com.sendMessageToMap({
      type: "toggleGiswaterTiled",
      toggle: toggle,
      sessionToken: this.sessionToken,
    });   
  }

  reloadDisplayedLayers = ()=>{
    return this.com.sendMessageToMap({
      type: "reloadDisplayedLayers",
      sessionToken: this.sessionToken,
    });  
  }

  addGeoJSON = (geoJSON,options, name)=>{
    if(geoJSON){
      return this.com.sendMessageToMap({
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
    return this.com.sendMessageToMap({
      type: "clearGeoJSON",
      sessionToken: this.sessionToken,
    });  
  }

 removeGeoJSONLayer = (name)=>{
    if(name){
      return this.com.sendMessageToMap({
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
 
      return this.com.sendMessageToMap({
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
     return this.com.sendMessageToMap({
        type: "getGiswaterLayerAvailableFilters",
        name: layer_name,
        sessionToken: this.sessionToken,
      }); 
    }else{
      this.emit("error",{error:"No layer_name"});
      return;
    }
  }

  setDebug = (what) =>{
    if(!isNaN(parseInt(what))){
      return this.com.sendMessageToMap({
        type: "setDebug",
        what: what,
        sessionToken: this.sessionToken,
      });
    }else{
      console.error("Level is not a integer");
    }
  }

}

export {
  Communicator,
}