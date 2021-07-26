import React, { useState } from "react";
import { Draggable, Droppable, DragDropContext } from "react-beautiful-dnd";

// string set up for image url
const jpgNameFix = (item) => {
  //remove from champion name special characters and spaces to make string with jpg file name
  let imageName = item.replace(/[^A-Z0-9]/gi, "");
  //make string and path for jpg images
  imageName = imageName + ".jpg";
  return imageName;
};

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  filter: isDragging ? "drop-shadow(0 0 0.25rem #ae9c6c)" : "",
  border: isDragging ? "5px double #ae9c6c" : "",
  cursor: isDragging ? "all-scroll" : "pointer",
  // styles we need to apply on draggables
  ...draggableStyle,
});

const Card = ({ champ }) => {
  return (
    <Draggable draggableId={champ} index={champ}>
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
          <div className="champImg">
            <img
              src={process.env.PUBLIC_URL + "/champ/" + jpgNameFix(champ)}
              alt={champ}
            />
            <a> {champ} </a>
          </div>
        </li>
      )}
    </Draggable>
  );
};

const Scroll = (props) => {
  return <div className="champs">{props.children}</div>;
};

const SearchList = ({ filteredchamps }) => {
  const filtered = filteredchamps.map((champ) => (
    <Card champ={champ} id={champ} index={champ} />
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
      <Scroll>
        <SearchList filteredchamps={filteredchamps} />
      </Scroll>
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
