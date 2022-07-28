import "./game.css";
import { Grid, GameMenu } from "../";
import { useDispatch, useSelector } from "react-redux";
import { spawnEnemy, moveEnemies, doDamage } from "../../store/gridSlice";
import { setTurnPhase, nextTurn, lostGame } from "../../store/gameStateSlice";

export const Game = () => {
  const dispatch = useDispatch();

  const { turnPhase } = useSelector((state) => state.gameState);
  const { enemies, base } = useSelector((state) => state.grid);

  const placementPhase = () => {
    dispatch(setTurnPhase("movement"));
  };
  const movementPhase = () => {
    dispatch(moveEnemies());
    if (
      enemies.some((enemy) => {
        return enemy.position.every((v, i) => v === base[i]);
      })
    ) {
      dispatch(lostGame());
    }
    dispatch(setTurnPhase("damage"));
  };
  const damagePhase = () => {
    dispatch(doDamage());
    dispatch(setTurnPhase("spawn"));
  };
  const spawnPhase = () => {
    dispatch(spawnEnemy());
    dispatch(setTurnPhase("placement"));
    dispatch(nextTurn());
  };
  const handleNextPhase = () => {
    switch (turnPhase) {
      case "placement":
        placementPhase();
        break;
      case "movement":
        movementPhase();
        break;
      case "damage":
        damagePhase();
        break;
      case "spawn":
        spawnPhase();
        break;
      default:
        break;
    }
  };

  return (
    <div className="Game">
      <div className="baseHint">
        {base === null && <p>Press to place base</p>}
      </div>
      <Grid />
      <GameMenu handleNextPhase={handleNextPhase} />
    </div>
  );
};

export default Game;
