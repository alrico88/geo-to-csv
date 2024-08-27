<template lang="pug">
.container
  .row.py-5
    .col
      h1.title.fw-bold
        .hstack.gap-2.align-items-center
          img.rounded(src="/pwa-512x512.png", height="60")
          |
          | Geo to CSV
      .lead.fw-normal Easily convert GeoJSON & KML files to CSV. Preserve Data properties and get Geometries as WKT.

  .row.row-cols-1.row-cols-sm-3.g-4.pb-4
    .col
      b-card.h-100
        .hstack.gap-2.mb-3.align-items-center
          icon(size="50", name="gis:geojson-file")
          icon(size="20", name="bi:caret-right")
          icon(size="50", name="bi:filetype-csv")
        h2.card-title.fw-bold.text-primary.fs-4 GeoJSON to CSV
        div Converts a GeoJSON file to a CSV, by converting each feature to a WKT
        nuxt-link.stretched-link(to="/geojson-to-csv")
    .col
      b-card.h-100
        .hstack.gap-2.mb-3.align-items-center
          icon(size="50", name="gis:geojson-file")
          icon(size="20", name="bi:caret-right")
          icon(size="50", name="bi:filetype-csv")
        h2.card-title.fw-bold.text-primary.fs-4 GeoJSON points to CSV
        div Transform GeoJSON files into CSV, extracting only point features as latitude and longitude columns.
        nuxt-link.stretched-link(to="/geojson-points-to-csv")
    .col
      b-card.h-100
        .hstack.gap-2.mb-3.align-items-center
          icon(size="50", name="gis:kml-file")
          icon(size="20", name="bi:caret-right")
          icon(size="50", name="bi:filetype-csv")
        h2.card-title.fw-bold.text-primary.fs-4 KML to CSV
        div Converts a KML file to a CSV, by converting each feature to a WKT
        nuxt-link.stretched-link(to="/kml-to-csv")
</template>

<script setup lang="ts">
useSeoMeta({
  title: "Geo to CSV",
  description:
    "A simple tool for converting GeoJSON & KML to CSV. Export attribute info and geometries as WKT",
  keywords: "geojson to csv,kml to csv,convert geojson to csv",
  author: "Alberto Rico",
});
</script>

<style lang="scss" scoped>
.card {
  transition: box-shadow 0.2s ease-in-out;

  &:hover {
    box-shadow:
      0px 1px 1px rgba(3, 7, 18, 0.08),
      0px 5px 4px rgba(3, 7, 18, 0.06),
      0px 12px 9px rgba(3, 7, 18, 0.05),
      0px 20px 15px rgba(3, 7, 18, 0.03),
      0px 32px 24px rgba(3, 7, 18, 0.02);
  }
}
</style>
