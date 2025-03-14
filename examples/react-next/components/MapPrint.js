import { useMessages } from "@/contexts/messages";
import { usePrint } from "@/contexts/print";
import PrintLayoutSelector from "@/atoms/PrintLayoutSelector";
import PrintPaperSizeSelector from "@/atoms/PrintPaperSizeSelector";
import ZoomToScaleButton from "@/atoms/ZoomToScaleButton";
import PrintScaleSelector from "@/atoms/PrintScaleSelector";
import { useMaps } from "@/contexts/maps";
const MapPrint = ({ map }) => {
  const { cancelPrint, print } = useMessages();
  const { mapScale } = useMaps();
  const { startPrint, printEnabled } = usePrint();
  return (
    <div className="absolute bg-white/60 left-0 py-1 px-5 m-5 text-left border border-gray-300 rounded-md">
      <button
        onClick={(e) => {
          console.log("Print");
          if (!mapScale || mapScale === "-1") {
            alert("Choose scale first");
            return;
          }
          if (printEnabled) {
            print();
          } else {
            startPrint();
          }
        }}
        className="border border-gray-300 bg-black text-white rounded-md p-2 my-1 text-xs"
      >
        Print
      </button>
      {printEnabled && (
        <button
          onClick={(e) => {
            console.log("Print");
            cancelPrint();
          }}
          className="border border-gray-300 bg-black text-white rounded-md p-2 my-1 text-xs"
        >
          Cancel print
        </button>
      )}
      <div className="text-xs text-left">
        <PrintPaperSizeSelector />
        <PrintLayoutSelector />
        <PrintScaleSelector />
      </div>
    </div>
  );
};
export default MapPrint;
