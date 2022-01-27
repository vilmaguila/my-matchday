<template>
  <button @click="changeTournament">Switch to other Screen</button>
  <component :is="currentScreen" @update-screen="changeScreen"></component>
</template>

<script setup>
import { ref } from "vue";
import TheTournament from '../pages/TheTournament.vue'
import TheMainMenu from '../pages/TheMainMenu.vue'
import TheNewGameScreen from "./TheNewGameScreen.vue";

const screens = ref([TheMainMenu, TheTournament]);
const currentScreen = ref(TheMainMenu);

const changeTournament = () => {
  currentScreen.value = TheTournament
}

const changeScreen = (screen) => {
  alert("Got new screen: ", screen)
  currentScreen.value = screen;
}

</script>
