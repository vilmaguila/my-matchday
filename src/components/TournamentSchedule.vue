<template>
  <div class="flex flex-col gap-2">
    <tournament-matchweek
      v-for="matchweek in schedule"
      class="flex gap-2 flex-col"
      :matchweek="matchweek"
    >
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
