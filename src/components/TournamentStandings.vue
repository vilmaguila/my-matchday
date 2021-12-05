<template>
  <div class="flex flex-col gap-2 bg-gray-200 rounded-xl p-4 m-4">
    <div v-for="team in teams">
      {{ team }}
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  teams: {
    type: Array,
    default: [],
  },
});
</script>
