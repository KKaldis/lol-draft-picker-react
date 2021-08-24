import React from "react";
import { Draggable } from "react-beautiful-dnd";
// import ReactTooltip from "react-tooltip";

const jpgNameFix = (string) => {
  //remove from champion name special characters and spaces to make string with jpg file name
  string = string.replace(/[^A-Z0-9]/gi, "");
  //make string and path for jpg images
  string = string + ".jpg";
  return string;
};

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  filter: isDragging ? "drop-shadow(0 0 0.25rem #ae9c6c)" : "",
  border: isDragging ? "5px double #ae9c6c" : "",
  cursor: isDragging ? "all-scroll" : "pointer",
  borderRadius: isDragging ? "25px" : "25px",
  transition: isDragging ? "1" : "1",
  // styles we need to apply on draggables
  ...draggableStyle,
});

const Card = ({ champ, index }) => {
  return (
    // <div>
    //   <a data-tip = { champ} data-for={'cards'}>
    <Draggable draggableId={champ} key={champ} index={index}>
      {(provided, snapshot) => (
        <li
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={getItemStyle(
            snapshot.isDragging,
            provided.draggableProps.style
          )}
          className={`item ${snapshot.isDragging ? "dragging" : ""}`}
        >
          <div className="li">
            <div className="champImg">
              <img
                src={process.env.PUBLIC_URL + "/champ/" + jpgNameFix(champ)}
                alt={champ}
              />
              <div className="champTag">
                <a> {champ} </a>
              </div>
            </div>
          </div>
        </li>
      )}
    </Draggable>
    /* </a> 
       <ReactTooltip id={'cards'} className="cardTooltip" effect="solid" />
    </div> */
  );
};

export default Card;
