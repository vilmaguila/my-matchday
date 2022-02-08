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
    <component
      class="w-full"
      :is="selectedLeagueForm"
      :gameslot="props.gameslot"
      @change-screen="dispatchChangeScreen"
      @form-values="dispatchFormValues"
    ></component>
  </div>
</template>

<script>
export default {
  components: { CustomSoccerTournament, NflForm },
};
</script>

<script setup>
import { ref, computed } from "vue";
import MSelectBar from "../components/ui/MSelectBar.vue";
import CustomSoccerTournament from "../components/CustomSoccerTournament.vue";
import NflForm from "../components/NflForm.vue";

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

const dispatchChangeScreen = (payload) => {
  emit("change-screen", payload);
};

const dispatchFormValues = (payload) => {
  emit("form-values", payload);
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
</script>
