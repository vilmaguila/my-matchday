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
  const { matcharray, byeweeks, weeks } = generateMatchesArray(
    payload.teamList,
    payload.tournamentRounds
  );
  idSlot.gamedata = reactive({
    tournamentName: payload.tournamentName,
    tournamentTeamCount: payload.tournamentTeamCount,
    tournamentRounds: payload.tournamentRounds,
    tournamentMode: payload.tournamentMode,
    teamList: payload.teamList,
    tournamentSchedule: matcharray,
    tournamentByeweeks: byeweeks,
    tournamentWeeks: weeks,
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
