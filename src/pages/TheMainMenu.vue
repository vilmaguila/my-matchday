<template>
  <div>Welcome, this is the main menu</div>
  <div>
    <game-slot
      v-for="(slot, index) in gameSlots"
      :slotNumber="index + 1"
      @update-screen="updateScreen"
    >
      <div>Game {{ index + 1 }}</div>
      <div v-if="gameName">{{ gameName }}</div>
      <div v-if="containsGame">
        <button class="button">X</button>
        <button class="button">Load Game</button>
      </div>
      <div v-else>
        <button
          class="button"
          @click="changeScreen({ screen: 'new-game-screen', slot: slot.slot })"
        >New Game</button>
      </div>
    </game-slot>
  </div>
</template>
}
<script setup>
import { ref } from "vue";
import GameSlot from "../components/GameSlot.vue";

const emit = defineEmits({
  "update-screen": {},
});

const gameSlots = ref([
  { slot: 1, gamedata: null },
  { slot: 2, gamedata: null },
  { slot: 3, gamedata: null },
]);

const changeScreen = (screen) => {
  emit("change-screen", screen);
};
</script>

<style></style>
