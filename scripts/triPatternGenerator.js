/* global importScripts */

importScripts(
  'constants.js',
  'tools.js',
  '../classes/line.js',
  '../classes/rgb.js',
  '../classes/triangle.js',
  '../classes/vector.js',
);

onmessage = function triPatternGenerator(event) {
  const { canvas } = event.data;

  if (!canvas.getContext) {
    return;
  }

  const canvasDimentions = [350, 350];
  canvas.width = canvasDimentions[x];
  canvas.height = canvasDimentions[y];
  const ctx = canvas.getContext('2d', { alpha: false });
  const numberOfRows = 300;

  // Move triangles of the canvas edge
  const offset = 5;

  const getColor = (columnNumber, rowNumber) => {
    // const rightValue = 255 * (columnNumber / numberOfRows);
    const bottomValue = getRandomInt(255 * (rowNumber / numberOfRows));
    const leftValue = getRandomInt(255 - (255 * (columnNumber / numberOfRows)));
    const topValue = getRandomInt(255 - (255 * (rowNumber / numberOfRows)));

    return (new RGB(
      topValue,
      leftValue,
      bottomValue,
    )).toString();
  };

  // This is assuming that the canvas is square
  const numberOfTris = numberOfRows * numberOfRows;
  const xSpacing = canvasDimentions[x] / numberOfRows;
  const ySpacing = canvasDimentions[y] / numberOfRows;

  console.time('test');

  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, canvasDimentions[x], canvasDimentions[y]);

  for (let i = 0; i < numberOfTris; i += 1) {
    const triangle = new Triangle({ maxSize: 20 });
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
};
