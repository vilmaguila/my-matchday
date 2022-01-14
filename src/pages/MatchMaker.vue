<template>
  <div class="flex flex-row items-center">
    <tournament-form
      @form-values="createTournamentObject"
      class="w-1/3 h-96 overflow-y-auto"
    ></tournament-form>
    <tournament-schedule
      v-if="generatedSchedule"
      class="w-1/3 h-96 overflow-y-auto"
    >
      <tournament-match
        v-for="match in generatedSchedule"
        :match="match"
        @dispatch-result="storeResult"
      >
      </tournament-match
    ></tournament-schedule>
    <tournament-standings
      v-if="activeTournament"
      :teams="activeTournament.teamList"
      class="w-1/3 h-96 overflow-y-auto"
    ></tournament-standings>
    <button @click="generateMatchesArray(activeTournament.teamList)">
      PRESS to PROCEED
    </button>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import TournamentForm from "../components/TournamentForm.vue";
import TournamentSchedule from "../components/TournamentSchedule.vue";
import TournamentMatchweek from "../components/TournamentMatchweek.vue";
import TournamentMatch from "../components/TournamentMatch.vue";
import TournamentStandings from "../components/TournamentStandings.vue";

const listOfTournaments = ref([]);

const activeTournament = ref(null);

const generatedSchedule = ref(null);

const generateMatchesArray = (teamList) => {
  const matchesArray = [];
  const byeteams = [];
  const localTeamList = [...teamList];
  let roundMatchups = localTeamList.length / 2;
  let rounds =
    (localTeamList.length - 1) * activeTournament.value.tournamentRounds;
  if (localTeamList.length % 2 !== 0) {
    rounds = localTeamList.length * activeTournament.value.tournamentRounds;
    localTeamList.push("BYE");
  }
  for (let i = 1; i <= rounds; i++) {
    for (let j = 0; j < roundMatchups; j++) {
      if (i % 2) {
        const match = generateMatchObject(
          localTeamList[j],
          localTeamList[localTeamList.length - 1 - j],
          i
        );
        if (typeof match === "string") {
          byeteams.push({ i, match });
        } else {
          matchesArray.push(match);
        }
      } else {
        const match = generateMatchObject(
          localTeamList[localTeamList.length - 1 - j],
          localTeamList[j],
          i
        );
        if (!match.hasOwnProperty("score")) {
          byeteams.push({ i, match });
        } else {
          matchesArray.push(match);
        }
      }
    }
    const popped = localTeamList.pop();
    localTeamList.splice(1, 0, popped);
  }
  generatedSchedule.value = matchesArray;
  activeTournament.value.tournamentSchedule = matchesArray;
  activeTournament.value.tournamentByeweeks = byeteams;
  return matchesArray;
};

const storeResult = (payload) => {
  const identifiedMatch = activeTournament.value.tournamentSchedule.find(
    (match) => payload.id === match.id
  );
  identifiedMatch.score.home = payload.homeScore;
  identifiedMatch.score.away = payload.awayScore;
};

const generateMatchObject = (home, away, round) => {
  if (home === "BYE") {
    return away.name;
  } else if (away === "BYE") {
    return home.name;
  } else {
    const id = getMatchID();
    const match = {
      id: id,
      round: round,
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
    tournamentByeweeks: null,
  });
  formSubmitted.value = true;
};
</script>
