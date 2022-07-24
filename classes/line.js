class Line {
  constructor(coordinate1, coordinate2) {
    this.x1 = coordinate1[x];
    this.x2 = coordinate2[x];
    this.y1 = coordinate1[y];
    this.y2 = coordinate2[y];
  }

  getMiddlePoint () {
    return [
      (this.x1 + this.x2) / 2,
      (this.y1 + this.y2) / 2
    ];
  }
}
