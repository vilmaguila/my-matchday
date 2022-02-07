<template>
  <div class="screen-grey">
    <div class="flex flex-row rounded-md text-4xl bg-gray-400">
      <button class="button-red" @click="navigateMainMenu">Main Menu</button>
      <div class="m-auto">My-Matchday</div>
    </div>
    <m-select-bar
      :options="sports"
      @update:currentOption="selectedSport"
    ></m-select-bar>
    <m-select-bar
      v-if="currentSport"
      :options="leagueProps"
      @update:currentOption="selectedLeague"
    ></m-select-bar>
    <component :is="selectedLeagueForm"></component>
    <form @submit.prevent="submitForm">
      <div class="flex flex-col">
        <label
          for="tournament_name"
          :class="{ 'text-red-500': tournamentNameValidity === 'invalid' }"
          >Name</label
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
      <div class="flex flex-col">
        <label for="team_count">Choose the number of teams participating</label>
        <select
          v-model.number="tournamentTeamCount"
          class="bg-gray-300 rounded-sm px-2 py-1"
        >
          <option v-for="n in 31">{{ n + 1 }}</option>
        </select>
      </div>
      <div class="flex flex-col">
        <label for="match_count">Games agains each other</label>
        <select
          v-model.number="tournamentRounds"
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
          <label for="league">League</label>
        </div>
        <div>
          <input
            type="radio"
            value="groupknockout"
            id="groupknockout"
            v-model="tournamentMode"
            disabled
          />
          <label for="groupknockout">Group + Knockout</label>
        </div>
        <div>
          <input
            type="radio"
            value="knockout"
            id="knockout"
            v-model="tournamentMode"
            disabled
          />
          <label for="knockout">Knockout</label>
        </div>
      </div>
      <div class="flex flex-col space-y-2">
        <div class="flex space-x-3 wrap">
          <div>Team Names</div>
          <button
            type="button"
            class="bg-gray-700 text-white"
            @click="generateTeamStrengths"
          >
            Generate team strengths
          </button>
        </div>

        <div class="flex space-x-2" v-for="(team, index) in teamList">
          <input
            :placeholder="index"
            type="text"
            v-model="teamList[index].name"
            class="bg-gray-300 py-1 px-2"
          />
          <input
            placeholder="OVR"
            type="text"
            v-model.number="teamList[index].OVR"
            class="bg-gray-300 py-1 px-2 w-10 text-xs"
          />
          <input
            placeholder="OFF"
            type="text"
            v-model.number="teamList[index].OFF"
            class="bg-gray-300 py-1 px-2 w-10 text-xs"
          />
          <input
            placeholder="DEF"
            type="text"
            v-model.number="teamList[index].DEF"
            class="bg-gray-300 py-1 px-2 w-10 text-xs"
          />
        </div>
      </div>
      <div>
        <button
          @click="
            changeScreen({ screen: 'the-tournament', slot: props.gameslot })
          "
          class="bg-blue-200 rounded-md p-2 m-2 disabled:opacity-30"
          :disabled="!formValidity"
        >
          Submit form data
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  components: { CustomSoccerTournament },
};
</script>

<script setup>
import { ref, watch, computed } from "vue";
import MSelectBar from "../components/ui/MSelectBar.vue";
import CustomSoccerTournament from "../components/CustomSoccerTournament.vue";

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

const navigateMainMenu = () => {
  emit("change-screen", "the-main-menu");
  emit("set:activeGameslot", null);
};

const changeScreen = (payload) => {
  emit("change-screen", "the-tournament");
  emit(
    "form-values",
    {
      tournamentName: tournamentName.value,
      tournamentTeamCount: tournamentTeamCount.value,
      tournamentRounds: tournamentRounds.value,
      tournamentMode: tournamentMode.value,
      teamList: teamList.value,
    },
    props.gameslot
  );
};

const currentSport = ref(null);
const currentLeague = ref(null);

const selectedSport = (payload) => {
  currentSport.value = payload;
};

const selectedLeague = (payload) => {
  currentLeague.value = payload;
};

const selectedLeagueForm = computed(() => {
  if (currentLeague.value === "nfl") {
    return "nfl-form";
  }
  if (currentLeague.value === "vaahteraliiga") return "vaahteraliiga-form";
  if (currentLeague.value === "epl") return "epl-form";
  if (currentLeague.value === "veikkausliiga") return "veikkausliiga-form";
  if (currentLeague.value === "soccer-custom")
    return "custom-soccer-tournament";
});

const leagueProps = computed(() => {
  if (currentSport.value === "football") {
    return [
      { name: "nfl", display: "National Football League" },
      { name: "vaahteraliiga", display: "Vaahteraliiga" },
    ];
  }
  if (currentSport.value === "soccer")
    return [
      {
        name: "epl",
        display: "English Premier League",
      },
      {
        name: "veikkausliiga",
        display: "Veikkausliiga",
      },
      {
        name: "soccer-custom",
        display: "Custom",
      },
    ];
});

const sports = [
  { name: "football", display: "Football" },
  { name: "soccer", display: "Soccer" },
];

const tournamentName = ref("");
const tournamentTeamCount = ref(2);
const tournamentRounds = ref(1);
const tournamentMode = ref("league");
const teamList = ref([
  {
    name: "Team 1",
    W: 0,
    T: 0,
    L: 0,
    G: 0,
    A: 0,
    OVR: null,
    OFF: null,
    DEF: null,
    results: [],
  },
  {
    name: "Team 2",
    W: 0,
    T: 0,
    L: 0,
    G: 0,
    A: 0,
    OVR: null,
    OFF: null,
    DEF: null,
    results: [],
  },
]);

const tournamentNameValidity = ref("pending");

watch(tournamentTeamCount, (count, prevCount) => {
  if (count > prevCount) {
    for (let step = prevCount + 1; step <= count; step++) {
      teamList.value.push({
        name: "Team " + step.toString(),
        W: 0,
        T: 0,
        L: 0,
        G: 0,
        A: 0,
        OVR: null,
        OFF: null,
        DEF: null,
        results: [],
      });
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
  if (
    tournamentTeamCount.value &&
    tournamentRounds.value &&
    tournamentMode.value
  ) {
    emit("form-values", {
      tournamentName: tournamentName.value,
      tournamentTeamCount: tournamentTeamCount.value,
      tournamentRounds: tournamentRounds.value,
      tournamentMode: tournamentMode.value,
      teamList: teamList.value,
    });
    tournamentName.value = "";
    tournamentTeamCount.value = 2;
    tournamentRounds.value = 1;
    teamList.value = [
      {
        name: "Team 1",
        W: 0,
        T: 0,
        L: 0,
        G: 0,
        A: 0,
        OVR: null,
        OFF: null,
        DEF: null,
        results: [],
      },
      {
        name: "Team 2",
        W: 0,
        T: 0,
        L: 0,
        G: 0,
        A: 0,
        OVR: null,
        OFF: null,
        DEF: null,
        results: [],
      },
    ];
    tournamentNameValidity.value = "pending";
  } else {
    alert("Please fill the all the form values");
  }
};
</script>

<style scoped>
.active-sport {
  @apply bg-green-400;
}
</style>
