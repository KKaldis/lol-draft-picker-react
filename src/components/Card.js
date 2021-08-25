import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { connect } from "react-redux";
import { getSelections, getTier, getSorting } from "../redux/reducer";
import { countAllChamps } from "../scripts/findCounters";

// import ReactTooltip from "react-tooltip";

const jpgNameFix = (string) => {
  //remove from champion name special characters and spaces to make string with jpg file name
  string = string.replace(/[^A-Z0-9]/gi, "");
  //make string and path for jpg images
  string = string + ".webp";
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

const Card = ({ champ, index, tier, sorting, selections }) => {
  const scores = countAllChamps("enemy", tier, sorting, selections);
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
          <div
            className={`li ${
              sorting !== "Alphabetical" && scores[champ] > 1 ? "liRating" : ""
            }`}
          >
            <div className="champImg">
              <img
                src={process.env.PUBLIC_URL + "champ-small/" + jpgNameFix(champ)}
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

const mapStateToProps = (state) => ({
  selections: getSelections(state),
  sorting: getSorting(state),
  tier: getTier(state),
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Card);
