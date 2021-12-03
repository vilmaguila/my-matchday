<template>
  <div class="flex flex-col gap-2">
    <div v-for="matchweek in schedule" class="flex gap-2">
      {{ matchweek.name }}
      <div v-for="match in matchweek.matches">
        {{ match }}
      </div>
      <div>TEAMS ON BYE: {{matchweek.byeteams}}</div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  schedule: {
    type: Array,
    default: [],
  },
});
</script>
