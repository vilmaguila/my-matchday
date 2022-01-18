<template>
  <tr>
    <td class="standings-row">{{ team.name }}</td>
    <td class="standings-row">{{ team.W }}</td>
    <td class="standings-row">{{ team.T }}</td>
    <td class="standings-row">{{ team.L }}</td>
    <td class="standings-row">{{ PTS }}</td>
    <td class="standings-row">{{ team.G }}</td>
    <td class="standings-row">{{ team.A }}</td>
    <td class="standings-row">{{ DIFF }}</td>
  </tr>
</template>

<script setup>
import { computed } from "vue";
const props = defineProps({
  team: {
    type: Object,
    default: {},
  },
});

const PTS = computed(() => {
  return props.team.W * 3 + props.team.T;
});

const DIFF = computed(() => {
  return props.team.G - props.team.A;
});
</script>
