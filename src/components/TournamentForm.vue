<template>
  <div class="flex flex-col gap-2 bg-gray-200 rounded-xl p-4 m-4">
    <h1 class="text-center text-2xl">Tournament Schedule Generator</h1>
    <form @submit.prevent="submitForm">
      <div class="flex flex-col">
        <label
          for="tournament_name"
          :class="{ 'text-red-500': tournamentNameValidity === 'invalid' }"
        >
          Tournament name
        </label>
        <input
          type="text"
          id="tournament_name"
          v-model.trim="tournamentName"
          class="bg-gray-300 rounded-sm px-2 py-1"
          @blur="validateInput"
          :class="{
            'border-2 border-red-500': tournamentNameValidity === 'invalid',
          }"
        />
        <p v-if="tournamentNameValidity === 'invalid'" class="text-red-500">
          Please enter a valid Tournament Name
        </p>
      </div>
      <div class="flex flex-col">
        <label for="team_count">
          Choose the number of teams participating</label
        >
        <select
          v-model.number="teamCount"
          class="bg-gray-300 rounded-sm px-2 py-1"
        >
          <option v-for="n in 31">{{ n + 1 }}</option>
        </select>
      </div>
      <div class="flex flex-col">
        <label for="match_count">Games agains each other</label>
        <select
          v-model.number="tiesBetween"
          class="bg-gray-300 rounded-sm px-2 py-1"
        >
          <option v-for="n in 4" class="bg-green-200">{{ n }}</option>
        </select>
      </div>
      <div class="flex flex-col">
        <label>Tournament mode</label>
        <div>
          <input
            type="radio"
            value="league"
            id="league"
            v-model="tournamentMode"
          />
          <label for="league"> League </label>
        </div>
        <div>
          <input
            type="radio"
            value="groupknockout"
            id="groupknockout"
            v-model="tournamentMode"
            disabled
          />
          <label for="groupknockout"> Group + Knockout </label>
        </div>
        <div>
          <input
            type="radio"
            value="knockout"
            id="knockout"
            v-model="tournamentMode"
            disabled
          />
          <label for="knockout"> Knockout </label>
        </div>
      </div>
      <div class="flex flex-col space-y-2">
        <label for=""> Team Names </label>
        <input
          v-for="(team, index) in teamList"
          :placeholder="index"
          type="text"
          v-model="teamList[index]"
          class="bg-gray-300 py-1 px-2"
        />
      </div>
      <div>
        <button
          type="submit"
          class="bg-blue-200 rounded-md p-2 m-2 disabled:opacity-30"
          :disabled="!formValidity"
        >
          Submit form data
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, watch, computed } from "vue";

const emit = defineEmits({
  "form-values": null,
});

const tournamentName = ref("");
const teamCount = ref(2);
const tiesBetween = ref(1);
const tournamentMode = ref("league");
const teamList = ref(["1", "2"]);

const tournamentNameValidity = ref("pending");

watch(teamCount, (count, prevCount) => {
  if (count > prevCount) {
    for (let step = 3; step <= count; step++) {
      teamList.value.push(step.toString());
    }
  } else {
    teamList.value.splice(count);
  }
});

const formValidity = computed(() => {
  if (tournamentNameValidity.value === "valid") {
    return true;
  } else {
    return false;
  }
});

const validateInput = () => {
  if (tournamentName.value === "") {
    tournamentNameValidity.value = "invalid";
  } else {
    tournamentNameValidity.value = "valid";
  }
};

const submitForm = () => {
  if (teamCount.value && tiesBetween.value && tournamentMode.value) {
    emit("form-values", {
      tournamentName: tournamentName.value,
      teamCount: teamCount.value,
      tiesBetween: tiesBetween.value,
      tournamentMode: tournamentMode.value,
      teamList: teamList.value,
    });
  } else {
    alert("Please fill the all the form values");
  }
};
</script>
