import initState1 from "../../../softdata.json";
const initState = {
  ...initState1[0].team,
};
const teamReducer = (state = initState, action) => {
  return state;
};
export default teamReducer;
