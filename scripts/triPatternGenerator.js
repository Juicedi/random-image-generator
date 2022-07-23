function triPatternGenerator(canvas) {
  if (!canvas.getContext) {
    return;
  }

  const x = 0;
  const y = 1;
  const canvasDimentions = [850, 850];
  canvas.width = canvasDimentions[x]
  canvas.height = canvasDimentions[y]
  const ctx = canvas.getContext('2d', { alpha: false });
  const getRandomInt = (max) => Math.floor(Math.random() * max);
  const generateRandomColor = () => `rgb(${getRandomInt(255)}, ${getRandomInt(255)}, ${getRandomInt(255)})`;
  const numberOfRows = 400;
  const triangleMaxSize = 40;

  const createTriangle = () => {
    const tri = [
      [getRandomInt(triangleMaxSize), getRandomInt(triangleMaxSize)],
      [getRandomInt(triangleMaxSize), getRandomInt(triangleMaxSize)],
      [0, 0]
    ];

    const [c1, c2] = tri;
    const vector = [c2[x] - c1[x], c2[y] - c1[y]];
    const middle = [(c1[x] + c2[x]) / 2, (c1[y] + c2[y]) / 2];
    const perpendicularVector = [vector[y], -vector[x]]
    const perpendicularVectorEndPoint = [perpendicularVector[x] + middle[x], perpendicularVector[y] + middle[y]];
    tri[2] = perpendicularVectorEndPoint;
    return tri;
  };

  const triangleCenter = (triangle) => [
    (triangle[0][x] + triangle[1][x] + triangle[2][x]) / 3,
    (triangle[0][y] + triangle[1][y] + triangle[2][y]) / 3
  ];

  const moveTriangle = (coordinates, triangle) => {
    const center = triangleCenter(triangle);
    const delta = [coordinates[x] - center[x], coordinates[y] - center[y]];
    triangle[0] = [triangle[0][x] + delta[x], triangle[0][y] + delta[y]];
    triangle[1] = [triangle[1][x] + delta[x], triangle[1][y] + delta[y]];
    triangle[2] = [triangle[2][x] + delta[x], triangle[2][y] + delta[y]];
    return triangle;
  };

  // This is assuming that the canvas is square
  const numberOfTris = numberOfRows * numberOfRows;
  const xSpacing = canvasDimentions[x] / numberOfRows;
  const ySpacing = canvasDimentions[y] / numberOfRows;

  // move triangles of the canvas edge
  const offset = 2;

  console.time('test');

  for (let i = 0; i < numberOfTris; i++) {
    const triangle = createTriangle();
    const xCoord = (xSpacing * (Math.floor(i / numberOfRows))) + offset;
    const yCoord = (ySpacing * (i % numberOfRows)) + offset;

    moveTriangle([xCoord, yCoord], triangle);

    ctx.beginPath();
    ctx.moveTo(...triangle[0]);
    ctx.lineTo(...triangle[1]);
    ctx.lineTo(...triangle[2]);
    ctx.fillStyle = generateRandomColor();
    ctx.fill();

    /*
    // Draw a circle to each corner of the triangle
    triangle.forEach(coordinate => {
      ctx.beginPath();
      ctx.arc(coordinate[x], coordinate[y], 5, 0, 2 * Math.PI);
      ctx.closePath();
      ctx.fillStyle = 'rgb(0,0,0)';
      ctx.fill();
    });

    // Draw a circle to triangles center
    const center = triangleCenter(triangle);
    ctx.beginPath();
    ctx.arc(center[x], center[y], 5, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fillStyle = `rgb(0,${255 / numberOfTris * index},0)`;
    ctx.fill();
    */
  }

  console.timeEnd('test');
}
