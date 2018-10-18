import { validatePolygonGeoJSON } from "./Validator";
import geometry from "./Geometry";
import { pointGeoJSON, polygonGeoJSON, pointArray } from "./types";

const findNearestPointOnPolygon = (
  polygonGeoJSON: polygonGeoJSON,
  pointGeoJSON: pointGeoJSON,
  VERTEX_THRESHOLD_SNAP = 3
) => {
  validatePolygonGeoJSON(polygonGeoJSON);

  let nearestPoint: pointArray = [];
  let nearestLength: number = -1;
  let savedIndex: number = -1;
  const polCoords: number[][] | number[] = polygonGeoJSON.coordinates[0];
  const pointCoords: pointArray | number[][] = pointGeoJSON.coordinates;

  if (polCoords[0].length !== 2 || pointCoords.length !== 2) {
    throw new Error("invalid coordinates from IGeoJSON");
  }

  for (let i = 0; i < polCoords.length - 1; i++) {
    let mirrorPoint: pointArray | null = geometry.getMirrorPointOnLine(
      polCoords[i],
      polCoords[i + 1],
      pointCoords
    );
    if (!mirrorPoint) continue;

    let mirrorLength = geometry.calcLength(pointCoords, mirrorPoint);

    if (nearestLength > mirrorLength || nearestLength <= 0) {
      nearestLength = mirrorLength;
      nearestPoint = mirrorPoint;
      savedIndex = i;
    }
  }

  // if point is not properly generated
  if (!nearestPoint[0]) return null;

  const distance = geometry.calcLength(nearestPoint, pointCoords);
  // if point is too far away
  if (distance > VERTEX_THRESHOLD_SNAP) {
    return null;
  }

  return {
    type: "Point",
    coordinates: [nearestPoint[0], nearestPoint[1]],
    idPoly: savedIndex,
    distance
  };
};

export default findNearestPointOnPolygon;
