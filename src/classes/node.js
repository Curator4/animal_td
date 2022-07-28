export class Node {
  constructor(position, terrainCost) {
    this.neighbours = [];
    this.position = position;
    this.terrainCost = terrainCost;
  }
}

export default Node;