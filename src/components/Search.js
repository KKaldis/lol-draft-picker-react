import React from "react";
import { connect } from "react-redux";
import { Droppable } from "react-beautiful-dnd";
import Card from "./Card";
import { getFilteredChampions } from "../redux/reducer";
import { searchChanged } from "../redux/actions";
import ReactTooltip from "react-tooltip";

const hoverThing = ({ dataTip, imgFile, hoverFamily, altText }) => {
  return (
    <div>
      <a data-tip={dataTip} data-for={hoverFamily}>
        <div class="tierSelect" onclick="activateLasers()">
          <img src={"assets/" + imgFile + ".png"} alt={altText} />
        </div>{" "}
      </a>
      <ReactTooltip id={hoverFamily} className="tooltip" effect="solid" />
    </div>
  );
};

const Search = ({ filteredChampions, handleChange }) => {
  return (
    <div className="contentFix">
      <div class="filterBar">
        <div class="buttonWrap">
          <hoverThing dataTip={"Alphabetical Ordering"} imgFile={"alphab"}
            hoverFamily={"sorting"} altText={"alphabetical"}/>

          <a data-tip="Sort Alphabetical" data-for="sorting">
            <div class="tierSelect" onclick="activateLasers()">
              <img src={"assets/alphab.png"} alt="alphabetical" />
            </div>
          </a>
          <ReactTooltip id="sorting" className="tooltip" effect="solid" />

          <a data-tip="Sort by Counter Rating" data-for="sorting">
            <div class="tierSelect" onclick="activateLasers()">
              <img src={"assets/counter.png"} alt="counter" />
            </div>
          </a>
          <ReactTooltip id="sorting" className="tooltip" effect="solid" />
          <a data-tip="Sort By Popularity" data-for="sorting">
            <div class="tierSelect" onclick="activateLasers()">
              <img src={"assets/popular.png"} alt="counter" />
            </div>
          </a>
          <ReactTooltip id="sorting" className="tooltip" effect="solid" />
        </div>
        <div>
          <input
            id="myInput"
            placeholder="Search for champion..."
            type="search"
            onChange={handleChange}
          />
        </div>
        <div class="buttonWrap">
          <a data-tip="All" data-for="tier">
            <div class="tierSelect" onclick="activateLasers()">
              <img src={"assets/all.png"} alt="all" />
            </div>
          </a>
          <ReactTooltip id="tier" className="tooltip" effect="solid" />

          <a data-tip="Platinum" data-for="tier">
            <div class="tierSelect" onclick="activateLasers()">
              <img src={"assets/platinum.png"} alt="platinum" />
            </div>
          </a>
          <ReactTooltip id="tier" className="tooltip" effect="solid" />

          <a data-tip="Diamond" data-for="tier">
            <div class="tierSelect" onclick="activateLasers()">
              <img src={"assets/diamond.png"} alt="diamond" />
            </div>
          </a>
          <ReactTooltip id="tier" className="tooltip" effect="solid" />

          <a data-tip="Master" data-for="tier">
            <div class="tierSelect" onclick="activateLasers()">
              <img src={"assets/master.png"} alt="master" />
            </div>
          </a>
          <ReactTooltip id="tier" className="tooltip" effect="solid" />
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
