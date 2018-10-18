"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Validator_1 = require("./Validator");
var Geometry_1 = __importDefault(require("./Geometry"));
var findNearestPointOnPolygon = function (polygonGeoJSON, pointGeoJSON, VERTEX_THRESHOLD_SNAP) {
    if (VERTEX_THRESHOLD_SNAP === void 0) { VERTEX_THRESHOLD_SNAP = 0.03; }
    Validator_1.validatePolygonGeoJSON(polygonGeoJSON);
    var nearestPoint = [];
    var nearestLength = -1;
    var savedIndex = -1;
    var polCoords = polygonGeoJSON.coordinates[0];
    var pointCoords = pointGeoJSON.coordinates;
    if (polCoords[0].length !== 2 || pointCoords.length !== 2) {
        throw new Error("invalid coordinates from IGeoJSON");
    }
    for (var i = 0; i < polCoords.length - 1; i++) {
        var mirrorPoint = Geometry_1.default.getMirrorPointOnLine(polCoords[i], polCoords[i + 1], pointCoords);
        if (!mirrorPoint)
            continue;
        var mirrorLength = Geometry_1.default.calcLength(pointCoords, mirrorPoint);
        if (nearestLength > mirrorLength || nearestLength <= 0) {
            nearestLength = mirrorLength;
            nearestPoint = mirrorPoint;
            savedIndex = i;
        }
    }
    // if point is not properly generated
    if (!nearestPoint[0])
        return null;
    var distance = Geometry_1.default.calcLength(nearestPoint, pointCoords);
    // if point is too far away
    if (distance > VERTEX_THRESHOLD_SNAP) {
        return null;
    }
    return {
        type: "Point",
        coordinates: [nearestPoint[0], nearestPoint[1]],
        idPoly: savedIndex,
        distance: distance
    };
};
exports.default = findNearestPointOnPolygon;
