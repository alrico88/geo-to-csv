import type {
  FeatureCollection,
  GeoJSON,
  GeoJsonProperties,
  Point,
} from "geojson";
import { convertToWK } from "wkt-parser-helper";
import Papa from "papaparse";
import { filterAndMap } from "array-fm";
const { unparse } = Papa;
import { flatten } from "flat";
import { normalizeAsFeatureCollection } from "~/utils/normalize";

export function flattenProps(
  props: GeoJsonProperties
): Record<string, unknown> {
  return flatten<GeoJsonProperties, Record<string, unknown>>(props);
}

export function geojsonToCsv(geojson: GeoJSON): string {
  return unparse(
    normalizeAsFeatureCollection(geojson).features.map((feature) => ({
      ...flattenProps(feature.properties),
      wkt: convertToWK(feature),
    })),
    {
      header: true,
    }
  );
}

export function geojsonPointsToCsv(geojson: FeatureCollection): string {
  return unparse(
    filterAndMap(
      normalizeAsFeatureCollection(geojson).features,
      (d) => d.geometry.type === "Point",
      (point) => {
        const [longitude, latitude] = (point.geometry as Point).coordinates;

        return {
          ...flattenProps(point.properties),
          latitude,
          longitude,
        };
      }
    ),
    {
      header: true,
    }
  );
}
