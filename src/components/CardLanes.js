import React from "react";

const CardLanes = (lane) => {
  var singleLane = Object.values(lane);

  return (
    <div>
      <img
        className="laneImg"
        src={process.env.PUBLIC_URL + "assets/" + singleLane + ".png"}
        alt={singleLane}
      />
    </div>
  );
};

export default CardLanes;
