<template>
  <div>Welcome, this is the main menu</div>
  <div>
    <game-slot v-for="(slot, index) in gameSlots">
      <div>Game {{ index + 1 }}</div>
      <div v-if="slot.gamedata">
        <button class="button" @click="deleteGame(slot.id)">X</button>
        <button class="button" @click="loadGame(slot.id)">Load Game</button>
      </div>
      <div v-else>
        <button class="button" @click="newGame(slot.id)">New Game</button>
      </div>
    </game-slot>
  </div>
</template>
}
<script setup>
import GameSlot from "../components/GameSlot.vue";

const props = defineProps({
  gameSlots: {},
});

const emit = defineEmits({
  "change-screen": {},
  "set:activeGameslot": {},
});

const newGame = (slot) => {
  emit("change-screen", "the-new-game-screen");
  emit("set:activeGameslot", slot);
};

const deleteGame = (slot) => {
  emit("clear:gameslot", slot);
};

const loadGame = (slot) => {
  emit("change-screen", "the-tournament");
  emit("set:activeGameslot", slot);
};
</script>

<style></style>
