'use strict';

import {GameBoard} from './GameBoard';
import {DIFFICULTY} from './common/difficulty';
import {CARDBACKS} from './common/cardBacks';
import {Timer} from './Timer';

const gameView = document.querySelector('.game-view'),
      scoreView = document.querySelector('.score-view'),
      timer = document.querySelector('.timer'),
      resultTime = document.querySelector('.finish-time');

class Game {
  constructor(difficulty = DIFFICULTY.MEDIUM, cardback = CARDBACKS[2]) {
    this.difficulty = difficulty;
    this.cardBack = cardback;
    this.card = null;
    this.guessedPairs = 0;
    this.addListeners();
  }

  start() {
    Timer.start();
    this.guessedPairs = 0;
    this.gameBoard = new GameBoard(this.cardBack);
    this.gameBoard.fill(this.difficulty);
  }

  finish() {
    resultTime.textContent = timer.textContent;
    Timer.stop();
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

export {Game};
