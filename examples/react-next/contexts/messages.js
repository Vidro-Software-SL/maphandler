import { createContext, useContext, useEffect, useState } from "react";
import { MAP_EVENTS } from "@/shared/constants";

const MessageContext = createContext({});

export const MessageProvider = ({ children }) => {
  const [events, setEvents] = useState(false);
  const [communicator, setCommunicator] = useState(false);
  const [message, setMessage] = useState(null);
  const [messageQueue, setMessageQueue] = useState([]);

  useEffect(() => {
    if (!communicator) return;
    console.log("MapHandler is ready for use");
  }, [communicator]);

  const start = async (sessionToken) => {
    const { Communicator } = await import("@vidro/map-handler");
    const _communicator = new Communicator({ sessionToken });
    setCommunicator(_communicator);
  };

  const reloadLayers = () => {
    if (!communicator) return;
    communicator.reloadDisplayedLayers();
  };

  const ZoomIn = () => {
    console.log("ZoomIn");
    if (!communicator) return;
    console.log("ZoomIn 2");
    communicator.ZoomIn();
  };

  const zoomToExtent = () => {
    if (!communicator) return;
    communicator.zoomToExtent();
  };

  const ZoomOut = () => {
    if (!communicator) return;
    communicator.ZoomOut();
  };

  const Clear = () => {
    if (!communicator) return;
    communicator.clear();
  };

  const Info = (type = "geojson", layer, format = "json") => {
    const hitTolerance = 5;
    communicator.infoFromCoordinates(type, layer, hitTolerance, format);
  };

  const Geolocalize = (what) => {
    if (!communicator) return;
    communicator.Geolocalize(what);
  };

  const Filters = (filters) => {
    if (!communicator) return;
    console.log("messages - Filters", filters);
    communicator.setFilters(filters);
  };

  const RemoveElementFromMap = (id, layer) => {
    communicator.RemoveGeometry(id, layer);
  };

  const CancelAddGeom = () => {
    if (!communicator) return;
    console.log("CancelAddGeom");
    communicator.CancelAddGeom();
  };

  const Highlight = (item, center, animate, id, style, zoom = null) => {
    if (!communicator) return;
    console.log("Highlight", { item, center, animate, id, style, zoom });
    let options = {
      geom: item.geom,
      zoom,
      center,
      animate,
      data: item,
      style,
    };
    communicator.Highlight(options);
  };

  const RemoveGeometriesByProperty = (layer, property, value) => {
    if (!communicator) return;
    communicator.RemoveGeometriesByProperty(layer, property, value);
  };

  const UpdateGeometriesByProperty = (layer, property, value, style) => {
    if (!communicator) return;
    console.log("UpdateGeometriesByProperty", {
      layer,
      property,
      value,
      style,
    });
    communicator.UpdateGeometriesByProperty(layer, property, value, style);
  };

  const DrawGeometries = (geoms) => {
    if (!communicator) return;
    console.log("DrawGeometries", geoms);
    communicator.DrawGeometries(geoms);
  };

  const DrawGeometry = (geom, featureId, style) => {
    if (!communicator) return;
    console.log("DrawGeometry", { geom, featureId, style });
    communicator.DrawGeometries([{ geom, style, featureId, id: featureId }]);
  };

  const ToggleLayer = (layer, properties) => {
    if (!communicator) return;
    communicator.toggleLayer(layer, properties);
  };

  const removeLayer = (name) => {
    if (!communicator) return;
    console.log("removeLayer", { name });
    communicator.removeLayer(name);
  };

  const startDrawPolygon = () => {
    const options = {
      texts: {
        start: t({
          id: "COMMON.COMMON.CLICK_TO_START_DRAWING",
        }),
        continue: t({
          id: "COMMON.COMMON.CLICK_TO_CONTINUE_DRAWING_POLYGON",
        }),
      },
      style: {
        fill: "rgb(249, 34, 34,0.3)",
        stroke: "rgb(249, 34, 34)",
      },
      drawOnEnd: false,
      showConfirm: false,
    };
    communicator.AddGeom("Polygon", options);
  };

  const BBoxForClicks = (size) => {
    if (!communicator) return;
    communicator.setBboxSize(size);
  };

  const cancelMeasure = () => {
    if (!communicator) return;
    communicator.cancelMeasure();
  };

  const initMeasure = (type, startMsg, continueMsg) => {
    if (!communicator) return;
    communicator.cancelMeasure();
    communicator.initMeasure(type, startMsg, continueMsg);
  };

  const zoomToCoordinates = (coordinates, zoomLevel) => {
    if (!communicator) return;
    communicator.zoomToCoordinates(coordinates[0], coordinates[1], zoomLevel);
  };

  const zoomToGeometry = (geom, limits) => {
    if (!communicator) return;
    communicator.zoomToGeometry(geom, limits);
  };

  const centerMap = (coordinates) => {
    if (!communicator) return;
    communicator.CenterMap(coordinates[0], coordinates[1]);
  };

  const drawPoint = ({ drawOnEnd = false, showConfirm = false }) => {
    if (!communicator) return;
    communicator.AddGeom("Point", { drawOnEnd, showConfirm: true });
  };

  const addIcon = (icon, coordinates) => {
    communicator.addIcon({ icon, coordinates });
  };

  const zoomToScale = (scale) => {
    const allowedScales = [
      "1:100",
      "1:200",
      "1:400",
      "1:500",
      "1:1000",
      "1:2000",
      "1:5000",
      "1:10000",
      "1:50000",
    ];
    if (!allowedScales.includes(scale)) {
      console.error(
        `Invalid scale: ${scale}. Allowed values are: ${allowedScales.join(
          ", "
        )}`
      );
      return;
    }
    if (!communicator) return;
    console.log("zoomToScale", { scale });
    communicator.zoomToScale(scale);
  };

  //***** PRINT ******/

  const startPrint = (options) => {
    communicator.startPrint(options);
  };
  const cancelPrint = (options) => {
    communicator.cancelPrint(options);
  };

  const print = (options) => {
    communicator.print(options);
  };
  const onMapEvent = (data) => {
    console.log(`onMapEvent`, { type: data.type, data });
    setMessageQueue((prevQueue) => [...prevQueue, data]);
  };

  useEffect(() => {
    if (message) return;
    if (messageQueue.length === 0) {
      return;
    }
    setMessage(messageQueue[0]);
    setMessageQueue((prevQueue) => {
      return prevQueue.slice(1);
    });
  }, [messageQueue, message]);

  useEffect(() => {
    if (!communicator) return;
    communicator.on(MAP_EVENTS.ZOOM_CHANGE, onMapEvent);
    communicator.on(MAP_EVENTS.LOADED, onMapEvent);
    communicator.on(MAP_EVENTS.CAPABILITIES, onMapEvent);
    communicator.on(MAP_EVENTS.ERROR, onMapEvent);
    communicator.on(MAP_EVENTS.GEOLOCATION, onMapEvent);
    communicator.on(MAP_EVENTS.END_MEASURE, onMapEvent);
    communicator.on(MAP_EVENTS.START_MEASURE, onMapEvent);
    communicator.on(MAP_EVENTS.UNLOADED, onMapEvent);
    communicator.on(MAP_EVENTS.COORDINATES, onMapEvent);
    communicator.on(MAP_EVENTS.CENTER_CHANGE, onMapEvent);
    communicator.on(MAP_EVENTS.ACTIVE_LAYER, onMapEvent);
    communicator.on(MAP_EVENTS.WMS_LAYERS, onMapEvent);
    communicator.on(MAP_EVENTS.STATUS, onMapEvent);
    communicator.on(MAP_EVENTS.INFO, onMapEvent);
    communicator.on(MAP_EVENTS.GEOM_ADDED, onMapEvent);
    communicator.on(MAP_EVENTS.LAYERS, onMapEvent);
    communicator.on(MAP_EVENTS.VERSION, onMapEvent);
    communicator.on(MAP_EVENTS.SCREENSHOT, onMapEvent);
    communicator.on(MAP_EVENTS.PRINT, onMapEvent);
    return () => {
      if (!communicator) return;
      communicator.off(MAP_EVENTS.ZOOM_CHANGE, onMapEvent);
      communicator.off(MAP_EVENTS.LOADED, onMapEvent);
      communicator.off(MAP_EVENTS.CAPABILITIES, onMapEvent);
      communicator.off(MAP_EVENTS.ERROR, onMapEvent);
      communicator.off(MAP_EVENTS.GEOLOCATION, onMapEvent);
      communicator.off(MAP_EVENTS.END_MEASURE, onMapEvent);
      communicator.off(MAP_EVENTS.START_MEASURE, onMapEvent);
      communicator.off(MAP_EVENTS.UNLOADED, onMapEvent);
      communicator.off(MAP_EVENTS.COORDINATES, onMapEvent);
      communicator.off(MAP_EVENTS.CENTER_CHANGE, onMapEvent);
      communicator.off(MAP_EVENTS.ACTIVE_LAYER, onMapEvent);
      communicator.off(MAP_EVENTS.WMS_LAYERS, onMapEvent);
      communicator.off(MAP_EVENTS.STATUS, onMapEvent);
      communicator.off(MAP_EVENTS.INFO, onMapEvent);
      communicator.off(MAP_EVENTS.LAYERS, onMapEvent);
      communicator.off(MAP_EVENTS.VERSION, onMapEvent);
      communicator.off(MAP_EVENTS.SCREENSHOT, onMapEvent);
      communicator.off(MAP_EVENTS.PRINT, onMapEvent);
      setCommunicator(null);
    };
  }, [communicator, events]);

  useEffect(() => {
    // Clean up
    return function cleanup() {
      if (communicator) {
        communicator.off(MAP_EVENTS.ZOOM_CHANGE, onMapEvent);
        communicator.off(MAP_EVENTS.LOADED, onMapEvent);
        communicator.off(MAP_EVENTS.CAPABILITIES, onMapEvent);
        communicator.off(MAP_EVENTS.ERROR, onMapEvent);
        communicator.off(MAP_EVENTS.GEOLOCATION, onMapEvent);
        communicator.off(MAP_EVENTS.END_MEASURE, onMapEvent);
        communicator.off(MAP_EVENTS.START_MEASURE, onMapEvent);
        communicator.off(MAP_EVENTS.UNLOADED, onMapEvent);
        communicator.off(MAP_EVENTS.COORDINATES, onMapEvent);
        communicator.off(MAP_EVENTS.CENTER_CHANGE, onMapEvent);
        communicator.off(MAP_EVENTS.ACTIVE_LAYER, onMapEvent);
        communicator.off(MAP_EVENTS.WMS_LAYERS, onMapEvent);
        communicator.off(MAP_EVENTS.STATUS, onMapEvent);
        communicator.off(MAP_EVENTS.INFO, onMapEvent);
        communicator.off(MAP_EVENTS.VERSION, onMapEvent);
        communicator.off(MAP_EVENTS.PRINT, onMapEvent);
      }
      setMessage(null);
      setEvents(false);
    };
  }, []);

  return (
    <MessageContext.Provider
      value={{
        communicator,
        start,
        ZoomIn,
        ZoomOut,
        zoomToExtent,
        DrawGeometry,
        DrawGeometries,

        startDrawPolygon,
        CancelAddGeom,
        Clear,
        Info,
        RemoveElementFromMap,
        Highlight,
        RemoveGeometriesByProperty,
        UpdateGeometriesByProperty,
        ToggleLayer,
        message,
        setMessage,
        Filters,
        reloadLayers,
        BBoxForClicks,
        cancelMeasure,
        initMeasure,
        removeLayer,
        Geolocalize,
        zoomToCoordinates,
        zoomToGeometry,
        centerMap,
        drawPoint,
        addIcon,
        zoomToScale,
        print,
        startPrint,
        cancelPrint,
      }}
    >
      {children}
    </MessageContext.Provider>
  );
};

export const useMessages = () => useContext(MessageContext);
