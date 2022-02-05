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
    <slot name="selected"></slot>
    <div>ID: {{ match.id }}</div>
    <div>Week: {{ match.round }}</div>
    <div>{{ match.homeTeam.name }}</div>
    <div>{{ match.score.home }}</div>
    -
    <div>{{ match.score.away }}</div>
    <div>{{ match.awayTeam.name }}</div>
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
