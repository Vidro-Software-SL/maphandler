import { useMaps } from "@/contexts/maps";
import { useMessages } from "@/contexts/messages";
import { useEffect } from "react";

const MapIframe = () => {
  const { map, sessionToken } = useMaps();
  const { start } = useMessages();

  useEffect(() => {
    if (!sessionToken) return;
    start(sessionToken); //starts communicator
  }, [sessionToken]);

  if (!map && !sessionToken) return null;
  return (
    <iframe
      id="map-frame"
      name="map-frame"
      src={map}
      allow="geolocation"
      className="h-screen w-full"
    ></iframe>
  );
};
export default MapIframe;
