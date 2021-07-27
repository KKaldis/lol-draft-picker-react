import React, { useState } from "react";
import { Draggable, Droppable, DragDropContext } from "react-beautiful-dnd";

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
  outline: isDragging ? "5px double #ae9c6c" : "",
  offset: isDragging ? "-5px" : "-5px",
  cursor: isDragging ? "all-scroll" : "pointer",
  transition: isDragging ? "0.25" : "0.25",
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
          <div className="champSpot"></div>
          <div className="champSpot"></div>
          <div className="champSpot"></div>
          <div className="champSpot"></div>
          <div className="champSpot"></div>
          <div className="champSpot"></div>
          <div className="champSpot"></div>
          <div className="champSpot"></div>
          <div className="champSpot"></div>
          <div className="champSpot"></div>
        </div>
      </div>
    </div>
  );
};

export { Search };
