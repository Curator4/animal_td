import { createSlice, current } from "@reduxjs/toolkit";
import { Snake, Wolf, Eagle, Mouse, Node } from "../classes";

const options = {
  name: "grid",
  initialState: {
    terrainMatrixBackup: [
      [1, 1, 4, 4, 1, 1, 2, 2, 2, 1],
      [1, 1, 4, 1, 1, 2, 2, 2, 2, 1],
      [1, 3, 4, 3, 1, 1, 2, 2, 2, 3],
      [3, 3, 4, 1, 1, 1, 1, 1, 2, 3],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 3],
      [1, 2, 2, 1, 1, 1, 3, 1, 1, 4],
      [2, 2, 2, 2, 1, 1, 3, 3, 1, 4],
      [2, 2, 1, 1, 1, 1, 1, 3, 4, 4],
      [2, 2, 1, 1, 1, 1, 1, 1, 1, 4],
      [4, 2, 3, 3, 1, 1, 1, 1, 1, 3],
    ],
    terrainMatrix: [
      [1, 1, 4, 4, 1, 1, 2, 2, 2, 1],
      [1, 1, 4, 1, 1, 2, 2, 2, 2, 1],
      [1, 3, 4, 3, 1, 1, 2, 2, 2, 3],
      [3, 3, 4, 1, 1, 1, 1, 1, 2, 3],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 3],
      [1, 2, 2, 1, 1, 1, 3, 1, 1, 4],
      [2, 2, 2, 2, 1, 1, 3, 3, 1, 4],
      [2, 2, 1, 1, 1, 1, 1, 3, 4, 4],
      [2, 2, 1, 1, 1, 1, 1, 1, 1, 4],
      [4, 2, 3, 3, 1, 1, 1, 1, 1, 3],
    ],
    towerMatrix: [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ],
    enemyMatrix: [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ],
    base: null,
    pathingMap: [],
    towers: [],
    enemies: [],
    spawnPositions: [
      [0, 0],
      [0, 1],
      [0, 2],
      [0, 3],
      [0, 4],
      [0, 5],
      [0, 6],
      [0, 7],
      [0, 8],
      [0, 9],
      [1, 0],
      [2, 0],
      [3, 0],
      [4, 0],
      [5, 0],
      [6, 0],
      [7, 0],
      [8, 0],
      [9, 0],
      [1, 9],
      [2, 9],
      [3, 9],
      [4, 9],
      [5, 9],
      [6, 9],
      [7, 9],
      [8, 9],
      [9, 9],
      [9, 1],
      [9, 2],
      [9, 3],
      [9, 4],
      [9, 5],
      [9, 6],
      [9, 7],
      [9, 8],
    ],
  },
  reducers: {
    newTerrain: (state) => {},
    terraform: (state, action) => {
      state.terrainMatrixBackup[action.payload[1][0]][action.payload[1][1]] =
        action.payload[0];
      state.terrainMatrix = state.terrainMatrixBackup;
    },
    buildTower: (state, action) => {
      state.towerMatrix[action.payload[1][0]][action.payload[1][1]] =
        action.payload[0];
      switch (action.payload[0]) {
        case 1:
          state.towers.push(new Snake(action.payload[1]));
          break;
        case 2:
          state.towers.push(new Wolf(action.payload[1]));
          break;
        case 3:
          state.towers.push(new Eagle(action.payload[1]));
          break;
        default:
          console.log("issue with build tower");
      }
      state.towers[state.towers.length - 1].updateRange();
    },
    spawnEnemy: (state) => {
      const spawnPoint =
        current(state).spawnPositions[
          Math.floor(Math.random() * state.spawnPositions.length)
        ];
      state.enemyMatrix[spawnPoint[0]][spawnPoint[1]] = 1;
      state.enemies.push(new Mouse(spawnPoint));
      state.enemies[state.enemies.length - 1].updatePath(
        state.pathingMap,
        current(state).base
      );
    },
    generatePathingMap: (state) => {
      let graph = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      ];
      for (let x = 0; x < 10; x++) {
        for (let y = 0; y < 10; y++) {
          graph[x][y] = new Node([x, y], state.terrainMatrix[x][y]);
        }
      }
      for (let x = 0; x < 10; x++) {
        for (let y = 0; y < 10; y++) {
          if (x > 0) {
            graph[x][y].neighbours.push(graph[x - 1][y]);
          }
          if (x < 9) {
            graph[x][y].neighbours.push(graph[x + 1][y]);
          }
          if (y > 0) {
            graph[x][y].neighbours.push(graph[x][y - 1]);
          }
          if (y < 9) {
            graph[x][y].neighbours.push(graph[x][y + 1]);
          }
        }
      }
      state.pathingMap = graph;
      state.enemies.forEach((enemy) => {
        enemy.updatePath(state.pathingMap, current(state).base);
      });
    },
    showPath: (state, action) => {
      state.enemies
        .find((enemy) =>
          enemy.position.every((v, i) => v === action.payload[i])
        )
        .path.forEach((coords) => {
          state.terrainMatrix[coords[0]][coords[1]] = 6;
        });
    },
    showRange: (state, action) => {
      const position = action.payload;
      const range = state.towers.find((tower) =>
        tower.position.every((v, i) => v === action.payload[i])
      ).attackRange;
      for (let i = 0; i <= range; i++) {
        state.terrainMatrix[position[0] - i][position[1]] = 5;
        state.terrainMatrix[position[0] + i][position[1]] = 5;
        state.terrainMatrix[position[0]][position[1] - i] = 5;
        state.terrainMatrix[position[0]][position[1] + i] = 5;
      }
      for (let i = 0; i < range; i++) {
        state.terrainMatrix[position[0] - i][position[1] + i] = 5;
        state.terrainMatrix[position[0] - i][position[1] - i] = 5;
        state.terrainMatrix[position[0] + i][position[1] - i] = 5;
        state.terrainMatrix[position[0] + i][position[1] + i] = 5;
      }
    },
    showMap: (state) => {
      state.terrainMatrix = state.terrainMatrixBackup;
    },
    moveEnemies: (state) => {
      state.enemies.forEach((enemy) => {
        state.enemyMatrix[enemy.path[enemy.path.length - 1][0]][
          enemy.path[enemy.path.length - 1][1]
        ] = 1;
        state.enemyMatrix[enemy.position[0]][enemy.position[1]] = 0;
        enemy.move();
      });
    },
    buildBase: (state, action) => {
      state.terrainMatrixBackup[action.payload[0]][action.payload[1]] = 7;
      state.terrainMatrix = state.terrainMatrixBackup;
      state.base = action.payload;
    },
    doDamage: (state) => {
      state.towers.forEach((tower) => {
        state.enemies.forEach((enemy) => {
          tower.range.forEach((tile) => {
            // console.log(
            //   `${tile} = ${enemy.position} = ${tile.every((v, i) => v === enemy.position[i])}`
            // );
            if (tile.every((v, i) => v === enemy.position[i])) {
              enemy.takeDamage(tower.damage);
              console.log("did damage");
            }
          });
        });
        state.enemies.forEach((enemy) => {
          if (!enemy.health > 0) {
            state.enemyMatrix[enemy.position[0]][enemy.position[1]] = 0;
          }
        });
        console.log(state.enemies.length);
        state.enemies = state.enemies.filter((enemy) => enemy.health > 0);
        console.log(state.enemies.length);

        // state.enemies.forEach((enemy) => {
        //   if (!enemy.health > 0) {
        //     console.log(`removing [${enemy.position[0]}, ${enemy.position[1]}]`);
        //     state.enemyMatrix[enemy.position[0] + 1][enemy.position[1] + 1] = 0;
        //     console.log(`enemies: ${state.enemies.length}`);
        //     console.log(current(state).enemyMatrix);
        //   }
        // });
        // state.enemies = state.enemies.filter((enemy) => enemy.health > 0);
      });
    },
  },
};

const gridSlice = createSlice(options);

export const {
  newTerrain,
  terraform,
  buildTower,
  spawnEnemy,
  generatePathingMap,
  showPath,
  showRange,
  showMap,
  moveEnemies,
  buildBase,
  doDamage,
} = gridSlice.actions;

export const getRenderMatrix = (state) => {
  let renderMatrix = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      renderMatrix[i][j] = [
        state.grid.terrainMatrix[i][j],
        state.grid.towerMatrix[i][j],
        state.grid.enemyMatrix[i][j],
        [i, j],
      ];
    }
  }
  return renderMatrix;
};

export default gridSlice.reducer;
