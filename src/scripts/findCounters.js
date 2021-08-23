import data from "../app/data.json";
import { getSelections, getTier, getSorting } from "../redux/reducer";
import { connect } from "react-redux";

export const count = (type, selections, tier, sorting) => {
  Object.entries(selections).forEach(([keyChampDiv, valChamp]) => {
    if (keyChampDiv.startsWith(type)) {
      console.log(valChamp);
      Object.entries(data).forEach(([keyChamp, valLane]) => {
        if (keyChamp.toUpperCase() === valChamp.toUpperCase()) {
          const laneKeyObj = valLane;
          Object.entries(laneKeyObj).forEach(([keyLane, valTier]) => {
            console.log(keyLane, " : ", valTier[tier][sorting]);
          });
        }
      });
    }
  });
};

const mapStateToProps = (state) => ({
  selections: getSelections(state),
  sorting: getSorting(state),
  tier: getTier(state),
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps);
