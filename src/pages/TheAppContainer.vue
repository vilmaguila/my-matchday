<template>
  <component
    :is="activeScreen"
    v-bind="activeProps"
    :gamedata="activeGameData"
    @form-values="createTournamentObject"
    @change-screen="changeScreen"
  ></component>
</template>

<script>
export default {
  components: { TheMainMenu, TheTournament, TheNewGameScreen },
};
</script>

<script setup>
import { ref, reactive, computed } from "vue";
import TheTournament from "../pages/TheTournament.vue";
import TheMainMenu from "../pages/TheMainMenu.vue";
import TheNewGameScreen from "./TheNewGameScreen.vue";

const activeScreen = ref("the-main-menu");
const activeGameSlot = ref(null);

const screenCoding = {
  "main-menu": TheMainMenu,
  "new-game-screen": TheNewGameScreen,
  "the-tournament": TheTournament,
};

const gameSlots = [
  { slot: 1, gamedata: null },
  { slot: 2, gamedata: null },
  { slot: 3, gamedata: null },
];

const activeProps = computed(() => {
  if (activeScreen.value === "the-main-menu")
    return { gameSlots: gameSlots.value };
  if (activeScreen.value === "the-new-game-screen")
    return { gameslot: gameSlots.slot[activeGameSlot.value] };
});

const activeGameData = computed(() => {
  return gameSlots.value.find((slot) => slot.slot === activeGameSlot.value);
});

const changeScreen = (payload) => {
  activeScreen.value = screenCoding[payload.screen];
  activeGameSlot.value = payload.slot;
};

const createTournamentObject = (payload) => {
  const idSlot = gameSlots.value.find(
    (slot) => slot.slot === activeGameSlot.value
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
</script>
