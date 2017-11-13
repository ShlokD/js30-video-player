const video = document.querySelector('.player__video.viewer');
const skipButtons = document.querySelectorAll('.player__button');
const playButton = document.querySelector('.player__button.toggle');
const volume = document.querySelector('input[name="volume"]');
const rate = document.querySelector('input[name="playbackRate"]')
const progress = document.querySelector('.progress');
const progressBar = document.querySelector('.progress__filled');


let mouseDown = false;

const onVolumeChange = ev => {
  const volume = parseFloat(ev.target.value);
  if (!isNaN(volume)) {
    video.volume = volume;    
  }
};

const onPlaybackRateChange = ev => {
  const rate = parseFloat(ev.target.value);
  if (!isNaN(rate)) {
    video.playbackRate = rate;    
  }
};


const onPlayPause = ev => {
  ev.target.innerHTML = video.paused ? "►" : "❚❚";

  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

const onSkip = ev => {
  const skipValue = parseInt(ev.target.dataset.skip);
  if (!isNaN(skipValue)) {
    video.currentTime += skipValue;
  }
}

const onProgressChange = ev => {
  const percent = (video.currentTime / video.duration) *100;
  progressBar.style.flexBasis = `${percent}%`;
}

const onScrub = ev => {
  const scrubTime = (ev.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

const onVideoDoubleClick = ev => {
  const requestFullScreen = video.requestFullscreen || video.msRequestFullscreen || video.mozRequestFullScreen || video.webkitRequestFullscreen;
  if (requestFullScreen) {
   requestFullScreen.call(video);
  }  
}


playButton.addEventListener('click', onPlayPause);
skipButtons.forEach(skipButton => skipButton.addEventListener('click', onSkip));
volume.addEventListener('change', onVolumeChange);
rate.addEventListener('change', onPlaybackRateChange);
video.addEventListener('timeupdate', onProgressChange);
video.addEventListener('dblclick', onVideoDoubleClick);
progress.addEventListener('click', onScrub);
progress.addEventListener('mousemove', (ev) => mouseDown && onScrub(ev));
progress.addEventListener('mousedown', () => mouseDown = true);
progress.addEventListener('mouseup', () => mouseDown = false);

video.play();