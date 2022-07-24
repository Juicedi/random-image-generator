class Vector {
  constructor(coordinate1, coordinate2) {
    this.x = coordinate2[x] - coordinate1[x];
    this.y = coordinate2[y] - coordinate1[y];
  }

  getPerpendicularVector () {
    return new Vector([0, 0], [this.y, -this.x]);
  }

  getEndCoordinate (startCoordinate) {
    return [this.x + startCoordinate[x], this.y + startCoordinate[y]];
  }
}
