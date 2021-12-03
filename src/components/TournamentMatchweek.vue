<template>
  <div>{{ matchweek.name }}</div>
  <slot></slot>
  <div>TEAMS ON BYE: {{ matchweek.byeteams }}</div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  matchweek: {
    type: Object,
    default: {},
  },
});
</script>
