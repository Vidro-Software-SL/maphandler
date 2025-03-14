import ZoomToScaleButton from "@/atoms/ZoomToScaleButton";
import { useAuth } from "@/contexts/auth";
import { useMaps } from "@/contexts/maps";
import { useMessages } from "@/contexts/messages";

const MapButtons = () => {
  const { logged } = useAuth();
  const { map, mapReady, clickedCoordinates } = useMaps();
  const {
    ZoomIn,
    ZoomOut,
    zoomToExtent,
    drawPoint,
    Clear,
    Highlight,
    centerMap,
  } = useMessages();
  if (!logged) return null;
  return (
    <>
      {!mapReady && <div>Waiting map...</div>}
      {mapReady && (
        <div className="flex gap-1 text-xs">
          <button
            onClick={(e) => {
              console.log("Zoom +");
              ZoomIn();
            }}
            disabled={!map}
            className="border border-gray-300 bg-black text-white rounded-md p-2"
          >
            Zoom +
          </button>
          <button
            onClick={(e) => {
              console.log("Zoom -");
              ZoomOut();
            }}
            className="border border-gray-300 bg-black text-white rounded-md p-2"
          >
            Zoom -
          </button>
          <button
            onClick={(e) => {
              console.log("Zoom to extent");
              zoomToExtent();
            }}
            className="border border-gray-300 bg-black text-white rounded-md p-2"
          >
            Zoom to extent
          </button>
          <button
            onClick={(e) => {
              console.log("Draw point");
              drawPoint({});
            }}
            className="border border-gray-300 bg-black text-white rounded-md p-2"
          >
            Add point
          </button>
          <button
            onClick={(e) => {
              console.log("Clear");
              Clear();
            }}
            className="border border-gray-300 bg-black text-white rounded-md p-2"
          >
            Clear
          </button>
          <button
            onClick={(e) => {
              console.log("Highlight clickedCoordinates", clickedCoordinates);
              Highlight(
                {
                  feature_type: "HIGHLIGHT",
                  geom: `POINT(${clickedCoordinates[0]} ${clickedCoordinates[1]})`,
                },
                2,
                {
                  duration: 1500,
                  repeat: true,
                },
                0,
                null
              );
            }}
            disabled={!clickedCoordinates}
            className="border border-gray-300 bg-black text-white rounded-md p-2"
          >
            Highlight clicked coordinates
          </button>
          <button
            onClick={(e) => {
              console.log("Highlight clickedCoordinates", clickedCoordinates);
              centerMap(clickedCoordinates);
            }}
            disabled={!clickedCoordinates}
            className="border border-gray-300 bg-black text-white rounded-md p-2"
          >
            Center map to clicked coordinates
          </button>
          <ZoomToScaleButton />
        </div>
      )}
    </>
  );
};
export default MapButtons;
