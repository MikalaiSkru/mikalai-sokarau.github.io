'use strict';
const timerNode = document.querySelector('.timer'),
      MILLISECONDS_IN_SECOND = 1000,
      SECONDS_IN_MINUTE = 60;

class Timer{
  constructor() {
    this.instance = null;
    this.time = null;
  }

  static start() {
    if (this.instance !== null) {
      this.stop();
    }

    this.time = Date.now();
    timerNode.textContent = '0:00';

    this.instance = setInterval(() => {
      const tick = Math.floor((Date.now() - this.time) / MILLISECONDS_IN_SECOND),
            seconds = tick % SECONDS_IN_MINUTE,
            minutes = Math.floor(tick / SECONDS_IN_MINUTE);

      timerNode.innerHTML = `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
    }, 1000);
  }

  static stop() {
    timerNode.textContent = '0:00';
    this.time = null;
    clearInterval(this.instance);
  }
}

export {Timer};
