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
    const strings = document.querySelector('.strings-wrap').getAttribute('data-strings');
    this.pushElement(strings);

    this.cont = []
    this.stalker = document.querySelectorAll('.string');
    this.stalker.forEach((el, i) => {
      let obj = {
        rate:0,            // 最終目標値までの進捗度
        posTg2:{x:0, y:0}, // 最終目標位置
        posTg1:{x:0, y:0}, // 寄り道位置
        posNow:{x:0, y:0}, // 現在位置
        el:el,
        scale:1,
        isStart:false
      }
      this.reset(obj, i * 0.3, i);
      this.cont.push(obj);
    })
  }
  pushElement(strings){
    const stringArray = strings.split('');
    const elCont = document.querySelector('.strings-wrap');
    stringArray.forEach((el) => {
      const stringElement = document.createElement('div');
      stringElement.textContent = el;
      stringElement.classList.add('string');
      elCont.appendChild(stringElement);
    })
  }
  reset(obj, delay, index){
    let sw = window.innerWidth
    let sh = window.innerHeight

    obj.rate = 0;

    obj.posNow.x = this.random(sw * 0.25, sw * 0.75);
    obj.posNow.y = -sh * 0.25;

    // 最終目標位置 画面外へ
    obj.posTg2.x = sw * 0.5 + sw * 0.03 * (index - 6.5);
    // obj.posTg2.x = sw * 0.5 + sw * 0.06 * (index - 6.5); //球用
    obj.posTg2.y = sh * 0.5;

    // 寄り道
    let range = 1;
    obj.posTg1.x = obj.posNow.x + this.random(-sw * range, sw * range);
    obj.posTg1.y = this.random(sh * 0.4, sh * 0.6);

    // スケールのランダムに
    obj.scale = this.random(0.8, 1);

    // rate値をアニメーション
    TweenMax.killTweensOf(obj);
    TweenMax.to(obj, 1, {
      rate:1,
      ease:Power3.easeOut,
      delay:delay
    })
  }
  update(){
    // イージングかける
    const ease = 0.08;

    this.cont.forEach(obj => {

      if(obj.rate > 0) {
        let tgX = (obj.posTg1.x * (1 - obj.rate)) + (obj.posTg2.x * obj.rate);
        let tgY = (obj.posTg1.y * (1 - obj.rate)) + (obj.posTg2.y * obj.rate);
        obj.posNow.x += (tgX - obj.posNow.x) * ease;
        obj.posNow.y += (tgY - obj.posNow.y) * ease;
      }

      TweenMax.set(obj.el, {
        x:obj.posNow.x,
        y:obj.posNow.y,
        scale:obj.scale
      });
    })
    window.requestAnimationFrame(this.update.bind(this));
  }
  random(min, max){
    return Math.random() * (max - min) + min;
  }
  bind(){
    window.requestAnimationFrame(this.update.bind(this));
  }
}

window.addEventListener('DOMContentLoaded', () => {
  new Intera3();
});


