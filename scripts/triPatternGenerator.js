function triPatternGenerator(canvas) {
  if (!canvas.getContext) {
    return;
  }

  const x = 0;
  const y = 1;
  const canvasDimentions = [350, 350];
  canvas.width = canvasDimentions[x]
  canvas.height = canvasDimentions[y]
  const ctx = canvas.getContext('2d', { alpha: false });
  const numberOfRows = 100;
  const triangleMaxSize = 80;

  // Move triangles of the canvas edge
  const offset = 10;

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

  class RGB {
    constructor(r, g, b) {
      this.r = r;
      this.g = g;
      this.b = b;
    }

    toString() {
      return `rgb(${this.r}, ${this.g}, ${this.b})`;
    }
  }

  const getRandomInt = (max) => Math.floor(Math.random() * max);

  const getColor = (columnNumber, rowNumber) => {
    const rightValue = 255 * (columnNumber / numberOfRows);
    const bottomValue = 255 * (rowNumber / numberOfRows);
    const leftValue = 255 - (255 * (columnNumber / numberOfRows));
    const topValue = 255 - (255 * (rowNumber / numberOfRows));
    return (new RGB(getRandomInt(topValue), leftValue, bottomValue)).toString();
  };

  class Triangle {
    constructor() {
      this.corners = [
        [getRandomInt(triangleMaxSize), getRandomInt(triangleMaxSize)],
        [getRandomInt(triangleMaxSize), getRandomInt(triangleMaxSize)],
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

  // This is assuming that the canvas is square
  const numberOfTris = numberOfRows * numberOfRows;
  const xSpacing = canvasDimentions[x] / numberOfRows;
  const ySpacing = canvasDimentions[y] / numberOfRows;

  console.time('test');

  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, canvasDimentions[x], canvasDimentions[y]);

  for (let i = 0; i < numberOfTris; i++) {
    const triangle = new Triangle();
    const columnNumber = (Math.floor(i / numberOfRows));
    const rowNumber = (i % numberOfRows);
    const xCoord = (xSpacing * columnNumber) + offset;
    const yCoord = (ySpacing * rowNumber) + offset;

    triangle.move([xCoord, yCoord]);
    ctx.beginPath();
    ctx.moveTo(...triangle.corners[0]);
    ctx.lineTo(...triangle.corners[1]);
    ctx.lineTo(...triangle.corners[2]);
    ctx.fillStyle = getColor(columnNumber, rowNumber);
    ctx.fill();
  }

  console.timeEnd('test');
}
