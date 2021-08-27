import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { connect } from "react-redux";
import { getSorting } from "../redux/reducer";
import { countEnemies, getScoreNullCheck } from "../scripts/findCounters";
import data from "../app/data.json";
import CardLanes from "./CardLanes";
import CardStats from "./CardStats";
import { noEffectOnList, jpgNameFix } from "./CardXtras";

const Card = ({ champ, index, scores }) => {
  const lanes = Object.keys(data[champ]);
  return (
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
            className={`li ${
              getScoreNullCheck(scores, champ) > 0 ? "liRating" : ""
            }`}
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
                <CardStats champ={champ} />
              </div>
            </div>
          </div>
        </li>
      )}
    </Draggable>
  );
};

const mapStateToProps = (state) => ({
  sorting: getSorting(state),
  scores: countEnemies(state),
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Card);
