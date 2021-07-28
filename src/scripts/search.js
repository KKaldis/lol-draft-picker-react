import React, { useState } from "react";
import { Droppable } from "react-beautiful-dnd";
import DrawChampSlot from "../components/DrawChampSlot";
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
