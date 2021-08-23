import React from "react";
import { connect } from "react-redux";
import { searchChanged } from "../redux/actions";
import HoverButton from "../components/HoverButton";
import { getSelections, getTier, getSorting } from "../redux/reducer";
import { countAllChamps, countScore } from "../scripts/findCounters";

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

  return (
    <div className="contentFix">
      <div className="filterBar">
        <div className="scoreShadow">
          <div className="score">{teamScore}</div>
        </div>
        <div className="buttonWrap">
          <HoverButton
            dataTip={"Sort Alphabetical"}
            imgFile={"alphab"}
            hoverFamily={"sorting"}
            altText={"Alphabetical"}
          />

          <HoverButton
            dataTip={"Sort by Rating"}
            imgFile={"counter"}
            hoverFamily={"sorting"}
            altText={"Rating"}
          />

          <HoverButton
            dataTip={"Sort By Popularity"}
            imgFile={"popular"}
            hoverFamily={"sorting"}
            altText={"Popular"}
          />

          <HoverButton
            dataTip={"Reset Selections"}
            imgFile={"reset"}
            hoverFamily={"sorting"}
            altText={"Reset"}
          />
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
          <HoverButton
            dataTip={"All"}
            imgFile={"all"}
            hoverFamily={"tier"}
            altText={"ALL"}
          />

          <HoverButton
            dataTip={"Platinum"}
            imgFile={"platinum"}
            hoverFamily={"tier"}
            altText={"PLATINUM"}
          />

          <HoverButton
            dataTip={"Diamond"}
            imgFile={"diamond"}
            hoverFamily={"tier"}
            altText={"DIAMOND"}
          />

          <HoverButton
            dataTip={"Master"}
            imgFile={"master"}
            hoverFamily={"tier"}
            altText={"MASTER"}
          />
        </div>
        <div className="scoreShadow">
          <div className="score">{enemyScore}</div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  selections: getSelections(state),
  sorting: getSorting(state),
  tier: getTier(state),
  lookup: state.lookup,
});

const mapDispatchToProps = (dispatch) => ({
  handleChange: (e) => dispatch(searchChanged(e.target.value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Controls);
