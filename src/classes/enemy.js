export class Enemy {
  constructor(position) {
    this.position = position;
    this.path = [];
  }
  takeDamage(damage) {
    this.health = this.health - damage;
  }
  move() {
    this.position = this.path.pop();
  }
  updatePath(pathingMap, target) {
    const source = this.position;
    let dist = {};
    let prev = {};
    let Q = [];

    pathingMap.forEach((row) =>
      row.forEach((v) => {
        dist[v.position] = Infinity;
        prev[v.position] = null;
        Q.push(v);
      })
    );
    dist[source] = 0;

    while (Q.length > 0) {
      let u = Q.reduce((prev, curr) => {
        // console.log(`prev: ${dist[prev.position]}`);
        // console.log(`curr: ${dist[curr.position]}`);
        return dist[prev.position] < dist[curr.position] ? prev : curr;
      });
      // console.log(`u: ${u.position}`);

      if (u.position.every((v, i) => v === target[i])) {
        // console.log("found target");
        break;
      }
      Q.splice(Q.indexOf(u), 1);
      // console.log(dist[u])

      u.neighbours.forEach((neighbour) => {
        if (Q.includes(neighbour)) {
          let alt = dist[u.position] + neighbour.terrainCost;
          // console.log(`alt: ${alt}`);
          // console.log(`dist[neighbour] ${dist[neighbour.position]}`);
          if (alt < dist[neighbour.position] && dist[u.position] !== Infinity) {
            // console.log("reached this");
            dist[neighbour.position] = alt;
            prev[neighbour.position] = u;
            // console.log(neighbour.position);
          }
        }
      });
    }
    if (prev[target] == null) {
      console.log("no path");
      return;
    }

    let path = [];
    let u = target;
    if (prev[u] !== null || u === source) {
      while (prev[u] !== null) {
        path.push(u);
        u = prev[u].position;
      }
    }
    this.path = path;
    // console.log(path)
  }
}

export default Enemy;
