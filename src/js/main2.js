import '../scss/style.scss'
// import MouseStalker from './core/mouseStalker'
import MouseMove from './core/mouseMove'

class Intera3 extends MouseMove {
  constructor() {
    super();
    this.setParams();
    this.bind();
  }
  setParams() {
    this.stalker = document.querySelector('.stalker');

    this.dotPos = {
      x:0,
      y:0,
      vx:0,
      vy:0
    };
  }
  update(){
    // 目標値
    let tx = this.mouse.x;
    let ty = this.mouse.y;

    // イージング
    const ease = 0.25;
    this.dotPos.x += (tx - this.dotPos.x) * ease;
    this.dotPos.y += (ty - this.dotPos.y) * ease;

    let x = this.dotPos.x - this.stalker.clientWidth * 0.5;
    let y = this.dotPos.y - this.stalker.clientHeight * 0.5;

    // 位置の制御
    this.stalker.style.transform = "matrix(1, 0, 0, 1," + x + ", " + y + ")";

    window.requestAnimationFrame(this.update.bind(this));
  }
  bind(){
    window.requestAnimationFrame(this.update.bind(this));
  }
}

window.addEventListener('DOMContentLoaded', () => {
  new Intera3();
});


