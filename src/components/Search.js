import React from "react";
import { connect } from "react-redux";
import { Droppable } from "react-beautiful-dnd";
import Card from "./Card";
import { getFilteredChampions } from "../redux/reducer";
import { searchChanged } from "../redux/actions";
// string set up for image url

const Search = ({ filteredChampions, handleChange }) => {
  return (
    <div className="contentFix">
      <div class="filterBar">
        <div class = "buttonWrap">
          <button class= "button" onclick="activateLasers()">By Name</button>
          <button class= "button" onclick="activateLasers()">By Score</button>
        </div>
        <div>
        <input
          id="myInput"
          placeholder="Search for champion..."
          type="search"
          onChange={handleChange}
        />
        </div>
        <div class = "buttonWrap">
          <button class= "button" onclick="activateLasers()">ALL</button>
          <button class= "button" onclick="activateLasers()">Master</button>
          <button class= "button" onclick="activateLasers()">Diamond</button>
          <button class= "button" onclick="activateLasers()">Platinum</button>
        </div>
      </div>
      <div className="champs">
        <Droppable droppableId="champSelect" key={"champSelect"}>
          {(provided) => (
            <ul id="myUL" ref={provided.innerRef} {...provided.droppableProps}>
              {filteredChampions.map((champ) => (
                <Card champ={champ} index={filteredChampions.indexOf(champ)} />
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </div>
    </div>
  );
};

// export { Search };

const mapStateToProps = (state) => ({
  filteredChampions: getFilteredChampions(state),
});

const mapDispatchToProps = (dispatch) => ({
  handleChange: (e) => dispatch(searchChanged(e.target.value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
