<template>
  <div class="screen-grey">
    <div class="flex flex-row rounded-md text-4xl bg-gray-400">
      <button class="button-red" @click="navigateMainMenu">Main Menu</button>
      <div class="m-auto">My-Matchday</div>
    </div>

    <div class="flex flex-row items-start">
      <tournament-standings
        v-if="activeTournament"
        class="w-96 h-auto overflow-y-auto"
        :teams="activeTournament.teamList"
      ></tournament-standings>
      <tournament-matchweek
        class="w-96 h-96 overflow-y-auto"
        v-if="activeTournament"
        :matches="activeTournament.tournamentSchedule"
        :rounds="activeTournament.tournamentWeeks"
        @dispatch-result="storeResult"
        @selected-sim="dummyCall"
      ></tournament-matchweek>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import TournamentStandings from "../components/TournamentStandings.vue";
import TournamentMatchweek from "../components/TournamentMatchweek.vue";

const props = defineProps({
  gameslot: {
    type: Number,
    required: true,
  },
  gamedata: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits({
  "change-screen": {},
  "set:activeGameslot": {},
  "set:gamestate": {},
});

const navigateMainMenu = () => {
  emit("change-screen", "the-main-menu");
  emit("set:activeGameslot", null);
  emit("set:gamestate", {
    id: props.gameslot,
    gamedata: activeTournament.value,
  });
};

const dummyCall = (payload) => {
  for (const matchid of payload) {
    // const identifiedMatch = activeTournament.value.tournamentSchedule.find(match => matchid === match.id)
    simulateMatch(matchid)
  }
}

const simulateMatch = (matchid) => {
  const identifiedMatch = activeTournament.value.tournamentSchedule.find(
    (match) => match.id === matchid
  );
  const homeGoals = Math.round(
    (identifiedMatch.homeTeam.OFF / identifiedMatch.awayTeam.DEF) *
    Math.random() *
    (49 - 0) +
    -1
  );
  const awayGoals = Math.round(
    (identifiedMatch.awayTeam.OFF / identifiedMatch.homeTeam.DEF) *
    Math.random() *
    (49 - 0) +
    -1
  );
  identifiedMatch.score.home = homeGoals
  identifiedMatch.score.away = awayGoals
  if (homeGoals > awayGoals) {
    identifiedMatch.result.winner = identifiedMatch.homeTeam;
    identifiedMatch.result.loser = identifiedMatch.awayTeam;
  } else if (awayGoals > homeGoals) {
    identifiedMatch.result.winner = identifiedMatch.awayTeam;
    identifiedMatch.result.loser = identifiedMatch.homeTeam;
  } else {
    identifiedMatch.result.draw = true;
  }
  updateTeamRecords(identifiedMatch.id);
};

onMounted(() => {
  if (!activeTournament.tournamentSchedule) {
    generateMatchesArray(activeTournament.value.teamList);
  }
});

const activeTournament = ref(props.gamedata.gamedata);

const updateTeamRecords = (matchid) => {
  const identifiedMatch = activeTournament.value.tournamentSchedule.find(
    (match) => match.id === matchid
  );
  const idHome = activeTournament.value.teamList.find(
    (team) => team.name === identifiedMatch.homeTeam.name
  );
  const idAway = activeTournament.value.teamList.find(
    (team) => team.name === identifiedMatch.awayTeam.name
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

  const homeMatch = idHome.results.find(
    (match) => match.id === matchid
  );
  const awayMatch = idAway.results.find(
    (match) => match.id === matchid
  );
  if (homeMatch) {
    const index = idHome.results.findIndex(
      (match) => match.id === matchid
    );
    idHome.results.splice(index, 1);
    idHome.results.push(identifiedMatch);
  } else {
    idHome.results.push(identifiedMatch);
  }
  if (awayMatch) {
    const index = idAway.results.findIndex(
      (match) => match.id === matchid
    );
    idAway.results.splice(index, 1);
    idAway.results.push(identifiedMatch);
  } else {
    idAway.results.push(identifiedMatch);
  }

  if (identifiedMatch.result.winner === idHome) {
    idHome.W += 1;
    idAway.L += 1;
  } else if (identifiedMatch.result.winner === idAway) {
    idHome.L += 1;
    idAway.W += 1;
  } else {
    idHome.T += 1;
    idAway.T += 1;
  }
  identifiedMatch.result.played = true;
};

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
  activeTournament.value.tournamentSchedule = matchesArray;
  activeTournament.value.tournamentByeweeks = byeteams;
  activeTournament.value.tournamentWeeks = rounds;
  return matchesArray;
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
</script>
