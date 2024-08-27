<template lang="pug">
b-button(type="submit", :disabled="disabled", variant="primary") #[icon(name="material-symbols:convert-to-text-outline-sharp")] Convert to CSV
</template>

<script setup lang="ts">
const props = defineProps<{
  disabled: boolean;
}>();
</script>
