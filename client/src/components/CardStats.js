import React from "react";
import { connect } from "react-redux";
import { getSorting } from "../redux/reducer";
import { countEnemies, getScoreNullCheck } from "../scripts/findCounters";

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
  scores: countEnemies(state),
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(CardStats);
