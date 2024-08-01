import {
    STORE_BLOBS
  } from "./types";
  
  import initialState from "./initialState";
  
  export const componentReducer = (state = initialState, action) => {
    let payload = action.payload;
    let type = action.type;
    switch (type) {
        case STORE_BLOBS: {
        return {
          ...state,
          blobs: payload
        };
      }
      default:
        return state;
    }
  };