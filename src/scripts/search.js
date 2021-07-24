import React, { useState } from 'react';

const jpgNameFix = (item) => {
  //remove from champion name special characters and spaces to make string with jpg file name
  let imageName = item.replace(/[^A-Z0-9]/ig, "");
  //make string and path for jpg images
  imageName = imageName + ".jpg";
  return imageName;

}

const Card = ({ champ }) => {
  return (
    <li id="myUL" key={champ}>
      <div className="champImg" draggable="true">
        <img className="myUL" src={process.env.PUBLIC_URL + '/champ/' + jpgNameFix(champ)} alt={champ} />
        <a> {champ} </a>
      </div>
    </li>
  );
}

const Scroll = (props) => {
  return (
    < div className="champs">
      {props.children}
    </div>

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
  Scroll,
  Card,
  Search,
  SearchList
}
