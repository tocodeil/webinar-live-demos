import { makeAutoObservable } from "mobx"

class RedSpotter {
  gameIndex = 0;
  totalScore = 0;

  constructor() {
    makeAutoObservable(this);
  }

  addScore(amount) {
    this.totalScore += amount;
  }

  reset() {
    this.totalScore = 0;
    this.gameIndex = Math.random();
  }
}

const gameData = new RedSpotter();
export default gameData;
