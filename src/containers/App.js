import React from "react";
import { connect } from "react-redux";
import Controls from "../components/Controls";
import Champions from "../components/Champions";
import { DragDropContext } from "react-beautiful-dnd";
import { dragNdrop } from "../redux/actions";
import { getSelections, getSorting, getTier } from "../redux/reducer";
import { Leaderboard, Skyscraper } from "../components/Ads";
import { EnemyPicks, TeamPicks, BanPicks } from "../components/Picks";
import data from "../app/data.json";

const App = ({ onDragEnd, sorting, tier, selections}) => {

  var oldRating = {};
  Object.entries(selections).forEach(([keyChampDiv, valChamp]) => {
    if (keyChampDiv.startsWith("enemy")) {
      // console.log(valChamp);
      Object.entries(data).forEach(([keyChamp, valLane]) => {
        if (keyChamp.toUpperCase() === valChamp.toUpperCase()) {
          const laneKeyObj = valLane;
          Object.entries(laneKeyObj).forEach(([keyLane, valTier]) => {
            var newRating = valTier[tier][sorting];
            // iterate over map2 entries with acc set to map1 at start
            oldRating = Object.entries(newRating).reduce(
              (acc, [key, value]) =>
                // if key is already in map1, add the values, otherwise, create new pair
                ({ ...acc, [key]: (acc[key] || 0) + value }),
              { ...oldRating }
            );
            // console.log(valChamp, " : " ,keyLane, " : ", newRating);
          });
        }
      });
    }
  });
  console.log(" Champ Scores ", oldRating);


  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="body">
        <Leaderboard />
        <div className="main">
          <Skyscraper />
          <div className="app">
            <TeamPicks />
            <div className="mid">
              <Controls />
              <Champions />
              <BanPicks />
            </div>
            <EnemyPicks />
          </div>
          <Skyscraper />
        </div>
        <Leaderboard />
      </div>
    </DragDropContext>
  );
};

const mapStateToProps = (state) => ({
  selections: getSelections(state),
  sorting: getSorting(state),
  tier: getTier(state),
});

const mapDispatchToProps = (dispatch) => ({
  onDragEnd: (e) => {
    if (!e.destination) return;
    dispatch(
      dragNdrop(e.draggableId, e.source.droppableId, e.destination.droppableId)
    );
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
