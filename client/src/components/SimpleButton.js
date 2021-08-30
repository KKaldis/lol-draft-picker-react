import React from "react";
import { connect } from "react-redux";

const SimpleButton = ({ imgFile, handleChange, buttonType }) => {
  return (
    <div className={buttonType} onClick={handleChange}>
      <img
        src={"assets/" + imgFile + "30.webp"}
        onClick={handleChange}
        alt={"add"}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(SimpleButton);
