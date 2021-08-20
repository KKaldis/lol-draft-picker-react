import data from "../app/data.json";
import { getSelections } from "../redux/reducer"
import { connect } from "react-redux";

for (const i in x) {
  console.log(`${i}: ${x[i]}`);
}

const mapStateToProps = (state) => ({
  x: getSelections (state)

});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps);
