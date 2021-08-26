import data from "../app/data.json";
import {getSelections, getSorting, getTier} from "../redux/reducer";

export const countEnemies = (state) => {
  const type = "enemy"
  const sorting = getSorting(state)
  const selections = getSelections(state)
  const tier = getTier(state)
  if (sorting === "Rating" || sorting === "Popular") {
    var oldRating = {};
    Object.entries(selections).forEach(([keyChampDiv, valChamp]) => {
      if (keyChampDiv.startsWith(type)) {
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

    const highestSort = Object.fromEntries(
        Object.entries(oldRating).sort(([, a], [, b]) => b - a)
    );

    return highestSort;
  }
};

export const countAllChamps = (type, tier, sorting, selections) => {
  if (sorting === "Rating" || sorting === "Popular") {
    var oldRating = {};
    Object.entries(selections).forEach(([keyChampDiv, valChamp]) => {
      if (keyChampDiv.startsWith(type)) {
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

    const highestSort = Object.fromEntries(
      Object.entries(oldRating).sort(([, a], [, b]) => b - a)
    );

    return highestSort;
  }
};

export const countScore = (type, championScore, selections) => {
  if (championScore != null) {
    let score = 0;
    Object.entries(selections).forEach(([keyChampDiv, valChamp]) => {
      if (keyChampDiv.startsWith(type)) {
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
