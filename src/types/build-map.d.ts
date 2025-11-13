/**
 * 百度地图 API TypeScript 类型声明
 * Baidu Map API v3.0
 */

declare namespace BMap {
  class Map {
    constructor(container: string | HTMLElement, opts?: MapOptions);
    centerAndZoom(center: Point, zoom: number): void;
    enableScrollWheelZoom(enabled?: boolean): void;
    addOverlay(overlay: Overlay): void;
    removeOverlay(overlay: Overlay): void;
    clearOverlays(): void;
    addControl(control: Control): void;
    getZoom(): number;
    setZoom(zoom: number): void;
    getCenter(): Point;
    setCenter(center: Point | string): void;
  }

  interface MapOptions {
    minZoom?: number;
    maxZoom?: number;
    enableMapClick?: boolean;
  }

  class Point {
    constructor(lng: number, lat: number);
    lng: number;
    lat: number;
    equals(other: Point): boolean;
  }

  class Pixel {
    constructor(x: number, y: number);
    x: number;
    y: number;
    equals(other: Pixel): boolean;
  }

  class Size {
    constructor(width: number, height: number);
    width: number;
    height: number;
    equals(other: Size): boolean;
  }

  class Bounds {
    constructor(sw: Point, ne: Point);
    equals(other: Bounds): boolean;
    containsPoint(point: Point): boolean;
    containsBounds(bounds: Bounds): boolean;
  }

  abstract class Overlay {
    abstract initialize(map: Map): HTMLElement;
    abstract draw(): void;
    isVisible(): boolean;
    show(): void;
    hide(): void;
  }

  class Marker extends Overlay {
    constructor(point: Point, opts?: MarkerOptions);
    setPosition(position: Point): void;
    getPosition(): Point;
    setIcon(icon: Icon): void;
    getIcon(): Icon;
    setLabel(label: Label): void;
    getLabel(): Label;
    setTitle(title: string): void;
    getTitle(): string;
    addEventListener(event: string, handler: Function): void;
    removeEventListener(event: string, handler: Function): void;
  }

  interface MarkerOptions {
    offset?: Size;
    icon?: Icon;
    enableMassClear?: boolean;
    enableDragging?: boolean;
    enableClicking?: boolean;
    raiseOnDrag?: boolean;
    draggingCursor?: string;
    rotation?: number;
    title?: string;
  }

  class Icon {
    constructor(url: string, size: Size, opts?: IconOptions);
    anchor: Size;
    size: Size;
    imageOffset: Size;
    imageSize: Size;
    imageUrl: string;
    setImageUrl(imageUrl: string): void;
    setSize(size: Size): void;
    setImageSize(imageSize: Size): void;
    setAnchor(anchor: Size): void;
    setImageOffset(imageOffset: Size): void;
  }

  interface IconOptions {
    anchor?: Size;
    imageOffset?: Size;
    imageSize?: Size;
    infoWindowAnchor?: Size;
    printImageUrl?: string;
  }

  class Label {
    constructor(content: string, opts?: LabelOptions);
    setStyle(styles: any): void;
    setContent(content: string): void;
    setPosition(position: Point): void;
    getPosition(): Point;
    setOffset(offset: Size): void;
    getOffset(): Size;
    setTitle(title: string): void;
    getTitle(): string;
    addEventListener(event: string, handler: Function): void;
    removeEventListener(event: string, handler: Function): void;
  }

  interface LabelOptions {
    offset?: Size;
    position?: Point;
    enableMassClear?: boolean;
  }

  class Polyline extends Overlay {
    constructor(points: Point[], opts?: PolylineOptions);
    setPath(path: Point[]): void;
    getPath(): Point[];
    setStrokeColor(color: string): void;
    getStrokeColor(): string;
    setStrokeWeight(weight: number): void;
    getStrokeWeight(): number;
    setStrokeOpacity(opacity: number): void;
    getStrokeOpacity(): number;
    setStrokeStyle(style: string): void;
    getStrokeStyle(): string;
    addEventListener(event: string, handler: Function): void;
    removeEventListener(event: string, handler: Function): void;
  }

  interface PolylineOptions {
    strokeColor?: string;
    strokeWeight?: number;
    strokeOpacity?: number;
    strokeStyle?: string;
    enableMassClear?: boolean;
    enableEditing?: boolean;
    enableClicking?: boolean;
  }

  class Polygon extends Overlay {
    constructor(points: Point[], opts?: PolygonOptions);
    setPath(path: Point[]): void;
    getPath(): Point[];
    setStrokeColor(color: string): void;
    getStrokeColor(): string;
    setStrokeWeight(weight: number): void;
    getStrokeWeight(): number;
    setStrokeOpacity(opacity: number): void;
    getStrokeOpacity(): number;
    setStrokeStyle(style: string): void;
    getStrokeStyle(): string;
    setFillColor(color: string): void;
    getFillColor(): string;
    setFillOpacity(opacity: number): void;
    getFillOpacity(): number;
    addEventListener(event: string, handler: Function): void;
    removeEventListener(event: string, handler: Function): void;
  }

