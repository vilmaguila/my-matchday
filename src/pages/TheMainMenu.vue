<template>
  <div>Welcome, this is the main menu</div>
  <div v-for="gameslot in gameSlots">
    {{ gameslot }}
  </div>
</template>
}
<script setup>
import { ref } from "vue";

const gameSlots = ref([null, null, null]);
</script>

<style></style>
