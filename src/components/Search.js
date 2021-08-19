import React from "react";
import { connect } from "react-redux";
import { Droppable } from "react-beautiful-dnd";
import Card from "./Card";
import { getFilteredChampions } from "../redux/reducer";
import { searchChanged } from "../redux/actions";
import HoverButton from "./HoverButton";

const Search = ({ filteredChampions, handleChange, lookup }) => {
  return (
    <div className="contentFix">
      <div className="filterBar">
        <div className="buttonWrap">
          <div className="score">10000</div>
          <HoverButton
            dataTip={"Sort Alphabetical"}
            imgFile={"alphab"}
            hoverFamily={"sorting"}
            altText={"alphabetical"}
          />

          <HoverButton
            dataTip={"Sort by Rating"}
            imgFile={"counter"}
            hoverFamily={"sorting"}
            altText={"rating"}
          />

          <HoverButton
            dataTip={"Sort By Popularity"}
            imgFile={"popular"}
            hoverFamily={"sorting"}
            altText={"popular"}
          />

          <HoverButton
            dataTip={"Reset Selections"}
            imgFile={"reset"}
            hoverFamily={"sorting"}
            altText={"reset"}
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
            altText={"all"}
          />

          <HoverButton
            dataTip={"Platinum"}
            imgFile={"platinum"}
            hoverFamily={"tier"}
            altText={"platinum"}
          />

          <HoverButton
            dataTip={"Diamond"}
            imgFile={"diamond"}
            hoverFamily={"tier"}
            altText={"diamond"}
          />

          <HoverButton
            dataTip={"Master"}
            imgFile={"master"}
            hoverFamily={"tier"}
            altText={"master"}
          />
          <div className="score">10000</div>
        </div>
      </div>
      <div className="champs">
        <Droppable droppableId="champSelect" key={"champSelect"}>
          {(provided) => (
            <ul id="myUL" ref={provided.innerRef} {...provided.droppableProps}>
              {filteredChampions.map((champ) => (
                <Card champ={champ} index={filteredChampions.indexOf(champ)} />
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  filteredChampions: getFilteredChampions(state),
  lookup: state.lookup,
});

const mapDispatchToProps = (dispatch) => ({
  handleChange: (e) => dispatch(searchChanged(e.target.value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
