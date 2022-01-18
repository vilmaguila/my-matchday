<template>
  <div class="flex flex-col gap-2 bg-gray-200 rounded-xl p-4 m-4">
    <table class="border-collapse border border-gray-400 text-center px-2">
      <thead class="text-left">
        <tr>
          <th class="standings-header pr-6">Team</th>
          <th class="standings-header">W</th>
          <th class="standings-header">T</th>
          <th class="standings-header">L</th>
          <th class="standings-header">PTS</th>
          <th class="standings-header">G</th>
          <th class="standings-header">A</th>
          <th class="standings-header">Diff</th>
        </tr>
      </thead>
      <tbody>
        <slot />
      </tbody>
    </table>
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
