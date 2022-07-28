import "./startMenu.css";
import { useDispatch } from "react-redux";
import { startGame } from "../../store/gameStateSlice";
import { generatePathingMap } from "../../store/gridSlice";

export const StartMenu = () => {
  const dispatch = useDispatch();
  const handleStart = () => {
    dispatch(startGame());
    dispatch(generatePathingMap());
  };
  return (
    <div className="startMenu">
      <p>Animal Tower Defense</p>
      <button onClick={handleStart} className="startButton">
        Start Game
      </button>
    </div>
  );
};

export default StartMenu;
