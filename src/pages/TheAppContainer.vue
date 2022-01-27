<template>
  <component :is="currentScreen"></component>
</template>

<script setup>
import { ref, computed } from "vue";

const screens = ref(["TheMainMenu", "TheTournament"]);
const currentScreen = ref("TheMainMenu");

const currentScreenComponent = computed(() => {
  return "the-" + currentScreen.value.toLowerCase();
});
</script>
