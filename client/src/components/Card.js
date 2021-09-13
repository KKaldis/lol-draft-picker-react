import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { connect } from "react-redux";
import { getSorting, getTier, getCardState, getSelections } from "../redux/reducer";
import { countAllChamps, getScoreNullCheck } from "../scripts/findCounters";
import champLanes from "../app/lanes.json";
import CardLanes from "./CardLanes";
import CardStats from "./CardStats";
import { noEffectOnList, jpgNameFix } from "./CardXtras";
import styled from "styled-components";
import SimpleButton from "./SimpleButton";
import { cardClicked } from "../redux/actions";

export const Card = ({ champ, index, scores, handleChange, card }) => {
  const lanes = champLanes[champ];

  return (
    <Draggable draggableId={champ} key={champ} index={index} >
      {({ innerRef, draggableProps, dragHandleProps }, snapshot) => (
        <div className={`${card[champ]}`} onClick={handleChange}>
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
              <Stats className={`${card[champ]}`}>
                <div className="champImg">
                  <img
                    className="img"
                    src={
                      process.env.PUBLIC_URL +
                      "champ-small/" +
                      jpgNameFix(champ)
                    }
                    alt={champ}
                  />

                  <div className="champTag">
                    <a id={champ}>
                      {champ} {card[champ]}{" "}
                    </a>
                    <div className="lanesDiv">
                      {lanes.map((lane) => (
                        <CardLanes lane={lane} />
                      ))}
                    </div>
                    <CardStats champ={champ} />
                  </div>
                </div>
              </Stats>
              <Buttons className={`${card[champ]}`}>
                <div className="cardButtons">
                  <SimpleButton imgFile={"add"} buttonType={"selectTeam"} />

                  <SimpleButton imgFile={"add"} buttonType={"selectEnemy"} />
                </div>
              </Buttons>
            </div>
          </li>
        </div>
      )}
    </Draggable>
  );
};

const Stats = styled.div`
  margin: 0 !important;

  &.active {
    display: none;
  }
`;

const Buttons = styled.div`
  overflow: hidden;
  width: 100%;
  max-height: 0;
  transition: max-height 0s ease-in-out;
  &.active {
    max-height: 300px;
  }
`;

const mapStateToProps = (state) => ({
  scores: countAllChamps("enemy", getTier(state), getSorting(state), getSelections(state)),
  card: getCardState(state),
});

const mapDispatchToProps = (dispatch, { champ }) => ({
  handleChange: (e) => dispatch(cardClicked(champ)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Card);
