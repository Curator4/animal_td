import "./tile.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  buildTower,
  terraform,
  showPath,
  showRange,
  showMap,
  generatePathingMap,
  buildBase,
} from "../../store/gridSlice";
import {
  togglePlaceMode,
  setTower,
  setTerrain,
  spentBuildPoint,
} from "../../store/gameStateSlice";
import { snake, wolf, eagle, mouse } from "../../assets";

export const Tile = ({ terrain, tower, enemy, position }) => {
  const dispatch = useDispatch();
  const { terrainSelected, towerSelected, placeMode } = useSelector(
    (state) => state.gameState
  );
  const { enemies, base } = useSelector((state) => state.grid);
  const [enemyHealth, setEnemyHealth] = useState(0);

  useEffect(() => {
    if (enemy > 0) {
      try {
        setEnemyHealth(
          enemies.find((element) =>
            element.position.every((v, i) => v === position[i])
          ).health
        );
      } catch {
        console.log("removed enemy");
      }
    }
  }, [enemy, enemies, position]);

  const terrainType = {
    0: "none",
    1: "field",
    2: "forest",
    3: "hill",
    4: "mountain",
    5: "range",
    6: "path",
    7: "base",
  };
  const towerType = {
    0: "none",
    1: "snake",
    2: "wolf",
    3: "eagle",
  };
  const enemyType = {
    0: "none",
    1: "mouse",
  };
  const towers = ["none", snake, wolf, eagle];
  const enemyNames = ["none", mouse];
  const handleHover = () => {
    if (enemy > 0) {
      dispatch(showPath(position));
      return;
    }
    if (tower > 0) {
      dispatch(showRange(position));
    }
  };
  const handleHoverExit = () => {
    if (enemy > 0 || tower > 0) {
      dispatch(showMap());
    }
  };
  const handleClick = () => {
    if (!placeMode) {
      return;
    }
    if (terrainSelected > 0) {
      dispatch(terraform([terrainSelected, position]));
      dispatch(generatePathingMap());
      dispatch(setTerrain(0));
      dispatch(spentBuildPoint());
    } else if (towerSelected > 0 && !position.every((v, i) => v === base[i])) {
      dispatch(buildTower([towerSelected, position]));
      dispatch(setTower(0));
      dispatch(spentBuildPoint());
    } else if (base === null) {
      dispatch(buildBase(position));
    }
    dispatch(togglePlaceMode());
  };
  return (
    <div
      className={terrainType[terrain]}
      onClick={() => {
        handleClick();
      }}
      onMouseEnter={handleHover}
      onMouseLeave={handleHoverExit}
    >
      {tower > 0 && enemy < 1 && (
        <img
          src={towers[tower]}
          alt="tower"
          className={"tower " + towerType[tower]}
        />
      )}
      {enemy > 0 && enemyHealth > 0 && (
        <div className="enemy">
          <img
            src={enemyNames[enemy]}
            alt="enemy"
            className={"enemy " + enemyType[enemy]}
          />
          <p className="health">Health: {enemyHealth}</p>
        </div>
      )}
    </div>
  );
};

export default Tile;
