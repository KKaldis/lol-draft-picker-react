import React from "react";
import { connect } from "react-redux";
import Controls from "../components/Controls";
import Champions from "../components/Champions";
import { DragDropContext } from "react-beautiful-dnd";
import { dragNdrop } from "../redux/actions";
import { Leaderboard, Skyscraper } from "../components/Ads";
import { Picks } from "../components/Picks";

const App = ({ onDragEnd }) => {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="body">
        {/* <Leaderboard /> */}
        <div className="main">
          {/* <Skyscraper /> */}
          <div className="app">
            {/* <TeamPicks /> */}
            <div className="mid" style={{ width: "1200px" }}>
              <Controls />
              <Champions />
              <Picks />
              {/* <BanPicks /> */}
            </div>
            {/* <EnemyPicks /> */}
          </div>
          {/* <Skyscraper /> */}
        </div>
        {/* <Leaderboard /> */}
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
