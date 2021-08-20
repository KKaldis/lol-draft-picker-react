import React from "react";
import { connect } from "react-redux";
import { searchChanged } from "../redux/actions";
import HoverButton from "./HoverButton";

const Controls = ({ handleChange, lookup }) => {
  return (
    <div className="contentFix">
      <div className="filterBar">
        <div className="score">10000</div>
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
        <div className="score">10000</div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  lookup: state.lookup,
});

const mapDispatchToProps = (dispatch) => ({
  handleChange: (e) => dispatch(searchChanged(e.target.value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Controls);
