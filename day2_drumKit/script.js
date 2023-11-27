const keys = document.querySelectorAll('.key');

const keyCode = {
  A: 65,
  S: 83,
  D: 68,
  F: 70,
  G: 71,
  H: 72,
  J: 74,
  K: 75,
  L: 76,
};
function removeTransition(e) {
  if (e.propertyName !== 'transform') return;
  e.target.classList.remove('playing');
}

keys.forEach((key) => {
  key.addEventListener('click', (e) => {
    playSound(e);
  });
  key.addEventListener('transitionend', removeTransition);
});

function playSound(e) {
  const audio = document.querySelector(`audio[data-key="${e.keyCode || keyCode[e.target.innerHTML]}"]`);
  const key = document.querySelector(`.key[data-key="${e.keyCode || keyCode[e.target.innerHTML]}"]`);
  if (!audio) return; // stop the function from running all together
  audio.currentTime = 0; // rewind to the start
  audio.play();
  key.classList.add('playing');
}

window.addEventListener('keydown', playSound);
