import { useAuth } from "@/contexts/auth";
import { useMaps } from "@/contexts/maps";
import { useMessages } from "@/contexts/messages";
import { useEffect, useState } from "react";

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

const ZoomToScaleButton = () => {
  const { zoomToScale } = useMessages();
  const { mapScale } = useMaps();
  const scales = [
    { id: "1:100", val: "1:100", label: "1:100" },
    { id: "1:200", val: "1:200", label: "1:200" },
    { id: "1:500", val: "1:500", label: "1:500" },
    { id: "1:1000", val: "1:1000", label: "1:1000" },
    { id: "1:2000", val: "1:2000", label: "1:2000" },
    { id: "1:5000", val: "1:5000", label: "1:5000" },
    { id: "1:10000", val: "1:10000", label: "1:10000" },
    { id: "1:50000", val: "1:50000", label: "1:50000" },
  ];

  const [actualValue, setActualValue] = useState(mapScale ? mapScale : "-1");
  useEffect(() => {
    if (!mapScale) return;
    const scale = scales.find((s) => s.val === mapScale);
    if (scale) {
      setActualValue(scale.val);
    } else {
      setActualValue("-1");
    }
    console.log("mapScale", mapScale, scale);
  }, [mapScale]);
  return (
    <div className="mx-2 pt-2">
      <label>Zoom to scale:</label>
      <select
        value={actualValue}
        onChange={(e) => {
          const newVal = !isNaN(e.target.value)
            ? Number(e.target.value)
            : e.target.value;
          setActualValue(newVal);
          zoomToScale(newVal);
        }}
      >
        <option key={`opt_select_scale`} value="-1">
          Select scale...
        </option>
        {scales.map((opt, index) => {
          return (
            <option key={`opt_${index}`} value={opt.val}>
              {opt.label}
            </option>
          );
        })}
      </select>
    </div>
  );
};
