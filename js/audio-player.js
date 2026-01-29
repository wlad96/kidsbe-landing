const players = document.querySelectorAll('.audio-player');

let currentAudio = null;
let currentBtn = null;

players.forEach(player => {
  const audio = player.querySelector('audio');
  const playBtn = player.querySelector('.play-btn');
  const progress = player.querySelector('.progress');
  const time = player.querySelector('.time');

  playBtn.addEventListener('click', () => {
    if (currentAudio && currentAudio !== audio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
      currentBtn.textContent = '▶';
    }

    if (audio.paused) {
      audio.play();
      playBtn.textContent = '⏸';
      currentAudio = audio;
      currentBtn = playBtn;
    } else {
      audio.pause();
      playBtn.textContent = '▶';
    }
  });

  audio.addEventListener('loadedmetadata', () => {
    progress.max = Math.floor(audio.duration);
    progress.style.setProperty('--progress', '0%');
  });

  audio.addEventListener('timeupdate', () => {
    progress.value = Math.floor(audio.currentTime);
    time.textContent = formatTime(audio.currentTime);

    const percent = (audio.currentTime / audio.duration) * 100 || 0;
    progress.style.setProperty('--progress', `${percent}%`);
  });

  progress.addEventListener('input', () => {
    audio.currentTime = progress.value;
  });

  audio.addEventListener('ended', () => {
    playBtn.textContent = '▶';
    progress.value = 0;
    time.textContent = '0:00';
  });
});

function formatTime(sec) {
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}