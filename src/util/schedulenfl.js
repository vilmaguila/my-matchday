/**
 * Returns x raised to the n-th power.
 *
 * @param {Array} teams Team objects that participate in schedule.
 * @param {number} rounds How many times the teams face each other.
 * @return {Array} Array of objects containing games.
 * @return {Array} Array of teams on byeweeks
 * @return {number} rounds the amount of times teams face each other
 */

const createRoundRobinSchedule = (teams, rounds) => {
  const matchesArray = [];
  const byeteams = [];
  const localteams = [...teams];
  let roundMatchups = localteams.length / 2;
  let rounds = (localteams.length - 1) * rounds;
  if (localteams.length % 2 !== 0) {
    rounds = localteams.length * rounds;
    localteams.push("BYE");
  }
  for (let i = 1; i <= rounds; i++) {
    for (let j = 0; j < roundMatchups; j++) {
      if (i % 2) {
        const match = generateMatchObject(
          localteams[j],
          localteams[localteams.length - 1 - j],
          i
        );
        if (typeof match === "string") {
          byeteams.push({ i, match });
        } else {
          matchesArray.push(match);
        }
      } else {
        const match = generateMatchObject(
          localteams[localteams.length - 1 - j],
          localteams[j],
          i
        );
        if (!match.hasOwnProperty("score")) {
          byeteams.push({ i, match });
        } else {
          matchesArray.push(match);
        }
      }
    }
    const popped = localteams.pop();
    localteams.splice(1, 0, popped);
  }
  return { matchesArray, byeteams, rounds };
};

/**
 * Returns an object literal for a game.
 *
 * @param {object} home Team objects that participate in schedule.
 * @param {object} away How many times the teams face each other.
 * @param {number} round of objects containing games.
 * @return {object} game object
 */
const generateMatchObject = (home, away, round) => {
  if (home === "BYE") {
    return away.name;
  } else if (away === "BYE") {
    return home.name;
  } else {
    const id = getMatchID();
    const match = {
      id: id,
      round: round,
      date: null,
      result: { played: false, winner: null, loser: null, draw: null },
      homeTeam: home,
      awayTeam: away,
      score: {
        home: null,
        away: null,
      },
    };
    return match;
  }
};

let matchID = 0;
const getMatchID = () => {
  matchID += 1;
  return matchID;
};