import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { connect } from "react-redux";
import { getSelections, getTier, getSorting } from "../redux/reducer";
import { countAllChamps } from "../scripts/findCounters";
import data from "../app/data.json";

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

const getScore = (scores, champion) => {
  const score = scores[champion];
  if (score == null) return 0;
  else return score;
};

const Lanes = (lane) => {
  var singleLane = Object.values(lane);

  return (
    <div>
      <img
        className="laneImg"
        src={process.env.PUBLIC_URL + "assets/" + singleLane + ".png"}
        alt={singleLane}
      />
    </div>
  );
};

const Card = ({ champ, index, tier, sorting, selections }) => {
  const scores = countAllChamps("enemy", tier, sorting, selections);
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
            className={`li ${getScore(scores, champ) > 0 ? "liRating" : ""}`}
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
                    <Lanes lane={lane} />
                  ))}
                </div>
                <a
                  style={{
                    display:
                      sorting === "Rating" && getScore(scores, champ) > 0
                        ? "block"
                        : "none",
                  }}
                >
                  {getScore(scores, champ)}
                  {" CP"}
                </a>
                <a
                  style={{
                    display:
                      sorting === "Popular" && getScore(scores, champ) > 0
                        ? "block"
                        : "none",
                  }}
                >
                  {getScore(scores, champ)}
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
  selections: getSelections(state),
  sorting: getSorting(state),
  tier: getTier(state),
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Card);
