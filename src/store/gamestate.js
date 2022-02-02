import { reactive } from "vue";

export default {
  state: reactive({
    1: null,
    2: null,
    3: null,
  }),
  setActiveGameslot: (gameslot) => {
    this.state.activeGameslot = gameslot;
  },
};
