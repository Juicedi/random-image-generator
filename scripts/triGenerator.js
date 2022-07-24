function triGenerator(canvas, numberOfTris) {
  if (!canvas.getContext) {
    return;
  }

  const x = 0;
  const y = 1;
  const canvasDimentions = [150, 150];
  const ctx = canvas.getContext('2d');
  const colors = [];

  for (let i = 0; i < numberOfTris; i++) {
    colors[i] = `rgb(${getRandomInt(255)}, ${getRandomInt(255)}, ${getRandomInt(255)})`;
  }

  colors.forEach((color) => {
    const triangle = new Triangle({ maxSize: 100 });
    triangle.move([getRandomInt(150), getRandomInt(150)]);
    ctx.beginPath();
    ctx.moveTo(...triangle.corners[0]);
    ctx.lineTo(...triangle.corners[1]);
    ctx.lineTo(...triangle.corners[2]);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
  });
}
