import React, { useState, Fragment } from 'react'
import { connect } from 'react-redux'
import { getChampions } from '../reducers/reducer'
import { dropable, pickable } from '../scripts/dragndrop'
import { handleChange, Scroll, Card, Search, SearchList } from '../scripts/search'



const App = ({ champions }) => {

  return (

    <div className="tc bg-green ma0 pa4 min-vh-100">
        <Search details={champions}/>
      </div>

    /*
    <div className="body">
      <div className="addLeader">
        <img src={process.env.PUBLIC_URL + '/assets/970x90.jpg'} alt="Advertisment Leaderboard" />
      </div>
      <div className="main">
        <div className="addSky">
          <img src={process.env.PUBLIC_URL + '/assets/300x600.webp'} alt='Advertisment Skyscraper' />
        </div>
        <div className="app">
          <div className="team">
            <div className="players">
              <p> Your Team </p>
              <div className="champSpot" hovertext="Player 1"></div>
              <div className="champSpot" hovertext="Player 2"></div>
              <div className="champSpot" hovertext="Player 3"></div>
              <div className="champSpot" hovertext="Player 4"></div>
              <div className="champSpot" hovertext="Player 5"></div>
            </div>
            <div className="bans">
              <p> Your Bans </p>
              <div className="champSpot" hovertext="Ban 1"></div>
              <div className="champSpot" hovertext="Ban 2"></div>
              <div className="champSpot" hovertext="Ban 3"></div>
              <div className="champSpot" hovertext="Ban 4"></div>
              <div className="champSpot" hovertext="Ban 5"></div>
            </div>
          </div>
          <div className="mid">
            <div className="controls">
              <input type="text" id="myInput" placeholder="Search for champion..." onChange={ handleChange } />
            </div>
            <div className="champs">
              <ul id="myUL">
                {champions.filter(champions => champions.includes(kostas)).map(station => (
                  <pickable draggable="true">
                    <li id="myUL" key={station}>
                      <div className="champImg" draggable="true">
                        <img className="myUL" src={process.env.PUBLIC_URL + '/champ/' + jpgNameFix(station)} alt={station} />
                        <a> {station} </a>
                      </div>
                    </li>
                  </pickable>
                ))}

              </ul>
            </div>
          </div>

          <div className="enemy">
            <div className="players">
              <p> Enemy Team </p>
              <div className="champSpot" hovertext="Player 1"></div>
              <div className="champSpot" hovertext="Player 2"></div>
              <div className="champSpot" hovertext="Player 3"></div>
              <div className="champSpot" hovertext="Player 4"></div>
              <div className="champSpot" hovertext="Player 5"></div>
            </div>
            <div className="bans">
              <p> Enemy Bans </p>
              <div className="champSpot" hovertext="Ban 1"></div>
              <div className="champSpot" hovertext="Ban 2"></div>
              <div className="champSpot" hovertext="Ban 3"></div>
              <div className="champSpot" hovertext="Ban 4"></div>
              <div className="champSpot" hovertext="Ban 5"></div>
            </div>
          </div>
        </div>
        <div className="addSky">
          <img src={process.env.PUBLIC_URL + '/assets/300x600.webp'} alt="Advertisment Skyscraper" />
        </div>
      </div>
      <div className="addLeader">
        <img src={process.env.PUBLIC_URL + '/assets/970x90.jpg'} alt="Advertisment Leaderboard" />
      </div>
    </div>
*/
  );
}

const mapStateToProps = (state) => ({
  champions: getChampions(state)
})

const mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(App)

// export default App;
