import { useAuth } from "@/contexts/auth";
import { useMaps } from "@/contexts/maps";
import { useMessages } from "@/contexts/messages";
import { useEffect, useState } from "react";

const MapLayers = () => {
  const { GetMapInfo, mapId, mapLayers, setActiveLayer } = useMaps();
  const { ToggleLayer } = useMessages();
  const { logged } = useAuth();
  const [selectedLayer, setSelectedLayer] = useState("-1");

  useEffect(() => {
    if (!mapId) return;
    GetMapInfo(mapId);
  }, [mapId]);

  if (!logged) return null;
  if (!mapId) return null;
  return (
    <>
      <div>
        {mapLayers && mapLayers.length === 0 && <div>No layers available</div>}

        <div className="m-2 flex gap-2">
          <label className="block text-sm font-medium text-gray-700 pt-2">
            Layers
          </label>
          {mapLayers && mapLayers.length > 0 && (
            <select
              className="border border-gray-300 rounded-md p-2 w-60"
              onChange={(e) => setSelectedLayer(e.target.value)}
              value={selectedLayer}
            >
              <option value="-1">Select layer...</option>
              {mapLayers.map((ele) => (
                <option key={ele.id} value={ele.qgis_name}>
                  {ele.qgis_name} - {ele.alias}
                </option>
              ))}
            </select>
          )}

          <button
            onClick={(e) => {
              console.log("Toggle layer", selectedLayer);
              setActiveLayer(selectedLayer);
              ToggleLayer(selectedLayer);
            }}
            disabled={selectedLayer === "-1"}
            className="border border-gray-300 bg-black text-white rounded-md p-2 mt-1 text-xs"
          >
            Toggle layer
          </button>
        </div>
      </div>
    </>
  );
};

export default MapLayers;
