/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CARDBACKS; });


const CARDBACKS = [
  'card-back-eyes',
  'card-back-abstraction',
  'card-back-circles',
  'card-back-dark',
  'card-back-confusion'
];




/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Game__ = __webpack_require__(2);



const game = new __WEBPACK_IMPORTED_MODULE_0__Game__["a" /* Game */]();


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Game; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__GameBoard__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_difficulty__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__common_cardBacks__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Timer__ = __webpack_require__(8);







const gameView = document.querySelector('.game-view'),
      scoreView = document.querySelector('.score-view'),
      timer = document.querySelector('.timer'),
      resultTime = document.querySelector('.finish-time');

class Game {
  constructor(difficulty = __WEBPACK_IMPORTED_MODULE_1__common_difficulty__["a" /* DIFFICULTY */].MEDIUM, cardback = __WEBPACK_IMPORTED_MODULE_2__common_cardBacks__["a" /* CARDBACKS */][2]) {
    this.difficulty = difficulty;
    this.cardBack = cardback;
    this.card = null;
    this.guessedPairs = 0;
    this.addListeners();
  }

  start() {
    __WEBPACK_IMPORTED_MODULE_3__Timer__["a" /* Timer */].start();
    this.guessedPairs = 0;
    this.gameBoard = new __WEBPACK_IMPORTED_MODULE_0__GameBoard__["a" /* GameBoard */](this.cardBack);
    this.gameBoard.fill(this.difficulty);
  }

  finish() {
    resultTime.textContent = timer.textContent;
    __WEBPACK_IMPORTED_MODULE_3__Timer__["a" /* Timer */].stop();
    gameView.classList.remove('active');
    scoreView.classList.add('active');
  }

  checkPairs(card) {
    if (!this.card) {
      this.card = card;
    } else if (this.card !== card && this.card.getAttribute('value') === card.getAttribute('value')) {
      this.card.closest('.card-full').classList.add('hidden');
      card.closest('.card-full').classList.add('hidden');
      this.card = null;
      this.guessedPairs++;
    } else {
      this.card.closest('.card-full').classList.toggle('flip-animation');
      card.closest('.card-full').classList.toggle('flip-animation');
      this.card = null;
    }

    if (this.difficulty === this.guessedPairs) {
      setTimeout(this.finish, 400);
    }
  }

  addListeners() {
    const difficultyButtonsContainer = document.querySelector('.difficulty'),
          cards = document.querySelector('.game-board-wrapper'),
          options = document.querySelector('.options-view'),
          optionsCards = Array.from(document.querySelectorAll('.card-container')),
          views = document.querySelectorAll('.container'),
          optionsButton = document.querySelector('.options'),
          difficultyButtons = Array.from(difficultyButtonsContainer.querySelectorAll('button')),
          gameBoard = document.querySelector('.game-view'),
          saveButton = options.querySelector('.save-button');

    difficultyButtonsContainer.addEventListener('click', (e) => {
      const targetButton = e.target;

      difficultyButtons.forEach(btn => btn.classList.remove('chosen'));
      targetButton.classList.add('chosen');
      this.difficulty = +targetButton.dataset.difficulty;
    });

    options.addEventListener('click', e => {
      if (e.target.classList.contains('card')) {
        const cardContainer = e.target.closest('.card-container');

        optionsCards.forEach(card => card.classList.add('blur'));
        cardContainer.classList.remove('blur');
        this.cardBack = cardContainer.querySelector('[class*=card-back]').dataset.cardback;
      }
    });

    cards.addEventListener('click', e => {
      const parent = e.target.closest('.card-container'),
            cardWrapper = e.target.closest('.card-full');

      if (parent && cardWrapper) {
        const cardFace = cardWrapper.querySelector('.face');
        cardWrapper.classList.toggle('flip-animation');
        setTimeout(() => this.checkPairs(cardFace), 400);
      }
    });

    saveButton.addEventListener('click', () => {
      views.forEach(view => view.classList.remove('active'));
      gameBoard.classList.add('active');
      cards.innerHTML = "";
      this.start();
    });

    optionsButton.addEventListener('click', (e) => {
      views.forEach(view => view.classList.remove('active'));
      options.classList.toggle('active');
    });
  }
}




