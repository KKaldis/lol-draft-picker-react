import React from "react";
import ReactTooltip from "react-tooltip";
import { previewStyle } from "../redux/actions";
import { connect } from "react-redux";

const HoverButton = ({
  dataTip,
  imgFile,
  hoverFamily,
  altText,
  handleChange,
}) => {
  return (
    <div>
      <a data-tip={dataTip} data-for={hoverFamily}>
        <div className="tierSelect">
          <div
            className="tierSelectImg"
            alt={altText}
            onClick={handleChange}
            id={altText}
          >
            <img
              src={"assets/" + imgFile + "30.png"}
              alt={altText}
              onClick={handleChange}
              id={altText}
            />
          </div>{" "}
        </div>
      </a>
      <ReactTooltip id={hoverFamily} className="tooltip" effect="solid" />
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  handleChange: (e) => dispatch(previewStyle(e.target.id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HoverButton);
