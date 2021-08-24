import React from "react";
import { connect } from "react-redux";
import {
  getSelection,
  getSelectionIndex,
  getSelections,
} from "../redux/reducer";
import { Droppable } from "react-beautiful-dnd";
import Card from "../components/Card";

const ChampSlot = ({ playerId, selection, selectionIndex, selections }) => {
  return (
    <div className="champDiv">
      <Droppable droppableId={playerId} key={playerId}>
        {(provided) => (
          <div
            id={playerId}
            className={`champSpot ${
              selection != null ? `champSpotFilled` : ``
            }`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {provided.placeholder}
            {selection != null && (
              <Card champ={selection} index={selectionIndex} />
            )}
          </div>
        )}
      </Droppable>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => ({
  selection: getSelection(state, ownProps.playerId),
  selectionIndex: getSelectionIndex(state, ownProps.playerId),
  selections: getSelections(state),
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ChampSlot);
