import clientReducer from "./clientReducer";
import testReducer from "./testimonialReducer";
import blogReducer from "./blogReducer";
import teamReducer from "./teamReducer";
import slideReducer from "./slidReducer";
import projectReducer from "./projectReducer";
import productReducer from "./productReducer";
import cartReducer from "./cartReducer";
import eventReducer from "./eventReducer";

import { combineReducers } from "redux";
// import { firestoreReducer } from 'redux-firestore';

const rootReducer = combineReducers({
  //fireStore: firestoreReducer,
  client: clientReducer,
  testimonial: testReducer,
  blog: blogReducer,
  team: teamReducer,
  slider: slideReducer,
  project: projectReducer,
  product: productReducer,
  cart: cartReducer,
  event: eventReducer,
});

export default rootReducer;
