<template>
  <form @submit.prevent="startMatchMaking" class="flex flex-col w-40 gap-2">
    <label for="team_count"> Choose the number of teams participating</label>
    <select v-model="teamCount" class="bg-red-200">
      <option v-for="n in 31">{{ n + 1 }}</option>
    </select>
    <label for="match_count">Games agains each other</label>
    <select v-model="ties" class="bg-red-200">
      <option v-for="n in 4" class="bg-green-200">{{ n }}</option>
    </select>
    <div>
      <span>Tournament mode</span>
      <br />
      <input type="radio" value="league" id="league" v-model="selectedMode" />
      <label for="league"> League </label>
      <br />
      <input
        type="radio"
        value="groupknockout"
        id="groupknockout"
        v-model="selectedMode"
      />
      <label for="groupknockout"> Group + Knockout </label>
      <br />
      <input
        type="radio"
        value="knockout"
        id="knockout"
        v-model="selectedMode"
      />
      <label for="knockout"> Knockout </label>
    </div>

    <button type="submit" class="bg-blue-200 rounded-md p-2 m-2">
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
const selectedMode = ref(null);

const startMatchMaking = () => {
  if (teamCount.value && ties.value && selectedMode.value) {
    emit("form-values", {
      teamCount: teamCount.value,
      ties: ties.value,
      selectedMode: selectedMode.value,
    });
  } else {
    alert("Please fill the all the form values");
  }
};
</script>
