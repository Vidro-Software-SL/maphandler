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
