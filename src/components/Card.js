import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { connect } from "react-redux";
import { getSorting } from "../redux/reducer";
import { countEnemies, getScoreNullCheck} from "../scripts/findCounters";
import data from "../app/data.json";
import CardLanes from "./CardLanes"

const jpgNameFix = (string) => {
  string = string.replace(/[^A-Z0-9]/gi, "");
  string = string + ".webp";
  return string;
};

const noEffectOnList = (snapshot, style) => {
  if (!snapshot.isDragging) return {};
  if (!snapshot.isDropAnimating) {
    return style;
  }

  return {
    ...style,
    // cannot be 0, but make it super tiny
    transitionDuration: `0.001s`,
  };
};



const Card = ({ champ, index, sorting ,scores }) => {
  // const scores = countAllChamps("enemy", tier, sorting, selections);
  const lanes = Object.keys(data[champ]);
  return (
    // <div>
    //   <a data-tip = { champ} data-for={'cards'}>
    <Draggable draggableId={champ} key={champ} index={index}>
      {({ innerRef, draggableProps, dragHandleProps }, snapshot) => (
        <li
          ref={innerRef}
          {...draggableProps}
          {...dragHandleProps}
          style={noEffectOnList(snapshot, draggableProps.style)}
          className={` ${snapshot.isDragging ? "dragging" : ""}`}
        >
          <div
            className={`li ${getScoreNullCheck(scores, champ) > 0 ? "liRating" : ""}`}
          >
            <div className="champImg">
              <img
                className="img"
                src={
                  process.env.PUBLIC_URL + "champ-small/" + jpgNameFix(champ)
                }
                alt={champ}
              />
              <div className="champTag">
                <a> {champ} </a>

                <div className="lanesDiv">
                  {lanes.map((lane) => (
                    <CardLanes lane={lane} />
                  ))}
                </div>
                <a
                  style={{
                    display:
                      sorting === "Rating" && getScoreNullCheck(scores, champ) > 0
                        ? "block"
                        : "none",
                  }}
                >
                  {getScoreNullCheck(scores, champ)}
                  {" CP"}
                </a>
                <a
                  style={{
                    display:
                      sorting === "Popular" && getScoreNullCheck(scores, champ) > 0
                        ? "block"
                        : "none",
                  }}
                >
                  {getScoreNullCheck(scores, champ)}
                  {" PP"}
                </a>
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
  sorting: getSorting(state),
  scores: countEnemies(state)
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Card);
