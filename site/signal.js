// Draw a family of closed waveforms in the illustration's own coordinate system.
const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");
function drawSignal() {
  if (!context) return;
  const { width, height } = canvas.getBoundingClientRect();
  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.round(width * ratio);
  canvas.height = Math.round(height * ratio);
  context.scale(ratio, ratio);
  context.translate(width / 2, height * 0.47);
  const size = Math.min(width, height) * 0.32;
  context.rotate(-0.45);
  for (let band = 0; band < 66; band++) {
    const phase = band / 65;
    context.beginPath();
    for (let step = 0; step <= 240; step++) {
      const angle = step * Math.PI / 120;
      const radius = 1 + 0.19 * Math.sin(3 * angle + phase * 5);
      const x = size * (Math.cos(angle) * radius + (phase - 0.5) * 0.65);
      const y = size * (Math.sin(angle) * radius * 0.68 + 0.24 * Math.cos(angle * 2 + phase * 4));
      if (step === 0) context.moveTo(x, y);
      else context.lineTo(x, y);
    }
    context.closePath();
    context.strokeStyle = `hsla(${82 + phase * 78},65%,72%,0.64)`;
    context.stroke();
  }
}
new ResizeObserver(drawSignal).observe(canvas);
