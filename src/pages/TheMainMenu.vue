<template>
  <div class="screen-grey">
    <label-banner>Main Menu</label-banner>
    <div>
      <game-slot v-for="(slot, index) in gameSlots">
        <div class="text-center">Game {{ index + 1 }}</div>
        <div v-if="slot.gamedata" class="flex flex-row">
          <button class="button-green" @click="loadGame(slot.id)">
            Load Game
          </button>
          <button class="button-red" @click="deleteGame(slot.id)">X</button>
        </div>
        <div v-else class="flex flex-row">
          <button class="button-green" @click="newGame(slot.id)">
            New Game
          </button>
        </div>
      </game-slot>
    </div>
  </div>
</template>
}
<script setup>
import GameSlot from "../components/GameSlot.vue";
import LabelBanner from "../components/LabelBanner.vue";

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
