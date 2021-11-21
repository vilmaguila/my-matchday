<template>
  <form @submit.prevent="submitForm" class="flex flex-col w-40 gap-2">
    <div>
      <label for="team_count"> Choose the number of teams participating</label>
      <select v-model.number="teamCount" class="bg-red-200">
        <option v-for="n in 31">{{ n + 1 }}</option>
      </select>
    </div>
    <div>
      <label for="match_count">Games agains each other</label>
      <select v-model.number="tiesBetween" class="bg-red-200">
        <option v-for="n in 4" class="bg-green-200">{{ n }}</option>
      </select>
    </div>
    <div>
      <span>Tournament mode</span>
      <br />
      <input type="radio" value="league" id="league" v-model="tournamentMode" />
      <label for="league"> League </label>
      <br />
      <input
        type="radio"
        value="groupknockout"
        id="groupknockout"
        v-model="tournamentMode"
      />
      <label for="groupknockout"> Group + Knockout </label>
      <br />
      <input
        type="radio"
        value="knockout"
        id="knockout"
        v-model="tournamentMode"
      />
      <label for="knockout"> Knockout </label>
    </div>
    <div>
      <input
        v-for="(team, index) in teamList"
        :placeholder="index"
        type="text"
        v-model="teamList[index]"
      />
    </div>
    <button type="submit" class="bg-blue-200 rounded-md p-2 m-2">
      Submit form data
    </button>
  </form>
</template>

<script setup>
import { ref, watch } from "vue";

const emit = defineEmits({
  "form-values": null,
});

const teamCount = ref(2);
const tiesBetween = ref(1);
const tournamentMode = ref("league");
const teamList = ref(["1", "2"]);

watch(teamCount, (count, prevCount) => {
  if (count > prevCount) {
    for (let step = 3; step <= count; step++) {
      teamList.value.push(step);
    }
  } else {
    teamList.value.splice(count)
  }
});

const submitForm = () => {
  if (teamCount.value && tiesBetween.value && tournamentMode.value) {
    emit("form-values", {
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
