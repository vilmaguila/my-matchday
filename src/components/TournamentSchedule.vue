<template>
  <div class="flex flex-col gap-2 bg-gray-200 rounded-xl p-4 m-4">
    <tournament-matchweek v-for="matchweek in schedule" :matchweek="matchweek">
      <tournament-match v-for="match in matchweek.matches" :match="match">
      </tournament-match>
    </tournament-matchweek>
  </div>
</template>

<script setup>
import TournamentMatchweek from "../components/TournamentMatchweek.vue";
import TournamentMatch from "../components/TournamentMatch.vue";
const props = defineProps({
  schedule: {
    type: Array,
    default: [],
  },
});
</script>
