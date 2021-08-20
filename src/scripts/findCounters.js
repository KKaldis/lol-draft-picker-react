import data from "../app/data.json";
import {state, selections} from "../redux/reducer"
import { connect } from "react-redux";

for (const i in selections) {
  console.log(`${i}: ${selections[i]}`);
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({


});

export default connect(mapStateToProps, mapDispatchToProps);
