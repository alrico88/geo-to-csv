import type { FeatureCollection, GeoJSON } from "geojson";

export function normalizeAsFeatureCollection(
  geojson: GeoJSON
): FeatureCollection {
  if (geojson.type === "FeatureCollection") {
    return geojson;
  } else if (geojson.type === "Feature") {
    return {
      type: "FeatureCollection",
      features: [geojson],
    };
  } else {
    return {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          geometry: geojson,
          properties: {},
        },
      ],
    };
  }
}
