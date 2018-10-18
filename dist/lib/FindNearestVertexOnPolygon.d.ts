import { pointGeoJSON, polygonGeoJSON } from "./types";
declare const findNearestVertexOnPolygon: (polygonGeoJSON: polygonGeoJSON, pointGeoJSON: pointGeoJSON, VERTEX_THRESHOLD_SNAP?: number) => {
    type: string;
    coordinates: number[];
    idPoly: number;
    distance: number;
} | null;
export default findNearestVertexOnPolygon;
