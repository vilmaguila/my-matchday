<template>
  <div>
    <button @click="previousRound">Previous</button>
    <button @click="nextRound">Next</button>
    <div>ROUND {{ currentRound }}</div>
    <tournament-match
      v-for="match in filteredMatchweek"
      :match="match"
      @dispatch-result="dispatchResult"
    />
    <slot></slot>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import TournamentMatch from "./TournamentMatch.vue";

const props = defineProps({
  matches: {
    type: Array,
    default: [],
  },
});

const emit = defineEmits({
  "dispatch-result": {},
});

const dispatchResult = (payload) => {
  emit("dispatch-result", payload);
};

const currentRound = ref(1);
const maxRound = Math.max(...props.matches.map((item) => item.round));
const nextRound = () => {
  if (currentRound.value < maxRound) currentRound.value += 1;
};
const previousRound = () => {
  if (currentRound.value < 2) return;
  currentRound.value -= 1;
};

const filteredMatchweek = computed(() => {
  return props.matches.filter((match) => match.round === currentRound.value);
});
</script>
