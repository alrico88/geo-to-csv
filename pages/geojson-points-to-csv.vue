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
            label="GeoJSON Points as CSV",
            filename="geojson-points-to-csv.csv",
            placeholder="Please enter or select a GeoJSON first and click convert"
          )
    .row
      .col
        p Convert GeoJSON files to CSV with this tool. Each row will include the feature's properties, along with separate #[kbd latitude] and #[kbd longitude] columns. Nested properties will be flattened for easy access.
        p.mb-0 Note: Only point features will be included in the CSV.
</template>

<script setup lang="ts">
import { Codemirror } from "vue-codemirror";
import is from "@sindresorhus/is";
import { EditorView } from "codemirror";
import { geojsonPointsToCsv } from "~/utils/geojson";

definePageMeta({
  layout: "nav",
});

useSeoMeta({
  title: "GeoJSON Points to CSV",
  description:
    "Convert GeoJSON points to CSV, with properties as columns and latitude and longitude columns",
  keywords:
    "geojson points to csv,convert geojson points to csv,geojson points to wkt",
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

    result.value = geojsonPointsToCsv(parsed);

    if (is.emptyStringOrWhitespace(result.value)) {
      alert("No points found");
    }
  } catch (err) {
    error.value = err as string;

    console.error(err);
  }
}
</script>
