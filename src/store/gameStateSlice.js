import { createSlice } from "@reduxjs/toolkit";

const options = {
  name: "gameState",
  initialState: {
    gamemode: "start",
    turnNumber: 0,
    turnPhase: "placement",
    terrainSelected: 0,
    towerSelected: 0,
    placeMode: true,
    buildPoints: 1,
  },
  reducers: {
    spentBuildPoint: (state) => {
      state.buildPoints--;
    },
    nextTurn: (state) => {
      state.turnNumber++;
      if (state.turnNumber < 15) {
        state.buildPoints++;
      }
    },
    setTurnPhase: (state, action) => {
      state.turnPhase = action.payload;
    },
    startGame: (state) => {
      state.gamemode = "game";
    },
    setTerrain: (state, action) => {
      state.terrainSelected = action.payload;
    },
    setTower: (state, action) => {
      state.towerSelected = action.payload;
    },
    togglePlaceMode: (state) => {
      state.placeMode = !state.placeMode;
    },
    lostGame: (state) => {
      console.log("lost!");
      state.gamemode = "gameOver";
    },
  },
};

const gameStateSlice = createSlice(options);

export const {
  spentBuildPoint,
  nextTurn,
  startGame,
  setTerrain,
  setTower,
  togglePlaceMode,
  lostGame,
  setTurnPhase,
} = gameStateSlice.actions;

export default gameStateSlice.reducer;
