'use strict';
import {CARDFACES} from './common/cardFaces';

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
  return CARDFACES[Math.floor(Math.random() * CARDFACES.length)];
}

export {Card};
