const image = document.querySelector('img');
const artist = document.getElementById('artist');
const title = document.getElementById('title');
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

//music
const songs = [
	{
		name: 'jacinto-1',
		displayName: 'Lesson 1',
		artist: 'jacinto'
	},
	{
		name: 'jacinto-2',
		displayName: 'Lesson 2',
		artist: "jacinto"

	},
	{
		name: 'jacinto-3',
		displayName: 'Lesson 3',
		artist: 'jacinto'
	}
]

//check if playing
let isPlaying = false;

//play
function playSong() {
	isPlaying = true;
	playBtn.classList.replace('fa-play', 'fa-pause');
	playBtn.setAttribute('title', 'Pause');
	music.play();
}

//pause
function pauseSong() {
	isPlaying = false;
	playBtn.classList.replace('fa-pause', 'fa-play');
	playBtn.setAttribute('title', 'Play');
	music.pause();
}

//play or pause event listener
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));

//update DOM
function loadSong(song) {
	title.textContent = song.displayName;
	artist.textContent = song.artist;
	music.src = `music/${song.name}.mp3`;
	image.src = `img/${song.name}.jpg`;
}

//current song
let songIndex = 0;

//next song
function nextSong() {
	songIndex++;
	if (songIndex > songs.length - 1) {
		songIndex = 0;
	}
	loadSong(songs[songIndex]);
	playSong();
}

//prev song
function prevSong(){
	songIndex--;
	if (songIndex < 0) {
		songIndex = songs.length - 1;
	}
	loadSong(songs[songIndex]);
	playSong();
}

//on load select first song
loadSong(songs[songIndex]);

//update progress bar and title
function updateProgressBar(event) {
	if (isPlaying) {
		const {duration, currentTime} = event.srcElement;
		//update progress bar width
		const progressPercent = (currentTime / duration) * 100;
		progress.style.width = `${progressPercent}%`;
		// calculate display for duration
		const durationMinutes = Math.floor(duration / 60);
		let durationSeconds = Math.floor(duration % 60);
		if (durationSeconds < 10) {
			durationSeconds = `0${durationSeconds}`;
		}
		///delay switching duration element to avoid NaN:NaN
		if (durationSeconds) {
			durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
		}
		// calculate display for current
		const currentMinutes = Math.floor(currentTime / 60);
		let currentSeconds = Math.floor(currentTime % 60);
		if (currentSeconds < 10) {
			currentSeconds = `0${currentSeconds}`;
		}
		///delay switching duration element to avoid NaN:NaN
		if (currentSeconds) {
			currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
		}
	}
}
//set progress bar when clicked
function setProgressBar(event) {	
width = this.clientWidth;
const clickX = event.offsetX;
const { duration } = music;
console.log((clickX / width) * duration);
music.currentTime = (clickX / width) * duration;

}

//event listeners

prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);
music.addEventListener('ended', nextSong);
