"use client";
import { useEffect } from "react";
import { MAP_EVENTS } from "@/shared/constants";
import { useMessages } from "@/contexts/messages";
import { useMaps } from "@/contexts/maps";
const useMapEvents = () => {
  const {
    setMapReady,
    setDisplayedLayers,
    setCurrentMapAction,
    displayedLayers,
    setZoomLevel,
    mapReady,
    setMapScale,
    setClickedCoordinates,
    setSrid,
    setBboxcoordinates,
    setMapResolution,
  } = useMaps();
  const { message, setMessage, Highlight } = useMessages();

  useEffect(() => {
    if (!message) return;
    if (!mapReady) return;

    switch (message.type) {
      case MAP_EVENTS.ZOOM_CHANGE:
        console.log("useMapEvents Zoom changed", message);
        setZoomLevel(message.zoom);
        setMapScale(message?.meta?.scale);
        setMapResolution(message?.meta?.resolution);
        setMessage(null);
        break;
      case MAP_EVENTS.CENTER_CHANGE:
        setMessage(null);
        break;
      default:
        setMessage(null);
        break;
    }
  }, [message, mapReady]);

  useEffect(() => {
    if (!message) return;
    switch (message.type) {
      case MAP_EVENTS.LOADED:
        if (message.what === "map") {
          console.log("useMapEvents Map loaded and ready");
          setMapReady(true);
        } else if (message.what === "tiled") {
          console.log("useMapEvents Tiled loaded");
        }
        if (message.what === "layer") {
        }
        setMessage(null);
        break;
      case MAP_EVENTS.UNLOADED:
        if (message.what === "tiled") {
          console.log("useMapEvents Tiled unloaded");
        }
        setMessage(null);
        break;
      case MAP_EVENTS.LAYERS:
        console.log("useMapEvents displayed layers", message.layers);
        if (!message.layers) returns;
        //check if is already displayed
        setDisplayedLayers(message.layers);
        setMessage(null);
        break;
      case MAP_EVENTS.GEOM_ADDED:
        console.log("GeomAdded", message);
        setCurrentMapAction(null);
        //Highlight the added geom
        Highlight(
          {
            feature_type: "HIGHLIGHT",
            geom: message?.geom_astext,
          },
          2,
          {
            duration: 1500,
            repeat: true,
          },
          0,
          null
        );
        if (message?.geom_astext === null) {
          setMessage(null);
          return;
        }

      /************************************************************************************
       *****************               CLICKED COORDINATES        *************************
       ***********************************************************************************/

      //*****************            MAP CLICKED COORDINATES       *************************
      case MAP_EVENTS.COORDINATES:
        console.log("clicked coordinates", message);

        setClickedCoordinates(message.coordinates);
        setSrid(message.srid);
        setBboxcoordinates(message.bbox);
        setMessage(null);
        break;

      /************************************************************************************
       *****************             END CLICKED COORDINATES      *************************
       ***********************************************************************************/

      default:
        setMessage(null);
        break;
    }
  }, [message, displayedLayers]);

  return {};
};
export default useMapEvents;
