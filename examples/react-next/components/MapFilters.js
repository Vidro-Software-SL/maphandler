import { useAuth } from "@/contexts/auth";
import { useMaps } from "@/contexts/maps";
import { useMessages } from "@/contexts/messages";
import { useEffect, useState } from "react";

const MapFilters = () => {
  const {
    configuredFilters,
    mapId,
    filters,
    activeFilters,

    activeLayer,
    mapLayers,
  } = useMaps();
  const { Filters } = useMessages();
  const { logged } = useAuth();
  const [currentFilter, setCurrentFilter] = useState("");
  const [filterValue, setFilterValue] = useState("");
  useEffect(() => {
    if (!configuredFilters) return;
    console.log("MapFilters configuredFilters", configuredFilters);
  }, [configuredFilters]);

  useEffect(() => {
    if (!activeFilters) return;
    console.log("MapFilters activeFilters", activeFilters);
  }, [activeFilters]);

  useEffect(() => {
    if (!filters) return;
    console.log("MapFilters filters", filters);
  }, [filters]);

  const applyFilter = () => {
    if (!activeLayer) {
      console.log("No active layer");
      return;
    }
    console.log("Apply filter", {
      currentFilter,
      filterValue,
      activeLayer,
    });
    //find layer info
    const lay = mapLayers.find((l) => l.qgis_name === activeLayer);
    console.log("Layer info", lay);
    //format filter for mapComponent digest
    const filter = [
      {
        layer_id: lay.id,
        layer_name: lay.qgis_name,
        filters: [
          [
            {
              name: currentFilter,
              condition: "=", //default condition - you can get condition from configuredFilters
              value: filterValue,
              value2: null,
              layer_id: lay.id,
              mapId: mapId,
            },
          ],
        ],
      },
    ];
    Filters(filter);
    console.log("Filter", filter);
  };

  if (!logged) return null;
  if (!mapId) return null;
  return (
    <>
      <div>
        {configuredFilters && configuredFilters.length === 0 && (
          <div>No filters available</div>
        )}

        <div className="m-2 flex gap-2">
          <label className="block text-sm font-medium text-gray-700 pt-2">
            Filters
          </label>
          {configuredFilters && configuredFilters.length > 0 && (
            <select
              className="border border-gray-300 rounded-md p-2 w-60"
              onChange={(e) => setCurrentFilter(e.target.value)}
              value={currentFilter}
            >
              <option value="-1">Select filter...</option>
              {configuredFilters.map((ele) => (
                <option key={ele.id} value={ele.name}>
                  {ele.name}
                </option>
              ))}
            </select>
          )}
          <input
            type="text"
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
            className="border border-gray-300 rounded-md p-2 w-60"
          />
          <button
            onClick={(e) => {
              console.log("Apply filter");
              applyFilter();
            }}
            disabled={filterValue === "" || currentFilter === "-1"}
            className="border border-gray-300 bg-black text-white rounded-md p-2 mt-1 text-xs"
          >
            Apply filter
          </button>
        </div>
      </div>
    </>
  );
};

export default MapFilters;
