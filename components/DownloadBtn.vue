<template lang="pug">
b-button(@click="download", :disabled="is.emptyStringOrWhitespace(text)") #[icon(name="tabler:download")] Download
</template>

<script setup lang="ts">
import saveAsPkg from "file-saver";
const { saveAs } = saveAsPkg;
import is from "@sindresorhus/is";

const props = withDefaults(
  defineProps<{
    text?: string;
    filename: string;
  }>(),
  {
    text: "",
  }
);

function download() {
  saveAs(new Blob([props.text]), props.filename);
}
</script>
