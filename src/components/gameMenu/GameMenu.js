import "./gameMenu.css";
import { useDispatch, useSelector } from "react-redux";
import { snake, wolf, eagle } from "../../assets";
import {
  setTower,
  setTerrain,
  togglePlaceMode,
} from "../../store/gameStateSlice";

export const GameMenu = ({ handleNextPhase }) => {
  const dispatch = useDispatch();
  const placeMode = useSelector((state) => state.gameState.placeMode);
  const turnNumber = useSelector((state) => state.gameState.turnNumber);
  const turnPhase = useSelector((state) => state.gameState.turnPhase);
  const buildPoints = useSelector((state) => state.gameState.buildPoints);
  const handleSnake = () => {
    dispatch(setTower(1));
    dispatch(togglePlaceMode());
  };
  const handleWolf = () => {
    dispatch(setTower(2));
    dispatch(togglePlaceMode());
  };
  const handleEagle = () => {
    dispatch(setTower(3));
    dispatch(togglePlaceMode());
  };
  const handleMountain = () => {
    dispatch(setTerrain(4));
    dispatch(togglePlaceMode());
  };
  const handleForest = () => {
    dispatch(setTerrain(2));
    dispatch(togglePlaceMode());
  };
  const handleHill = () => {
    dispatch(setTerrain(3));
    dispatch(togglePlaceMode());
  };
  const handleField = () => {
    dispatch(setTerrain(1));
    dispatch(togglePlaceMode());
  };
  return (
    <div className="gameMenu">
      <div className="gameMenu-turnMenu">
        <h1>Turn: {turnNumber}</h1>
        <h3>Turn Phase: </h3>
        <span className={turnPhase === "placement" ? "underline" : "none"}>
          Placement
        </span>
        <span className={turnPhase === "movement" ? "underline" : "none"}>
          Movement
        </span>
        <span className={turnPhase === "damage" ? "underline" : "none"}>
          Damage
        </span>
        <span className={turnPhase === "spawn" ? "underline" : "none"}>
          Spawn
        </span>
      </div>
      <button disabled={placeMode} onClick={handleNextPhase}>
        Next Phase
      </button>
      <div className="gameMenu-placementMenu">
        <div className="gameMenu-placementMenu-towerMenu">
          <h2>Place Tower</h2>
          <div className="gameMenu-placementMenu-towerMenu-placeTowers">
            <div className="place snake">
              <img src={snake} alt="snake"></img>
              <div className="stats">
                <h3>Snek</h3>
                <div className="statline">
                  <p>Range: 0</p>
                  <p>Dmg: 30</p>
                </div>
                <button
                  disabled={
                    placeMode || turnPhase !== "placement" || buildPoints < 1
                  }
                  onClick={handleSnake}
                >
                  Place Snake
                </button>
              </div>
            </div>
            <div className="place wolf">
              <img src={wolf} alt="wolf"></img>
              <div className="stats">
                <h3>Wolfie</h3>
                <div className="statline">
                  <p>Range: 1</p>
                  <p>Dmg: 20</p>
                </div>
                <button
                  disabled={
                    placeMode || turnPhase !== "placement" || buildPoints < 1
                  }
                  onClick={handleWolf}
                >
                  Place Wolf
                </button>
              </div>
            </div>
            <div className="place eagle">
              <img src={eagle} alt="eagle"></img>
              <div className="stats">
                <h3>Bird</h3>
                <div className="statline">
                  <p>Range: 2</p>
                  <p>Dmg: 10</p>
                </div>
                <button
                  disabled={
                    placeMode || turnPhase !== "placement" || buildPoints < 1
                  }
                  onClick={handleEagle}
                >
                  Place Eagle
                </button>
              </div>
            </div>
            <p>Buildpoints: {buildPoints}</p>
          </div>
        </div>
        <div className="gameMenu-placementMenu-terrainMenu">
          <h2>Alter Terrain</h2>
          <div className="gameMenu-placementMenu-placeTiles">
            <div className="place-tile">
              <div className="placementMenu-tile mountain" />
              <button
                disabled={
                  placeMode || turnPhase !== "placement" || buildPoints < 1
                }
                onClick={handleMountain}
              >
                Place Mountain
              </button>
            </div>
            <div className="place-tile">
              <div className="placementMenu-tile forest" />
              <button
                disabled={
                  placeMode || turnPhase !== "placement" || buildPoints < 1
                }
                onClick={handleForest}
              >
                Place Forest
              </button>
            </div>
            <div className="place-tile">
              <div className="placementMenu-tile hill" />
              <button
                disabled={
                  placeMode || turnPhase !== "placement" || buildPoints < 1
                }
                onClick={handleHill}
              >
                Place Hill
              </button>
            </div>
            <div className="place-tile">
              <div className="placementMenu-tile field" />
              <button
                disabled={
                  placeMode || turnPhase !== "placement" || buildPoints < 1
                }
                onClick={handleField}
              >
                Place Field
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="gameMenu-exit">
        <button
          onClick={() => {
            dispatch(spawnEnemy());
          }}
        >
          SpawnEnemy
        </button>
      </div> */}
      <div className="gameMenu-exit">
        <button>Exit Game</button>
      </div>
    </div>
  );
};

export default GameMenu;
