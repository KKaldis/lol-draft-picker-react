import React from "react";
import ReactTooltip from "react-tooltip";
import { previewStyle } from "../redux/actions";
import { connect } from "react-redux";

const HoverThing = ({ dataTip, imgFile, hoverFamily, altText, handleChange }) => {

  return (
    <div >
      <a data-tip={dataTip} data-for={hoverFamily}>
        <div className="tierSelect" onClick={handleChange} id={altText}>
          <img src={"assets/" + imgFile + ".png"} alt={altText} />
        </div>{" "}
      </a>
      <ReactTooltip id={hoverFamily} className="tooltip" effect="solid" />
    </div>
  );
};


const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
  handleChange: (e) => dispatch(previewStyle(e.target.alt)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HoverThing);