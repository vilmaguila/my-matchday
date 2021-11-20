<template>
  <tournament-form @form-values="setFormValues"></tournament-form>
  {{ tournamentSpecs }}
</template>

<script setup>
import { ref, computed } from "vue";
import TournamentForm from "../components/TournamentForm.vue";

const teamCount = ref(2);
const tiesBetween = ref(1);
const tournamentMode = ref("league");

const formValues = ref({})

const setFormValues = (payload) => {
  teamCount.value = payload.teamCount
  tiesBetween.value = payload.tiesBetween
  tournamentMode.value = payload.tournamentMode
}

const tournamentSpecs = computed(() => {
  const totalGames =
    ((teamCount.value * (teamCount.value - 1)) / 2) * tiesBetween.value;
  return "The number of games played is " + totalGames;
});
</script>
