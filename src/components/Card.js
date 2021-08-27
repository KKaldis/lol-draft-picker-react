import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { connect } from "react-redux";
import { getSorting, getTier, getCardState } from "../redux/reducer";
import { countEnemies, getScoreNullCheck } from "../scripts/findCounters";
import data from "../app/data.json";
import CardLanes from "./CardLanes";
import CardStats from "./CardStats";
import { noEffectOnList, jpgNameFix } from "./CardXtras";
import styled from "styled-components";
import SimpleButton from "./SimpleButton";
import { cardClicked } from "../redux/actions";

export const Card = ({ champ, index, scores, handleChange }) => {
  const lanes = Object.keys(data[champ]);

  const [state, setState] = useState ("");
  const toggleAccordion = () => {
    setState(state === "" ? "active" : "");
  };

  return (
    <Draggable draggableId={champ} key={champ} index={index} >
      {({ innerRef, draggableProps, dragHandleProps }, snapshot) => (
        <div className={`${state}`}  id={champ} onClick={handleChange} >
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
              {" "}
              <Stats className={`${state}`}>
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
                    <a> {champ} </a>
                    <div className="lanesDiv">
                      {lanes.map((lane) => (
                        <CardLanes lane={lane} />
                      ))}
                    </div>
                    <CardStats champ={champ} />
                  </div>
                </div>
              </Stats>
              <Buttons className={`${state}`}>
                <div className="cardButtons">
                  <SimpleButton
                    dataTip={"Sort by Rating"}
                    imgFile={"counter"}
                    altText={"Rating"}
                    buttonType={"selectTeam"}
                  />

                  <SimpleButton
                    dataTip={"Sort by Rating"}
                    imgFile={"counter"}
                    altText={"Rating"}
                    buttonType={"selectEnemy"}
                  />
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
  sorting: getSorting(state),
  scores: countEnemies(state),
  tier: getTier(state),
  cards: getCardState(state),
});

const mapDispatchToProps = (dispatch, {champ}) => ({
  handleChange: () => dispatch(cardClicked(champ)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Card);
