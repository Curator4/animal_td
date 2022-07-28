import { Tower } from "../tower";

export class Eagle extends Tower {
  constructor(position) {
    super(position);
    this.attackRange = 2;
    this.damage = 10;
  }
}

export default Eagle;
