import data from "../app/data.json";

export const countAllChamps = (type, tier, sorting, selections) => {
  if (sorting === "Rating" || sorting === "Popular") {
    var oldRating = {};
    Object.entries(selections).forEach(([keyChampDiv, valChamp]) => {
      if (keyChampDiv.startsWith(type)) {
        // console.log(valChamp);
        Object.entries(data).forEach(([keyChamp, valLane]) => {
          if (
            keyChamp.toUpperCase().replace(/([^\w]+|\s+)/g, "") ===
            valChamp.toUpperCase().replace(/([^\w]+|\s+)/g, "")
          ) {
            const laneKeyObj = valLane;
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
      }
    });

    const highestSort = Object.fromEntries(
      Object.entries(oldRating).sort(([, a], [, b]) => b - a)
    );

    // console.log(type, "counter results : ", highestSort);
    // print json with object order
    // console.log(
    //   type,
    //   "counter results : ",
    //   JSON.stringify(highestSort, null, 4)
    // );
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
