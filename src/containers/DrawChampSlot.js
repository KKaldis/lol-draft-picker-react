import React from "react";
import { Droppable } from "react-beautiful-dnd";

export default function DrawChampSlot(props) {
  return (
    <div className="champDiv">
      <Droppable droppableId={props}>
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
