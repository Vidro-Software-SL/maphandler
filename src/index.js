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
      case "info": this.emit("info", e.data); break;    
      case "error": this.emit("error", e.data); break;  
      case "coordinates": this.emit("coordinates", e.data); break;        
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

  clear = () => {
    sendMessageToMap({
      type: "clear",
      sessionToken: this.sessionToken,
    });   
  }

  zoomToExtent = () => {
    sendMessageToMap({
      type: "zoomToExtent",
      sessionToken: this.sessionToken,
    });   
  }

  infoFromCoordinates = (type) => {
    sendMessageToMap({
      type: "infoFromCoordinates",
      info: type,
      sessionToken: this.sessionToken,
    });   
  }


}

export {
  Communicator,
}