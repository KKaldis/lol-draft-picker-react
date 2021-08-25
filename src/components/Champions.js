import React from "react";
import { connect } from "react-redux";
import { Droppable } from "react-beautiful-dnd";
import Card from "./Card";
import { getFilteredChampions } from "../redux/reducer";

const Champions = ({ filteredChampions }) => {
  return (
    <div className="champs">
      <Droppable droppableId="champSelect" key={"champSelect"}>
        {({ innerRef, placeholder, droppableProps }) => (
          <ul id="myUL" ref={innerRef} {...droppableProps}>
            {filteredChampions.map((champ) => (
              <Card champ={champ} index={filteredChampions.indexOf(champ)} />
            ))}
            <span
              style={{
                display: "none",
              }}
            ></span>
            {placeholder}
          </ul>
        )}
      </Droppable>
    </div>
  );
};

const mapStateToProps = (state) => ({
  filteredChampions: getFilteredChampions(state),
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Champions);
