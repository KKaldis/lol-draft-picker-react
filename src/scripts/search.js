import React, { useState } from 'react';


const jpgNameFix = (item) => {
  //remove from champion name special characters and spaces to make string with jpg file name
  let imageName = item.replace(/[^A-Z0-9]/ig, "");
  //make string and path for jpg images
  imageName = imageName + ".jpg";
  return imageName;

}


function Card({person}) {
  return(
    <li id="myUL" key={person}>
      <div className="champImg" draggable="true">
        <img className="myUL" src={process.env.PUBLIC_URL + '/champ/' + jpgNameFix(person)} alt={person} />
        <a> {person} </a>
      </div>
    </li>
  );
}


const Scroll = (props) => {
  return(

    < div className="champs">
      {props.children}
    </div>

  );
}


function SearchList({ filteredPersons }) {
  const filtered = filteredPersons.map(person =>  <Card key={person.id} person={person} />);
  return (
    <ul id="myUL">
      {filtered}
    </ul>
  );
}







function Search({ details }) {

  const [searchField, setSearchField] = useState("");

  const filteredPersons = details.filter(
    person => {
      return (
        person
              .toLowerCase()
        .includes(searchField.toLowerCase())
      );
    }
  );

  const handleChange = e => {
    setSearchField(e.target.value);
  };

  function searchList() {
    return (
      <Scroll>
        <SearchList filteredPersons={filteredPersons} />
      </Scroll>
    );
  }

  return (
    <div className="mid">

    <div className="controls">
        <input
        id="myInput"
        placeholder="Search for champion..."
          type = "search"
          onChange = {handleChange}
        />
      </div>
      {searchList()}
    </div>
  );
}

export  {
  Scroll,
  Card,
  Search,
  SearchList}
