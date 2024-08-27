<template lang="pug">
b-button(@click="() => copy()", :disabled="is.emptyStringOrWhitespace(text)") #[icon(name="tabler:clipboard")] {{ copied ? "Copied" : "Copy to clipboard" }}
</template>

<script setup lang="ts">
import { useClipboard } from "@vueuse/core";
import is from "@sindresorhus/is";

const props = withDefaults(
  defineProps<{
    text?: string;
  }>(),
  {
    text: "",
  }
);

const { text } = toRefs(props);

const { copy, copied } = useClipboard({
  source: text,
});
</script>
