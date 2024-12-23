import { EventEmitter } from "events";
import { iframeCommunicator } from "./shared/iframe-communicator";

class Communicator extends EventEmitter {
  constructor(data) {
    super();
    this.domId = "map-frame";
    if (typeof window === "undefined") {
      return;
    }
    if (typeof data.id === "string") {
      this.domId = data.id;
    }
    this.com = new iframeCommunicator(data);
    window.addEventListener("message", (e) => this.onMessageReceived(e));
    this.sessionToken = data.sessionToken;
  }

  removeListener(event, listener) {
    super.removeListener(event, listener);
  }
  onMessageReceived = (e) => {
    switch (e.data.type) {
      case "onZoomChange":
        this.emitEvent("onZoomChange", e.data, e.data.domId);
        break;
      case "onCenterChange":
        this.emitEvent("onCenterChange", e.data, e.data.domId);
        break;
      case "geomAdded":
        this.emitEvent("geomAdded", e.data, e.data.domId);
        break;
      case "layers":
        this.emitEvent("layers", e.data, e.data.domId);
        break;
      case "geoJSONlayers":
        this.emitEvent("geoJSONlayers", e.data, e.data.domId);
        break;
      case "info":
        this.emitEvent("info", e.data, e.data.domId);
        break;
      case "error":
        this.emitEvent("error", e.data, e.data.domId);
        break;
      case "coordinates":
        this.emitEvent("coordinates", e.data, e.data.domId);
        break;
      case "activeLayer":
        this.emitEvent("activeLayer", e.data, e.data.domId);
        break;
      case "geolocation":
        this.emitEvent("geolocation", e.data, e.data.domId);
        break;
      case "WMSInfoAvailable":
        this.emitEvent("WMSInfoAvailable", e.data, e.data.domId);
        break;
      case "giswaterTiledBackgroundDisplayed":
        this.emitEvent(
          "giswaterTiledBackgroundDisplayed",
          e.data,
          e.data.domId
        );
        break;
      case "giswaterTiledBackgroundAvailable":
        this.emitEvent(
          "giswaterTiledBackgroundAvailable",
          e.data,
          e.data.domId
        );
        break;
      case "GiswaterLayerAvailableFilters":
        this.emitEvent("GiswaterLayerAvailableFilters", e.data, e.data.domId);
        break;
      case "loaded":
        this.emitEvent("loaded", e.data, e.data.domId);
        break;
      case "unloaded":
        this.emitEvent("unloaded", e.data, e.data.domId);
        break;
      case "availableWMSLayers":
        this.emitEvent("availableWMSLayers", e.data.layers, e.data.domId);
        break;
      case "layerElements":
        this.emitEvent("layerElements", e.data, e.data.domId);
        break;
      case "getToc":
        this.emitEvent("getToc", e.data, e.data.domId);
        break;
      case "status":
        this.emitEvent("status", e.data, e.data.domId);
        break;
      case "MeasureEnd":
        this.emitEvent("MeasureEnd", e.data, e.data.domId);
        break;
      case "queue":
        this.emitEvent("queue", e.data, e.data.domId);
        break;
      case "version":
        this.emitEvent("version", e.data, e.data.domId);
        break;
      case "hover":
        this.emitEvent("hover", e.data, e.data.domId);
        break;

      //case "getLegend": this.emitEvent("getLegend", e.data,e.data.domId); break;
    }
  };

  emitEvent = (type, data, domId) => {
    if (domId === this.domId) {
      delete data.domId;
      this.emit(type, data);
    }
  };

  ZoomIn = () => {
    this.com.sendMessageToMap({
      type: "zoomIn",
      sessionToken: this.sessionToken,
    });
  };

  ZoomOut = () => {
    this.com.sendMessageToMap({
      type: "zoomOut",
      sessionToken: this.sessionToken,
    });
  };

  AddGeom = (geomtype, options) => {
    this.com.sendMessageToMap({
      type: "AddGeom",
      geom: geomtype,
      texts: options?.texts,
      style: options?.style,
      drawOnEnd: options?.drawOnEnd,
      showConfirm: options?.showConfirm,
      sessionToken: this.sessionToken,
    });
  };

