import { Tower } from "../tower";

export class Wolf extends Tower {
  constructor(position) {
    super(position);
    this.attackRange = 1;
    this.damage = 20;
  }
}

export default Wolf;
