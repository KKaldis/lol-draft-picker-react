import React, { useState, Fragment } from "react";
import { connect } from "react-redux";
import { getChampions } from "../reducers/reducer";
import { Search } from "../scripts/search";
import { Draggable, Droppable, DragDropContext } from "react-beautiful-dnd";
import ReactTooltip from "react-tooltip";
import DrawChampSlot from "./DrawChampSlot";

const App = ({ champions }) => {
  const [characters, updateCharacters] = useState({ champions });

  function handleOnDragEnd(result) {
    const items = Array.from(characters);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    updateCharacters(items);
    if (!result.destination) return;
  }

  return (
    <DragDropContext onDragEnd={this.handleOnDragEnd}>
      <div className="body">
        <div className="addLeader">
          <img
            src={process.env.PUBLIC_URL + "/assets/970x90.jpg"}
            alt="Advertisment Leaderboard"
          />
        </div>

        <div className="main">
          <div className="addSky">
            <img
              src={process.env.PUBLIC_URL + "/assets/300x600.webp"}
              alt="Advertisment Skyscraper"
            />
          </div>
          <div className="app">
            <div className="team">
              <div className="players">
                <DrawChampSlot playerId={"teamplayer1"} />
                <DrawChampSlot playerId={"teamplayer2"} />
                <DrawChampSlot playerId={"teamplayer3"} />
                <DrawChampSlot playerId={"teamplayer4"} />
                <DrawChampSlot playerId={"teamplayer5"} />
              </div>
            </div>
            <div className="mid">
              <Search
                details={champions}
                index={champions.indexOf(champions)}
              />
            </div>
            <div className="enemy">
              <div className="players">
                <DrawChampSlot playerId={"enemyplayer1"} />
                <DrawChampSlot playerId={"enemyplayer2"} />
                <DrawChampSlot playerId={"enemyplayer3"} />
                <DrawChampSlot playerId={"enemyplayer4"} />
                <DrawChampSlot playerId={"enemyplayer5"} />
              </div>
            </div>
          </div>
          <div className="addSky">
            <img
              src={process.env.PUBLIC_URL + "/assets/300x600.webp"}
              alt="Advertisment Skyscraper"
            />
          </div>
        </div>
        <div className="addLeader">
          <img
            src={process.env.PUBLIC_URL + "/assets/970x90.jpg"}
            alt="Advertisment Leaderboard"
          />
        </div>
      </div>
    </DragDropContext>
  );
};

const mapStateToProps = (state) => ({
  champions: getChampions(state),
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(App);

// export default App;
