<template>
  <div class="flex mx-auto">
    <button
      v-for="league in leagues"
      :key="league.name"
      :class="[
        'p-2 rounded-md bg-gray-100',
        { 'active-league': currentLeague === league.name },
      ]"
      @click="currentLeague = league.name"
    >
      {{ league.display }}
    </button>
  </div>
  <component :is="currentLeague"></component>
</template>

<script setup>
import { ref, computed } from "vue";

const currentLeague = ref("vaahteraliiga");

const leagues = [
  { name: "vaahteraliiga", display: "Vaahteraliiga" },
  { name: "nfl", display: "National Football League" },
];
</script>

<style scoped>
.active-league {
  @apply bg-green-400;
}
</style>
