// Premium canvas-rendered achievement badges — references the visual
// language of real credentialing badges (Credly, LinkedIn Learning
// certificates): a laurel wreath, a gold bezel, a glossy enamel medallion
// face with a foil shine and dome highlight, and a ribbon banner carrying
// the achievement status. Drawn at 2x resolution (1280px) so the downloaded
// PNG stays crisp when posted at social-card size.
const SIZE = 1280;

function sparkle(ctx, x, y, r) {
  ctx.save();
  ctx.translate(x, y);
  ctx.fillStyle = "rgba(255,255,255,.95)";
  ctx.beginPath();
  ctx.moveTo(0, -r); ctx.lineTo(r * 0.22, -r * 0.22); ctx.lineTo(r, 0); ctx.lineTo(r * 0.22, r * 0.22);
  ctx.lineTo(0, r); ctx.lineTo(-r * 0.22, r * 0.22); ctx.lineTo(-r, 0); ctx.lineTo(-r * 0.22, -r * 0.22);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

// One laurel branch: a curved stem of small tapering leaves, mirrored by the
// caller for the opposite side. Drawn in the badge's local (cx,cy) space.
function laurelBranch(ctx, cx, cy, R, mirror, gold) {
  ctx.save();
  ctx.translate(cx, cy);
  if (mirror) ctx.scale(-1, 1);
  const leafCount = 9;
  for (let i = 0; i < leafCount; i++) {
    const t = i / (leafCount - 1); // 0 = bottom, 1 = top
    const angle = (Math.PI * 0.62) - t * (Math.PI * 0.72); // sweep up the side
    const rad = R * (1.1 + t * 0.03);
    const lx = Math.cos(angle) * rad;
    const ly = Math.sin(angle) * rad;
    const leafLen = R * (0.16 - t * 0.075);
    const leafAngle = angle + Math.PI / 2 + 0.35;
    ctx.save();
    ctx.translate(lx, ly);
    ctx.rotate(leafAngle);
    const g = ctx.createLinearGradient(-leafLen * 0.4, 0, leafLen * 0.6, 0);
    g.addColorStop(0, gold[0]);
    g.addColorStop(1, gold[1]);
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.ellipse(0, 0, leafLen, leafLen * 0.36, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
  // stem
  ctx.strokeStyle = gold[1];
  ctx.lineWidth = R * 0.018;
  ctx.beginPath();
  ctx.moveTo(Math.cos(Math.PI * 0.62) * R * 1.1, Math.sin(Math.PI * 0.62) * R * 1.1);
  for (let i = 1; i <= 20; i++) {
    const t = i / 20;
    const angle = (Math.PI * 0.62) - t * (Math.PI * 0.72);
    const rad = R * (1.1 + t * 0.03);
    ctx.lineTo(Math.cos(angle) * rad, Math.sin(angle) * rad);
  }
  ctx.stroke();
  ctx.restore();
}

const THEMES = {
  violet: { ring: ["#8A7FF5", "#F3F0FF", "#5B4FE0"], face: ["#2A2140", "#131019"], ribbon: ["#5B4FE0", "#443AC2"], icon: "★" },
  emerald: { ring: ["#5FD1AC", "#F0FFFA", "#186653"], face: ["#123326", "#0D1913"], ribbon: ["#186653", "#0F4A3B"], icon: "✓" }
};
const GOLD = ["#F3D98B", "#C99A3F"];

export function drawBadge(canvas, { title, subtitle, ribbon, meta, theme = "violet" }) {
  const t = THEMES[theme] || THEMES.violet;
  canvas.width = SIZE; canvas.height = SIZE;
  const ctx = canvas.getContext("2d");
  const cx = SIZE / 2, cy = SIZE * 0.46, R = SIZE * 0.33;
  ctx.clearRect(0, 0, SIZE, SIZE);

  // ambient glow
  const glow = ctx.createRadialGradient(cx, cy, R * 0.6, cx, cy, R * 1.7);
  glow.addColorStop(0, t.ring[0] + "50");
  glow.addColorStop(1, t.ring[0] + "00");
  ctx.fillStyle = glow;
  ctx.beginPath(); ctx.arc(cx, cy, R * 1.7, 0, Math.PI * 2); ctx.fill();

  // laurel wreath, both sides
  laurelBranch(ctx, cx, cy, R, false, GOLD);
  laurelBranch(ctx, cx, cy, R, true, GOLD);

  // outer gold trim
  ctx.lineWidth = SIZE * 0.008;
  const goldGrad = ctx.createLinearGradient(cx - R, cy - R, cx + R, cy + R);
  goldGrad.addColorStop(0, GOLD[0]); goldGrad.addColorStop(1, GOLD[1]);
  ctx.strokeStyle = goldGrad;
  ctx.beginPath(); ctx.arc(cx, cy, R + SIZE * 0.016, 0, Math.PI * 2); ctx.stroke();

  // metallic bezel ring
  const ringGrad = ctx.createLinearGradient(cx - R, cy - R, cx + R, cy + R);
  ringGrad.addColorStop(0, t.ring[0]); ringGrad.addColorStop(0.5, t.ring[1]); ringGrad.addColorStop(1, t.ring[2]);
  ctx.lineWidth = SIZE * 0.02;
  ctx.strokeStyle = ringGrad;
  ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.stroke();

  // enamel face
  const face = ctx.createRadialGradient(cx - R * 0.3, cy - R * 0.4, R * 0.15, cx, cy, R);
  face.addColorStop(0, t.face[0]); face.addColorStop(1, t.face[1]);
  ctx.fillStyle = face;
  ctx.beginPath(); ctx.arc(cx, cy, R - SIZE * 0.018, 0, Math.PI * 2); ctx.fill();

  ctx.save();
  ctx.beginPath(); ctx.arc(cx, cy, R - SIZE * 0.018, 0, Math.PI * 2); ctx.clip();

  // diagonal foil shine
  ctx.save();
  ctx.translate(cx, cy); ctx.rotate(-Math.PI / 5);
  const sweep = ctx.createLinearGradient(-R, -R * 0.15, R * 0.15, R);
  sweep.addColorStop(0, "rgba(255,255,255,0)");
  sweep.addColorStop(0.5, "rgba(255,255,255,.15)");
  sweep.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = sweep;
  ctx.fillRect(-R * 1.6, -R * 1.6, R * 3.2, R * 3.2);
  ctx.restore();

  // glossy dome highlight
  const dome = ctx.createRadialGradient(cx - R * 0.15, cy - R * 0.55, R * 0.05, cx, cy - R * 0.4, R * 0.65);
  dome.addColorStop(0, "rgba(255,255,255,.28)");
  dome.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = dome;
  ctx.beginPath(); ctx.ellipse(cx, cy - R * 0.3, R * 0.9, R * 0.55, 0, 0, Math.PI * 2); ctx.fill();

  // icon
  ctx.fillStyle = "#fff";
  ctx.textAlign = "center"; ctx.textBaseline = "middle";
  ctx.font = "700 " + Math.round(R * 0.5) + "px -apple-system, Helvetica, Arial, sans-serif";
  ctx.fillText(t.icon, cx, cy - R * 0.34);

  // title (wraps to 2 lines)
  const words = title.split(" ");
  const lines = []; let line = "";
  ctx.font = "700 " + Math.round(SIZE * 0.032) + "px -apple-system, Helvetica, Arial, sans-serif";
  for (const w of words) {
    const test = line ? line + " " + w : w;
    if (ctx.measureText(test).width > R * 1.5 && line) { lines.push(line); line = w; }
    else line = test;
  }
  if (line) lines.push(line);
  lines.slice(0, 2).forEach((l, i) => ctx.fillText(l, cx, cy + R * 0.14 + i * SIZE * 0.04));

  // subtitle
  ctx.font = "600 " + Math.round(SIZE * 0.022) + "px -apple-system, Helvetica, Arial, sans-serif";
  ctx.fillStyle = "rgba(255,255,255,.68)";
  ctx.fillText(subtitle, cx, cy + R * 0.14 + lines.length * SIZE * 0.04 + SIZE * 0.008);

  ctx.restore(); // end face clip

  sparkle(ctx, cx - R * 0.72, cy - R * 0.62, SIZE * 0.013);
  sparkle(ctx, cx + R * 0.78, cy - R * 0.5, SIZE * 0.009);
  sparkle(ctx, cx + R * 0.6, cy + R * 0.7, SIZE * 0.01);

  // ribbon banner across the bottom of the medallion
  const ribbonY = cy + R * 0.86, ribbonH = SIZE * 0.075, ribbonW = R * 2.15;
  const rGrad = ctx.createLinearGradient(cx - ribbonW / 2, 0, cx + ribbonW / 2, 0);
  rGrad.addColorStop(0, t.ribbon[1]); rGrad.addColorStop(0.5, t.ribbon[0]); rGrad.addColorStop(1, t.ribbon[1]);
  ctx.fillStyle = "rgba(0,0,0,.28)";
  ctx.beginPath(); ctx.rect(cx - ribbonW / 2, ribbonY + ribbonH * 0.14, ribbonW, ribbonH); ctx.fill();
  ctx.fillStyle = rGrad;
  ctx.beginPath(); ctx.rect(cx - ribbonW / 2, ribbonY, ribbonW, ribbonH); ctx.fill();
  // notched ends
  ctx.fillStyle = t.ribbon[1];
  ctx.beginPath();
  ctx.moveTo(cx - ribbonW / 2, ribbonY); ctx.lineTo(cx - ribbonW / 2 - SIZE * 0.02, ribbonY + ribbonH / 2); ctx.lineTo(cx - ribbonW / 2, ribbonY + ribbonH);
  ctx.closePath(); ctx.fill();
  ctx.beginPath();
  ctx.moveTo(cx + ribbonW / 2, ribbonY); ctx.lineTo(cx + ribbonW / 2 + SIZE * 0.02, ribbonY + ribbonH / 2); ctx.lineTo(cx + ribbonW / 2, ribbonY + ribbonH);
  ctx.closePath(); ctx.fill();
  ctx.fillStyle = "#fff";
  ctx.font = "700 " + Math.round(SIZE * 0.021) + "px -apple-system, Helvetica, Arial, sans-serif";
  ctx.textAlign = "center"; ctx.textBaseline = "middle";
  ctx.fillText(ribbon.toUpperCase(), cx, ribbonY + ribbonH / 2 + SIZE * 0.002);

  // footer meta
  ctx.font = "600 " + Math.round(SIZE * 0.017) + "px -apple-system, Helvetica, Arial, sans-serif";
  ctx.fillStyle = "rgba(255,255,255,.5)";
  ctx.fillText(meta, cx, ribbonY + ribbonH + SIZE * 0.05);
  ctx.font = "600 " + Math.round(SIZE * 0.014) + "px -apple-system, Helvetica, Arial, sans-serif";
  ctx.fillStyle = "rgba(255,255,255,.3)";
  ctx.fillText("thatclaude.com", cx, ribbonY + ribbonH + SIZE * 0.08);
}

export function downloadBadge(canvas, filename) {
  canvas.toBlob((blob) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = filename;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 2000);
  }, "image/png");
}
