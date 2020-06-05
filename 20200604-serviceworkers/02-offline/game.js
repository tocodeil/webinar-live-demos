const container = document.querySelector('.game');
container.addEventListener('click', start);

function start() {
  container.innerHTML = `
    <p>Score: <span class="score">0</span></p>
    ${_.range(10).map(i => `<div class="box" data-index="${i}"></div>`).join('')}
  `;

  container.removeEventListener('click', start);
  container.addEventListener('click', clicked);
  shuffle();
}

function clicked(ev) {
  const item = ev.target;
  if (!item.classList.contains('box')) return;

  if (item.classList.contains('winner')) {
    container.querySelector('.score').textContent++;
  }

  shuffle();
}

function shuffle() {
  const winnerIndex = _.random(10);
  const previousWinner = container.querySelector('.winner');
  if (previousWinner) {
    previousWinner.classList.remove('winner');
  }
  const nextWinner = container.querySelector(`[data-index="${winnerIndex}"`);
  nextWinner.classList.add('winner');
}
