import React from "react";
import { connect } from "react-redux";

const SimpleButton = ({ imgFile, altText, handleChange, buttonType }) => {
  return (

      <div
        className={buttonType}
        alt={altText}
        onClick={handleChange}
        id={altText}
      >
        <img
          src={"assets/" + imgFile + "30.webp"}
          alt={altText}
          onClick={handleChange}
          id={altText}
        />
      </div>

  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(SimpleButton);
