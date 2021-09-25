import React from "react";
import ChampSlot from "../components/ChampSlot";

const EnemyPicks = () => {
  return (
    <div className="enemy">
      <div className="players">
        <ChampSlot playerId={"enemyplayer1"} />
        <ChampSlot playerId={"enemyplayer2"} />
        <ChampSlot playerId={"enemyplayer3"} />
        <ChampSlot playerId={"enemyplayer4"} />
        <ChampSlot playerId={"enemyplayer5"} />
      </div>
    </div>
  );
};

const TeamPicks = () => {
  return (
    <div className="team">
      <div className="players">
        <ChampSlot playerId={"teamplayer1"} />
        <ChampSlot playerId={"teamplayer2"} />
        <ChampSlot playerId={"teamplayer3"} />
        <ChampSlot playerId={"teamplayer4"} />
        <ChampSlot playerId={"teamplayer5"} />
      </div>
    </div>
  );
};

const BanPicks = () => {
  return (
    <div className="selections">
      <div className="banSpot">
        <div className="bans">
          <ChampSlot playerId={"ban0"} />
          <ChampSlot playerId={"ban1"} />
          <ChampSlot playerId={"ban2"} />
          <ChampSlot playerId={"ban3"} />
          <ChampSlot playerId={"ban4"} />
        </div>
      </div>
      <div className="banSpot">
        <div className="bans">
          <ChampSlot playerId={"ban5"} />
          <ChampSlot playerId={"ban6"} />
          <ChampSlot playerId={"ban7"} />
          <ChampSlot playerId={"ban8"} />
          <ChampSlot playerId={"ban9"} />
        </div>
      </div>
    </div>
  );
};

const Picks = () => {
  return (
    <div className="selections">
      <div className="teamH">
        <div className="bans">
          <ChampSlot playerId={"teamplayer1"} />
          <ChampSlot playerId={"teamplayer2"} />
          <ChampSlot playerId={"teamplayer3"} />
          <ChampSlot playerId={"teamplayer4"} />
          <ChampSlot playerId={"teamplayer5"} />
        </div>
      </div>
      <div className="enemyH">
        <div className="bans">
          <ChampSlot playerId={"enemyplayer1"} />
          <ChampSlot playerId={"enemyplayer2"} />
          <ChampSlot playerId={"enemyplayer3"} />
          <ChampSlot playerId={"enemyplayer4"} />
          <ChampSlot playerId={"enemyplayer5"} />
        </div>
      </div>
    </div>
  );
};

export { EnemyPicks, TeamPicks, BanPicks, Picks };
