import { usePrint } from "@/contexts/print";
const { useMessages } = require("@/contexts/messages");
const { useState, useEffect } = require("react");

const PrintPaperSizeSelector = () => {
  const { zoomToScale } = useMessages();
  const { paperSize, setPaperSize, printEnabled } = usePrint();
  const sizes = [
    { id: "A4", val: "A4", label: "A4" },
    { id: "A3", val: "A3", label: "A3" },
  ];

  const [actualValue, setActualValue] = useState(paperSize ? paperSize : "A4");
  useEffect(() => {
    if (!paperSize) return;
    const currentSize = sizes.find((s) => s.val === paperSize);
    if (currentSize) {
      setActualValue(currentSize.val);
    } else {
      setActualValue("A4");
    }
    console.log("paperSize", paperSize);
  }, [paperSize]);
  return (
    <div className="mx-2 pt-2 text-xs">
      <label>Paper size:</label>
      <select
        disabled={printEnabled}
        value={actualValue}
        onChange={(e) => {
          const newVal = !isNaN(e.target.value)
            ? Number(e.target.value)
            : e.target.value;
          setActualValue(newVal);
          setPaperSize(newVal);
        }}
      >
        {sizes.map((opt, index) => {
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
export default PrintPaperSizeSelector;
