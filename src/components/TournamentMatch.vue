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
    <div>ID: {{ match.id }}</div>
    <div>Date: {{ match.date }}</div>
    <div>{{ match.homeTeam.name }}</div>
    <div>{{ homeScore }}</div>
    -
    <div>{{ awayScore }}</div>
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
  dispatchSimulation: {},
});

const isOpen = ref(false);
const finalMatchResult = ref(null);
const homeScore = ref(0);
const awayScore = ref(0);

const simulateMatch = () => {
  // const homeGoals = Math.round(
  //   (props.match.homeTeam.OFF / props.match.awayTeam.DEF) *
  //     Math.random() *
  //     (49 - -1) +
  //     -1
  // );
  // const awayGoals = Math.round(
  //   (props.match.awayTeam.OFF / props.match.homeTeam.DEF) *
  //     Math.random() *
  //     (49 - -1) +
  //     -1
  // );
  // homeScore.value = homeGoals;
  // awayScore.value = awayGoals;
  emit("dispatch-simulation", props.match.id);
};

const emitResult = () => {
  emit("match-result", "matchresult");
};
</script>
