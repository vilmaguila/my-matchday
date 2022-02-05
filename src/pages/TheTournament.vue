<template>
  <div class="screen-grey">
    <div class="flex flex-row rounded-md text-4xl bg-gray-400">
      <button class="button-red" @click="navigateMainMenu">Main Menu</button>
      <div class="m-auto">My-Matchday</div>
    </div>

    <component
      :is="currentComponent"
      v-bind="currentProps"
      @dynamic:tournament-event="handleEvent"
    ></component>
    <div class="flex">
      <button
        v-for="tab in tabs"
        :key="tab"
        :class="['button-green', { active: currentTab === tab }]"
        @click="currentComponent = tab"
      >
        {{ tab }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  components: { TournamentStandings, TournamentMatchweek },
};
</script>

<script setup>
import { ref, computed } from "vue";
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

const currentComponent = ref("tournament-standings");

const currentProps = computed(() => {
  if (currentComponent.value === "tournament-standings")
    return { teams: props.gamedata.gamedata.teamList };
  if (currentComponent.value === "tournament-matchweek")
    return {
      matches: props.gamedata.gamedata.tournamentSchedule,
      rounds: props.gamedata.gamedata.tournamentWeeks,
    };
});

const tabs = ["tournament-standings", "tournament-matchweek"];

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

const handleEvent = (payload) => {
  if (payload.type === "selected-sim") {
    emit("sim-selected", payload.data);
  }
};
</script>
