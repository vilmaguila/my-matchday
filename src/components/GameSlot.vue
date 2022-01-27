<template>
  <div>{{ slotNumber }}</div>
  <div v-if="gameName">{{ gameName }}</div>
  <div v-if="containsGame">
    <button class="button">X</button>
    <button class="button">Load Game</button>
  </div>
  <div v-else>
    <button class="button" @click="newGameScreen">New Game</button>
  </div>
</template>

<script setup>
import TheNewGameScreen from '../pages/TheNewGameScreen.vue';

const props = defineProps({
  slotNumber: {
    type: String,
    required: true
  }
})

const emit = defineEmits({
  'update-screen': {

  }
})

const newGameScreen = () => {
  emit('update-screen', TheNewGameScreen)
}

</script>