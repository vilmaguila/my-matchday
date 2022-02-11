import { ref, reactive, readonly, computed } from "vue";

export function useNflGame() {
  const gamestate = reactive({
    //home endzone at 0, away endzone at 100
    ballPosition: 35,
    distangeToEndzone: 65,
    teamInPossession: "home",
    down: 1,
    distanceToFirstDown: 10,
    score: {
      home: 0,
      away: 0,
    },
    time: 3600,
  });

  const ballPosition = computed(() => {
    if (gamestate.ballPosition < 50) {
      return "ball at hometeam " + gamestate.ballPosition + " yard line"
    }
    if (gamestate.ballPosition > 50) {
      return "ball at hometeam " + 100 - gamestate.ballPosition + " yard line"
    } else {
      return "ball at 50 yard line"
    }
  });

  const gameClock = computed(() => {
    if (gamestate.time > 2700) {
      let timeleft =  gamestate.time - 2700
      return "1st quarter, time left: " + timeleft
    }
  })

  const playDown = () => {
    let playCall = Math.random() < 0.5 ? "run" : "pass";
    let playResult;
    let timeLeft = true;
    let gain = 0;
    if (gamestate.time > 0) {
      timeLeft = true
    } else {
      timeLeft = false
    }
    if (timeLeft) {
      if (playCall === "run") {
        const random = Math.random();
        const absoluteGain = getYardsCompletion("run")
        gain = absoluteGain
        if (random < 0.96) {
          playResult = "gain";
        } else {
          playResult = "fumble";
        }
      }
      if (playCall === "pass") {
        const random = Math.random();
        if (random < 0.55) {
          playResult = "completion";
          const absoluteGain = getYardsCompletion("pass")
          gain = absoluteGain
          gamestate.time -= 34
        } else if (0.55 < random && random < 0.9) {
          playResult = "incompletion";
          gamestate.time -= 4
        } else if (0.9 < random && random < 0.92) {
          playResult = "interception";
        } else if (0.92 < random && random < 0.94) {
          playResult = "fumble";
        } else {
          playResult = "sack";
        }
      }
    }

    return "it is a " + playCall + " play, that results in " + playResult + ", with gain of " + gain;
  };

  return { gamestate: readonly(gamestate), playDown, ballPosition, gameClock };
}

const getYardsCompletion = (playtype) => {
  if (playtype === "pass") {
    const min = -2
    const max = 33
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  if (playtype === "run") {
    const min = -3
    const max = 18
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}