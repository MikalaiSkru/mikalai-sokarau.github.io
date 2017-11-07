'use strict';
import {Card} from './Card';
import {CARDBACKS} from './common/cardBacks';

const gameWrapper = document.querySelector('.game-board-wrapper');

class GameBoard {
  constructor(cardBack = CARDBACKS[0]) {
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
      .map(() => new Card(this.cardBack));
    Card.clearHistory();
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

export {GameBoard};
