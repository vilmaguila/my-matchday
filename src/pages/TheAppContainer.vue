<template>
  <component :is="currentScreen" @update-screen="changeScreen" @change-screen="changeScreen"></component>
</template>

<script setup>
import { ref } from "vue";
import TheTournament from '../pages/TheTournament.vue'
import TheMainMenu from '../pages/TheMainMenu.vue'
import TheNewGameScreen from "./TheNewGameScreen.vue";

const screens = ref([TheMainMenu, TheTournament]);
const currentScreen = ref(TheMainMenu);

const screenCoding = {
  'main-menu': TheMainMenu,
  'new-game-screen': TheNewGameScreen,
  'the-tournament': TheTournament
}

const changeScreen = (screen) => {
  currentScreen.value = screenCoding[screen];
}

</script>
