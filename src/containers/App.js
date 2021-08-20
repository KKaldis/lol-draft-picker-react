import React from "react";
import { connect } from "react-redux";
import Controls from "../components/Controls";
import Champions from "../components/Champions";
import { DragDropContext } from "react-beautiful-dnd";
import ChampSlot from "../components/ChampSlot";
import { dragNdrop } from "../redux/actions";
import data from "../app/data.json";
import { getSorting, getTier } from "../redux/reducer";
import { Leaderboard, Skyscraper } from "../components/Ads";
import { EnemyPicks, TeamPicks, BanPicks } from "../components/Picks";

const App = ({ onDragEnd, sorting, tier }) => {
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
              {console.log(data["Aatrox"]["Top"][tier][sorting])}
              {/* console log scraped counter data example with selectors 
              [Champion][Lane][tier][Data Type(counter rating or popularity][Counter Champ]*/}
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
