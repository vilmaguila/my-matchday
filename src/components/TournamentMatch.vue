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
    <div>{{ match.homeTeam.name }}</div>
    <div>{{ match.score.home }}</div>
    -
    <div>{{ match.score.away }}</div>
    <div>{{ match.awayTeam.name }}</div>
  </div>
  <div
    v-if="isOpen"
    class="flex bg-gray-200 border-black border place-content-evenly"
  >
    <button
      class="bg-blue-200 rounded-md p-2 m-2 disabled:opacity-30"
      @click="simulateMatch"
    >
      Simulate
    </button>
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

const emit = defineEmits({
  matchResult: {},
});

const isOpen = ref(false);
const finalMatchResult = ref(null);

const simulateMatch = () => {};

const emitResult = () => {
  emit("match-result", "matchresult");
};
</script>
