<template>
  <tr>
    <td class="standings-row">{{ team.name }}</td>
    <td class="standings-row">{{ G }}</td>
    <td class="standings-row">{{ W }}</td>
    <td class="standings-row">{{ T }}</td>
    <td class="standings-row">{{ L }}</td>
    <td class="standings-row">{{ PTS }}</td>
    <td class="standings-row">{{ S }}</td>
    <td class="standings-row">{{ A }}</td>
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

const G = computed(() => {
  return props.team.results.length;
});

const PTS = computed(() => {
  return W.value * 3 + T.value;
});

const DIFF = computed(() => {
  return props.team.G - props.team.A;
});

const W = computed(() => {
  return props.team.results.filter((result) => {
    return result.winner.name === props.team.name;
  }).length;
});

const T = computed(() => {
  return props.team.results.filter((result) => {
    return result.draw === true;
  }).length;
});

const L = computed(() => {
  return props.team.results.filter((result) => {
    return result.loser.name === props.team.name;
  }).length;
});

const S = computed(() => {});

const A = computed(() => {});
</script>
