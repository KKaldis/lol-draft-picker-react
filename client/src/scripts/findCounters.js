import data from "../app/data.json";

export const countAllChamps = (teamSide, tier, sorting, selections) => {
  if (sorting === "Rating" || sorting === "Popular") {
    var oldRating = {};
    Object.entries(selections).forEach(([keyChampDiv, valChamp]) => {
      if (keyChampDiv.startsWith(teamSide)) {
        const laneKeyObj = data[valChamp];

        Object.entries(laneKeyObj).forEach(([keyLane, valTier]) => {
          var newRating = valTier[tier][sorting];
          oldRating = Object.entries(newRating).reduce(
            (acc, [key, value]) => ({
              ...acc,
              [key]: (acc[key] || 0) + value,
            }),
            { ...oldRating }
          );
          // console.log(valChamp, " : " ,keyLane, " : ", newRating);
        });
      }
    });
    return oldRating;
  }
};

export const countScore = (teamSide, championScore, selections) => {
  if (championScore != null) {
    let score = 0;
    Object.entries(selections).forEach(([keyChampDiv, valChamp]) => {
      if (keyChampDiv.startsWith(teamSide)) {
        Object.entries(championScore).forEach(([keyChamp, valScore]) => {
          if (
            keyChamp.toUpperCase().replace(/([^\w]+|\s+)/g, "") ===
            valChamp.toUpperCase().replace(/([^\w]+|\s+)/g, "")
          ) {
            score = score + valScore;
          }
        });
      }
    });
    return score;
  }
};


export const getScoreNullCheck = (scores, champion) => {
  const score = scores[champion];
  if (score == null) return 0;
  else return score;
};


