import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { getChampions } from '../reducers/reducer'
import { Search } from '../scripts/search'

const App = ({ champions }) => {

  return (
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
              <div className="champSpot"></div>
              <div className="champSpot"></div>
              <div className="champSpot"></div>
              <div className="champSpot"></div>
              <div className="champSpot"></div>
            </div>
            <div className="bans">
              <p> Your Bans </p>
              <div className="champSpot"></div>
              <div className="champSpot"></div>
              <div className="champSpot"></div>
              <div className="champSpot"></div>
              <div className="champSpot"></div>
            </div>
          </div>

          <Search details={champions} />

          <div className="enemy">
            <div className="players">
              <p> Enemy Team </p>
              <div className="champSpot"></div>
              <div className="champSpot"></div>
              <div className="champSpot"></div>
              <div className="champSpot"></div>
              <div className="champSpot"></div>
            </div>
            <div className="bans">
              <p> Enemy Bans </p>
              <div className="champSpot"></div>
              <div className="champSpot"></div>
              <div className="champSpot"></div>
              <div className="champSpot"></div>
              <div className="champSpot"></div>
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
  );

}

const mapStateToProps = (state) => ({
  champions: getChampions(state)
})

const mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(App)

// export default App;
