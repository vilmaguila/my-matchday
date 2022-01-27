<template>
  <component :is="currentScreen" :gameslot="activeGameSlot" @change-screen="changeScreen"></component>
</template>

<script setup>
import { ref } from "vue";
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

const changeScreen = (payload) => {
  currentScreen.value = screenCoding[payload.screen];
  activeGameSlot.value = payload.slot
}

</script>
