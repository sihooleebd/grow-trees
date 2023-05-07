function rgbToHex(r, g, b) {
  if (r > 255 || g > 255 || b > 255) throw 'Invalid color component';
  const temp = ((r << 16) | (g << 8) | b).toString(16);
  const hexStr = '#' + ('000000' + temp).slice(-6);
  return hexStr;
}

class Branch {
  constructor(step, sx, sy, angle, length, thickness) {
    this.step = step;
    this.sx = sx;
    this.sy = sy;
    this.angle = angle;
    this.length = length;
    this.thickness = thickness;
    this.ex = sx;
    this.ey = sy;
    this.isGrowing = true;
  }

  grow() {
    if (!this.isGrowing) {
      return false;
    }
    const v = 2;
    this.ex += v * Math.sin((this.angle * Math.PI) / 180);
    this.ey -= v * Math.cos((this.angle * Math.PI) / 180);

    if (
      (this.ex - this.sx) * (this.ex - this.sx) +
        (this.ey - this.sy) * (this.ey - this.sy) >=
      this.length * this.length
    ) {
      this.isGrowing = false;
      return true;
    }
    return false;
  }

  draw(ctx) {
    ctx.strokeStyle = rgbToHex(this.step * 30, this.step * 20, this.step * 30);
    ctx.lineWidth = this.thickness;
    ctx.beginPath();
    ctx.moveTo(this.sx, this.sy);
    ctx.lineTo(this.ex, this.ey);
    ctx.closePath();
    ctx.stroke();
  }
}

export default Branch;
