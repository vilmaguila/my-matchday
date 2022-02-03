<template>
  <div>
    <button @click="previousRound">Previous</button>
    <button @click="nextRound">Next</button>
    <div>ROUND {{ currentRound }}</div>
    <tournament-match
      v-for="match in filteredMatchweek"
      :match="match"
      @dispatch-result="dispatchResult"
    >
      <template #selected>
        <input
          type="checkbox"
          :name="match.id"
          :value="match.id"
          :id="match.id"
          v-model="selectedForSimulation"
        />
      </template>
    </tournament-match>
    <slot></slot>
    {{ selectedForSimulation }}
    <button class="button-green" @click="dispatchSimulationArray">
      Simulate selected
    </button>
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
  rounds: {},
});

const emit = defineEmits({
  "dispatch-result": {},
  "selected-sim": {},
});

const selectedForSimulation = ref([]);

const dispatchSimulationArray = () => {
  emit("selected-sim", selectedForSimulation.value);
  selectedForSimulation.value.splice(0);
};

const currentRound = ref(1);
const nextRound = () => {
  if (currentRound.value < props.rounds) currentRound.value += 1;
};
const previousRound = () => {
  if (currentRound.value < 2) return;
  currentRound.value -= 1;
};

const filteredMatchweek = computed(() => {
  return props.matches.filter((match) => match.round === currentRound.value);
});
</script>
