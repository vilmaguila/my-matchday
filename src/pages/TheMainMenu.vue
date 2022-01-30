<template>
  <div>Welcome, this is the main menu</div>
  <div>
    <game-slot v-for="(slot, index) in gameSlots">
      <div>Game {{ index + 1 }}</div>
      <div v-if="gameName">{{ gameName }}</div>
      <div v-if="containsGame">
        <button class="button">X</button>
        <button class="button">Load Game</button>
      </div>
      <div v-else>
        <button class="button" @click="newGame(slot.id)">New Game</button>
      </div>
    </game-slot>
  </div>
</template>
}
<script setup>
import { ref } from "vue";
import GameSlot from "../components/GameSlot.vue";

const props = defineProps({
  gameSlots: {},
});

const emit = defineEmits({
  "update-screen": {},
  "change-screen": {},
  "set:activeGameslot": {},
});

const newGame = (slot) => {
  emit("change-screen", "the-new-game-screen");
  emit("set:activeGameslot", slot);
};

const changeScreen = (screen) => {
  emit("change-screen", screen);
};
</script>

<style></style>
