<template>
  <div class="flex">
    <div>{{ match.date }}</div>
    <div>{{ match.homeTeam }}</div>
    <div>{{ match.score.home }}</div>
    -
    <div>{{ match.score.away }}</div>
    <div>{{ match.awayTeam }}</div>
  </div>
</template>

<script setup>
const props = defineProps({
  match: {
    type: Object,
    default: {},
  },
});
</script>
