<template lang="pug">
.container
  .vstack.gap-3
    .row
      .col
        b-form.vstack.gap-2(@submit.prevent="convertToCsv")
          b-form-group
            template(#label)
              .hstack.gap-2
                icon(name="gis:kml-file")
                div KML to convert
            b-form-file(@change="handleFileChange", accept=".kml")
          convert-btn(:disabled="disabledBtn")
          b-alert(v-model="showError", variant="danger") {{ error }}
    .row
      .col
        .vstack.gap-2
          csv-result(
            :result="result",
            label="KML as CSV",
            filename="kml-to-csv.csv",
            placeholder="Please select a KML first and click convert"
          )
    .row
      .col
        p.mb-0 Convert KML files to CSV effortlessly with this tool. Each row will include the feature's properties, along with a #[kbd wkt] column representing the geometry as #[nuxt-link(to="https://en.wikipedia.org/wiki/Well-known_text_representation_of_geometry", target="_blank") WKT]. Nested properties will be flattened for easier analysis
</template>

<script setup lang="ts">
import is from "@sindresorhus/is";
import { readAsText } from "promise-file-reader";
import { Formatter } from "fracturedjsonjs";
import { kmlToCsv } from "~/utils/kml";

definePageMeta({
  layout: "nav",
});

useSeoMeta({
  title: "KML to CSV",
  description:
    "Convert a KML file to CSV, with properties as columns and a WKT representation of the geometries",
  keywords: "kml to csv,kml to wkt,convert wkt to csv",
});

const fmt = new Formatter();

const error = ref<null | string>(null);
const showError = computed(() => !is.nullOrUndefined(error.value));
const text = ref("");
const disabledBtn = computed(() => is.emptyStringOrWhitespace(text.value));
const result = ref<string>("");

watch(text, () => {
  result.value = "";
  error.value = null;
});

async function handleFileChange(e: Event) {
  const f = (e.currentTarget as HTMLInputElement).files;

  if (is.nullOrUndefined(f)) {
    text.value = "";

    return;
  }

  try {
    text.value = (await readAsText(f[0])) as string;
  } catch (err) {
    error.value = err as string;
  }
}

function convertToCsv() {
  try {
    result.value = kmlToCsv(text.value);
  } catch (err) {
    error.value = err as string;
  }
}
</script>
