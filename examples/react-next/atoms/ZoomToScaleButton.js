const { useMaps } = require("@/contexts/maps");
const { useMessages } = require("@/contexts/messages");
const { useState, useEffect } = require("react");

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
export default ZoomToScaleButton;
