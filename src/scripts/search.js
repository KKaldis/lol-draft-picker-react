import React, { useState } from "react";
import { Draggable, Droppable, DragDropContext } from "react-beautiful-dnd";
import DrawChampSlot from "../containers/DrawChampSlot";
// string set up for image url
const jpgNameFix = (string) => {
  //remove from champion name special characters and spaces to make string with jpg file name
  string = string.replace(/[^A-Z0-9]/gi, "");
  //make string and path for jpg images
  string = string + ".jpg";
  return string;
};

const nameFix = (string) => {
  //remove from champion name special characters and spaces to make string with jpg file name
  string = string.replace(/[^A-Z0-9]/gi, "");
  return string;
};

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  filter: isDragging ? "drop-shadow(0 0 0.25rem #ae9c6c)" : "",
  border: isDragging ? "5px double #ae9c6c" : "",
  cursor: isDragging ? "all-scroll" : "pointer",
  borderradius: isDragging ? "25px" : "0px",
  transition: isDragging ? "1" : "1",
  // styles we need to apply on draggables
  ...draggableStyle,
});

const Card = ({ champ, index }) => {
  return (
    <Draggable draggableId={nameFix(champ)} key={nameFix(champ)} index={index}>
      {(provided, snapshot) => (
        <li
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={getItemStyle(
            snapshot.isDragging,
            provided.draggableProps.style
          )}
          className={`item ${snapshot.isDragging ? "dragging" : ""}`}
        >
          <div className="li">
            <div className="champImg">
              <img
                src={process.env.PUBLIC_URL + "/champ/" + jpgNameFix(champ)}
                alt={champ}
              />
              <div className="champTag">
                <a> {champ} </a>
              </div>
            </div>
          </div>
        </li>
      )}
    </Draggable>
  );
};

const SearchList = ({ filteredchamps }) => {
  const filtered = filteredchamps.map((champ) => (
    <Card champ={champ} index={filteredchamps.indexOf(champ)} />
  ));
  return (
    <Droppable droppableId="champSelect">
      {(provided) => (
        <ul id="myUL" ref={provided.innerRef} {...provided.droppableProps}>
          {filtered}
          {provided.placeholder}
        </ul>
      )}
    </Droppable>
  );
};

const Search = ({ details }) => {
  const [searchField, setSearchField] = useState("");

  const filteredchamps = details.filter((champ) => {
    return champ.toLowerCase().includes(searchField.toLowerCase());
  });

  const handleChange = (e) => {
    setSearchField(e.target.value);
  };

  const searchList = () => {
    return (
      <div className="champs">
        <SearchList filteredchamps={filteredchamps} />
      </div>
    );
  };

  return (
    <div className="contentFix">
      <div>
        <input
          id="myInput"
          placeholder="Search for champion..."
          type="search"
          onChange={handleChange}
        />
      </div>
      {searchList()}
      <div className="banSpot">
        <div className="bans">
          <DrawChampSlot playerId={"ban0"} />
          <DrawChampSlot playerId={"ban1"} />
          <DrawChampSlot playerId={"ban2"} />
          <DrawChampSlot playerId={"ban3"} />
          <DrawChampSlot playerId={"ban4"} />
          <DrawChampSlot playerId={"ban5"} />
          <DrawChampSlot playerId={"ban6"} />
          <DrawChampSlot playerId={"ban7"} />
          <DrawChampSlot playerId={"ban8"} />
          <DrawChampSlot playerId={"ban9"} />
        </div>
      </div>
    </div>
  );
};

export { Search };
