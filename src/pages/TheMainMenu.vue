<template>
  <div>Welcome, this is the main menu</div>
  <div>
    <game-slot v-for="slot,index in gameSlots" :slotNumber="index + 1" @update-screen="updateScreen"></game-slot>
  </div>
</template>
}
<script setup>
import { ref } from "vue";
import GameSlot from "../components/GameSlot.vue";

const emit = defineEmits({
  'update-screen': {}
})

const gameSlots = ref([GameSlot, GameSlot, GameSlot]);

const updateScreen = (screen) => {
  alert("forwarding event data...")
  emit('update-screen', screen)
}
</script>

<style></style>
