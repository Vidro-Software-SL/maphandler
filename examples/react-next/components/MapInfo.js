import { useMaps } from "@/contexts/maps";
import useMapEvents from "@/hooks/useMapEvents";
const MapInfo = () => {
  useMapEvents();
  const {
    zoomLevel,
    mapScale,
    clickedCoordinates,
    map,
    displayedLayers,
    mapResolution,
  } = useMaps();
  if (!map) return null;
  return (
    <div className="absolute bg-white/60 right-0 p-5">
      <div className="flex flex-col gap-1 text-xs">
        <div>Zoom level: {zoomLevel}</div>
        <div>Map scale: {mapScale}</div>
        <div>Map resolution: {mapResolution}</div>
        <div>Clicked coordinates: {clickedCoordinates}</div>
      </div>
      <div className="bg-black/20 p-5 text-left mt-2">
        <span>Displayed Layers:</span>

        {displayedLayers && displayedLayers.length > 0 && (
          <div className="mt-1 flex flex-col gap-1 text-xs">
            {displayedLayers.map((layer) => (
              <div key={`lay_${layer}`}> - {layer}</div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
export default MapInfo;
