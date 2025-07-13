const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const progress = document.getElementById("progress");
const volume = document.getElementById("volume");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const cover = document.getElementById("cover");
const current = document.getElementById("current");
const duration = document.getElementById("duration");
const playlistList = document.getElementById("playlist-list");
const playlistToggle = document.getElementById("playlist-toggle");
const playlistContainer = document.getElementById("playlist-container");

let isPlaying = false;
let songIndex = 0;

const songs = [
  {
    title: "Too Many Nights",
    artist: "Metro Boomin",
    file: "song1.mp3",
    cover: "cover1.jpeg",
  },
  {
    title: "Stay",
    artist: "Justin Bieber",
    file: "song2.mp3",
    cover: "cover2.jpg",
  },
  {
    title: "Chammak Challo",
    artist: "Akon",
    file: "song3.mp3",
    cover: "cover3.jpg",
  },
  {
    title: "I'll Do it",
    artist: "Heidi Montag",
    file: "song4.mp3",
    cover: "cover4.jpeg",
  },
];

function loadSong(song) {
  title.textContent = song.title;
  artist.textContent = song.artist;
  audio.src = `music/${song.file}`;
  cover.src = `images/${song.cover}`;
  updatePlaylist();
}

function playSong() {
  isPlaying = true;
  audio.play();
  playBtn.textContent = "⏸️";
}

function pauseSong() {
  isPlaying = false;
  audio.pause();
  playBtn.textContent = "▶️";
}

function updatePlaylist() {
  playlistList.innerHTML = "";
  songs.forEach((song, index) => {
    const li = document.createElement("li");
    li.textContent = `${song.title} - ${song.artist}`;
    if (index === songIndex) {
      li.classList.add("active");
    }
    li.addEventListener("click", () => {
      songIndex = index;
      loadSong(songs[songIndex]);
      playSong();
    });
    playlistList.appendChild(li);
  });
}

playBtn.addEventListener("click", () => {
  isPlaying ? pauseSong() : playSong();
});

nextBtn.addEventListener("click", () => {
  songIndex = (songIndex + 1) % songs.length;
  loadSong(songs[songIndex]);
  playSong();
});

prevBtn.addEventListener("click", () => {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  loadSong(songs[songIndex]);
  playSong();
});

audio.addEventListener("timeupdate", () => {
  const percent = (audio.currentTime / audio.duration) * 100;
  progress.value = percent || 0;
  current.textContent = formatTime(audio.currentTime);
  duration.textContent = formatTime(audio.duration);
});

progress.addEventListener("input", () => {
  audio.currentTime = (progress.value / 100) * audio.duration;
});

volume.addEventListener("input", () => {
  audio.volume = volume.value;
});

playlistToggle.addEventListener("click", () => {
  playlistContainer.classList.toggle("visible");
  playlistToggle.textContent = playlistContainer.classList.contains("visible")
    ? "Hide Playlist"
    : "Show Playlist";
});

function formatTime(time) {
  const mins = Math.floor(time / 60) || 0;
  const secs = Math.floor(time % 60) || 0;
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
}

loadSong(songs[songIndex]);
updatePlaylist();
