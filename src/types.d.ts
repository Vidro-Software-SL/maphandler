export interface CommunicatorOptions {
    sessionToken: string;
    id?: string;
}

export interface Geometry {
    geom: string;
    style?: string;
    featureId?: string;
    id?: string;
}

export interface HighlightOptions {
    geom: string;
    zoom?: number | null;
    center?: boolean;
    animate?: boolean;
    data?: string;
    style?: string;
}

export interface MapEventData {
    type: string;
    [key: string]: any;
}

export interface AddGeomOptions {
    texts?: any;
    style?: any;
    drawOnEnd?: boolean;
    showConfirm?: boolean;
}

export interface LayerProperties {
    gutter?: number | null;
    transparent?: boolean | null;
    singletile?: boolean | null;
    zIndex?: number | null;
}

export interface LayerConditionVisibilityOptions {
    layer: string;
    conditionIds: number[];
}

export interface PrintOptions {
    [key: string]: any;
}

export interface IconOptions {
    icon: ArrayBuffer;
    coordinates: [number, number];
}

export interface CustomColorsProperties {
    geom_stroke_width?: number;
    geom_radius?: number;
    geom_shape?: 'circle' | 'square';
    [key: string]: any;
}

export interface ScreenshotOptions {
    [key: string]: any;
}

export interface DpiOptions {
    [key: string]: any;
}


/** Map-scoped Digital Dashboard contract version 1. Native coordinates use projection. */
export type DigitalDashboardAction = 'load' | 'clear' | 'locate' | 'tool' | 'style' | 'finish' | 'cancel' | 'select' | 'textEdit' | 'text' | 'update' | 'move' | 'delete' | 'undo' | 'redo' | 'snapshot' | 'context' | 'restore' | 'export';
export interface DigitalDashboardFeature {
    featureId: string;
    type: 'circle' | 'line' | 'point' | 'polygon' | 'text';
    geometry: { center?: [number, number]; radius?: number; coordinates?: number[] | number[][] | number[][][] };
    text?: string;
    targetFeatureId?: string;
    style: { color: string; width: number; fontSize: number };
    order: number;
}
export interface DigitalDashboardView {
    projection: string;
    extent: [number, number, number, number];
    center: [number, number];
    resolution: number;
    rotation: number;
    viewport: [number, number];
}
export interface DigitalDashboardDocument {
    schemaVersion: 1;
    noteId: string;
    mapId: number;
    revision: number;
    projection: string;
    previewAssetId?: string;
    title: string;
    description: string;
    createdAt?: string;
    updatedAt?: string;
    observedAt?: string;
    features: DigitalDashboardFeature[];
    viewContext?: DigitalDashboardView;
    userLocation?: { status: 'available' | 'denied' | 'timeout' | 'unavailable'; coordinates: [number, number] | null; capturedAt: string; accuracyMeters: number | null; projection: string };
}
export interface DigitalDashboardRequest {
    contractVersion: 1;
    requestId: string;
    sessionId: string;
    mapId: number;
    noteId: string;
    action: DigitalDashboardAction;
    payload?: Record<string, unknown>;
}
export interface DigitalDashboardEvent {
    contractVersion: 1;
    requestId?: string;
    sessionId: string;
    mapId: number;
    noteId?: string;
    event: 'textEditor' | 'changed' | 'selection' | 'tool' | 'snapshot' | 'export' | 'result' | 'error';
    content: Record<string, unknown>;
}
