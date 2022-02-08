<template>
  <div class="flex mx-auto">
    <button
      type="button"
      v-for="option in options"
      :key="option.name"
      :class="[
        'p-2 rounded-md bg-gray-100',
        { active: currentOption === option.name },
      ]"
      @click="
        currentOption = option.name;
        updateCurrentOption($event.target.value);
      "
    >
      {{ option.display }}
    </button>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  options: {},
  initSelection: {},
});
const emits = defineEmits({
  "update:currentOption": {},
});
const currentOption = ref(props.initSelection);
const updateCurrentOption = () => {
  emits("update:currentOption", currentOption.value);
};
</script>

<style scoped>
.active {
  @apply bg-green-400;
}
</style>
