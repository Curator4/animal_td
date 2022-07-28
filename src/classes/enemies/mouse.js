import { Enemy } from "../enemy";

export class Mouse extends Enemy {
  constructor(position) {
    super(position);
    this.health = 60;
  }
}

export default Mouse;
