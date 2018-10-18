import { validatePolygonGeoJSON } from "./Validator";
import geometry from "./Geometry";
import { pointGeoJSON, polygonGeoJSON, pointArray } from "./types";

const findNearestVertexOnPolygon = (
  polygonGeoJSON: polygonGeoJSON,
  pointGeoJSON: pointGeoJSON
) => {
  validatePolygonGeoJSON(polygonGeoJSON);

  let nearestPoint: pointArray = [];
  let nearestLength = -1;
  let savedIndex = -1;
  const polCoords = polygonGeoJSON.coordinates[0];
  const pointCoords = pointGeoJSON.coordinates;

  if (polCoords[0].length !== 2 || pointCoords.length !== 2) {
    throw new Error("invalid coordinates from geoJSON");
  }

  for (let i = 0; i < polCoords.length; i++) {
    const pointPolygon = polCoords[i];
    let lengthPointVertex = geometry.calcLength(pointCoords, pointPolygon);
    if (nearestLength >= lengthPointVertex || nearestLength <= 0) {
      nearestLength = lengthPointVertex;
      nearestPoint = pointPolygon;
      savedIndex = i;
    }
  }

  // if point is not properly generated
  if (!nearestPoint[0]) return null;

  const distance = geometry.calcLength(nearestPoint, pointCoords);

  return {
    type: "Point",
    coordinates: [nearestPoint[0], nearestPoint[1]],
    idPoly: savedIndex,
    distance
  };
};

export default findNearestVertexOnPolygon;
