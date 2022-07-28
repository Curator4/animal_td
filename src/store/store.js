import { configureStore } from "@reduxjs/toolkit";
import gameStateReducer from "./gameStateSlice";
import gridReducer from "./gridSlice";

export const store = configureStore({
  reducer: {
    gameState: gameStateReducer,
    grid: gridReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;