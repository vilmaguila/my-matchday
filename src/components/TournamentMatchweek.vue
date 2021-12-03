<template>
  <div class="bg-gray-400">
    <div>{{ matchweek.name }}</div>
    <slot></slot>
    <div>TEAMS ON BYE: {{ matchweek.byeteams }}</div>
  </div>
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
