import initState1 from "../../../softdata.json";
const initState = {
  ...initState1[0].event,
};
const eventReducer = (state = initState, action) => {
  return state;
};
export default eventReducer;
