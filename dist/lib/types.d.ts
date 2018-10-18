export declare type pointArrayType = Array<Array<number>> | Array<number>;
export interface pointGeoJSON {
    type: String;
    coordinates: Array<number>;
}
export interface polygonGeoJSON {
    type: String;
    coordinates: Array<Array<Array<number>>>;
}
export interface lineGeoJSON {
    type: String;
    coordinates: Array<Array<number>>;
}
export interface IPointLatLng {
    lng: number;
    lat: number;
}
export declare type pointArray = Array<number>;