/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GameBoard; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Card__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_cardBacks__ = __webpack_require__(0);




const gameWrapper = document.querySelector('.game-board-wrapper');

class GameBoard {
  constructor(cardBack = __WEBPACK_IMPORTED_MODULE_1__common_cardBacks__["a" /* CARDBACKS */][0]) {
    this.cards = [];
    this.cardBack = cardBack;
    this.gameBoard = document.createElement('figure');
    this.gameBoard.classList.add('game-board');
    gameWrapper.appendChild(this.gameBoard);
  }

  fill(difficulty) {
    this.createCards(difficulty);
    this.cards.forEach(card => {
      this.gameBoard.appendChild( card.toHTML() );
    });
  }

  createCards(difficulty) {
    const cardsArr = new Array(difficulty)
      .fill(undefined)
      .map(() => new __WEBPACK_IMPORTED_MODULE_0__Card__["a" /* Card */](this.cardBack));
    __WEBPACK_IMPORTED_MODULE_0__Card__["a" /* Card */].clearHistory();
    this.cards = cardsArr.concat(cardsArr);
    shuffle(this.cards);
  }
}

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}




/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Card; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common_cardFaces__ = __webpack_require__(5);



const createdCards = [];

class Card {
  constructor(back) {
    this.face = getCardFace();
    this.back = back;
  }

  toHTML() {
    const cardContainer = document.createElement('div'),
      fullCard = document.createElement('div'),
      cardBack = document.createElement('div'),
      cardFace = document.createElement('div');

    cardContainer.classList.add('card-container');
    fullCard.classList.add('card-full');
    cardBack.classList.add('card', this.back);
    cardFace.classList.add('card', 'face', this.face);
    cardFace.setAttribute('value', this.face);

    cardContainer.appendChild(fullCard);
    fullCard.appendChild(cardBack);
    fullCard.appendChild(cardFace);

    return cardContainer;
  }

  static clearHistory() {
    createdCards.length = 0;
  }
}

function getCardFace() {
  let cardFace = getRandomCardFace();

  while (createdCards.includes(cardFace)) {
    cardFace = getRandomCardFace();
  }
  createdCards.push(cardFace);

  return cardFace;
}

function getRandomCardFace() {
  return __WEBPACK_IMPORTED_MODULE_0__common_cardFaces__["a" /* CARDFACES */][Math.floor(Math.random() * __WEBPACK_IMPORTED_MODULE_0__common_cardFaces__["a" /* CARDFACES */].length)];
}




/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CARDFACES; });


const CARDFACES = [
  'clubs-02',
  'clubs-03',
  'clubs-04',
  'clubs-05',
  'clubs-06',
  'clubs-07',
  'clubs-08',
  'clubs-09',
  'clubs-10',
  'clubs-jack',
  'clubs-queen',
  'clubs-king',
  'clubs-ace',

  'diamonds-02',
  'diamonds-03',
  'diamonds-04',
  'diamonds-05',
  'diamonds-06',
  'diamonds-07',
  'diamonds-08',
  'diamonds-09',
  'diamonds-10',
  'diamonds-jack',
  'diamonds-queen',
  'diamonds-king',
  'diamonds-ace',

  'hearts-02',
  'hearts-03',
  'hearts-04',
  'hearts-05',
  'hearts-06',
  'hearts-07',
  'hearts-08',
  'hearts-09',
  'hearts-10',
  'hearts-jack',
  'hearts-queen',
  'hearts-king',
  'hearts-ace',

  'spades-02',
  'spades-03',
  'spades-04',
  'spades-05',
  'spades-06',
  'spades-07',
  'spades-08',
  'spades-09',
  'spades-10',
  'spades-jack',
  'spades-queen',
  'spades-king',
  'spades-ace',

  'joker-black',
  'joker-red'
];




/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DIFFICULTY; });


const DIFFICULTY = {
  LOW:      3,
  MEDIUM:   6,
  HIGH:     9
};




/***/ }),
/* 7 */,
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Timer; });

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




/***/ })
/******/ ]);