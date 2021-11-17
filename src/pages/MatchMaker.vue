<template>
  <div>X is now {{ x }} and Y is now {{ y }}</div>
  <div class="space-x-3">
    <div>{{ now }}</div>
    <button @click="pause()" class="bg-gray-400 rounded-md p-2">Pause</button>
    <button @click="resume()" class="bg-gray-400 rounded-md p-2">Resume</button>
  </div>
  <tournament-form @form-values="receiveFormValues"></tournament-form>
  {{ formValues }}
</template>

<script setup>
import { ref } from "vue";
import { useMouse, useNow } from "@vueuse/core";
import TournamentForm from "../components/TournamentForm.vue";

const { x, y } = useMouse();
const { now, pause, resume } = useNow({ controls: true });

const formValues = ref(null);

const receiveFormValues = (payload) => {
  formValues.value = payload
};
</script>
