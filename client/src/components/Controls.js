import React from "react";
import { connect } from "react-redux";
import { searchChanged } from "../redux/actions";
import HoverButton from "../components/HoverButton";
import Score from "../components/Score";
import {
  getSelections,
  getTier,
  getSorting,
  getLookup,
} from "../redux/reducer";
import { countAllChamps, countScore } from "../scripts/findCounters";
import { tierButtons, sortButtons } from "../app/uiObs";
const Controls = ({ handleChange, lookup, tier, sorting, selections }) => {
  const enemyChampionsScores = countAllChamps(
    "enemy",
    tier,
    sorting,
    selections
  );
  const teamChampionsScores = countAllChamps("team", tier, sorting, selections);
  const enemyScore = countScore("enemy", teamChampionsScores, selections);
  const teamScore = countScore("team", enemyChampionsScores, selections);
  const enemyPers = ((100 * enemyScore) / (teamScore + enemyScore)).toFixed(1);
  const teamPers = ((100 * teamScore) / (teamScore + enemyScore)).toFixed(1);

  // console.log("enemy counters :", enemyChampionsScores);
  // console.log("team counters :", teamChampionsScores);

  return (
    <div className="contentFix">
      <div className="filterBar">
        <Score
          returnScore={teamScore}
          compScore={enemyScore}
          returnPers={teamPers}
        />
        <div className="buttonWrap">
          {sortButtons.map((button, i) => (
            <HoverButton
              dataTip={button.dataTip}
              imgFile={button.imgFile}
              hoverFamily={button.hoverFamily}
              altText={button.altText}
              buttonType={sorting}
              key={i}
            />
          ))}
        </div>
        <div>
          <input
            id="myInput"
            placeholder="Search for champion..."
            type="search"
            value={lookup}
            onChange={handleChange}
          />
        </div>
        <div className="buttonWrap">
          {tierButtons.map((button, i) => (
            <HoverButton
              dataTip={button.dataTip}
              imgFile={button.imgFile}
              hoverFamily={button.hoverFamily}
              altText={button.altText}
              buttonType={sorting}
              key={i}
            />
          ))}
        </div>
        <Score
          returnScore={enemyScore}
          compScore={teamScore}
          returnPers={enemyPers}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  selections: getSelections(state),
  sorting: getSorting(state),
  tier: getTier(state),
  lookup: getLookup(state),
});

const mapDispatchToProps = (dispatch) => ({
  handleChange: (e) => dispatch(searchChanged(e.target.value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Controls);
