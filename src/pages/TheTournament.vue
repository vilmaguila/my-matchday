<template>
  <div class="screen-grey">
    <div class="flex flex-row rounded-md text-4xl bg-gray-400">
      <button class="button-red" @click="navigateMainMenu">Main Menu</button>
      <div class="m-auto">My-Matchday</div>
    </div>

    <div class="flex flex-row items-start">
      <tournament-standings
        v-if="gamedata.gamedata"
        class="w-96 h-auto overflow-y-auto"
        :teams="gamedata.gamedata.teamList"
      ></tournament-standings>
      <tournament-matchweek
        class="w-96 h-96 overflow-y-auto"
        v-if="gamedata.gamedata"
        :matches="gamedata.gamedata.tournamentSchedule"
        :rounds="gamedata.gamedata.tournamentWeeks"
        @selected-sim="dummyCall"
      ></tournament-matchweek>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import TournamentStandings from "../components/TournamentStandings.vue";
import TournamentMatchweek from "../components/TournamentMatchweek.vue";

const props = defineProps({
  gameslot: {
    type: Number,
    required: true,
  },
  gamedata: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits({
  "change-screen": {},
  "set:activeGameslot": {},
  "set:gamestate": {},
  "sim-selected": {},
});

const navigateMainMenu = () => {
  emit("change-screen", "the-main-menu");
  emit("set:activeGameslot", null);
};

const dummyCall = (payload) => {
  emit("sim-selected", payload);
};
</script>
