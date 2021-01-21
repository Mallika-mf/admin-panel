import initState from "../../../softdata.json";

const clientReducer = (state = initState, action) => {
  switch (action.type) {
    case "CREATE_PROJECT":
      return {
        ...state,
        successMessage: true,
      };

    case "CREATE_PROJECT_ERROR":
      return {
        ...state,
        successMessage: false,
      };
    default:
      return state;
  }
};
export default clientReducer;
