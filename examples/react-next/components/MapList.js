import { useAuth } from "@/contexts/auth";
import { useMaps } from "@/contexts/maps";
import { useEffect, useState } from "react";
import { getMapId as getMapIdCookie } from "@/shared/cookies";
const MapList = () => {
  const { GetMap } = useMaps();
  const { projects, logged } = useAuth();
  const [selectedMap, setSelectedMap] = useState("-1");
  useEffect(() => {
    if (!logged) return;
    if (!getMapIdCookie()) {
      return;
    }

    setSelectedMap(getMapIdCookie());
  }, [logged]);
  if (!logged) return null;
  return (
    <div>
      <div className="m-2 flex gap-2">
        <label className="block text-sm font-medium text-gray-700 pt-2">
          Maps
        </label>
        <select
          className="border border-gray-300 rounded-md p-2  w-32"
          onChange={(e) => setSelectedMap(e.target.value)}
          value={selectedMap}
        >
          <option value="-1">Select a map</option>
          {projects.map((projectId) => (
            <option key={projectId} value={projectId}>
              {projectId}
            </option>
          ))}
        </select>

        <button
          onClick={(e) => {
            GetMap(selectedMap);
          }}
          disabled={selectedMap === "-1"}
          className="border border-gray-300 bg-black text-white rounded-md p-2 mt-1 text-xs"
        >
          Load map
        </button>
      </div>
    </div>
  );
};

export default MapList;
