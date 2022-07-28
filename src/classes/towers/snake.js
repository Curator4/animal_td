import { Tower } from "../tower";

export class Snake extends Tower {
  constructor(position) {
    super(position);
    this.attackRange = 0;
    this.damage = 30;
  }
}

export default Snake;