<template>
  <tr>
    <td class="standings-row">{{ team.name }}</td>
    <td class="standings-row">{{ G }}</td>
    <td class="standings-row">{{ team.W }}</td>
    <td class="standings-row">{{ team.T }}</td>
    <td class="standings-row">{{ team.L }}</td>
    <td class="standings-row">{{ PTS }}</td>
    <!-- <td class="standings-row">{{ S }}</td>
    <td class="standings-row">{{ A }}</td>
    <td class="standings-row">{{ DIFF }}</td> -->
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

const G = computed(() => {
  return props.team.results.length;
});

const PTS = computed(() => {
  return props.team.W * 3 + props.team.T;
});

// const DIFF = computed(() => {
//   return S.value - A.value;
// });

// const S = computed(() => {
//   return props.team.results.reduce((acc, result) => {
//     if (result.homeTeam.name === props.team.name) {
//       return acc + result.score.home;
//     } else {
//       return acc + result.score.away;
//     }
//   }, 0);
// });

// const A = computed(() => {
//   return props.team.results.reduce((acc, result) => {
//     if (result.homeTeam.name === props.team.name) {
//       return acc + result.score.away;
//     } else {
//       return acc + result.score.home;
//     }
//   }, 0);
// });
</script>