  CancelAddGeom = (s) => {
    this.com.sendMessageToMap({
      type: "CancelAddGeom",
    });
  };

  loadMultipleLayers = (layers) => {
    if (typeof layers !== "undefined") {
      this.com.sendMessageToMap({
        type: "loadMultipleLayers",
        layers: layers,
      });
    } else {
      this.emit("error", { error: "no layers" });
    }
  };

  toggleGroup = (layers) => {
    this.com.sendMessageToMap({
      type: "toggleGroup",
      layers,
    });
  };

  toggleLayer = (layer, properties) => {
    if (typeof properties === "undefined") {
      properties = {
        gutter: null,
        transparent: null,
        singletile: null,
        zIndex: null,
      };
    }

    if (properties.singletile !== null) {
      if (typeof properties.singletile !== "boolean") {
        properties.singletile = null;
        this.emit("error", {
          error: "singletile must be a Boolean",
          type: "error",
        });
      }
    }
    if (
      properties.gutter !== "" &&
      properties.gutter !== null &&
      !properties.singletile
    ) {
      if (isNaN(parseInt(properties.gutter))) {
        properties.gutter = null;
        this.emit("error", { type: "error", error: "Gutter must be a number" });
      }
      if (properties.singletile) {
        properties.gutter = null;
        this.emit("error", {
          type: "error",
          error:
            "Gutter can only be user with multitile layers; set singletile to false",
        });
      }
    }

    if (properties.transparent !== null) {
      if (typeof properties.transparent !== "boolean") {
        properties.transparent = null;
        this.emit("error", {
          type: "error",
          error: "transparent must be a Boolean",
        });
      }
    }
    this.com.sendMessageToMap({
      type: "toggleLayer",
      layer: layer,
      gutter: !isNaN(parseInt(properties.gutter))
        ? parseInt(properties.gutter)
        : null,
      transparent: properties.transparent,
      singletile: properties.singletile,
      sessionToken: this.sessionToken,
      zIndex: !isNaN(parseInt(properties.zIndex))
        ? parseInt(properties.zIndex)
        : null,
    });
  };

  removeLayer = (layer) => {
    this.com.sendMessageToMap({
      type: "removeLayer",
      layer: layer,
      sessionToken: this.sessionToken,
    });
  };

  displayLayer = (layer) => {
    this.com.sendMessageToMap({
      type: "displayLayer",
      layer: layer,
      sessionToken: this.sessionToken,
    });
  };
  setActiveLayer = (layer) => {
    this.com.sendMessageToMap({
      type: "setActiveLayer",
      layer: layer,
      sessionToken: this.sessionToken,
    });
  };

  getActiveLayer = () => {
    this.com.sendMessageToMap({
      type: "getActiveLayer",
      sessionToken: this.sessionToken,
    });
  };

  bringLayerToTop = (layer) => {
    this.com.sendMessageToMap({
      type: "bringLayerToTop",
      layer: layer,
      sessionToken: this.sessionToken,
    });
  };

  bringLayerToBottom = (layer) => {
    this.com.sendMessageToMap({
      type: "bringLayerToBottom",
      layer: layer,
      sessionToken: this.sessionToken,
    });
  };

  loadWMSAvailableLayers = () => {
    this.com.sendMessageToMap({
      type: "loadWMSAvailableLayers",
      sessionToken: this.sessionToken,
    });
  };

  clear = () => {
    this.com.sendMessageToMap({
      type: "clear",
      sessionToken: this.sessionToken,
    });
  };

  Highlight = (options) => {
    this.com.sendMessageToMap({
      type: "highlight",
      geom: options.geom,
      zoom: options.zoom,
      metadata: options?.data,
      center: options?.center !== undefined ? options.center : false,
      animate: options?.animate,
      style: options?.style,
      sessionToken: this.sessionToken,
    });
  };

  DrawGeometries = (geoms) => {
    if (typeof geoms !== "undefined") {
      this.com.sendMessageToMap({
        type: "DrawGeometries",
        geoms: geoms,
      });
    } else {
      this.emit("error", { type: "error", error: "no geoms" });
    }
  };

