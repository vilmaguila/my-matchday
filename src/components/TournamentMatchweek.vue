<template>
  <div class="flex flex-col m-4">
    <div class="flex">
      <button class="button-green" @click="previousRound">Previous</button>
      <button class="button-green" @click="nextRound">Next</button>
    </div>
    <div>ROUND {{ currentRound }}</div>
    <tournament-match v-for="match in filteredMatchweek" :match="match">
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
    <div class="flex">
      <button class="button-green" @click="dispatchSimulationArray">
        Simulate selected
      </button>
      <button class="button-green" @click="dispatchSimulateMatchweek">
        Simulate week {{ currentRound }}
      </button>
    </div>
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
  emit("dynamic:tournament-event", {
    type: "selected-sim",
    data: selectedForSimulation.value,
  });
  selectedForSimulation.value.splice(0);
};

const dispatchSimulateMatchweek = () => {
  selectedForSimulation.value.splice(0);
  for (const match of filteredMatchweek.value) {
    selectedForSimulation.value.push(match.id);
  }
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
