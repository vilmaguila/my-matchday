<template>
  <div
    class="
      flex
      bg-gray-200
      border-black border
      place-content-evenly
      cursor-pointer
    "
    @click="isOpen = !isOpen"
  >
    <div>Date: {{ match.date }}</div>
    <div>{{ match.homeTeam }}</div>
    <div>{{ match.score.home }}</div>
    -
    <div>{{ match.score.away }}</div>
    <div>{{ match.awayTeam }}</div>
  </div>
  <div
    v-if="isOpen"
    class="
      flex
      bg-gray-200
      border-black border
      place-content-evenly
      cursor-pointer
      h-12
    "
  >
    Dropdown
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  match: {
    type: Object,
    default: {},
  },
});

const isOpen = ref(false);
</script>
