<template>
  <div class="space-x-3">
    <div>{{ now }}</div>
    <button @click="pause()" class="bg-gray-400 rounded-md p-2">Pause</button>
    <button @click="resume()" class="bg-gray-400 rounded-md p-2">Resume</button>
  </div>
  <tournament-form @form-values="receiveFormValues"></tournament-form>
  {{ tournamentSpecs }}
</template>

<script setup>
import { ref, computed } from "vue";
import { useNow } from "@vueuse/core";
import TournamentForm from "../components/TournamentForm.vue";

const { now, pause, resume } = useNow({ controls: true });

const teamCount = ref(2)
const tiesBetween = ref(1)
const tournamentMode = ref('league')

const tournamentSpecs = computed(() => {
  const totalGames =
    ((teamCount.value * (teamCount.value - 1)) / 2) *
    tiesBetween.value;
  return "The number of games played is " + totalGames;
});

const receiveFormValues = (payload) => {
  teamCount.value = payload.teamCount;
  tiesBetween.value = payload.ties;
  tournamentMode.value = payload.selectedMode;
};
</script>
