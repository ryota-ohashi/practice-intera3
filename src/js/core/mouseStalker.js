export default class MouseStalker {
  constructor() {
    // 動かすオブジェクト
    this.elDot = document.querySelector('.stalker');

    // マウス位置
    this.mouse = {
      x:0,
      y:0
    }

    // スクロール量
    this.scrollY = window.pageYOffset;

    // 動かすオブジェクトの位置
    this.dotPos = {
      x:0,
      y:0,
      vx:0,
      vy:0
    };

    this.bindMouseMove = this.mouseMove.bind(this);
    this.bindUpdate = this.updateMousePosition.bind(this);

    this.bindMouseStalker();
  }
  updateMousePosition() {
    // 目標値
    let tx = this.mouse.x;
    let ty = this.mouse.y;

    // イージング
    const ease = 0.25;
    this.dotPos.x += (tx - this.dotPos.x) * ease;
    this.dotPos.y += (ty - this.dotPos.y) * ease;

    let x = this.dotPos.x - this.elDot.clientWidth * 0.5;
    let y = this.dotPos.y - this.elDot.clientHeight * 0.5;

    // 位置の制御
    this.elDot.style.transform = "matrix(1, 0, 0, 1," + x + ", " + y + ")";

    window.requestAnimationFrame(this.bindUpdate);
  }
  mouseMove(e) {
    this.mouse.x = e.pageX;
    this.mouse.y = e.pageY;
    this.scrollY = window.pageYOffset;
  }
  bindMouseStalker(){
    window.requestAnimationFrame(this.bindUpdate);
    window.addEventListener('mousemove', this.bindMouseMove);
  }
}