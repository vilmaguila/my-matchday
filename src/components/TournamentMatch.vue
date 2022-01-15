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
    <div>Week: {{ match.round }}</div>
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
  "dispatch-result": {},
});

const isOpen = ref(false);
const homeScore = ref(0);
const awayScore = ref(0);

const simulateMatch = () => {
  const homeGoals = Math.round(
    (props.match.homeTeam.OFF / props.match.awayTeam.DEF) *
      Math.random() *
      (49 - -1) +
      -1
  );
  const awayGoals = Math.round(
    (props.match.awayTeam.OFF / props.match.homeTeam.DEF) *
      Math.random() *
      (49 - -1) +
      -1
  );
  homeScore.value = homeGoals;
  awayScore.value = awayGoals;
  let winner = "draw";
  if (homeScore.value > awayScore.value) {
    winner = "home";
  } else if (awayScore.value > homeScore.value) {
    winner = "away";
  } else {
    winner = "draw";
  }
  emit("dispatch-result", {
    match: props.match,
    homeScore: homeGoals,
    awayScore: awayGoals,
    winner: winner,
  });
};
</script>
