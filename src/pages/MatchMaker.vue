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
    <tournament-schedule
      v-else
    ></tournament-schedule>
    <button @click="generateMatchweeksArray(teamList)">toinene</button>
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

const generatedMatchWeeks = ref(null);

const generateMatchweeksArray = (teamList) => {
  const matchWeeksArray = []
  let matchweeks = teamList.length - 1;
  let matchups = teamList.length / 2;
  if (teamList.length % 2 !== 0) {
    matchweeks = teamList.length
    // matchups = (teamList.length - 1) / 2
    teamList.push("Bye week")
  }
  for (let i = 1; i <= matchweeks; i++) {
    console.log("week" + i)
    const week = []
    for (let j = 0; j < matchups; j++) {
      console.log(teamList[j] + " vs " + teamList[teamList.length-1-j])
      const match = generateMatchObject(teamList[j], teamList[teamList.length-1-j])
      week.push(match)
      generateMatchweekObject("Matchweek " + i)
    }
    const matchweek = generateMatchweekObject('Matchweek ' + 1, week)
    matchWeeksArray.push(matchweek)
    const popped = teamList.pop()
    teamList.splice(1,0,popped)
  }
  generatedMatchWeeks.value = matchWeeksArray
  return matchWeeksArray
};

const generateMatchweekObject = (matchweekName, matchweekArray) => {
  const matchweek = {
    name: matchweekName,
    matches: matchweekArray,
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
</script>
