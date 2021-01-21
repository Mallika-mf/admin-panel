import initState1 from "../../../softdata.json";
const initState = {
  ...initState1[0].slider,
};
const slideReducer = (state = initState, action) => {
  return state;
};
export default slideReducer;
