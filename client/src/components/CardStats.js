import React from "react";
import { connect } from "react-redux";
import { getSelections, getSorting, getTier } from "../redux/reducer";
import { countAllChamps, getScoreNullCheck } from "../scripts/findCounters";

export const CardStats = ({ champ, scores, sorting }) => {
  return (
    <div>
      <a
        style={{
          display:
            sorting === "Rating" && getScoreNullCheck(scores, champ) > 0
              ? "block"
              : "none",
        }}
      >
        {getScoreNullCheck(scores, champ)}
        {" CP"}
      </a>
      <a
        style={{
          display:
            sorting === "Popular" && getScoreNullCheck(scores, champ) > 0
              ? "block"
              : "none",
        }}
      >
        {getScoreNullCheck(scores, champ)}
        {" PP"}
      </a>
    </div>
  );
};

const mapStateToProps = (state) => ({
  sorting: getSorting(state),
  scores: countAllChamps(
    "enemy",
    getTier(state),
    getSorting(state),
    getSelections(state)
  ),
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(CardStats);
