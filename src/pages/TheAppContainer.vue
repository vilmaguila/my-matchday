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
  idSlot.gamedata = reactive({
    tournamentName: payload.tournamentName,
    tournamentTeamCount: payload.tournamentTeamCount,
    tournamentRounds: payload.tournamentRounds,
    tournamentMode: payload.tournamentMode,
    teamList: payload.teamList,
    tournamentSchedule: [],
    tournamentStandings: null,
    tournamentByeweeks: null,
    tournamentWeeks: null,
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

// watch(
//   gameSlots,
//   (newVal) => {
//     const parsed = JSON.stringify(newVal);
//     localStorage.setItem("gamesim:gamedata", parsed);
//   },
//   { deep: true }
// );
</script>
