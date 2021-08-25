import React from "react";
import { getSorting } from "../redux/reducer";
import { connect } from "react-redux";

const Score = ({ returnScore, compScore, returnPers, sorting }) => {
  return (
    <div
      className={`scoreShadow ${
        returnScore > compScore ? `scoreShadowHigh` : ``
      }`}
    >
      <div className={`score ${returnScore > compScore ? `scoreHigh` : ``}`}>
        <div className="scoreLine">
          <div style={{ display: sorting === "Rating" ? "block" : "none" }}>
            {returnScore}
            {" CP"}
          </div>
          <div style={{ display: sorting === "Popular" ? "block" : "none" }}>
            {returnScore}
            {" PP"}
          </div>
        </div>
        <div>
          {returnPers} {" %"}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  sorting: getSorting(state),
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Score);