  RemoveGeometriesByProperty = (layer, property, value) => {
    if (
      typeof layer !== "undefined" &&
      typeof property !== "undefined" &&
      typeof value !== "undefined"
    ) {
      this.com.sendMessageToMap({
        type: "RemoveGeometriesByProperty",
        layer,
        property,
        value,
      });
    } else {
      this.emit("error", {
        type: "error",
        error: "no layer, property or value",
      });
    }
  };

  UpdateGeometriesByProperty = (layer, property, value, style) => {
    if (
      typeof layer !== "undefined" &&
      typeof property !== "undefined" &&
      typeof style !== "undefined" &&
      typeof value !== "undefined"
    ) {
      this.com.sendMessageToMap({
        type: "UpdateGeometriesByProperty",
        layer,
        property,
        value,
        style,
      });
    } else {
      this.emit("error", {
        type: "error",
        error: "no layer, property or value",
      });
    }
  };

  DrawGeometry = (geom, styles, name, id) => {
    console.warn("DrawGeometry is deprecated. Use DrawGeometries");
    const sty = {
      stroke_color: styles.stroke_color ? styles.stroke_color : null,
      fill_color: styles.fill_color ? styles.fill_color : null,
      point_fill_color: styles.point_fill_color
        ? styles.point_fill_color
        : null,
      geom_radius: styles.geom_radius ? styles.geom_radius : null,
      stroke_width: styles.stroke_width ? styles.stroke_width : null,
      //text
      font_color: styles.font_color ? styles.font_color : null,
      font: styles.font ? styles.font : null,
      font_size: styles.font_size ? styles.font_size : null,
      placement: styles.placement ? styles.placement : null,
      fontFillColor: styles.fontFillColor ? styles.fontFillColor : null,
      fontStrokeColor: styles.fontStrokeColor ? styles.fontStrokeColor : null,
      fontStrokeWidth: styles.fontStrokeWidth ? styles.fontStrokeWidth : null,
      baseline: styles.baseline ? styles.baseline : null,
      align: styles.align ? styles.align : null,
      display: styles.display ? styles.display : null,
      offsetY: styles.offsetY ? styles.offsetY : null,
    };

    this.com.sendMessageToMap({
      type: "drawGeometry",
      geom: geom,
      style: sty,
      name: name ? name : "highlight",
      id: id ? id : Math.floor(Math.random() * 1000) + 1,
      sessionToken: this.sessionToken,
    });
  };

  RemoveGeometry = (id, layer = null) => {
    const _id = typeof id == "undefined" ? null : id;
    if (!_id) {
      console.error("No element id");
      this.emit("error", { type: "error", error: "No element id" });
      return;
    }
    this.com.sendMessageToMap({
      type: "removeGeometry",
      layer,
      id: _id,
    });
  };

  zoomToExtent = () => {
    this.com.sendMessageToMap({
      type: "zoomToExtent",
      sessionToken: this.sessionToken,
    });
  };

  zoomToCoordinates = (lat, lon, zoomLevel) => {
    if (!isNaN(parseInt(zoomLevel))) {
      this.com.sendMessageToMap({
        type: "zoomToCoordinates",
        sessionToken: this.sessionToken,
        coordinates: [lat, lon],
        zoomLevel: zoomLevel,
      });
    }
  };

  zoomToGeometry = (geom, limits) => {
    this.com.sendMessageToMap({
      type: "zoomToGeometry",
      sessionToken: this.sessionToken,
      geom,
      limits,
    });
  };

  infoFromCoordinates = (type, layer, hitTolerance, format) => {
    const _layer = typeof layer == "undefined" ? null : layer;
    const _hitTolerance =
      typeof hitTolerance == "undefined" || !hitTolerance
        ? 5
        : parseInt(hitTolerance);
    const _format = typeof format == "undefined" ? "xml" : format.toLowerCase();
    if (_format !== "xml" && _format !== "json") {
      console.error("Format must be 'xml' or 'json");
      return;
    }
    if (isNaN(_hitTolerance)) {
      console.error("hitTolerance must be a number");
      return;
    }
    this.com.sendMessageToMap({
      type: "infoFromCoordinates",
      info: type,
      layer: _layer,
      format: _format,
      hitTolerance: _hitTolerance,
      sessionToken: this.sessionToken,
    });
  };

