<template>
  <div class="flex flex-col items-center">
    <tournament-form
      @form-values="setFormValues"
      class="w-1/2"
    ></tournament-form>
    {{ tournamentSpecs }}
    <p v-if="!formSubmitted" class="text-red-500">
      Please submit tournament data
    </p>
    <tournament-schedule
      v-else
      :schedule="matchObjectPairs"
    ></tournament-schedule>
    <button @click="generateMatchObjectPairs">Paina tästä</button>
    <button @click="generateMatchweekArrays(teamList)">toinene</button>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import TournamentForm from "../components/TournamentForm.vue";
import TournamentSchedule from "../components/TournamentSchedule.vue";

const tournamentName = ref(null);
const teamCount = ref(null);
const tiesBetween = ref(null);
const tournamentMode = ref("league");
const teamList = ref([]);

const generatedMatchWeeks = ref(null);
const matchObjectPairs = ref(null);

const generateMatchweekArrays = (teamList) => {
  const matchWeekArray = []
  let matchweeks = teamList.length - 1;
  let matchups = teamList.length / 2;
  if (teamList.length % 2 !== 0) {
    matchweeks = teamList.length
    // matchups = (teamList.length - 1) / 2
    teamList.push("Bye week")
  }
  console.log(matchweeks)
  console.log(matchups + " per week")
  console.log(teamList)
  for (let i = 1; i <= matchweeks; i++) {
    console.log("week" + i)
    for (let j = 0; j < matchups; j++) {
      console.log(teamList[j] + " vs " + teamList[teamList.length-1-j])
    }
    const popped = teamList.pop()
    teamList.splice(1,0,popped)
  }
};

const generateMatchweekObject = () => {
  const matchweek = {
    name: null,
    matches: [],
  };
  return matchweek;
};

const generateMatchObject = (home, away) => {
  const match = {
    date: null,
    homeTeam: home,
    awayTeam: away,
    score: {
      home: null,
      away: null,
    },
  };
  return match;
};

const formSubmitted = ref(false);

const setFormValues = (payload) => {
  tournamentName.value = payload.tournamentName;
  teamCount.value = payload.teamCount;
  tiesBetween.value = payload.tiesBetween;
  tournamentMode.value = payload.tournamentMode;
  teamList.value = payload.teamList;
  formSubmitted.value = true;
};

const tournamentSpecs = computed(() => {
  const totalGames =
    ((teamCount.value * (teamCount.value - 1)) / 2) * tiesBetween.value;
  return "The number of games played is " + totalGames;
});

const generateMatchObjectPairs = () => {
  var result = teamList.value.flatMap((v, i) =>
    teamList.value.slice(i + 1).map((w) => generateMatchObject(v, w))
  );
  matchObjectPairs.value = result;
};

const gs2 = () => {};

const gS = () => {
  function choose(arr, k, prefix = []) {
    if (k == 0) return [prefix];
    return arr.flatMap((v, i) =>
      choose(arr.slice(i + 1), k - 1, [...prefix, v])
    );
  }
};
</script>
