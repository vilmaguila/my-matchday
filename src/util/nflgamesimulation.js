import { ref, readonly } from "vue";

export function useNflGame() {
  const gamestate = ref({
    ballPosition: 35,
    teamInPossession: "home",
    down: 1,
    score: {
      home: 0,
      away: 0,
    },
    time: 3600,
  });

  const playDown = (gamestate) => {
    let playCall = Math.random() < 0.5 ? "run" : "pass";
    let playResult;

    if (playCall === "run") {
      const random = Math.random();
      console.log(random);
      if (random < 0.96) {
        playResult = "gain";
      } else {
        playResult = "fumble";
      }
    }
    if (playCall === "pass") {
      // result = {
      //   completion: 0.55,
      //   incompletion: 0.35,
      //   interception: 0.02,
      //   sack: 0.06,
      //   fumble: 0.02,
      // };
      const random = Math.random();
      console.log(random);
      if (random < 0.55) {
        playResult = "completion";
      } else if (0.55 < random < 0.9) {
        playResult = "incompletion";
      } else if (0.9 < random < 0.92) {
        playResult = "interception";
      } else if (0.92 < random < 0.94) {
        playResult = "fumble";
      } else {
        playResult = "sack";
      }
    }
    return "it is a " + playCall + " play, that results in " + playResult;
  };

  return { gamestate: readonly(gamestate), playDown };
}