  getElementsFromLayer = (layer, limit, format) => {
    const _format = typeof format == "undefined" ? "xml" : format.toLowerCase();
    if (_format !== "xml" && _format !== "json") {
      console.error("Format must be 'xml' or 'json");
      return;
    }
    if (isNaN(limit)) {
      console.error("Limit must be a number");
      return;
    }
    const _layer = typeof layer == "undefined" ? null : layer;
    this.com.sendMessageToMap({
      type: "getElementsFromLayer",
      layer: _layer,
      limit: typeof limit != "undefined" ? parseInt(limit) : 100,
      format: format,
      sessionToken: this.sessionToken,
    });
  };

  Geolocalize = (toggle) => {
    this.com.sendMessageToMap({
      type: "Geolocalize",
      toggle: toggle,
      sessionToken: this.sessionToken,
    });
  };

  /* deprecated since v1.1.19 */
  toggleGiswaterTiled = (toggle, tiled) => {
    this.com.sendMessageToMap({
      type: "toggleGiswaterTiled",
      toggle: toggle,
      tiled: tiled,
      sessionToken: this.sessionToken,
    });
  };

  toggleTiled = (toggle, tiled) => {
    this.com.sendMessageToMap({
      type: "toggleTiled",
      toggle: toggle,
      tiled: tiled,
      sessionToken: this.sessionToken,
    });
  };

  getTiled = () => {
    this.com.sendMessageToMap({
      type: "getTiled",
      sessionToken: this.sessionToken,
    });
  };

  toggleSecondaryBackground = (toggle) => {
    this.com.sendMessageToMap({
      type: "toggleSecondaryBackground",
      toggle: toggle,
    });
  };

  getSecondaryBackground = () => {
    this.com.sendMessageToMap({
      type: "getSecondaryBackground",
      sessionToken: this.sessionToken,
    });
  };

  reloadDisplayedLayers = () => {
    return this.com.sendMessageToMap({
      type: "reloadDisplayedLayers",
      sessionToken: this.sessionToken,
    });
  };

  addGeoJSON = (geoJSON, options, name) => {
    if (geoJSON) {
      return this.com.sendMessageToMap({
        type: "addGeoJSON",
        geoJSON: geoJSON,
        options:
          typeof options != "undefined"
            ? options
            : { fillcolor: null, strokecolor: null },
        name: name ? name : Math.random().toString(36).substring(7),
        sessionToken: this.sessionToken,
      });
    } else {
      this.emit("error", { type: "error", error: "No geoJSON data" });
      return;
    }
  };

  clearGeoJSON = () => {
    return this.com.sendMessageToMap({
      type: "clearGeoJSON",
      sessionToken: this.sessionToken,
    });
  };

  removeGeoJSONLayer = (name) => {
    if (name) {
      return this.com.sendMessageToMap({
        type: "removeGeoJSONLayer",
        name: name,
        sessionToken: this.sessionToken,
      });
    } else {
      this.emit("error", { type: "error", error: "No geoJSON data" });
      return;
    }
  };

  setGiswaterFilters = (filters) => {
    var filtersJson = filters;
    if (filters) {
      if (typeof filters != "object") {
        filters = filters.trim();
        filters = filters.replace(/^\s+|\s+$/g, "");
        filters = filters.replace(/\\/g, "");
        try {
          filtersJson = JSON.parse(filters);
        } catch (e) {
          this.emit("error", {
            type: "error",
            error: "Filters is not a valid JSON",
          });
          return;
        }
      }

      return this.com.sendMessageToMap({
        type: "setGiswaterFilters",
        filters: filtersJson,
        sessionToken: this.sessionToken,
      });
    } else {
      this.emit("error", { type: "error", error: "No filters" });
      return;
    }
  };

