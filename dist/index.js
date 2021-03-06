"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Geometry_1 = __importDefault(require("./lib/Geometry"));
exports.geometry = Geometry_1.default;
var FindNearestPointOnPolygon_1 = __importDefault(require("./lib/FindNearestPointOnPolygon"));
exports.findNearestPointOnPolygon = FindNearestPointOnPolygon_1.default;
var FindNearestVertexOnPolygon_1 = __importDefault(require("./lib/FindNearestVertexOnPolygon"));
exports.findNearestVertexOnPolygon = FindNearestVertexOnPolygon_1.default;
