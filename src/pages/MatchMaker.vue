<template>
  <div class="flex flex-row items-center">
    <tournament-form
      @form-values="setFormValues"
      class="w-1/2 h-96 overflow-y-auto"
    ></tournament-form>
    <tournament-schedule
      v-if="generatedMatchWeeks"
      :schedule="generatedMatchWeeks"
      class="w-1/2 h-96 overflow-y-auto"
    ></tournament-schedule>
    <button @click="generateMatchweeksArray(teamList)">PRESS to PROCEED</button>
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
  const matchWeeksArray = [];
  let matchweeks = teamList.length - 1;
  let matchups = teamList.length / 2;
  if (teamList.length % 2 !== 0) {
    matchweeks = teamList.length;
    // matchups = (teamList.length - 1) / 2
    teamList.push("BYE");
  }
  for (let i = 1; i <= matchweeks; i++) {
    const week = [];
    const byeteams = [];
    for (let j = 0; j < matchups; j++) {
      const match = generateMatchObject(
        teamList[j],
        teamList[teamList.length - 1 - j]
      );
      if (typeof match === "string") {
        byeteams.push(match);
      } else {
        week.push(match);
      }
    }
    const matchweek = generateMatchweekObject("Matchweek " + i, week, byeteams);
    matchWeeksArray.push(matchweek);
    const popped = teamList.pop();
    teamList.splice(1, 0, popped);
  }
  generatedMatchWeeks.value = matchWeeksArray;
  return matchWeeksArray;
};

const generateMatchweekObject = (matchweekName, matchweekArray, byeTeams) => {
  const matchweek = {
    name: matchweekName,
    matches: matchweekArray,
    byeteams: byeTeams,
  };
  return matchweek;
};

const generateMatchObject = (home, away) => {
  if (home === "BYE") {
    return away;
  } else if (away === "BYE") {
    return home;
  } else {
    const match = {
      date: null,
      homeTeam: home,
      awayTeam: away,
      score: {
        home: 0,
        away: 0,
      },
    };
    return match;
  }
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
</script>
