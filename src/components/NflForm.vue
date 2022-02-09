<template>
  <div class="screen-grey">
    <form @submit.prevent="submitForm">
      <div class="flex flex-col">
        <label
          for="tournament_name"
          :class="{ 'text-red-500': tournamentNameValidity === 'invalid' }"
          >Season name</label
        >
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
      <div class="flex flex-col space-y-2">
        <div class="flex space-x-3 wrap">
          <div>Team Names</div>
          <button
            type="button"
            class="bg-gray-700 text-white"
            @click="generateTeamStrengths"
          >
            Generate random team strengths
          </button>
        </div>
        <div v-for="division in dividedConferencesDivisions">
          <div class="flex space-x-2" v-for="(team, index) in division">
            <input
              :placeholder="index"
              type="text"
              v-model="division[index].name"
              class="bg-gray-300 py-1 px-2"
            />
            <input
              placeholder="OVR"
              type="text"
              v-model.number="division[index].OVR"
              class="bg-gray-300 py-1 px-2 w-10 text-xs"
            />
            <input
              placeholder="OFF"
              type="text"
              v-model.number="division[index].OFF"
              class="bg-gray-300 py-1 px-2 w-10 text-xs"
            />
            <input
              placeholder="DEF"
              type="text"
              v-model.number="division[index].DEF"
              class="bg-gray-300 py-1 px-2 w-10 text-xs"
            />
          </div>
        </div>
      </div>
      <m-select-bar
        :options="conferences"
        initSelection="afc"
        @update:currentOption="updateSelectedConference"
      ></m-select-bar>
      <div>
        <button
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
import { ref, computed } from "vue";
import { teams } from "../data/nfl.js";
import MSelectBar from "../components/ui/MSelectBar.vue";

const props = defineProps({
  gameslot: {
    type: Number,
    required: true,
  },
});

const emit = defineEmits({
  "form-values": null,
  "change-screen": null,
  "set:activeGameslot": null,
});

const tournamentName = ref("");
const teamList = ref(teams);

const conferences = [
  { name: "afc", display: "AFC" },
  { name: "nfc", display: "NFC" },
];
const updateSelectedConference = (payload) => {
  selectedConference.value = payload;
};
const selectedConference = ref("afc");
const selectedConferenceTeams = computed(() => {
  return teamList.value.filter(
    (team) => team.conference === selectedConference.value
  );
});
const dividedConferencesDivisions = computed(() => {
  return groupBy(selectedConferenceTeams.value, "division");
});

var groupBy = (xs, key) => {
  return xs.reduce((rv, x) => {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};

const filterDivision = (division) => {
  return teamList.value.filter((team) => team.division === division);
};

const tournamentNameValidity = ref("pending");

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

const generateTeamStrengths = () => {
  for (const team of teamList.value) {
    team.OVR = Math.floor(
      Math.random() * (Math.floor(95) - Math.ceil(65) + 1) + Math.ceil(65)
    );
    team.OFF = Math.floor(
      Math.random() * (Math.floor(95) - Math.ceil(65) + 1) + Math.ceil(65)
    );
    team.DEF = Math.floor(
      Math.random() * (Math.floor(95) - Math.ceil(65) + 1) + Math.ceil(65)
    );
  }
};

const submitForm = () => {
  if (true) {
    emit("change-screen", "the-tournament");
    emit(
      "form-values",
      {
        tournamentName: tournamentName.value,
        teamList: teamList.value,
      },
      props.gameslot
    );
    tournamentNameValidity.value = "pending";
  } else {
    alert("Please fill the all the form values");
  }
};
</script>