  interface PolygonOptions {
    strokeColor?: string;
    strokeWeight?: number;
    strokeOpacity?: number;
    strokeStyle?: string;
    fillColor?: string;
    fillOpacity?: number;
    enableMassClear?: boolean;
    enableEditing?: boolean;
    enableClicking?: boolean;
  }

  class Circle extends Overlay {
    constructor(center: Point, radius: number, opts?: CircleOptions);
    setCenter(center: Point): void;
    getCenter(): Point;
    setRadius(radius: number): void;
    getRadius(): number;
    setStrokeColor(color: string): void;
    getStrokeColor(): string;
    setStrokeWeight(weight: number): void;
    getStrokeWeight(): number;
    setStrokeOpacity(opacity: number): void;
    getStrokeOpacity(): number;
    setStrokeStyle(style: string): void;
    getStrokeStyle(): string;
    setFillColor(color: string): void;
    getFillColor(): string;
    setFillOpacity(opacity: number): void;
    getFillOpacity(): number;
    addEventListener(event: string, handler: Function): void;
    removeEventListener(event: string, handler: Function): void;
  }

  interface CircleOptions {
    strokeColor?: string;
    strokeWeight?: number;
    strokeOpacity?: number;
    strokeStyle?: string;
    fillColor?: string;
    fillOpacity?: number;
    enableMassClear?: boolean;
    enableEditing?: boolean;
    enableClicking?: boolean;
  }

  class InfoWindow {
    constructor(content: string | HTMLElement, opts?: InfoWindowOptions);
    setWidth(width: number): void;
    getWidth(): number;
    setHeight(height: number): void;
    getHeight(): number;
    setTitle(title: string): void;
    getTitle(): string;
    setContent(content: string | HTMLElement): void;
    getContent(): string | HTMLElement;
    addEventListener(event: string, handler: Function): void;
    removeEventListener(event: string, handler: Function): void;
  }

  interface InfoWindowOptions {
    width?: number;
    height?: number;
    maxWidth?: number;
    offset?: Size;
    title?: string;
    enableAutoPan?: boolean;
    enableCloseOnClick?: boolean;
    enableMessage?: boolean;
  }

  abstract class Control {
    abstract initialize(map: Map): HTMLElement;
    setAnchor(anchor: ControlAnchor): void;
    getAnchor(): ControlAnchor;
    setOffset(offset: Size): void;
    getOffset(): Size;
    show(): void;
    hide(): void;
    isVisible(): boolean;
  }

  class NavigationControl extends Control {
    constructor(opts?: NavigationControlOptions);
  }

  interface NavigationControlOptions {
    anchor?: ControlAnchor;
    offset?: Size;
    type?: NavigationControlType;
    showZoomInfo?: boolean;
    enableGeolocation?: boolean;
  }

  class ScaleControl extends Control {
    constructor(opts?: ScaleControlOptions);
  }

  interface ScaleControlOptions {
    anchor?: ControlAnchor;
    offset?: Size;
  }

  class MapTypeControl extends Control {
    constructor(opts?: MapTypeControlOptions);
  }

  interface MapTypeControlOptions {
    anchor?: ControlAnchor;
    offset?: Size;
    type?: MapTypeControlType;
    mapTypes?: MapType[];
  }

  enum ControlAnchor {
    BMAP_ANCHOR_TOP_LEFT = 0,
    BMAP_ANCHOR_TOP_RIGHT = 1,
    BMAP_ANCHOR_BOTTOM_LEFT = 2,
    BMAP_ANCHOR_BOTTOM_RIGHT = 3
  }

  enum NavigationControlType {
    BMAP_NAVIGATION_CONTROL_LARGE = 0,
    BMAP_NAVIGATION_CONTROL_SMALL = 1,
    BMAP_NAVIGATION_CONTROL_PAN = 2,
    BMAP_NAVIGATION_CONTROL_ZOOM = 3
  }

  enum MapTypeControlType {
    BMAP_MAPTYPE_CONTROL_HORIZONTAL = 0,
    BMAP_MAPTYPE_CONTROL_DROPDOWN = 1,
    BMAP_MAPTYPE_CONTROL_MAP = 2
  }

  enum MapType {
    BMAP_NORMAL_MAP = 0,
    BMAP_PERSPECTIVE_MAP = 1,
    BMAP_SATELLITE_MAP = 2,
    BMAP_HYBRID_MAP = 3
  }

  // 事件类型
  interface MapEvent {
    type: string;
    target: any;
    point: Point;
    pixel: Pixel;
    overlay: Overlay;
  }
}

// 全局 BMap 对象
declare const BMap: typeof BMap;