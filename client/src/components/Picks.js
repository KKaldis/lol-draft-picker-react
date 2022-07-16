import React from "react";
import ChampSlot from "../components/ChampSlot";

const Picks = () => {
  const slotsNum = [1, 2, 3, 4, 5];
  return (
    <div className="selections">
      <div className="teamH">
        <div className="bans">
          {slotsNum.map((item) => (
            <ChampSlot playerId={`team${+item}`} key={`team${+item}`} />
          ))}
        </div>
      </div>
      <div className="enemyH">
        <div className="bans">
          {slotsNum.map((item) => (
            <ChampSlot playerId={`enemy${+item}`} key={`enemy${+item}`} />
          ))}
        </div>
      </div>
    </div>
  );
};

export { Picks };
