function rectGenerator(canvas, numberOfRects) {
  if (!canvas.getContext) {
    return;
  }

  const getRandomInt = (max) => Math.floor(Math.random() * max);
  const ctx = canvas.getContext('2d');

  const colors = [];

  for (let i = 0; i < numberOfRects; i++) {
    colors[i] = `rgb(${getRandomInt(255)}, ${getRandomInt(255)}, ${getRandomInt(255)})`;
  }

  colors.forEach((color) => {
    const size = getRandomInt(100) + 10;
    ctx.fillStyle = color;
    ctx.fillRect(getRandomInt(150) - 50, getRandomInt(150) - 50, size, size);
  });
}
