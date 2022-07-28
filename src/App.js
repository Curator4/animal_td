import React from "react";
import { useSelector } from "react-redux";
import { StartMenu, Game } from "./components";
import "./App.css";

function App() {
  let gamemode = useSelector((state) => state.gameState.gamemode);
  return (
    <div className="App">
      {gamemode === "start" && <StartMenu />}

      {gamemode === "game" && <Game />}

      {gamemode === "gameOver" && <>Game Over</>}
    </div>
  );
}

export default App;
