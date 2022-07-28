export class Tower {
  constructor(position) {
    this.position = position;
    this.range = [];
  }
  attack() {
    console.log(`hello, i can hit these tiles ${this.range}`);
  }
  updateRange() {
    for (let i = 0; i <= this.attackRange; i++) {
      this.range.push(
        [this.position[0] - i, this.position[1]],
        [this.position[0] + i, this.position[1]],
        [this.position[0], this.position[1] - i],
        [this.position[0], this.position[1] + i]
      );
    }
    for (let i = 0; i < this.attackRange; i++) {
      this.range.push(
        [this.position[0] - i, this.position[1] + i],
        [this.position[0] - i, this.position[1] - i],
        [this.position[0] + i, this.position[1] - i],
        [this.position[0] + i, this.position[1] + i]
      );
    }
    // console.log(this.range);
    // console.log(this.range.length);
    let toSplice = [];
    for (let i = 0; i < this.range.length; i++) {
      for (let j = i + 1; j < this.range.length; j++) {
        if (this.range[i].every((v, k) => v === this.range[j][k])) {
          // console.log(
          //   `${this.range[i]} = ${this.range[j]} === ${this.range[i].every(
          //     (v, k) => v === this.range[j][k]
          //   )}`
          // );
          toSplice.push(j);
        }
      }
    }
    // console.log(toSplice);
    toSplice = [...new Set(toSplice)];
    toSplice.sort((a, b) => a > b);
    // console.log(toSplice);

    for (let i = toSplice.length; i > 0; i--) {
      this.range.splice(toSplice[i] - 1, 1);
    }
    console.log(this.range);
  }
}

export default Tower;
