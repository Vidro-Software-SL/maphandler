import { usePrint } from "@/contexts/print";
const { useMessages } = require("@/contexts/messages");
const { useState, useEffect } = require("react");

const PrintLayoutSelector = () => {
  const { zoomToScale } = useMessages();
  const { paperLayout, setPaperLayout, printEnabled } = usePrint();
  const layouts = [
    { id: "landscape", val: "landscape", label: "landscape" },
    { id: "portrait", val: "portrait", label: "portrait" },
  ];

  const [actualValue, setActualValue] = useState(
    paperLayout ? paperLayout : "landscape"
  );
  useEffect(() => {
    if (!paperLayout) return;
    const current = layouts.find((s) => s.val === paperLayout);
    if (current) {
      setActualValue(current.val);
    } else {
      setActualValue("landscape");
    }
    console.log("paperLayout", paperLayout);
  }, [paperLayout]);
  return (
    <div className="mx-2 pt-2">
      <label>Layout:</label>
      <select
        disabled={printEnabled}
        value={actualValue}
        onChange={(e) => {
          const newVal = !isNaN(e.target.value)
            ? Number(e.target.value)
            : e.target.value;
          setActualValue(newVal);
          setPaperLayout(newVal);
        }}
      >
        {layouts.map((opt, index) => {
          return (
            <option key={`opt_layout_${index}`} value={opt.val}>
              {opt.label}
            </option>
          );
        })}
      </select>
    </div>
  );
};
export default PrintLayoutSelector;
