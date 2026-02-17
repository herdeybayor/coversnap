// ===== CANVAS RENDERING ENGINE =====
// Extracted and parameterized from project-cover-template-v2.html

// ===== DIMENSION PRESETS =====
const DIMENSIONS = {
  '1:1':  { label: 'Square',          width: 1080, height: 1080 },
  '16:9': { label: 'Landscape',       width: 1920, height: 1080 },
  '4:3':  { label: 'Standard',        width: 1440, height: 1080 },
  '3:2':  { label: 'Classic',         width: 1620, height: 1080 },
  '2:1':  { label: 'Ultra-wide',      width: 2160, height: 1080 },
  '9:16': { label: 'Portrait',        width: 1080, height: 1920 },
  '4:5':  { label: 'Social Portrait', width: 1080, height: 1350 },
};

// ===== HELPERS =====
function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y); ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

function roundRectTop(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y); ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h); ctx.lineTo(x, y + h);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

// ===== COLOR PALETTES =====
const BACKGROUND_PALETTES = {
  indigo:  ['#1a1a2e', '#111122', '#0a0a0f'],
  purple:  ['#1e1a2e', '#151122', '#0c0a0f'],
  green:   ['#1a2e24', '#112218', '#0a0f0c'],
  teal:    ['#1a2a2e', '#111e22', '#0a0d0f'],
  blue:    ['#1a1e2e', '#111525', '#0a0c0f'],
  rose:    ['#2e1a24', '#221118', '#0f0a0c'],
  amber:   ['#2e2a1a', '#221e11', '#0f0d0a'],
  slate:   ['#1e2024', '#151719', '#0a0b0d'],
};

const ACCENT_COLORS = {
  indigo:  '#6366f1',
  purple:  '#8b5cf6',
  green:   '#10b981',
  teal:    '#06b6d4',
  blue:    '#3b82f6',
  rose:    '#f43f5e',
  amber:   '#f59e0b',
  red:     '#ef4444',
  pink:    '#ec4899',
  emerald: '#10b981',
};

const ACCENT_GRADIENTS = {
  indigo:  ['#6366f1', '#4f46e5', '#3730a3'],
  purple:  ['#8b5cf6', '#7c3aed', '#5b21b6'],
  green:   ['#10b981', '#059669', '#047857'],
  teal:    ['#06b6d4', '#0891b2', '#0e7490'],
  blue:    ['#3b82f6', '#2563eb', '#1d4ed8'],
  rose:    ['#f43f5e', '#e11d48', '#be123c'],
  amber:   ['#f59e0b', '#d97706', '#b45309'],
  red:     ['#ef4444', '#dc2626', '#b91c1c'],
  pink:    ['#ec4899', '#db2777', '#be185d'],
  emerald: ['#10b981', '#059669', '#047857'],
};

// ===== BACKGROUND =====
function drawBackground(ctx, w, h, bgKey) {
  const c = BACKGROUND_PALETTES[bgKey] || BACKGROUND_PALETTES.indigo;
  const r = Math.max(w, h) * 0.7;
  const bg = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, r);
  bg.addColorStop(0, c[0]); bg.addColorStop(0.5, c[1]); bg.addColorStop(1, c[2]);
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  // Dot grid
  ctx.fillStyle = 'rgba(255,255,255,0.03)';
  for (let x = 16; x < w; x += 22) {
    for (let y = 16; y < h; y += 22) {
      ctx.beginPath(); ctx.arc(x, y, 0.6, 0, Math.PI * 2); ctx.fill();
    }
  }
}

