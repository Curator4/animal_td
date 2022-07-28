import "./grid.css";
import Tile from "../Tile/Tile";
import { useSelector } from "react-redux";
import { getRenderMatrix } from "../../store/gridSlice";

export const Grid = () => {
  let grid = useSelector((state) => getRenderMatrix(state));
  return (
    <div className="Grid">
      {grid.map((row) => {
        return row.map((tile) => (
          <Tile terrain={tile[0]} tower={tile[1]} enemy={tile[2]} position={tile[3]} />
        ));
      })}
    </div>
  );
};

export default Grid;
