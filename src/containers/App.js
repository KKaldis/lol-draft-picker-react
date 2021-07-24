import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { getChampions } from '../reducers/reducer'
import { useDrag } from 'react-dnd'
import Pickable from '../scripts/pickable'
import dropable from '../scripts/dropable'

const jpgNameFix = (item) => {
  //remove from champion name special characters and spaces to make string with jpg file name
  let imageName = item.replace(/[^A-Z0-9]/ig, "");
  //make string and path for jpg images
  imageName = imageName + ".jpg";
  return imageName;

}


const App = ({ champions }) => {
  return (
    <body>
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
              <input type="text" id="myInput"   placeholder="Search for names.." onChange=""/>
            </div>
            <div className="champs">
              <ul id="myUL">
              //search results//
                {champions.filter(champions => champions.includes('V')).map(station => (
                  <pickable draggable="true">
                  <li id ="myUL" key={station}>
                    <div className="champImg" draggable="true">
                      <img className="myUL" src={process.env.PUBLIC_URL + '/champ/' + jpgNameFix(station)} alt={station} />
                      {station}
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
    </body>

  );
}

const mapStateToProps = (state) => ({
  champions: getChampions(state)
})

const mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(App)

// export default App;
