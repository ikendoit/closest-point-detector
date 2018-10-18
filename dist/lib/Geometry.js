"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// points: [longitude,latitude] || geoJSON
var calcLength = function (point1, point2) {
    var x1, x2, y1, y2;
    if (Array.isArray(point1) &&
        Array.isArray(point2) &&
        point1.length >= 2 &&
        point2.length >= 2) {
        x1 = point1[0];
        x2 = point2[0];
        y1 = point1[1];
        y2 = point2[1];
    }
    else {
        console.log("invalid point coordinates");
        throw new Error("invalid point coordinates");
    }
    return parseFloat(Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2)).toFixed(13));
};
var getMirrorPointOnLine = function (point1, point2, pointOrigin) {
    var x1 = point1[0];
    var x2 = point2[0];
    var x3 = pointOrigin[0];
    var y1 = point1[1];
    var y2 = point2[1];
    var y3 = pointOrigin[1];
    // y = f(x) = a*x + b  (a = slope)
    var a = null;
    var mirrorPoint;
    var mirrorX;
    var mirrorY;
    if (y1 === y2) {
        mirrorX = x3;
        mirrorY = y2;
    }
    else if (x1 === x2) {
        mirrorX = x1;
        mirrorY = y3;
    }
    else {
        // compute slope of y=ax+b
        a = (y1 - y2) / (x1 - x2);
        // compute X coordinate of mirror point
        mirrorX = (a * y3 + x3 - a * y1 + x1 * Math.pow(a, 2)) * (1 / (1 + Math.pow(a, 2)));
        // compute Y coordinate of mirror point
        mirrorY = (a * y3 + x3 - mirrorX) / a;
    }
    mirrorPoint = [mirrorX, mirrorY];
    // check if mirror point is between point1 and 2 : AX + BX === AB
    if (pointOnLine(point1, point2, mirrorPoint)) {
        return mirrorPoint;
    }
    else {
        // if mirror point is not between point1 and point2 => return null
        return null;
    }
};
var pointOnLine = function (point1, point2, pointToCheck, toFixedConst) {
    if (toFixedConst === void 0) { toFixedConst = 13; }
    var point1_pointCheck_point2 = calcLength(point1, pointToCheck) + calcLength(pointToCheck, point2);
    var point1_point2 = calcLength(point1, point2);
    return (point1_pointCheck_point2.toFixed(toFixedConst) ===
        point1_point2.toFixed(toFixedConst));
};
var geometry = {
    calcLength: calcLength,
    getMirrorPointOnLine: getMirrorPointOnLine,
    pointOnLine: pointOnLine,
};
exports.default = geometry;
