<template>
  <div class="flex flex-col gap-2">
    <tournament-matchweek
      v-for="matchweek in schedule"
      class="flex gap-2 flex-col"
      :matchweek="matchweek"
    >
      <div v-for="match in matchweek.matches">
        {{ match }}
      </div>
    </tournament-matchweek>
  </div>
</template>

<script setup>
import TournamentMatchweek from "../components/TournamentMatchweek.vue";
const props = defineProps({
  schedule: {
    type: Array,
    default: [],
  },
});
</script>
