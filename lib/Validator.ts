import { polygonGeoJSON } from "./types";

const throwInvalidError = (polygonGeoJSON: polygonGeoJSON) => {
  throw new Error(`invalid geometry chosen: ${JSON.stringify(polygonGeoJSON)}`);
};
const validatePolygonGeoJSON = (polygonGeoJSON: polygonGeoJSON) => {
  try {
    if (polygonGeoJSON.type.toUpperCase() !== "POLYGON") {
      throwInvalidError(polygonGeoJSON);
    }
    const coordinates = polygonGeoJSON.coordinates[0];

    if (coordinates[0].length !== 2 && typeof coordinates[0] !== "number") {
      throwInvalidError(polygonGeoJSON);
    }
  } catch (err) {
    throwInvalidError(polygonGeoJSON);
  }
};

export { validatePolygonGeoJSON };
