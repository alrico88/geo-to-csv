import { kml } from "@tmcw/togeojson";
import xmldom from "@xmldom/xmldom";
import { geojsonToCsv } from "~/utils/geojson";

export function kmlToCsv(kmlStr: string): string {
  const dom = new xmldom.DOMParser().parseFromString(kmlStr, "text/xml");

  const asGeoJSON = kml(dom);

  return geojsonToCsv(asGeoJSON);
}
