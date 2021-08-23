import data from "../app/data.json";
import { getSelections, getTier, getSorting } from "../redux/reducer";
import { connect } from "react-redux";

export const FindCounters = (type, selections, tier, sorting) => {
  var oldRating = {};
  Object.entries(selections).forEach(([keyChampDiv, valChamp]) => {
    if (keyChampDiv.startsWith("enemy")) {
      // console.log(valChamp);
      Object.entries(data).forEach(([keyChamp, valLane]) => {
        if (keyChamp.toUpperCase() === valChamp.toUpperCase()) {
          const laneKeyObj = valLane;
          Object.entries(laneKeyObj).forEach(([keyLane, valTier]) => {
            var newRating = valTier[tier][sorting];
            // iterate over map2 entries with acc set to map1 at start
            oldRating = Object.entries(newRating).reduce(
              (acc, [key, value]) =>
                // if key is already in map1, add the values, otherwise, create new pair
                ({ ...acc, [key]: (acc[key] || 0) + value }),
              { ...oldRating }
            );
            // console.log(valChamp, " : " ,keyLane, " : ", newRating);
          });
        }
      });
    }
  });
   console.log(" Champ Scores ", oldRating);
};

const mapStateToProps = (state) => ({
  selections: getSelections(state),
  sorting: getSorting(state),
  tier: getTier(state),
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps) (FindCounters);
