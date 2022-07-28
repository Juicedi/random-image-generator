/* global canvasElement */
(function main() {
  const offscreenCanvas = canvasElement.transferControlToOffscreen();

  // Generate pattern using triangles
  const worker = new Worker('scripts/triPatternGenerator.js');
  worker.postMessage({ canvas: offscreenCanvas }, [offscreenCanvas]);
}());
