import React from "react";

const Leaderboard = () => {
  return (
    <div className="addLeader">
      <img
        src={process.env.PUBLIC_URL + "assets/970x90.jpg"}
        alt="Advertisment Leaderboard"
      />
    </div>
  );
};

const Skyscraper = () => {
  return (
    <div className="addSky">
      <img
        src={process.env.PUBLIC_URL + "assets/300x600.webp"}
        alt="Advertisment Skyscraper"
      />
    </div>
  );
};

export { Leaderboard, Skyscraper };
