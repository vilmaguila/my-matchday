<template>
  <div class="flex flex-row items-center">
    <tournament-form
      @form-values="createTournamentObject"
      class="w-1/3 h-96 overflow-y-auto"
    ></tournament-form>
    <tournament-schedule
      v-if="generatedMatchWeeks"
      :schedule="generatedMatchWeeks"
      class="w-1/3 h-96 overflow-y-auto"
    ></tournament-schedule>
    <tournament-standings
      v-if="activeTournament"
      :teams="activeTournament.teamList"
      class="w-1/3 h-96 overflow-y-auto"
    ></tournament-standings>
    <button @click="generateMatchweeksArray(activeTournament.teamList)">
      PRESS to PROCEED
    </button>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import TournamentForm from "../components/TournamentForm.vue";
import TournamentSchedule from "../components/TournamentSchedule.vue";
import TournamentStandings from "../components/TournamentStandings.vue";

const listOfTournaments = ref([]);

const activeTournament = ref(null);

const generatedMatchWeeks = ref(null);

const generateMatchweeksArray = (teamList) => {
  const matchWeeksArray = [];
  const localTeamList = [...teamList];
  let matchweeks =
    (localTeamList.length - 1) * activeTournament.value.tournamentRounds;
  if (localTeamList.length % 2 !== 0) {
    matchweeks = localTeamList.length * activeTournament.value.tournamentRounds;
    localTeamList.push("BYE");
  }
  let matchups = localTeamList.length / 2;
  for (let i = 1; i <= matchweeks; i++) {
    const week = [];
    const byeteams = [];
    for (let j = 0; j < matchups; j++) {
      if (i % 2) {
        const match = generateMatchObject(
          localTeamList[j],
          localTeamList[localTeamList.length - 1 - j]
        );
        if (typeof match === "string") {
          byeteams.push(match);
        } else {
          week.push(match);
        }
      } else {
        const match = generateMatchObject(
          localTeamList[localTeamList.length - 1 - j],
          localTeamList[j]
        );
        if (!match.hasOwnProperty("score")) {
          byeteams.push(match);
        } else {
          week.push(match);
        }
      }
    }
    const matchweek = generateMatchweekObject("Matchweek " + i, week, byeteams);
    matchWeeksArray.push(matchweek);
    const popped = localTeamList.pop();
    localTeamList.splice(1, 0, popped);
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
  const id = getMatchID();
  if (home === "BYE") {
    return away.name;
  } else if (away === "BYE") {
    return home.name;
  } else {
    const match = {
      id: id,
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

let matchID = 0;
const getMatchID = () => {
  matchID += 1;
  return matchID;
};

const formSubmitted = ref(false);

const createTournamentObject = (payload) => {
  activeTournament.value = reactive({
    tournamentName: payload.tournamentName,
    tournamentTeamCount: payload.tournamentTeamCount,
    tournamentRounds: payload.tournamentRounds,
    tournamentMode: payload.tournamentMode,
    teamList: payload.teamList,
    tournamentSchedule: null,
    tournamentStandings: null,
  });
  formSubmitted.value = true;
};
</script>