// ===== PHONE SCREEN (for mobile templates) =====
function drawPhoneScreen(ctx, sx, sy, sw, sh, sr, accentKey, config) {
  const gc = ACCENT_GRADIENTS[accentKey] || ACCENT_GRADIENTS.indigo;
  const g = ctx.createLinearGradient(sx, sy, sx, sy + sh);
  g.addColorStop(0, gc[0]); g.addColorStop(0.4, gc[1]); g.addColorStop(1, gc[2]);
  ctx.fillStyle = g;
  roundRect(ctx, sx, sy, sw, sh, sr); ctx.fill();

  // If screenshot provided, draw it and return
  if (config.screenshot) {
    ctx.save();
    roundRect(ctx, sx, sy, sw, sh, sr); ctx.clip();
    const img = config.screenshot;
    const imgRatio = img.width / img.height;
    const frameRatio = sw / sh;
    let drawW, drawH, drawX, drawY;
    if (imgRatio > frameRatio) {
      drawH = sh; drawW = sh * imgRatio;
      drawX = sx + (sw - drawW) / 2; drawY = sy;
    } else {
      drawW = sw; drawH = sw / imgRatio;
      drawX = sx; drawY = sy;
    }
    ctx.drawImage(img, drawX, drawY, drawW, drawH);
    ctx.restore();
    return;
  }

  // Status bar
  ctx.fillStyle = 'rgba(255,255,255,0.9)';
  ctx.font = `bold ${sw * 0.055}px -apple-system, sans-serif`;
  ctx.fillText('9:41', sx + sw * 0.06, sy + sw * 0.1);
  ctx.fillStyle = 'rgba(255,255,255,0.6)';
  const batX = sx + sw - sw * 0.08;
  roundRect(ctx, batX, sy + sw * 0.045, sw * 0.06, sw * 0.025, 2); ctx.fill();

  // Header
  const hy = sy + sh * 0.08;
  ctx.fillStyle = 'rgba(255,255,255,0.95)';
  ctx.font = `700 ${sw * 0.085}px -apple-system, sans-serif`;
  ctx.fillText(config.title || 'Dashboard', sx + sw * 0.06, hy + sh * 0.04);
  ctx.fillStyle = 'rgba(255,255,255,0.55)';
  ctx.font = `${sw * 0.045}px -apple-system, sans-serif`;
  ctx.fillText(config.subtitle || 'Welcome back', sx + sw * 0.06, hy + sh * 0.085);

  // Balance card
  const cX = sx + sw * 0.06, cY = hy + sh * 0.12, cW = sw * 0.88, cH = sh * 0.16;
  ctx.fillStyle = 'rgba(255,255,255,0.12)';
  roundRect(ctx, cX, cY, cW, cH, sr * 0.6); ctx.fill();
  ctx.strokeStyle = 'rgba(255,255,255,0.08)'; ctx.lineWidth = 1;
  roundRect(ctx, cX, cY, cW, cH, sr * 0.6); ctx.stroke();
  ctx.fillStyle = 'rgba(255,255,255,0.5)'; ctx.font = `${sw * 0.04}px -apple-system, sans-serif`;
  ctx.fillText('Total Balance', cX + cW * 0.06, cY + cH * 0.3);
  ctx.fillStyle = '#fff'; ctx.font = `700 ${sw * 0.075}px -apple-system, sans-serif`;
  ctx.fillText('$12,450.00', cX + cW * 0.06, cY + cH * 0.62);
  ctx.fillStyle = 'rgba(52,211,153,0.2)';
  roundRect(ctx, cX + cW * 0.06, cY + cH * 0.72, sw * 0.2, cH * 0.2, 8); ctx.fill();
  ctx.fillStyle = '#34d399'; ctx.font = `600 ${sw * 0.032}px -apple-system, sans-serif`;
  ctx.fillText('+12.5% ↑', cX + cW * 0.08, cY + cH * 0.87);

  // Stat cards
  const stY = cY + cH + sh * 0.025, stW = cW * 0.47, stH = sh * 0.12;
  ctx.fillStyle = 'rgba(255,255,255,0.08)';
  roundRect(ctx, cX, stY, stW, stH, sr * 0.5); ctx.fill();
  roundRect(ctx, cX + cW * 0.53, stY, stW, stH, sr * 0.5); ctx.fill();
  ctx.fillStyle = '#fff'; ctx.font = `700 ${sw * 0.055}px -apple-system, sans-serif`;
  ctx.fillText('+24.5%', cX + stW * 0.1, stY + stH * 0.45);
  ctx.fillText('1,256', cX + cW * 0.53 + stW * 0.1, stY + stH * 0.45);
  ctx.fillStyle = 'rgba(255,255,255,0.4)'; ctx.font = `${sw * 0.035}px -apple-system, sans-serif`;
  ctx.fillText('Growth', cX + stW * 0.1, stY + stH * 0.75);
  ctx.fillText('Active Users', cX + cW * 0.53 + stW * 0.1, stY + stH * 0.75);

  // Transactions
  const txY = stY + stH + sh * 0.03;
  ctx.fillStyle = 'rgba(255,255,255,0.7)'; ctx.font = `600 ${sw * 0.05}px -apple-system, sans-serif`;
  ctx.fillText('Recent Transactions', cX, txY);
  const items = [
    { n: 'Payment received', a: '+$2,400', c: '#34d399' },
    { n: 'Subscription fee', a: '-$49.99', c: '#f87171' },
    { n: 'Transfer to savings', a: '-$500', c: '#f87171' },
    { n: 'Client payment', a: '+$1,800', c: '#34d399' },
  ];
  items.forEach((it, i) => {
    const iy = txY + sh * 0.04 + i * sh * 0.058;
    ctx.fillStyle = 'rgba(255,255,255,0.06)';
    roundRect(ctx, cX, iy, cW, sh * 0.045, sr * 0.3); ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,0.6)'; ctx.font = `${sw * 0.038}px -apple-system, sans-serif`;
    ctx.fillText(it.n, cX + cW * 0.04, iy + sh * 0.032);
    ctx.fillStyle = it.c; ctx.font = `600 ${sw * 0.038}px -apple-system, sans-serif`;
    ctx.textAlign = 'right'; ctx.fillText(it.a, cX + cW * 0.96, iy + sh * 0.032); ctx.textAlign = 'left';
  });
}

