import MapButtons from "@/components/MapButtons";
import MapIframe from "@/components/MapIframe";
import MapInfo from "@/components/MapInfo";
import AuthComponent from "@/components/AuthComponent";
import { AuthProvider } from "@/contexts/auth";
import { MapsProvider } from "@/contexts/maps";
import { MessageProvider } from "@/contexts/messages";
import Image from "next/image";
import MapList from "@/components/MapList";
import MapLayers from "@/components/MapLayers";
import MapFilters from "@/components/MapFilters";

export default function Home() {
  return (
    <div>
      <AuthProvider>
        <MessageProvider>
          <MapsProvider>
            <main className="text-center">
              <h1 className="text-3xl">Map component REACT integration</h1>
              <div className="my-5">
                <AuthComponent />
              </div>
              <div className="my-5">
                <MapList />
                <MapLayers />
                <MapFilters />
              </div>

              <div className="my-5 bg-gray-100 border border-gray-400  p-4">
                <MapButtons />
                <MapInfo />
                <MapIframe />
              </div>
            </main>
          </MapsProvider>
        </MessageProvider>
      </AuthProvider>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://www.vidrosoftware.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/logo.png"
            alt="Vidrosoftware"
            width={150}
            height={120}
          />
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://github.com/Vidro-Software-SL/maphandler"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Documentation
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://discord.com/channels/1305257097843179642/1305257098313072714"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/discord.svg"
            alt="Discord icon"
            width={16}
            height={16}
          />
          Discord channel
        </a>
      </footer>
    </div>
  );
}
