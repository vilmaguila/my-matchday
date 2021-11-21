<template>
  <div class="flex flex-col items-center">
    <tournament-form
      @form-values="setFormValues"
      class="w-1/2"
    ></tournament-form>
    {{ tournamentSpecs }}
    <p v-if="!formSubmitted" class="text-red-500">
      Please submit tournament data
    </p>
    <tournament-schedule v-else></tournament-schedule>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import TournamentForm from "../components/TournamentForm.vue";
import TournamentSchedule from "../components/TournamentSchedule.vue";

const tournamentName = ref(null);
const teamCount = ref(null);
const tiesBetween = ref(null);
const tournamentMode = ref("league");
const teamList = ref([]);

const formSubmitted = ref(false);

const setFormValues = (payload) => {
  tournamentName.value = payload.tournamentName;
  teamCount.value = payload.teamCount;
  tiesBetween.value = payload.tiesBetween;
  tournamentMode.value = payload.tournamentMode;
  teamList.value = payload.teamList;
  formSubmitted.value = true;
};

const tournamentSpecs = computed(() => {
  const totalGames =
    ((teamCount.value * (teamCount.value - 1)) / 2) * tiesBetween.value;
  return "The number of games played is " + totalGames;
});
</script>
