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
    <section className="garamond">
      <div className="navy georgia ma0 grow">
        <h2 className="f2">Search your course</h2>
      </div>
      <div className="pa2">
        <input
          className="pa3 bb br3 grow b--none bg-lightest-blue ma3"
          type = "search"
          placeholder = "Search People"
          onChange = {handleChange}
        />
      </div>
      {searchList()}
    </section>
  );
}

export  {
  Scroll,
  Card,
  Search,
  SearchList}