// ===== WEB CONTENT (for browser templates) =====
function drawWebContent(ctx, cx, cy, cw, ch, accentKey, config) {
  const pageBg = ctx.createLinearGradient(cx, cy, cx, cy + ch);
  pageBg.addColorStop(0, '#0f172a');
  pageBg.addColorStop(1, '#020617');
  ctx.fillStyle = pageBg;
  ctx.fillRect(cx, cy, cw, ch);

  const accentCol = ACCENT_COLORS[accentKey] || ACCENT_COLORS.indigo;

  // If screenshot provided, draw it and return
  if (config.screenshot) {
    ctx.save();
    ctx.beginPath();
    ctx.rect(cx, cy, cw, ch);
    ctx.clip();
    const img = config.screenshot;
    const imgRatio = img.width / img.height;
    const frameRatio = cw / ch;
    let drawW, drawH, drawX, drawY;
    if (imgRatio > frameRatio) {
      drawH = ch; drawW = ch * imgRatio;
      drawX = cx + (cw - drawW) / 2; drawY = cy;
    } else {
      drawW = cw; drawH = cw / imgRatio;
      drawX = cx; drawY = cy;
    }
    ctx.drawImage(img, drawX, drawY, drawW, drawH);
    ctx.restore();
    return;
  }

  // Nav
  ctx.fillStyle = 'rgba(255,255,255,0.8)'; ctx.font = `600 ${ch * 0.038}px -apple-system, sans-serif`;
  ctx.fillText(config.title || 'ProjectName', cx + cw * 0.04, cy + ch * 0.06);
  ctx.fillStyle = 'rgba(255,255,255,0.4)'; ctx.font = `${ch * 0.026}px -apple-system, sans-serif`;
  let nx = cx + cw * 0.55;
  ['Features', 'Pricing', 'About', 'Blog'].forEach(t => { ctx.fillText(t, nx, cy + ch * 0.06); nx += cw * 0.1; });

  ctx.fillStyle = accentCol;
  roundRect(ctx, cx + cw * 0.88, cy + ch * 0.03, cw * 0.09, ch * 0.045, 4); ctx.fill();
  ctx.fillStyle = '#fff'; ctx.font = `600 ${ch * 0.022}px -apple-system, sans-serif`;
  ctx.textAlign = 'center'; ctx.fillText('Sign Up', cx + cw * 0.925, cy + ch * 0.06); ctx.textAlign = 'left';

  // Hero
  const heroY = cy + ch * 0.14;
  const badgeAlpha = accentKey === 'green' ? 'rgba(16,185,129,0.15)' :
    accentKey === 'teal' ? 'rgba(6,182,212,0.15)' :
    accentKey === 'rose' ? 'rgba(244,63,94,0.15)' :
    accentKey === 'amber' ? 'rgba(245,158,11,0.15)' :
    `${accentCol}26`;
  ctx.fillStyle = badgeAlpha;
  roundRect(ctx, cx + cw * 0.04, heroY, cw * 0.18, ch * 0.04, 10); ctx.fill();
  ctx.fillStyle = accentCol; ctx.font = `500 ${ch * 0.02}px -apple-system, sans-serif`;
  ctx.fillText('✦ Now in Beta', cx + cw * 0.06, heroY + ch * 0.028);

  ctx.fillStyle = '#fff'; ctx.font = `700 ${ch * 0.07}px -apple-system, sans-serif`;
  const heroLine1 = config.subtitle || 'Build Something';
  const heroLine2 = 'Amazing Today';
  ctx.fillText(heroLine1, cx + cw * 0.04, heroY + ch * 0.13);
  ctx.fillText(heroLine2, cx + cw * 0.04, heroY + ch * 0.215);

  ctx.fillStyle = 'rgba(255,255,255,0.45)'; ctx.font = `${ch * 0.028}px -apple-system, sans-serif`;
  ctx.fillText('The modern platform for building scalable', cx + cw * 0.04, heroY + ch * 0.28);
  ctx.fillText('applications with confidence.', cx + cw * 0.04, heroY + ch * 0.32);

  const by = heroY + ch * 0.38;
  ctx.fillStyle = accentCol;
  roundRect(ctx, cx + cw * 0.04, by, cw * 0.15, ch * 0.05, 5); ctx.fill();
  ctx.fillStyle = '#fff'; ctx.font = `600 ${ch * 0.024}px -apple-system, sans-serif`;
  ctx.textAlign = 'center'; ctx.fillText('Get Started', cx + cw * 0.115, by + ch * 0.033); ctx.textAlign = 'left';

  ctx.strokeStyle = 'rgba(255,255,255,0.2)'; ctx.lineWidth = 1;
  roundRect(ctx, cx + cw * 0.21, by, cw * 0.13, ch * 0.05, 5); ctx.stroke();
  ctx.fillStyle = 'rgba(255,255,255,0.6)'; ctx.font = `500 ${ch * 0.024}px -apple-system, sans-serif`;
  ctx.textAlign = 'center'; ctx.fillText('Learn More', cx + cw * 0.275, by + ch * 0.033); ctx.textAlign = 'left';

  // Dashboard card
  const px = cx + cw * 0.54, py = cy + ch * 0.17, pw = cw * 0.42, ph = ch * 0.55;
  ctx.fillStyle = 'rgba(255,255,255,0.04)';
  roundRect(ctx, px, py, pw, ph, 8); ctx.fill();
  ctx.strokeStyle = 'rgba(255,255,255,0.05)'; roundRect(ctx, px, py, pw, ph, 8); ctx.stroke();
  ctx.fillStyle = 'rgba(255,255,255,0.7)'; ctx.font = `600 ${ch * 0.028}px -apple-system, sans-serif`;
  ctx.fillText('Analytics', px + pw * 0.06, py + ph * 0.09);

  // Bar chart
  const accentRgba = accentKey === 'green' ? { top: 'rgba(16,185,129,0.8)', bot: 'rgba(16,185,129,0.25)' } :
    accentKey === 'teal' ? { top: 'rgba(6,182,212,0.8)', bot: 'rgba(6,182,212,0.25)' } :
    { top: `${accentCol}cc`, bot: `${accentCol}40` };
  const bh2 = [0.3, 0.5, 0.35, 0.7, 0.55, 0.85, 0.6];
  const cbY = py + ph * 0.72, cbH = ph * 0.42, bw = pw * 0.08;
  bh2.forEach((h, i) => {
    const bx = px + pw * 0.08 + i * pw * 0.125;
    const bH = cbH * h;
    const g = ctx.createLinearGradient(bx, cbY - bH, bx, cbY);
    g.addColorStop(0, accentRgba.top);
    g.addColorStop(1, accentRgba.bot);
    ctx.fillStyle = g;
    roundRect(ctx, bx, cbY - bH, bw, bH, 3); ctx.fill();
  });

  // Metrics
  const my = cy + ch * 0.82;
  for (let i = 0; i < 3; i++) {
    const mx = cx + cw * 0.04 + i * cw * 0.31;
    ctx.fillStyle = 'rgba(255,255,255,0.03)';
    roundRect(ctx, mx, my, cw * 0.28, ch * 0.12, 5); ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,0.3)'; ctx.font = `${ch * 0.02}px -apple-system, sans-serif`;
    ctx.fillText(['Active Users', 'Revenue', 'Growth'][i], mx + cw * 0.02, my + ch * 0.04);
    ctx.fillStyle = '#fff'; ctx.font = `700 ${ch * 0.033}px -apple-system, sans-serif`;
    ctx.fillText(['2,451', '$45.2K', '+127%'][i], mx + cw * 0.02, my + ch * 0.09);
  }
}

