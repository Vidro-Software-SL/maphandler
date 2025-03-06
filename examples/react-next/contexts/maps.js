"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./auth";
import {
  setMapId as setMapIdCookie,
  getMapId as getMapIdCookie,
  removeMapId as removeMapIdCookie,
} from "@/shared/cookies";
const MapsContext = createContext({});

export const MapsProvider = ({ children }) => {
  const { apiUrl, token } = useAuth();
  const [map, setMap] = useState(null);
  const [mapId, setMapId] = useState(null);

  const [mapError, setMapError] = useState(null);
  const [mapReady, setMapReady] = useState(false);

  const [sessionToken, setSessionToken] = useState(null);
  const [currentMapAction, setCurrentMapAction] = useState(null);
  const [clickedCoordinates, setClickedCoordinates] = useState(null);
  const [bboxCoordinates, setBboxcoordinates] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(null);
  const [mapScale, setMapScale] = useState(null);
  const [mapResolution, setMapResolution] = useState(null);
  const [srid, setSrid] = useState(null);

  //geolocations
  const [geolocalizing, setGeolocalizing] = useState(false);
  const [geolocalizingstatus, setGeolocalizingStatus] = useState(null);
  const [userGeoPosition, setUserGeoPosition] = useState(null);

  //measure
  const [measureStatus, setMeasureStatus] = useState(null);

  //layers
  const [displayedLayers, setDisplayedLayers] = useState([]);
  const [activeLayer, setActiveLayer] = useState(null);
  const [mapLayers, setMapLayers] = useState(null);

  const [infoLayerSource, setInfoLayerSource] = useState([]); //layer from info is received

  //filters
  const [configuredFilters, setConfiguredFilters] = useState(null); //backoffice configured filters
  const [mapFilters, setMapfilters] = useState(null);
  const [filtersApplied, setFiltersApplied] = useState(false);
  const [activeFilters, setActiveFilters] = useState([]);

  //tools
  const [selectedTool, setSelectedTool] = useState(null);

  useEffect(() => {
    if (!token) return;
    (async () => {
      if (!getMapIdCookie()) {
        console.log("No map if cookie found");

        return;
      }
      console.log("Map id cookie found, getting map...");
      try {
        await GetMap(getMapIdCookie());
      } catch (error) {
        console.error("Error getting map from cookie", error);
        return;
      }
    })();
  }, [token]);

  const GetMap = async (id) => {
    let url = `${apiUrl}map/${id}`;

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      console.log("GetMap", data);
      setMapId(id);
      setMapError(false);
      setSessionToken(data.message.sessionToken);
      setMap(
        `${data.message.iframe}?sessionToken=${data.message.sessionToken}`
      );
      //store map id in cookie, to avoid losing it on page refresh
      setMapIdCookie(id);

      return;
    } catch (error) {
      console.error("Error fetching map:", error);
      setSessionToken(null);
      setMap(null);
      setMapId(null);
      removeMapIdCookie();

      throw error;
    }
  };

  const GetMapInfo = async (id) => {
    let url = `${apiUrl}map/detail/${id}`;

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      console.log("GetMapInfo", data);
      console.log("Layers", data.message.layers);
      setMapLayers(data.message.layers);
      setConfiguredFilters(data.message.layerFilters);
      return;
    } catch (error) {
      console.error("Error fetching map info:", error);

      setMapLayers(null);
      throw error;
    }
  };
  return (
    <MapsContext.Provider
      value={{
        mapId,
        setMapId,
        GetMap,
        map,
        sessionToken,
        mapError,
        mapReady,
        setMapReady,
        displayedLayers,
        setDisplayedLayers,
        activeLayer,
        setActiveLayer,
        currentMapAction,
        setCurrentMapAction,
        mapFilters,
        setMapfilters,
        activeFilters,
        setActiveFilters,
        configuredFilters,
        infoLayerSource,
        setInfoLayerSource,
        clickedCoordinates,
        setClickedCoordinates,
        bboxCoordinates,
        setBboxcoordinates,
        srid,
        setSrid,
        geolocalizing,
        setGeolocalizing,
        geolocalizingstatus,
        setGeolocalizingStatus,
        userGeoPosition,
        measureStatus,
        setMeasureStatus,
        selectedTool,
        setSelectedTool,
        filtersApplied,
        setFiltersApplied,
        zoomLevel,
        setZoomLevel,
        mapScale,
        setMapScale,
        setSessionToken,
        mapLayers,
        GetMapInfo,
        mapResolution,
        setMapResolution,
      }}
    >
      {children}
    </MapsContext.Provider>
  );
};

export const useMaps = () => useContext(MapsContext);
