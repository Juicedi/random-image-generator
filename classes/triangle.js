class Triangle {
  constructor(options = { maxSize: 50 }) {
    this.corners = [
      [getRandomInt(options.maxSize), getRandomInt(options.maxSize)],
      [getRandomInt(options.maxSize), getRandomInt(options.maxSize)],
      [0, 0]
    ];

    const line = new Line(this.corners[0], this.corners[1]);
    const vector = new Vector(this.corners[0], this.corners[1]);
    const perpendicularVector = vector.getPerpendicularVector();
    this.corners[2] = perpendicularVector.getEndCoordinate(line.getMiddlePoint());
  }

  move (coordinates) {
    const center = this.getCenter();
    const delta = [coordinates[x] - center[x], coordinates[y] - center[y]];
    this.corners = this.corners.map((coordinate) => [coordinate[x] + delta[x], coordinate[y] + delta[y]]);
  };

  getCenter () {
    return [
      (this.corners[0][x] + this.corners[1][x] + this.corners[2][x]) / 3,
      (this.corners[0][y] + this.corners[1][y] + this.corners[2][y]) / 3
    ];
  }
};

