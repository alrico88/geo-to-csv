import type { GeoJSON } from "geojson";

export default defineEventHandler(async (event) => {
  const { geojson } = await readBody<{
    geojson: GeoJSON;
  }>(event);

  const normalized = normalizeAsFeatureCollection(geojson);

  return geojsonToCsv(normalized);
});
