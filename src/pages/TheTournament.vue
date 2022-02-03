<template>
  <div class="screen-grey">
    <div class="flex flex-row rounded-md text-4xl bg-gray-400">
      <button class="button-red" @click="navigateMainMenu">Main Menu</button>
      <div class="m-auto">My-Matchday</div>
    </div>

    <div class="flex flex-row items-start">
      <tournament-standings
        v-if="gamedata.gamedata"
        class="w-96 h-auto overflow-y-auto"
        :teams="gamedata.gamedata.teamList"
      ></tournament-standings>
      <tournament-matchweek
        class="w-96 h-96 overflow-y-auto"
        v-if="gamedata.gamedata"
        :matches="gamedata.gamedata.tournamentSchedule"
        :rounds="gamedata.gamedata.tournamentWeeks"
        @selected-sim="dummyCall"
      ></tournament-matchweek>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
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
  "sim-selected": {},
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
  emit("sim-selected", payload);
  // for (const matchid of payload) {
  //   simulateMatch(matchid);
  // }
};

// const simulateMatch = (matchid) => {
//   const identifiedMatch = activeTournament.value.tournamentSchedule.find(
//     (match) => match.id === matchid
//   );
//   const homeGoals = Math.round(
//     (identifiedMatch.homeTeam.OFF / identifiedMatch.awayTeam.DEF) *
//       Math.random() *
//       (49 - 0) +
//       -1
//   );
//   const awayGoals = Math.round(
//     (identifiedMatch.awayTeam.OFF / identifiedMatch.homeTeam.DEF) *
//       Math.random() *
//       (49 - 0) +
//       -1
//   );
//   identifiedMatch.score.home = homeGoals;
//   identifiedMatch.score.away = awayGoals;
//   if (homeGoals > awayGoals) {
//     identifiedMatch.result.winner = identifiedMatch.homeTeam;
//     identifiedMatch.result.loser = identifiedMatch.awayTeam;
//   } else if (awayGoals > homeGoals) {
//     identifiedMatch.result.winner = identifiedMatch.awayTeam;
//     identifiedMatch.result.loser = identifiedMatch.homeTeam;
//   } else {
//     identifiedMatch.result.draw = true;
//   }
//   updateTeamRecords(identifiedMatch.id);
// };

const activeTournament = ref({ ...props.gamedata.gamedata });

// const updateTeamRecords = (matchid) => {
//   const identifiedMatch = activeTournament.value.tournamentSchedule.find(
//     (match) => match.id === matchid
//   );
//   const idHome = activeTournament.value.teamList.find(
//     (team) => team.name === identifiedMatch.homeTeam.name
//   );
//   const idAway = activeTournament.value.teamList.find(
//     (team) => team.name === identifiedMatch.awayTeam.name
//   );

//   if (identifiedMatch.result.played) {
//     if (identifiedMatch.result.winner === idHome) {
//       idHome.W -= 1;
//       idAway.L -= 1;
//     } else if (identifiedMatch.result.winner === idAway) {
//       idHome.L -= 1;
//       idAway.W -= 1;
//     } else {
//       idHome.T -= 1;
//       idAway.T -= 1;
//     }
//   }

//   const homeMatch = idHome.results.find((id) => id === matchid);
//   const awayMatch = idAway.results.find((id) => id === matchid);
//   if (homeMatch) {
//     const index = idHome.results.findIndex((id) => id === matchid);
//     idHome.results.splice(index, 1);
//     idHome.results.push(identifiedMatch.id);
//   } else {
//     idHome.results.push(identifiedMatch.id);
//   }
//   if (awayMatch) {
//     const index = idAway.results.findIndex((id) => id === matchid);
//     idAway.results.splice(index, 1);
//     idAway.results.push(identifiedMatch.id);
//   } else {
//     idAway.results.push(identifiedMatch.id);
//   }

//   if (identifiedMatch.result.winner === idHome) {
//     idHome.W += 1;
//     idAway.L += 1;
//   } else if (identifiedMatch.result.winner === idAway) {
//     idHome.L += 1;
//     idAway.W += 1;
//   } else {
//     idHome.T += 1;
//     idAway.T += 1;
//   }
//   identifiedMatch.result.played = true;
// };
</script>
