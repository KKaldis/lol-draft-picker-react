import React from "react";
import { Droppable } from "react-beautiful-dnd";

export default function DrawChampSlot({playerId}) {
  return (
    <div className="champDiv">
      <Droppable droppableId={playerId}>
        {(provided) => (
          <div
            className="champSpot"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}
