<template lang="pug">
.container.py-2
  b-navbar.bg-light.rounded.mb-2(:variant="navVariant", toggleable="lg")
    b-navbar-brand.fw-bold(to="/")
      .hstack.gap-1.align-items-center
        img.rounded(src="/pwa-512x512.png", height="30")
        |
        | Geo to CSV
    b-navbar-toggle(target="nav-collapse")
    b-collapse#nav-collapse(is-nav)
      b-navbar-nav.ms-auto
        b-nav-item(
          v-for="link of links",
          :key="link.link",
          :to="link.link",
          active-class="active fw-bold"
        ) {{ link.title }}
  slot
</template>

<script setup lang="ts">
const colorMode = useColorMode();

const navVariant = computed(() =>
  colorMode.value !== "dark" ? "light" : "dark"
);

const links = [
  {
    title: "GeoJSON to CSV",
    link: "/geojson-to-csv",
  },
  {
    title: "GeoJSON points to CSV",
    link: "/geojson-points-to-csv",
  },
  {
    title: "KML to CSV",
    link: "/kml-to-csv",
  },
];
</script>
