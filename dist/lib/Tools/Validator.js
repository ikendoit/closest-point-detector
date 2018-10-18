"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var throwInvalidError = function (polygonGeoJSON) {
    throw new Error("invalid geometry chosen: " + JSON.stringify(polygonGeoJSON));
};
var validatePolygonGeoJSON = function (polygonGeoJSON) {
    try {
        if (polygonGeoJSON.type.toUpperCase() !== 'POLYGON') {
            throwInvalidError(polygonGeoJSON);
        }
        var coordinates = polygonGeoJSON.coordinates[0];
        if (coordinates[0].length !== 2 && typeof coordinates[0] !== 'number') {
            throwInvalidError(polygonGeoJSON);
        }
    }
    catch (err) {
        throwInvalidError(polygonGeoJSON);
    }
};
exports.validatePolygonGeoJSON = validatePolygonGeoJSON;
