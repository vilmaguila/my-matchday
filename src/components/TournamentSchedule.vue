<template>
  <div class="flex flex-col gap-2">
    <div v-for="match in schedule" class="flex gap-2">
      <div>HOME: {{ match.homeTeam }}</div>
      <div>AWAY: {{ match.awayTeam }}</div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  schedule: {
    type: Object,
    required: true,
  },
});
</script>