// ===== BROWSER CHROME =====
function drawBrowserChrome(ctx, winX, winY, winW, barH, r, url) {
  ctx.fillStyle = '#252528';
  roundRectTop(ctx, winX, winY, winW, barH, r); ctx.fill();
  const dotY = winY + barH / 2, dotR = barH * 0.2;
  [{ x: winX + 16, c: '#ff5f57' }, { x: winX + 32, c: '#ffbd2e' }, { x: winX + 48, c: '#28c840' }].forEach(d => {
    ctx.fillStyle = d.c; ctx.beginPath(); ctx.arc(d.x, dotY, dotR, 0, Math.PI * 2); ctx.fill();
  });
  const urlW = winW * 0.3, urlH = barH * 0.55;
  const urlX = winX + (winW - urlW) / 2, urlY = winY + (barH - urlH) / 2;
  ctx.fillStyle = 'rgba(255,255,255,0.05)';
  roundRect(ctx, urlX, urlY, urlW, urlH, urlH / 2); ctx.fill();
  ctx.fillStyle = 'rgba(255,255,255,0.3)'; ctx.font = `${barH * 0.3}px -apple-system, sans-serif`;
  ctx.textAlign = 'center'; ctx.fillText(url || 'myproject.com', urlX + urlW / 2, urlY + urlH * 0.72); ctx.textAlign = 'left';
  ctx.fillStyle = 'rgba(255,255,255,0.05)'; ctx.fillRect(winX, winY + barH, winW, 1);
}

