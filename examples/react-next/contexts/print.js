"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { useMessages } from "./messages";
import { MAP_EVENTS } from "@/shared/constants";
import { useMaps } from "./maps";
import { useAuth } from "./auth";

const PrintsContext = createContext({});

export const PrintsProvider = ({ children }) => {
  const [paperSize, setPaperSize] = useState("A4");
  const [paperLayout, setPaperLayout] = useState("landscape");
  const [printEnabled, setPrintEnabled] = useState(null);
  const { mapId, displayedLayers, mapScale } = useMaps();
  const { apiUrl, token } = useAuth();
  const { startPrint: startPrintMessages, setMessage, message } = useMessages();

  useEffect(() => {
    if (!message) return;

    switch (message.type) {
      case MAP_EVENTS.PRINT:
        console.log("useMapEvents print event", message, message.content);
        if (message.content?.print === true) {
          setPrintEnabled(true);
        } else if (message.content?.print === false) {
          setPrintEnabled(false);
        }
        if (message.content?.file) {
          sendPrintToApi(message.content.file);
          setPrintEnabled(false);
        }
        setMessage(null);
        break;
    }
  }, [message]);

  const sendPrintToApi = async (file) => {
    const data = {
      scale: "1:100",
      template: "basic",
      content: file,
      format: paperSize,
      layout: paperLayout,
      displayedLayers,
    };
    try {
      // Create FormData object for the request payload
      const bodyFormData = new FormData();
      for (const [key, value] of Object.entries(data)) {
        bodyFormData.append(key, value);
      }

      // Set headers dynamically, including Authorization if available
      const headers = {};

      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      // Send POST request using fetch
      const response = await fetch(`${apiUrl}/print/${mapId}`, {
        method: "POST",
        headers, // No need to set "Content-Type" for FormData (browser sets it automatically)
        body: bodyFormData,
      });

      // Check if the request was successful
      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.statusText}`);
      }

      // Get the response as a Blob (PDF)
      const pdfBlob = await response.blob();

      // Create a download link
      const link = document.createElement("a");
      link.href = URL.createObjectURL(pdfBlob);
      link.download = "myprint.pdf"; // Set filename
      document.body.appendChild(link);
      link.click(); // Trigger download
      document.body.removeChild(link);

      return true;
    } catch (error) {
      console.error("Error sending print request:", error);
      return false;
    }
  };

  useEffect(() => {
    if (!paperLayout) return;
    console.log("set paperLayout", paperLayout);
  }, [paperLayout]);

  useEffect(() => {
    if (!paperSize) return;
    console.log("set paperSize", paperSize);
  }, [paperSize]);

  const startPrint = () => {
    console.log("Start print");
    startPrintMessages({
      paperLayout: paperLayout ? paperLayout : "landscape",
      paperSize: paperSize ? paperSize : "A4",
    });
  };

  return (
    <PrintsContext.Provider
      value={{
        paperLayout,
        setPaperLayout,
        paperSize,
        setPaperSize,
        startPrint,
        printEnabled,
      }}
    >
      {children}
    </PrintsContext.Provider>
  );
};

export const usePrint = () => useContext(PrintsContext);
