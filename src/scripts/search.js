import React, { useState } from "react";
import { Droppable } from "react-beautiful-dnd";
import ChampSlot from "../components/ChampSlot";
import Card from "../components/Card";
// string set up for image url

const Search = ({ details }) => {
  const [searchField, setSearchField] = useState("");

  const filteredchamps = details.filter((champ) => {
    return champ.toLowerCase().includes(searchField.toLowerCase());
  });

  const handleChange = (e) => {
    setSearchField(e.target.value);
  };

  const SearchList = () => {
    return (
      <div className="champs">
        <Droppable droppableId="champSelect">
          {(provided) => (
            <ul id="myUL" ref={provided.innerRef} {...provided.droppableProps}>
              {filteredchamps.map((champ) => (
                <Card champ={champ} index={filteredchamps.indexOf(champ)} />
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
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
      <SearchList />
    </div>
  );
};

export { Search };
