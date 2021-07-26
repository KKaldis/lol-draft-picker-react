import React, { useState } from 'react';
import { Draggable, Droppable, DragDropContext } from 'react-beautiful-dnd';

// string set up for image url
const jpgNameFix = (item) => {
  //remove from champion name special characters and spaces to make string with jpg file name
  let imageName = item.replace(/[^A-Z0-9]/ig, "");
  //make string and path for jpg images
  imageName = imageName + ".jpg";
  return imageName;

}

const Card = ({ champ }) => {
  return (
    <Draggable draggableId={champ} index={champ}>
      {(provided) => (


        <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
          <div className="champImg" >
            <img src={process.env.PUBLIC_URL + '/champ/' + jpgNameFix(champ)} alt={champ} />
            <a> {champ} </a>
          </div>
        </li>
      )}
    </Draggable>
  );
}

const Scroll = (props) => {
  return (
    <Droppable droppableId="champSelect">
      {(provided) => (

        < div className="champs"  ref={provided.innerRef}      {...provided.droppableProps}>
          {props.children}
          {provided.placeholder}
        </div>

      )}
    </Droppable>

  );
}

const SearchList = ({ filteredchamps }) => {
  const filtered = filteredchamps.map(champ => <Card champ={champ} id={champ.id} />);
  return (
    <ul id="myUL">
      {filtered}
    </ul>
  );
}

const Search = ({ details }) => {

  const [searchField, setSearchField] = useState("");

  const filteredchamps = details.filter(
    champ => {
      return (
        champ
          .toLowerCase()
          .includes(searchField.toLowerCase())
      );
    }
  );

  const handleChange = e => {
    setSearchField(e.target.value);
  };

  const searchList = () => {
    return (
      <Scroll>
        <SearchList filteredchamps={filteredchamps} />
      </Scroll>
    );
  }

  return (
    <div className="mid">

      <div className="controls">
        <input
          id="myInput"
          placeholder="Search for champion..."
          type="search"
          onChange={handleChange}
        />
      </div>
      {searchList()}
    </div>
  );
}

export {
  Search

}
