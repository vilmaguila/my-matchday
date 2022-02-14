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
    plays: [],
    stats: {},
  });

  const ballPosition = computed(() => {
    if (gamestate.ballPosition < 50) {
      return "ball at hometeam " + gamestate.ballPosition + " yard line";
    }
    if (gamestate.ballPosition > 50) {
      return "ball at hometeam " + 100 - gamestate.ballPosition + " yard line";
    } else {
      return "ball at 50 yard line";
    }
  });

  const gameClock = computed(() => {
    if (gamestate.time > 2700) {
      let timeleft = gamestate.time - 2700;
      return "1st quarter, time left: " + timeleft;
    }
    if (1800 < gamestate.time && gamestate.time < 2700) {
      let timeleft = gamestate.time - 1800;
      return "2nd quarter, time left: " + timeleft;
    }
    if (900 < gamestate.time && gamestate.time < 1800) {
      let timeleft = gamestate.time - 900;
      return "3rd quarter, time left: " + timeleft;
    }
    if (gamestate.time < 900) {
      return "4th quarter, time left: " + timeleft;
    }
  });

  const playDown = () => {
    let playCall = Math.random() < 0.5 ? "run" : "pass";
    let playResult;
    let timeLeft = true;
    let gain = 0;
    if (gamestate.time > 0) {
      timeLeft = true;
    } else {
      timeLeft = false;
    }
    if (timeLeft) {
      if (playCall === "run") {
        const random = Math.random();
        const absoluteGain = getRunYards();
        gain = absoluteGain;
        if (random < 0.96) {
          playResult = "gain";
          gamestate.time -= 33;
        } else {
          playResult = "fumble";
          gamestate.time -= 5;
        }
      }
      if (playCall === "pass") {
        const random = Math.random();
        if (random < 0.55) {
          playResult = "completion";
          const absoluteGain = getCompletedPassYards();
          gain = absoluteGain;
          gamestate.time -= 34;
        } else if (0.55 < random && random < 0.9) {
          playResult = "incompletion";
          gamestate.time -= 4;
        } else if (0.9 < random && random < 0.92) {
          playResult = "interception";
          gamestate.time -= 4;
        } else if (0.92 < random && random < 0.94) {
          playResult = "fumble";
          gamestate.time -= 6;
        } else {
          playResult = "sack";
          gamestate.time -= 34;
        }
      }
    }

    return (
      "it is a " +
      playCall +
      " play, that results in " +
      playResult +
      ", with gain of " +
      gain
    );
  };

  return { gamestate: readonly(gamestate), playDown, ballPosition, gameClock };
}

const getCompletedPassYards = () => {
  const completedYardsEvents = ["1", "2", "3"];
  const completedYardsProbabilities = [70, 20, 10];
  const completedYards =
    completedYardsEvents[simulateEvent(completedYardsProbabilities)];
  if (completedYards === "1") {
    return getRandomYardsInRange(0, 10);
  } else if (completedYards === "2") {
    return getRandomYardsInRange(11, 30);
  } else {
    return getRandomYardsInRange(30, 100);
  }
};

const getRunYards = () => {
  const runYardsEvents = ["1", "2", "3"];
  const runYardsProbabilities = [90, 7, 3];
  const runYards = runYardsEvents[simulateEvent(runYardsProbabilities)];
  if (runYards === "1") {
    return getRandomYardsInRange(-5, 10);
  } else if (runYards === "2") {
    return getRandomYardsInRange(11, 30);
  } else {
    return getRandomYardsInRange(30, 100);
  }
};

const getKickoffReturnYards = () => {
  const returnYardsEvents = ["1", "2", "3"];
  const returnYardsProbabilities = [80, 15, 5];
};

const getTurnoverReturnYards = () => {
  const returnYardsEvents = ["1", "2", "3"];
  const returnYardsProbabilities = [80, 15, 5];
  const returnYards =
    returnYardsEvents[simulateEvent(returnYardsProbabilities)];
  if (returnYards === "1") {
    return getRandomYardsInRange(0, 10);
  } else if (returnYards === "2") {
    return getRandomYardsInRange(11, 30);
  } else {
    return getRandomYardsInRange(30, 100);
  }
};

const getRandomYardsInRange = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
};

function simulateEvent(chances) {
  var sum = 0;
  chances.forEach(function (chance) {
    sum += chance;
  });
  var rand = Math.random();
  var chance = 0;
  for (var i = 0; i < chances.length; i++) {
    chance += chances[i] / sum;
    if (rand < chance) {
      return i;
    }
  }

  // should never be reached unless sum of probabilities is less than 1
  // due to all being zero or some being negative probabilities
  return -1;
}

// // simulate weighted dice where 6 is twice as likely as any other face
// // using multiples of likelihood
// console.log("Rolled a " + (simulateEvent([1, 1, 1, 1, 1, 2]) + 1)); // Rolled a 1

// // using probabilities
// console.log(
//   "Rolled a " + (simulateEvent([1 / 7, 1 / 7, 1 / 7, 1 / 7, 1 / 7, 2 / 7]) + 1)
// ); // Rolled a 6
