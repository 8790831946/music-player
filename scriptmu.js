const songs = [
  { title: "Song One", artist: "Artist A", file: "songs/song1.mp3" },
  { title: "Song Two", artist: "Artist B", file: "songs/song2.mp3" }
];

let currentIndex = 0;
const audio = document.getElementById("audio");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const progress = document.getElementById("progress");
const volume = document.getElementById("volume");
const playlist = document.getElementById("playlist");

function loadSong(index) {
  audio.src = songs[index].file;
  title.textContent = songs[index].title;
  artist.textContent = songs[index].artist;
}

function togglePlay() {
  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }
}

function nextSong() {
  currentIndex = (currentIndex + 1) % songs.length;
  loadSong(currentIndex);
  audio.play();
}

function prevSong() {
  currentIndex = (currentIndex - 1 + songs.length) % songs.length;
  loadSong(currentIndex);
  audio.play();
}

// Update progress bar
audio.addEventListener("timeupdate", () => {
  progress.value = (audio.currentTime / audio.duration) * 100 || 0;
});

progress.addEventListener("input", () => {
  audio.currentTime = (progress.value / 100) * audio.duration;
});

// Volume control
volume.addEventListener("input", () => {
  audio.volume = volume.value;
});

// Playlist rendering
songs.forEach((song, i) => {
  const li = document.createElement("li");
  li.textContent = ${song.title} - ${song.artist};
  li.onclick = () => {
    currentIndex = i;
    loadSong(currentIndex);
    audio.play();
  };
  playlist.appendChild(li);
});

// Autoplay next song
audio.addEventListener("ended", nextSong);

// Initial load
loadSong(currentIndex);
volume.value = 0.5;
audio.volume = 0.5;