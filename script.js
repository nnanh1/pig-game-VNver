'use strict';
// chọn phần tử thường xuyên cần thiết đặt
const diceEl = document.querySelector('.dice');

const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

// hàm chuyển lượt chơi
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

let scores, currentScore, activePlayer, playing;
// hàm khởi động game
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  current0El.textContent = 0;
  current1El.textContent = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;

  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  diceEl.classList.add('hidden');
};
//A) Thiết lập ban đầu

init();
// 1. điểm ban đầu bằng 0
// score0El.textContent = 0;
// score1El.textContent = 0;
//2. ẩn xúc sắc
// diceEl.classList.add('hidden');

// B) Gieo xúc xắc
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. gieo 1 số ngẫu nhiên từ 1 đến 6
    let dice = Math.trunc(Math.random() * 6 + 1);
    // 2. hiển thị hình ảnh xúc sắc theo con số ngẫu nhiên nhận được
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    // 3. kiểm tra kết quả với 1
    if (dice !== 1) {
      //   khác 1 sẽ cộng dồn điểm xúc xắc được vào "điểm hiện tại"
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // bằng 1 sẽ mất hết "điểm hiện tại" và mất lượt
      switchPlayer();
    }
  }
});
// C) Lấy điểm
btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. cộng "điểm hiện tại" vào điểm của người chơi
    scores[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];
    // 2. kiểm tra điểm người chơi với 100
    //  lớn hơn 100: giành chiến thắng và KẾT THÚC TRÒ CHƠI
    if (scores[activePlayer] >= 100) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      diceEl.classList.add('hidden');
    } else {
      // nhỏ hơn 100: chuyển lượt chơi
      switchPlayer();
    }
  }
});

// D) Chơi lại (đặt thông số về thiết lập ban đầu)
btnNew.addEventListener(
  'click',
  init
  // 1. đặt tất cả điểm về 0
  // 2. ẩn xúc xắc
);

// E) Xem hướng dẫn
const btnGuidance = document.querySelector('.btn--guidance');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};
const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};
// mở hướng dẫn
btnGuidance.addEventListener('click', openModal);
// đóng hướng dẫn

modal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('.hidden')) {
    closeModal();
  }
});
