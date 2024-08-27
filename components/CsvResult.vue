<template lang="pug">
div
  template(v-if="is.emptyStringOrWhitespace(result)")
    b-alert.mb-0(variant="warning", :model-value="true") #[icon(name="bi:exclamation-diamond-fill")] {{ placeholder }}
  template(v-else)
    b-form-group
      template(#label)
        .hstack.gap-2.justify-content-between.flex-wrap
          .hstack.gap-2
            icon(name="ph:file-csv")
            div {{ label }}
          .hstack.gap-2.align-items-center
            div View as
            b-button-group(, size="sm")
              b-button(
                @click="view = 'raw'",
                variant="light",
                :active="view === 'raw'"
              ) Raw
              b-button(
                @click="view = 'table'",
                variant="light",
                :active="view === 'table'"
              ) Table
      .border(v-if="view === 'raw'")
        codemirror(
          :model-value="result",
          :style="{ height: '300px' }",
          :disabled="!result",
          :extensions="[EditorView.lineWrapping]"
        )
      template(v-if="view === 'table'")
        b-table(
          :items="parsed",
          responsive,
          striped,
          bordered,
          :per-page="20",
          :current-page="page",
          tbody-tr-class="text-nowrap"
        )
        b-pagination(
          v-model="page",
          :total-rows="parsed.length",
          :per-page="20"
        )
    .hstack.gap-3
      clipboard-btn.w-100(:text="result")
      download-btn.w-100(:text="result", :filename="filename")
</template>

<script setup lang="ts">
import { Codemirror } from "vue-codemirror";
import { EditorView } from "codemirror";
import is from "@sindresorhus/is";
import Papa from "papaparse";

const props = defineProps<{
  result: string;
  placeholder: string;
  label: string;
  filename: string;
}>();

const parsed = computed(
  () =>
    Papa.parse(props.result, {
      header: true,
    }).data
);

const view = ref("raw");

const page = ref(1);

watch(
  () => props.result,
  () => {
    page.value = 1;
  }
);
</script>
