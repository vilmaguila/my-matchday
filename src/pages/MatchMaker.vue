<template>
  <div class="flex flex-row items-start">
    <tournament-form
      @form-values="createTournamentObject"
      class="w-96 h-96 overflow-y-auto"
    ></tournament-form>
    <tournament-schedule
      v-if="generatedSchedule"
      class="w-96 h-96 overflow-y-auto"
    >
      <tournament-match
        v-for="match in activeTournament.tournamentSchedule"
        :match="match"
        @dispatch-result="storeResult"
      >
      </tournament-match
    ></tournament-schedule>
    <tournament-standings
      v-if="activeTournament"
      class="w-96 h-auto overflow-y-auto"
      :teams="activeTournament.teamList"
    >
    </tournament-standings>
    <button @click="generateMatchesArray(activeTournament.teamList)">
      PRESS to PROCEED
    </button>
  </div>
</template>

<script setup>
import { ref, reactive, watch } from "vue";
import TournamentForm from "../components/TournamentForm.vue";
import TournamentSchedule from "../components/TournamentSchedule.vue";
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
    (match) => payload.match.id === match.id
  );
  const idHome = activeTournament.value.teamList.find(
    (team) => team.name === payload.match.homeTeam.name
  );
  const idAway = activeTournament.value.teamList.find(
    (team) => team.name === payload.match.awayTeam.name
  );

  if (identifiedMatch.result.played) {
    if (identifiedMatch.result.winner === idHome) {
      idHome.W -= 1;
      idAway.L -= 1;
    } else if (identifiedMatch.result.winner === idAway) {
      idHome.L -= 1;
      idAway.W -= 1;
    } else {
      idHome.T -= 1;
      idAway.T -= 1;
    }
  }

  identifiedMatch.score.home = payload.homeScore;
  identifiedMatch.score.away = payload.awayScore;
  identifiedMatch.result.winner = payload.winner;
  identifiedMatch.result.loser = payload.loser;

  const homeMatch = idHome.results.find(
    (match) => match.id === payload.match.id
  );
  const awayMatch = idAway.results.find(
    (match) => match.id === payload.match.id
  );
  if (homeMatch) {
    const index = idHome.results.findIndex(
      (match) => match.id === payload.match.id
    );
    idHome.results.splice(index, 1);
    idHome.results.push(payload.match);
  } else {
    idHome.results.push(payload.match);
  }
  if (awayMatch) {
    const index = idAway.results.findIndex(
      (match) => match.id === payload.match.id
    );
    idAway.results.splice(index, 1);
    idAway.results.push(payload.match);
  } else {
    idAway.results.push(payload.match);
  }

  if (payload.winner === idHome) {
    idHome.W += 1;
    idAway.L += 1;
  } else if (payload.winner === idAway) {
    idHome.L += 1;
    idAway.W += 1;
  } else {
    idHome.T += 1;
    idAway.T += 1;
  }
  identifiedMatch.result.played = true;
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
      result: { played: false, winner: null, loser: null, draw: null },
      homeTeam: home,
      awayTeam: away,
      winner: null,
      loser: null,
      draw: null,
      score: {
        home: null,
        away: null,
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
    tournamentSchedule: [],
    tournamentStandings: null,
    tournamentByeweeks: null,
  });
  formSubmitted.value = true;
};
</script>
