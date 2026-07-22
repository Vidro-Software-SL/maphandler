import { EventEmitter } from 'events';

declare module '@vidro/map-handler' {
    import {
        CommunicatorOptions,
        Geometry,
        HighlightOptions,
        MapEventData,
        AddGeomOptions,
        LayerProperties,
        LayerConditionVisibilityOptions,
        PrintOptions,
        IconOptions,
        CustomColorsProperties,
        ScreenshotOptions,
        DpiOptions,
    } from './src/types';

    export class Communicator extends EventEmitter {
        constructor(data: CommunicatorOptions);

        // Event management
        removeListener(event: string, listener: (...args: any[]) => void): this;
        on(event: string, listener: (data: MapEventData) => void): this;
        off(event: string, listener: (data: MapEventData) => void): this;

        // Map controls
        ZoomIn(): void;
        ZoomOut(): void;
        zoomToExtent(): void;
        clear(): void;

        // Geometry operations
        AddGeom(geomtype: string, options?: AddGeomOptions): void;
        CancelAddGeom(s?: any): void;
        Highlight(options: HighlightOptions): void;
        DrawGeometries(geoms: Geometry[]): void;
        DrawGeometry(geom: any, styles: any, name?: string, id?: string): void;
        RemoveGeometry(id: string, layer?: string | null): void;
        RemoveGeometriesByProperty(layer: string, property: string, value: any): void;
        UpdateGeometriesByProperty(layer: string, property: string, value: any, style: any): void;

        // Layer management
        loadMultipleLayers(layers: any[]): void;
        toggleGroup(layers: any[]): void;
        toggleLayer(layer: string, properties?: LayerProperties): void;
        removeLayer(layer: string): void;
        displayLayer(layer: string): void;
        setActiveLayer(layer: string): void;
        getActiveLayer(): void;
        bringLayerToTop(layer: string): void;
        bringLayerToBottom(layer: string): void;
        loadWMSAvailableLayers(): void;
        reloadDisplayedLayers(): void;
        setLayerConditionVisibility(layer: string, conditionIds: number[]): void;

        // Navigation
        zoomToCoordinates(lat: number, lon: number, zoomLevel?: number): void;
        zoomToGeometry(geom: any, limits?: any): void;
        zoomToScale(scale: string): void;
        CenterMap(lat: number, lon: number): void;

        // Information
        infoFromCoordinates(type: string, layer?: string, hitTolerance?: number, format?: string): void;
        getElementsFromLayer(layer?: string, limit?: number, format?: string): void;

        // Geolocation
        Geolocalize(toggle: any, options?: any): void;

        // Background
        toggleGiswaterTiled(toggle: any, tiled: any): void;
        toggleTiled(toggle: any, tiled: any): void;
        getTiled(): void;
        toggleSecondaryBackground(toggle: any): void;
        getSecondaryBackground(): void;
        changeBackground(newBackground: any): void;
        getBackground(): void;

        // GeoJSON
        addGeoJSON(geoJSON: any, options?: any, name?: string): void;
        clearGeoJSON(name: string): void;
        removeGeoJSONLayer(name: string): void;

        // Filters
        setGiswaterFilters(filters: any): void;
        setFilters(filters: any): void;
        getGiswaterLayerAvailableFilters(layer_name: string): void;

        // TOC
        getToc(): void;

        // Debug & Configuration
        setDebug(what: number): void;
        setCustomColors(properties: CustomColorsProperties): void;

        // Measure tools
        initMeasure(measure: any, textStart: string, textContinue: string): void;
        cancelMeasure(): void;
        setBboxSize(bbox: number): void;

        // Icons
        addIcon(options: IconOptions): void;

        // Screenshot & Print
        screenshot(options?: ScreenshotOptions): void;
        setDpi(options?: DpiOptions): void;
        print(options?: PrintOptions): void;
        startPrint(options?: PrintOptions): void;
        cancelPrint(options?: PrintOptions): void;
    }

    // Export constants if they exist
    export const MAP_EVENTS: {
        ZOOM_CHANGE: string;
        LOADED: string;
        CAPABILITIES: string;
        ERROR: string;
        GEOLOCATION: string;
        END_MEASURE: string;
        START_MEASURE: string;
        UNLOADED: string;
        COORDINATES: string;
        CENTER_CHANGE: string;
        ACTIVE_LAYER: string;
        WMS_LAYERS: string;
        STATUS: string;
        INFO: string;
        GEOM_ADDED: string;
        LAYERS: string;
        VERSION: string;
        HOVER: string;
        SCREENSHOT: string;
        PRINT: string;
        DPI: string;
    };
}
