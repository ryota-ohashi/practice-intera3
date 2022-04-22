import '../scss/style.scss'
import Mousemove from './core/mouseMove';
// import MouseStalker from './core/mouseStalker'
import MouseMove from './core/mouseMove'

class Intera3 extends MouseMove {
  constructor() {
    super();
    this.setParams();
    this.bind();
  }
  setParams() {
    this.sw = window.innerWidth
    this.sh = window.innerHeight

    this.cont = [];
    this.stalker = document.querySelectorAll('.stalker');
    this.stalker.forEach( el => {
      let obj = {
        rate: 0,
        posTg1: {x:0, y:0}, //寄り道
        posTg2: {x:this.mouse.x, y:this.mouse.y}, //最終地点
        posNow: {x:0, y:0}, // 現在位置
        el: el
      }
      this.reset(obj);
      this.cont.push(obj);
    })

  }
  reset(obj) {
    obj.rate = 0;

    obj.posNow.x = this.random(0, this.sw);
    obj.posNow.y = this.random(0, this.sh);

    obj.posTg1.x = this.random(0, this.sw);
    obj.posTg1.y = this.random(0, this.sh);

  }
  random(min, max){
    return Math.random() * (max - min) + min;
  }
  update(){
    this.cont.forEach(obj => {
      obj.rate += 0.01;
      if(obj.rate >= 1) obj.rate = 0;

      obj.posTg2.x = this.mouse.x;
      obj.posTg2.y = this.mouse.y;

      let x = (obj.posTg1.x * (1 - obj.rate)) + (obj.posTg2.x * obj.rate)
      let y = (obj.posTg1.y * (1 - obj.rate)) + (obj.posTg2.y * obj.rate)

      const ease = 0.25;
      obj.posNow.x += (x - obj.posNow.x) * ease;
      obj.posNow.y += (x - obj.posNow.y) * ease;

      obj.el.style.transform = "matrix(1, 0, 0, 1," + obj.posNow.x + ", " + obj.posNow.y + ")";
    })

    window.requestAnimationFrame(this.update.bind(this));
  }
  bind(){
    window.requestAnimationFrame(this.update.bind(this));
  }
}

window.addEventListener('DOMContentLoaded', () => {
  new Intera3();
});