// ===== TEMPLATE: MOBILE FULL =====
function drawMobileFull(ctx, w, h, config) {
  drawBackground(ctx, w, h, config.background || 'indigo');
  const unit = Math.min(w, h);

  const accentKey = config.accent || 'indigo';
  const accentCol = ACCENT_COLORS[accentKey] || ACCENT_COLORS.indigo;
  const glow = ctx.createRadialGradient(w / 2, h * 0.42, 0, w / 2, h * 0.42, unit * 0.35);
  glow.addColorStop(0, `${accentCol}0f`); glow.addColorStop(1, 'transparent');
  ctx.fillStyle = glow; ctx.fillRect(0, 0, w, h);

  const pw = unit * 0.34, ph = pw * 2.1, px = (w - pw) / 2, py = (h - ph) / 2 + unit * 0.01, r = pw * 0.08;
  ctx.shadowColor = 'rgba(0,0,0,0.6)'; ctx.shadowBlur = 50; ctx.shadowOffsetY = 15;
  ctx.fillStyle = '#1c1c1e'; roundRect(ctx, px, py, pw, ph, r); ctx.fill();
  ctx.shadowColor = 'transparent';
  ctx.strokeStyle = 'rgba(255,255,255,0.08)'; ctx.lineWidth = 1.5;
  roundRect(ctx, px, py, pw, ph, r); ctx.stroke();
  const diW = pw * 0.26, diH = pw * 0.06;
  ctx.fillStyle = '#000'; roundRect(ctx, px + (pw - diW) / 2, py + pw * 0.04, diW, diH, diH / 2); ctx.fill();

  const sp = pw * 0.04;
  drawPhoneScreen(ctx, px + sp, py + sp * 2, pw - sp * 2, ph - sp * 3.5, r * 0.7, accentKey, config);
  ctx.fillStyle = 'rgba(255,255,255,0.25)';
  roundRect(ctx, px + (pw - pw * 0.3) / 2, py + ph - sp * 1.2, pw * 0.3, 3, 2); ctx.fill();
}

