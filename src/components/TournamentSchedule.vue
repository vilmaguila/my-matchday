<template>
  <div class="flex flex-col gap-2 bg-gray-200 rounded-xl p-4 m-4">
    <tournament-match
      v-for="match in schedule"
      :match="match"
      @dispatch-result="dispatchResult"
    ></tournament-match>
  </div>
</template>

<script setup>
import TournamentMatch from "../components/TournamentMatch.vue";

const props = defineProps({
  schedule: {},
});

const emit = defineEmits({
  "dispatch-result": {},
});

const dispatchResult = (payload) => {
  emit("dispatch-result", payload);
};
</script>
