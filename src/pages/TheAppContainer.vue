<template>
  <button @click="changeTournament">Switch to other Screen</button>
  <component :is="currentScreen"></component>
</template>

<script setup>
import { ref } from "vue";
import TheTournament from '../pages/TheTournament.vue'
import TheMainMenu from '../pages/TheMainMenu.vue'

const screens = ref([TheMainMenu, TheTournament]);
const currentScreen = ref(TheMainMenu);

const changeTournament = () => {
  currentScreen.value = TheTournament
}

</script>
