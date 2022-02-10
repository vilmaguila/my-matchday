<template>
  <component
    class="container mx-auto"
    :is="activeScreen"
    v-bind="activeProps"
    :gamedata="activeGameData"
    @form-values="createTournamentObject"
    @change-screen="changeScreen"
    @set:activeGameslot="setActiveGameslot"
    @set:gamestate="setGamestate"
    @clear:gameslot="clearGameslot"
    @sim-selected="simulateSelected"
  ></component>
</template>

<script>
export default {
  components: { TheMainMenu, TheTournament, TheNewGameScreen },
};
</script>

<script setup>
import { ref, reactive, computed, onMounted, watch } from "vue";
import TheTournament from "../pages/TheTournament.vue";
import TheMainMenu from "../pages/TheMainMenu.vue";
import TheNewGameScreen from "./TheNewGameScreen.vue";

const activeScreen = ref("the-main-menu");
const activeGameSlot = ref(null);

const gameSlots = ref([
  { id: 1, gamedata: null },
  { id: 2, gamedata: null },
  { id: 3, gamedata: null },
]);

const activeProps = computed(() => {
  if (activeScreen.value === "the-main-menu")
    return { gameSlots: gameSlots.value };
  if (activeScreen.value === "the-new-game-screen")
    return { gameslot: activeGameSlot.value };
  if (activeScreen.value === "the-tournament")
    return { gameslot: activeGameSlot.value, gamedata: activeGameData.value };
});

const activeGameData = computed(() => {
  return gameSlots.value.find((slot) => slot.id === activeGameSlot.value);
});

const setActiveGameslot = (id) => {
  activeGameSlot.value = id;
};

const simulateSelected = (payload) => {
  for (const matchid of payload) {
    simulateMatch(matchid);
  }
};

const simulateMatch = (matchid) => {
  const idSlot = gameSlots.value.find(
    (slot) => slot.id === activeGameSlot.value
  );
  const identifiedMatch = idSlot.gamedata.tournamentSchedule.find(
    (match) => match.id === matchid
  );
  const idHome = idSlot.gamedata.teamList.find(
    (team) => team.name === identifiedMatch.homeTeam.name
  );
  const idAway = idSlot.gamedata.teamList.find(
    (team) => team.name === identifiedMatch.awayTeam.name
  );
  console.log(identifiedMatch, idHome, idAway);

  if (identifiedMatch.result.played) {
    console.log("match was played earlier");
    if (identifiedMatch.result.winner === idHome.name) {
      console.log("hometeam won");
      idHome.W -= 1;
      idAway.L -= 1;
    } else if (identifiedMatch.result.winner === idAway.name) {
      console.log("awayteam had won");
      idHome.L -= 1;
      idAway.W -= 1;
    } else {
      console.log("was a tie");
      idHome.T -= 1;
      idAway.T -= 1;
    }
  } else {
    console.log("first sim for this match");
  }
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
  identifiedMatch.score.home = homeGoals;
  identifiedMatch.score.away = awayGoals;
  if (homeGoals > awayGoals) {
    identifiedMatch.result.winner = identifiedMatch.homeTeam.name;
    identifiedMatch.result.loser = identifiedMatch.awayTeam.name;
    identifiedMatch.result.draw = null;
  } else if (awayGoals > homeGoals) {
    identifiedMatch.result.winner = identifiedMatch.awayTeam.name;
    identifiedMatch.result.loser = identifiedMatch.homeTeam.name;
    identifiedMatch.result.draw = null;
  } else {
    identifiedMatch.result.winner = null;
    identifiedMatch.result.loser = null;
    identifiedMatch.result.draw = true;
  }
  console.log(identifiedMatch.result);
  updateTeamRecords(identifiedMatch.id);
};

const updateTeamRecords = (matchid) => {
  const idSlot = gameSlots.value.find(
    (slot) => slot.id === activeGameSlot.value
  );
  const identifiedMatch = idSlot.gamedata.tournamentSchedule.find(
    (match) => match.id === matchid
  );
  const idHome = idSlot.gamedata.teamList.find(
    (team) => team.name === identifiedMatch.homeTeam.name
  );
  const idAway = idSlot.gamedata.teamList.find(
    (team) => team.name === identifiedMatch.awayTeam.name
  );

  const homeMatch = idHome.results.find((id) => id === matchid);
  const awayMatch = idAway.results.find((id) => id === matchid);
  if (homeMatch) {
    const index = idHome.results.findIndex((id) => id === matchid);
    idHome.results.splice(index, 1);
    idHome.results.push(identifiedMatch.id);
  } else {
    idHome.results.push(identifiedMatch.id);
  }
  if (awayMatch) {
    const index = idAway.results.findIndex((id) => id === matchid);
    idAway.results.splice(index, 1);
    idAway.results.push(identifiedMatch.id);
  } else {
    idAway.results.push(identifiedMatch.id);
  }

  if (identifiedMatch.result.winner === idHome.name) {
    idHome.W += 1;
    idAway.L += 1;
  } else if (identifiedMatch.result.winner === idAway.name) {
    idHome.L += 1;
    idAway.W += 1;
  } else {
    idHome.T += 1;
    idAway.T += 1;
  }
  identifiedMatch.result.played = true;
};

const clearGameslot = (id) => {
  const idSlot = gameSlots.value.find((slot) => slot.id === id);
  idSlot.gamedata = null;
};

const setGamestate = (payload) => {
  const idSlot = gameSlots.value.find((slot) => slot.id === payload.id);
  idSlot.gamedata = payload.gamedata;
};

const changeScreen = (payload) => {
  activeScreen.value = payload;
};

const createTournamentObject = (payload) => {
  const idSlot = gameSlots.value.find(
    (slot) => slot.id === activeGameSlot.value
  );
  let result = generateMatchesArray(payload.teamList, payload.tournamentRounds);
  let ar = result.matchesArray;
  let by = result.byeteams;
  let we = result.rounds;
  idSlot.gamedata = reactive({
    tournamentName: payload.tournamentName,
    tournamentTeamCount: payload.tournamentTeamCount,
    tournamentRounds: payload.tournamentRounds,
    tournamentMode: payload.tournamentMode,
    teamList: payload.teamList,
    tournamentSchedule: ar,
    tournamentByeweeks: by,
    tournamentWeeks: we,
  });
};

onMounted(() => {
  if (localStorage.getItem("gamesim:gamedata")) {
    try {
      gameSlots.value = JSON.parse(localStorage.getItem("gamesim:gamedata"));
    } catch (e) {
      localStorage.removeItem("gamesim:gamedata");
    }
  }
});

watch(
  gameSlots,
  (newVal) => {
    const parsed = JSON.stringify(newVal);
    localStorage.setItem("gamesim:gamedata", parsed);
  },
  { deep: true }
);

const generateMatchesArray = (teamList, tournamentRounds) => {
  const matchesArray = [];
  const byeteams = [];
  const localTeamList = [...teamList];
  let roundMatchups = localTeamList.length / 2;
  let rounds = (localTeamList.length - 1) * tournamentRounds;
  if (localTeamList.length % 2 !== 0) {
    rounds = localTeamList.length * tournamentRounds;
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
  return { matchesArray, byeteams, rounds };
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
