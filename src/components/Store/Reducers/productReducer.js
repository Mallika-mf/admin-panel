import initState1 from "../../../softdata.json";
const initState = {
  ...initState1[0].product,
};
const productReducer = (state = initState, action) => {
  return state;
};
export default productReducer;
