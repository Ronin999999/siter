// Игровые переменные
let balance = 45189.51;
let bet = 16;
let minesCount = 3;
let maxWin = 35144;
let gameOver = false;
let minesPositions = [];

// DOM элементы
const balanceBtn = document.getElementById('balanceBtn');
const depositModal = document.getElementById('depositModal');
const depositInput = document.getElementById('depositInput');
const confirmDeposit = document.getElementById('confirmDeposit');
const cancelDeposit = document.getElementById('cancelDeposit');
const betInput = document.getElementById('betInput');
const gameGrid = document.getElementById('gameGrid');

// Инициализация игрового поля
function initGameGrid() {
  gameGrid.innerHTML = '';
  for (let i = 0; i < 25; i++) {
    const cell = document.createElement('button');
    cell.dataset.index = i;
    cell.textContent = '?';
    cell.addEventListener('click', () => handleCellClick(i));
    gameGrid.appendChild(cell);
  }
}

// Обработка клика по клетке
function handleCellClick(index) {
  if (gameOver) return;

  // Первый клик - размещаем мины
  if (minesPositions.length === 0) {
    placeMines(index);
  }

  const cell = gameGrid.children[index];

  // Проверка на мину
  if (minesPositions.includes(index)) {
    cell.textContent = '💣';
    cell.style.backgroundColor = '#f44336';
    gameOver = true;
    revealAllMines();
    alert('Вы проиграли!');
  } else {
    cell.textContent = '💰';
    cell.style.backgroundColor = '#4CAF50';
    balance += bet * 2;
    updateBalance();
  }
}

// Размещение мин
function placeMines(clickedIndex) {
  minesPositions = [];
  while (minesPositions.length < minesCount) {
    const randomIndex = Math.floor(Math.random() * 25);
    if (randomIndex !== clickedIndex && !minesPositions.includes(randomIndex)) {
      minesPositions.push(randomIndex);
    }
  }
}

// Показать все мины
function revealAllMines() {
  minesPositions.forEach(index => {
    const cell = gameGrid.children[index];
    cell.textContent = '💣';
    cell.style.backgroundColor = '#f44336';
  });
}

// Обновление баланса
function updateBalance() {
  balanceBtn.textContent = balance.toLocaleString('ru-RU') + ' ₽';
}

// Пополнение баланса
balanceBtn.addEventListener('click', () => {
  depositModal.style.display = 'flex';
});

confirmDeposit.addEventListener('click', () => {
  const amount = parseFloat(depositInput.value);
  if (amount > 0) {
    balance += amount;
    updateBalance();
    depositModal.style.display = 'none';
    depositInput.value = '';
  }
});

cancelDeposit.addEventListener('click', () => {
  depositModal.style.display = 'none';
  depositInput.value = '';
});

// Изменение ставки
betInput.addEventListener('change', (e) => {
  bet = parseInt(e.target.value) || 16;
});

// Инициализация игры
initGameGrid();
updateBalance();