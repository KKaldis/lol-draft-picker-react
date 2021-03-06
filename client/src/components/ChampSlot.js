import React from "react";
import { connect } from "react-redux";
import { getSelection, getSelectionIndex } from "../redux/reducer";
import { Droppable } from "react-beautiful-dnd";
import Card from "../components/Card";

const ChampSlot = ({ playerId, selection, selectionIndex }) => {
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
            <span
              style={{
                display: "none",
              }}
            >
              {provided.placeholder}
            </span>

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
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ChampSlot);
