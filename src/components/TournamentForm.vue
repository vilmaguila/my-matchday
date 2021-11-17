<template>
  <form @submit.prevent="startMatchMaking" class="flex gap-2">
    <label for="team_count"> Choose the number of teams participating</label>
    <select v-model="teamCount" class="bg-red-200">
      <option v-for="n in 19">{{ n + 1 }}</option>
    </select>
    <label for="match_count"></label>
    <select v-model="ties" class="bg-red-200">
      <option v-for="n in 4" class="bg-green-200">{{ n + 1 }}</option>
    </select>
    <button type="submit" class="bg-blue-200 rounded-md p-2">
      Start MatchMaking
    </button>
  </form>
</template>

<script setup>
import { ref } from "vue";

const emit = defineEmits({
  formValues: {},
});

const teamCount = ref(null);
const ties = ref(null);

const startMatchMaking = () => {
  emit("form-values", { teamCount: teamCount.value, ties: ties.value });
};
</script>
