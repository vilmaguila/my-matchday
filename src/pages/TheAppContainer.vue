<template>
  <component
    :is="currentScreen"
    :gameSlots="gameSlots"
    :gameslot="activeGameSlot"
    @form-values="createTournamentObject"
    @change-screen="changeScreen"
  ></component>
</template>

<script setup>
import { ref, reactive } from "vue";
import TheTournament from '../pages/TheTournament.vue'
import TheMainMenu from '../pages/TheMainMenu.vue'
import TheNewGameScreen from "./TheNewGameScreen.vue";

const currentScreen = ref(TheMainMenu);
const activeGameSlot = ref(null)

const screenCoding = {
  'main-menu': TheMainMenu,
  'new-game-screen': TheNewGameScreen,
  'the-tournament': TheTournament
}

const gameSlots = ref([
  { slot: 1, gamedata: null },
  { slot: 2, gamedata: null },
  { slot: 3, gamedata: null },
]);

const changeScreen = (payload) => {
  currentScreen.value = screenCoding[payload.screen];
  activeGameSlot.value = payload.slot
}

const createTournamentObject = (payload) => {
  const idSlot = gameSlots.value.find(slot => slot.slot === activeGameSlot.value)
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
