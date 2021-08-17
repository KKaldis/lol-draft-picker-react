import React from "react";
import ReactTooltip from "react-tooltip";

const HoverThing = ({ dataTip, imgFile, hoverFamily, altText }) => {
  return (
    <div>
      <a data-tip={dataTip} data-for={hoverFamily}>
        <div class="tierSelect" onclick="activateLasers()">
          <img src={"assets/" + imgFile + ".png"} alt={altText} />
        </div>{" "}
      </a>
      <ReactTooltip id={hoverFamily} className="tooltip" effect="solid" />
    </div>
  );
};

export default HoverThing;
