<template lang="pug">
.container
  .vstack.gap-3
    .row
      .col
        b-form.vstack.gap-2(@submit.prevent="convertToCsv")
          b-form-group
            template(#label)
              .hstack.gap-2.justify-content-between
                div #[icon(name="gis:geojson-file")] GeoJSON to convert
                load-from-file-btn(@click="openFile")
            input.visually-hidden(
              type="file",
              @change="handleFileChange",
              ref="fileRef",
              accept=".geojson,.json,.txt"
            )
            .border
              codemirror(
                v-model="text",
                :style="{ height: '300px' }",
                autofocus,
                placeholder="Paste or drag and drop a GeoJSON here",
                :extensions="[EditorView.lineWrapping]"
              )
          convert-btn(:disabled="disabledBtn")
          b-alert(v-model="showError", variant="danger") {{ error }}
    .row
      .col
        .vstack.gap-2
          csv-result(
            :result="result",
            label="GeoJSON as CSV",
            filename="geojson-to-csv.csv",
            placeholder="Please enter or select a GeoJSON first and click convert"
          )
    .row
      .col
        p.mb-0 Use this tool to convert GeoJSON files into CSV format. Each row will include the feature's properties along with a #[nuxt-link(to="https://en.wikipedia.org/wiki/Well-known_text_representation_of_geometry") WKT] column that represents the geometry. Nested properties, if present, will be flattened for easy access.
</template>

<script setup lang="ts">
import { Codemirror } from "vue-codemirror";
import is from "@sindresorhus/is";
import { EditorView } from "codemirror";
import { geojsonToCsv } from "~/utils/geojson";

definePageMeta({
  layout: "nav",
});

useSeoMeta({
  title: "GeoJSON to CSV",
  description:
    "Convert GeoJSON to CSV, with properties as columns and a WKT representation of the geometry",
  keywords: "geojson to csv,geojson to wkt,convert geojson to csv",
});

const error = ref<null | string>(null);
const showError = computed(() => !is.nullOrUndefined(error.value));
const text = ref("");
const disabledBtn = computed(() => is.emptyStringOrWhitespace(text.value));
const result = ref<string>("");

watch(text, () => {
  result.value = "";
  error.value = null;
});

const fileRef = ref<null | HTMLInputElement>(null);

function openFile() {
  fileRef.value?.click();
}

const { handleFileChange } = useFileLoad(text, error);

function convertToCsv() {
  try {
    const parsed = JSON.parse(text.value);

    result.value = geojsonToCsv(parsed);
  } catch (err) {
    error.value = err as string;
  }
}
</script>