// ===== TEMPLATE: MOBILE CROPPED =====
function drawMobileCropped(ctx, w, h, config) {
  drawBackground(ctx, w, h, config.background || 'purple');
  const unit = Math.min(w, h);

  const accentKey = config.accent || 'purple';
  const accentCol = ACCENT_COLORS[accentKey] || ACCENT_COLORS.purple;
  const glow = ctx.createRadialGradient(w * 0.48, h * 0.35, 0, w * 0.48, h * 0.35, unit * 0.45);
  glow.addColorStop(0, `${accentCol}14`); glow.addColorStop(1, 'transparent');
  ctx.fillStyle = glow; ctx.fillRect(0, 0, w, h);

  const pw = unit * 0.55, ph = pw * 2.1, px = (w - pw) / 2, py = h * 0.08, r = pw * 0.07;
  ctx.shadowColor = 'rgba(0,0,0,0.7)'; ctx.shadowBlur = 60; ctx.shadowOffsetY = 20;
  ctx.fillStyle = '#1c1c1e'; roundRect(ctx, px, py, pw, ph, r); ctx.fill();
  ctx.shadowColor = 'transparent';
  ctx.strokeStyle = 'rgba(255,255,255,0.08)'; ctx.lineWidth = 2;
  roundRect(ctx, px, py, pw, ph, r); ctx.stroke();
  const diW = pw * 0.24, diH = pw * 0.055;
  ctx.fillStyle = '#000'; roundRect(ctx, px + (pw - diW) / 2, py + pw * 0.035, diW, diH, diH / 2); ctx.fill();

  const sp = pw * 0.035;
  drawPhoneScreen(ctx, px + sp, py + sp * 2, pw - sp * 2, ph - sp * 3.5, r * 0.7, accentKey, config);

  const fadeH = h * 0.15;
  const fade = ctx.createLinearGradient(0, h - fadeH, 0, h);
  const bgColors = BACKGROUND_PALETTES[config.background || 'purple'] || BACKGROUND_PALETTES.purple;
  fade.addColorStop(0, `${bgColors[2]}00`); fade.addColorStop(0.5, `${bgColors[2]}b3`); fade.addColorStop(1, bgColors[2]);
  ctx.fillStyle = fade; ctx.fillRect(0, h - fadeH, w, fadeH);
}

// ===== TEMPLATE: WEB FLAT =====
function drawWebFlat(ctx, w, h, config) {
  drawBackground(ctx, w, h, config.background || 'green');
  const unit = Math.min(w, h);

  const accentKey = config.accent || 'green';
  const accentCol = ACCENT_COLORS[accentKey] || ACCENT_COLORS.green;
  const glow = ctx.createRadialGradient(w / 2, h * 0.45, 0, w / 2, h * 0.45, unit * 0.4);
  glow.addColorStop(0, `${accentCol}0f`); glow.addColorStop(1, 'transparent');
  ctx.fillStyle = glow; ctx.fillRect(0, 0, w, h);

  const ww = unit * 0.84, wh = ww * 0.65, wx = (w - ww) / 2, wy = (h - wh) / 2, r = 10;
  ctx.shadowColor = 'rgba(0,0,0,0.5)'; ctx.shadowBlur = 50; ctx.shadowOffsetY = 12;
  ctx.fillStyle = '#1c1c1e'; roundRect(ctx, wx, wy, ww, wh, r); ctx.fill();
  ctx.shadowColor = 'transparent';
  ctx.strokeStyle = 'rgba(255,255,255,0.06)'; ctx.lineWidth = 1;
  roundRect(ctx, wx, wy, ww, wh, r); ctx.stroke();

  const bh = wh * 0.06;
  drawBrowserChrome(ctx, wx, wy, ww, bh, r, config.url || 'myproject.com');
  drawWebContent(ctx, wx, wy + bh + 1, ww, wh - bh - 1, accentKey, config);
}

