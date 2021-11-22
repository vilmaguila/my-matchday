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
    <tournament-schedule v-else :schedule="tournamentSchedule"></tournament-schedule>
    <button @click="generateSchedule">Paina tästä</button>
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

const tournamentSchedule = ref(null);

const generateMatchweekObject = () => {
  const matchweek = {
    name: null,
    matches: [],
  };
  return matchweek;
};

const generateMatchObject = (home, away) => {
  const match = {
    date: null,
    homeTeam: home,
    awayTeam: away,
    score: {
      home: null,
      away: null,
    },
  };
  return match;
};

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

const generateSchedule = () => {
  var result = teamList.value.flatMap((v, i) =>
    teamList.value.slice(i + 1).map((w) => generateMatchObject(v, w))
  );
  tournamentSchedule.value = result;
};

const gS = () => {
  function choose(arr, k, prefix=[]) {
    if (k == 0) return [prefix];
    return arr.flatMap((v, i) =>
        choose(arr.slice(i+1), k-1, [...prefix, v])
    );
}
}
</script>