  setFilters = (filters) => {
    var filtersJson = filters;
    if (filters) {
      if (typeof filters != "object") {
        filters = filters.trim();
        filters = filters.replace(/^\s+|\s+$/g, "");
        filters = filters.replace(/\\/g, "");
        try {
          filtersJson = JSON.parse(filters);
        } catch (e) {
          this.emit("error", {
            type: "error",
            error: "Filters is not a valid JSON",
          });
          return;
        }
      }
      const isValid = filtersJson.every((item) => Array.isArray(item.filters));

      // isValid will be true if all elements have "filters" property that is an array
      if (!isValid) {
        this.emit("error", {
          type: "error",
          error: "Filters is not a valid JSON - missing filters array",
        });
        return;
      }
      return this.com.sendMessageToMap({
        type: "setFilters",
        filters: filtersJson,
        sessionToken: this.sessionToken,
      });
    } else {
      this.emit("error", { type: "error", error: "No filters" });
      return;
    }
  };

  getGiswaterLayerAvailableFilters = (layer_name) => {
    if (layer_name) {
      return this.com.sendMessageToMap({
        type: "getGiswaterLayerAvailableFilters",
        name: layer_name,
        sessionToken: this.sessionToken,
      });
    } else {
      this.emit("error", { type: "error", error: "No layer_name" });
      return;
    }
  };

  CenterMap = (lat, lon) => {
    this.com.sendMessageToMap({
      type: "centerMap",
      coordinates: [lat, lon],
    });
  };

  getToc = () => {
    return this.com.sendMessageToMap({
      type: "getToc",
      sessionToken: this.sessionToken,
    });
  };

  setDebug = (what) => {
    if (!isNaN(parseInt(what))) {
      this.com.sendMessageToMap({
        type: "setDebug",
        what: what,
        sessionToken: this.sessionToken,
      });
    } else {
      console.error("Debug is not a integer");
    }
  };

  setCustomColors = (properties) => {
    //validate data
    if (typeof properties !== "object") {
      console.error("properties is not an object");
      return;
    }
    if (properties.hasOwnProperty("geom_stroke_width")) {
      if (isNaN(parseInt(properties.geom_stroke_width))) {
        console.error("geom_stroke_width is not an number");
        return;
      } else {
        properties.geom_stroke_width = parseInt(properties.geom_stroke_width);
      }
    } else {
      properties.geom_stroke_width = 1;
    }
    if (properties.hasOwnProperty("geom_radius")) {
      if (isNaN(parseInt(properties.geom_radius))) {
        console.error("geom_stroke_width is not an number");
        return;
      } else {
        properties.geom_radius = parseInt(properties.geom_radius);
      }
    } else {
      properties.geom_radius = 4;
    }

    if (properties.hasOwnProperty("geom_shape")) {
      if (
        properties.geom_shape !== "circle" &&
        properties.geom_shape !== "square"
      ) {
        properties.geom_shape = "circle";
        console.error("geom_shape must be either 'circle' or 'square'");
      }
    }
    this.com.sendMessageToMap({
      type: "setCustomColors",
      properties: properties,
      sessionToken: this.sessionToken,
    });
  };

  changeBackground = (newBackground) => {
    return this.com.sendMessageToMap({
      type: "changeBackground",
      sessionToken: this.sessionToken,
      newBackground: newBackground,
    });
  };

  getBackground = () => {
    this.com.sendMessageToMap({
      type: "getBackground",
      sessionToken: this.sessionToken,
    });
  };

  initMeasure = (measure, textStart, textContinue) => {
    return this.com.sendMessageToMap({
      type: "initMeasure",
      sessionToken: this.sessionToken,
      measure,
      textStart,
      textContinue,
    });
  };
  cancelMeasure = () => {
    return this.com.sendMessageToMap({
      type: "cancelMeasure",
      sessionToken: this.sessionToken,
    });
  };

  setBboxSize = (bbox) => {
    if (!isNaN(parseInt(bbox))) {
      this.com.sendMessageToMap({
        type: "setBoundingBoxSize",
        bbox: bbox,
        sessionToken: this.sessionToken,
      });
    } else {
      console.error("bbox is not a integer");
    }
  };
}

export { Communicator };
