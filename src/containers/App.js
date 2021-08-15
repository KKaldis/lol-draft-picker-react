import React from "react";
import { connect } from "react-redux";
import Search from "../scripts/search";
import { DragDropContext } from "react-beautiful-dnd";
import ChampSlot from "../components/ChampSlot";
import { dragNdrop } from "../actions/actions";
import data from "../app/data.json";

const App = ({ onDragEnd }) => {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
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
                <ChampSlot playerId={"teamplayer1"} />
                <ChampSlot playerId={"teamplayer2"} />
                <ChampSlot playerId={"teamplayer3"} />
                <ChampSlot playerId={"teamplayer4"} />
                <ChampSlot playerId={"teamplayer5"} />
              </div>
            </div>
            <div className="mid">
              {console.log(data["Aatrox"]["Top"]["ALL"]["Rating"])}
              {/* console log scraped counter data example with selectors */}
              <Search />
              <div className="banSpot">
                <div className="bans">
                  <ChampSlot playerId={"ban0"} />
                  <ChampSlot playerId={"ban1"} />
                  <ChampSlot playerId={"ban2"} />
                  <ChampSlot playerId={"ban3"} />
                  <ChampSlot playerId={"ban4"} />
                  <ChampSlot playerId={"ban5"} />
                  <ChampSlot playerId={"ban6"} />
                  <ChampSlot playerId={"ban7"} />
                  <ChampSlot playerId={"ban8"} />
                  <ChampSlot playerId={"ban9"} />
                </div>
              </div>
            </div>
            <div className="enemy">
              <div className="players">
                <ChampSlot playerId={"enemyplayer1"} />
                <ChampSlot playerId={"enemyplayer2"} />
                <ChampSlot playerId={"enemyplayer3"} />
                <ChampSlot playerId={"enemyplayer4"} />
                <ChampSlot playerId={"enemyplayer5"} />
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

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  onDragEnd: (e) => {
    if (!e.destination) return;
    dispatch(
      dragNdrop(e.draggableId, e.source.droppableId, e.destination.droppableId)
    );
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