// ===== TEMPLATE: WEB 3D PERSPECTIVE =====
function drawWebAngle(ctx, w, h, config) {
  drawBackground(ctx, w, h, config.background || 'teal');
  const unit = Math.min(w, h);

  const accentKey = config.accent || 'teal';
  const accentCol = ACCENT_COLORS[accentKey] || ACCENT_COLORS.teal;
  const glow = ctx.createRadialGradient(w * 0.55, h * 0.4, 0, w * 0.55, h * 0.4, unit * 0.45);
  glow.addColorStop(0, `${accentCol}14`); glow.addColorStop(1, 'transparent');
  ctx.fillStyle = glow; ctx.fillRect(0, 0, w, h);

  ctx.save();
  const cx = w / 2, cy = h / 2;
  ctx.translate(cx, cy);
  ctx.transform(1, 0.04, -0.12, 1, 0, 0);
  ctx.translate(-cx, -cy);

  const ww = unit * 0.78, wh = ww * 0.62;
  const wx = (w - ww) / 2 + unit * 0.02, wy = (h - wh) / 2 - unit * 0.01;
  const r = 10;

  ctx.shadowColor = 'rgba(0,0,0,0.6)'; ctx.shadowBlur = 60; ctx.shadowOffsetX = 20; ctx.shadowOffsetY = 15;
  ctx.fillStyle = '#1c1c1e'; roundRect(ctx, wx, wy, ww, wh, r); ctx.fill();
  ctx.shadowColor = 'transparent';

  const edgeGrad = ctx.createLinearGradient(wx, wy, wx + 8, wy);
  edgeGrad.addColorStop(0, 'rgba(255,255,255,0.06)'); edgeGrad.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = edgeGrad;
  ctx.fillRect(wx, wy + r, 8, wh - r * 2);

  ctx.strokeStyle = 'rgba(255,255,255,0.08)'; ctx.lineWidth = 1;
  roundRect(ctx, wx, wy, ww, wh, r); ctx.stroke();

  const bh = wh * 0.065;
  drawBrowserChrome(ctx, wx, wy, ww, bh, r, config.url || 'dashboard.app');
  drawWebContent(ctx, wx, wy + bh + 1, ww, wh - bh - 1, accentKey, config);

  ctx.restore();

  // Floating accent elements
  ctx.save();
  ctx.globalAlpha = 0.15;
  ctx.fillStyle = accentCol;
  roundRect(ctx, w * 0.05, h * 0.7, unit * 0.12, unit * 0.08, 6); ctx.fill();
  roundRect(ctx, w * 0.85, h * 0.15, unit * 0.08, unit * 0.06, 4); ctx.fill();
  ctx.globalAlpha = 1;
  ctx.restore();
}

