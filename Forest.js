import Branch from './Branch.js';

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

document.addEventListener('DOMContentLoaded', () => {
  new App();
});

class App {
  constructor() {
    this.tree = [];
    this.maxAngle = 25;
    this.maxBranch = 4;
    this.tree.push(new Branch(0, 500, 666, 0, 100, 5));
    this.animate();
  }

  animate() {
    window.requestAnimationFrame(this.animate.bind(this));

    let canvas = document.querySelector('#forest');
    canvas.width = 1000;
    canvas.height = 666;
    let ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.tree.forEach((b) => {
      const isFinished = b.grow();
      if (isFinished) {
        if (b.step < 6) {
          if (Math.random() < 0.5) {
            this.tree.push(
              new Branch(
                b.step + 1,
                b.ex,
                b.ey,
                0,
                b.length * (0.8 + Math.random() * 0.2),
                b.thickness * (0.8 + Math.random() * 0.2),
              ),
            );
          }
          for (let i = 0; i < this.maxBranch; ++i) {
            let newAngle = getRandomInt(
              -this.maxAngle * (b.step + 2),
              this.maxAngle * (b.step + 2),
            );

            this.tree.push(
              new Branch(
                b.step + 1,
                b.ex,
                b.ey,
                newAngle,
                b.length * (0.5 + Math.random() * 0.5),
                b.thickness * (0.5 + Math.random() * 0.5),
              ),
            );
          }
        }
      }
      b.draw(ctx);
    });
  }
}
