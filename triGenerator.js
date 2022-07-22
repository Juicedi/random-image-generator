function triGenerator(canvas, numberOfTris) {
  if (!canvas.getContext) {
    return;
  }

  const x = 0;
  const y = 1;
  const canvasDimentions = [150, 150];
  const ctx = canvas.getContext('2d');
  const getRandomInt = (max) => Math.floor(Math.random() * max);

  const colors = [];

  for (let i = 0; i < numberOfTris; i++) {
    colors[i] = `rgb(${getRandomInt(255)}, ${getRandomInt(255)}, ${getRandomInt(255)})`;
  }

  const createTriangle = () => {
    const tri = [
      [getRandomInt(canvasDimentions[x]), getRandomInt(canvasDimentions[y])],
      [getRandomInt(canvasDimentions[x]), getRandomInt(canvasDimentions[y])],
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

  colors.forEach((color) => {
    const triangle = createTriangle();
    ctx.beginPath();
    ctx.moveTo(...triangle[0]);
    ctx.lineTo(...triangle[1]);
    ctx.lineTo(...triangle[2]);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
  });
}