// ===== TEMPLATE: WEB CROPPED =====
function drawWebCropped(ctx, w, h, config) {
  drawBackground(ctx, w, h, config.background || 'blue');
  const unit = Math.min(w, h);

  const accentKey = config.accent || 'indigo';
  const accentCol = ACCENT_COLORS[accentKey] || ACCENT_COLORS.indigo;
  const glow = ctx.createRadialGradient(w / 2, h * 0.3, 0, w / 2, h * 0.3, unit * 0.45);
  glow.addColorStop(0, `${accentCol}12`); glow.addColorStop(1, 'transparent');
  ctx.fillStyle = glow; ctx.fillRect(0, 0, w, h);

  const ww = unit * 0.92, wh = ww * 0.75;
  const wx = (w - ww) / 2, wy = h * 0.06;
  const r = 10;

  ctx.shadowColor = 'rgba(0,0,0,0.5)'; ctx.shadowBlur = 50; ctx.shadowOffsetY = 10;
  ctx.fillStyle = '#1c1c1e'; roundRect(ctx, wx, wy, ww, wh, r); ctx.fill();
  ctx.shadowColor = 'transparent';
  ctx.strokeStyle = 'rgba(255,255,255,0.06)'; ctx.lineWidth = 1;
  roundRect(ctx, wx, wy, ww, wh, r); ctx.stroke();

  const bh = wh * 0.055;
  drawBrowserChrome(ctx, wx, wy, ww, bh, r, config.url || 'app.project.io');
  drawWebContent(ctx, wx, wy + bh + 1, ww, wh - bh - 1, accentKey, config);

  // Bottom fade
  const fadeH = h * 0.18;
  const fade = ctx.createLinearGradient(0, h - fadeH, 0, h);
  const bgColors = BACKGROUND_PALETTES[config.background || 'blue'] || BACKGROUND_PALETTES.blue;
  fade.addColorStop(0, `${bgColors[2]}00`); fade.addColorStop(0.5, `${bgColors[2]}b3`); fade.addColorStop(1, bgColors[2]);
  ctx.fillStyle = fade; ctx.fillRect(0, h - fadeH, w, fadeH);
}

// ===== MAIN RENDER FUNCTION =====
const TEMPLATES = {
  'mobile-full': { fn: drawMobileFull, label: 'Full Phone', category: 'mobile', defaults: { accent: 'indigo', background: 'indigo' } },
  'mobile-cropped': { fn: drawMobileCropped, label: 'Cropped Phone', category: 'mobile', defaults: { accent: 'purple', background: 'purple' } },
  'web-flat': { fn: drawWebFlat, label: 'Flat Browser', category: 'web', defaults: { accent: 'green', background: 'green' } },
  'web-3d': { fn: drawWebAngle, label: '3D Perspective', category: 'web', defaults: { accent: 'teal', background: 'teal' } },
  'web-cropped': { fn: drawWebCropped, label: 'Cropped Browser', category: 'web', defaults: { accent: 'indigo', background: 'blue' } },
};

/**
 * Render a cover image to a canvas.
 * @param {HTMLCanvasElement} canvas
 * @param {object} config - { template, dimension, title, subtitle, url, accent, background, screenshot, size }
 */
export function renderCover(canvas, config) {
  const dim = DIMENSIONS[config.dimension] || DIMENSIONS['1:1'];
  const baseSize = config.size || 540;
  // Scale the dimension proportionally so the longer edge = baseSize
  const scaleFactor = baseSize / Math.max(dim.width, dim.height);
  const width = Math.round(dim.width * scaleFactor);
  const height = Math.round(dim.height * scaleFactor);

  const scale = 2; // retina
  canvas.width = width * scale;
  canvas.height = height * scale;
  canvas.style.width = width + 'px';
  canvas.style.height = height + 'px';
  const ctx = canvas.getContext('2d');
  ctx.scale(scale, scale);

  const templateKey = config.template || 'mobile-cropped';
  const tmpl = TEMPLATES[templateKey];
  if (tmpl) {
    tmpl.fn(ctx, width, height, config);
  }
}

/**
 * Export a cover as a PNG blob.
 * @param {object} config
 * @returns {Promise<Blob>}
 */
export function exportCoverAsPNG(config) {
  return new Promise((resolve) => {
    const dim = DIMENSIONS[config.dimension] || DIMENSIONS['1:1'];
    const exportW = dim.width;
    const exportH = dim.height;

    const canvas = document.createElement('canvas');
    const scale = 2;
    canvas.width = exportW * scale;
    canvas.height = exportH * scale;
    const ctx = canvas.getContext('2d');
    ctx.scale(scale, scale);

    const templateKey = config.template || 'mobile-cropped';
    const tmpl = TEMPLATES[templateKey];
    if (tmpl) {
      tmpl.fn(ctx, exportW, exportH, config);
    }

    canvas.toBlob(resolve, 'image/png');
  });
}

export { TEMPLATES, ACCENT_COLORS, BACKGROUND_PALETTES, DIMENSIONS };
