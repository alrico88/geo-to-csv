<template lang="pug">
b-form-group
  template(#label) #[icon(name="tabler:brightness-half")] Theme
  b-form-select(v-model="$colorMode.preference")
    b-form-select-option(value="system") System
    b-form-select-option(value="light") Light
    b-form-select-option(value="dark") Dark
</template>
