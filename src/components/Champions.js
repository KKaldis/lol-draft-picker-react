import React from "react";
import { connect } from "react-redux";
import { Droppable } from "react-beautiful-dnd";
import Card from "../components/Card";
import { getFilteredChampions } from "../redux/reducer";


const Champions = ({ filteredChampions, handleChange, lookup }) => {
  return (
   
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
  );
};

const mapStateToProps = (state) => ({
  filteredChampions: getFilteredChampions(state),
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Champions);