import initState1 from "../../../softdata.json";
const initState = {
  ...initState1[0].testimonial,
};
const testimonialReducer = (state = initState, action) => {
  return state;
};
export default testimonialReducer;
