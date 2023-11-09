const audioPlayer = document.getElementById("audio-player");
const playPauseButton = document.getElementById("play-pause");
const shuffleButton = document.getElementById("shuffle");
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const playlist = document.querySelector(".playlist");
const songImage = document.getElementById("song-Image")
const previousButton = document.getElementById("previousButton");
const nextButton = document.getElementById("nextButton");

const songs = [];

for (let i = 1; i <= 48; i++) {
    songs.push({
        title: `Song ${i}`,
        source: `./static/songs/song${i}.mp3`,
        image: "song.jpg"
    });
}

let currentIndex = 0;
let isShuffled = false;

function loadSong(index) {
  const song = songs[index];
  audioPlayer.src = song.source;
  songImage.src = song.image;
  audioPlayer.load();
  audioPlayer.play();
  playPauseButton.textContent = "Pause";
}

function playPreviousSong() {
  currentIndex = (currentIndex - 1 + songs.length) % songs.length;
  loadSong(currentIndex);
}

function playNextSong() {
  currentIndex = (currentIndex + 1) % songs.length;
  loadSong(currentIndex);
}
 
function togglePlayPause() {
    if (audioPlayer.paused) {
        audioPlayer.play();
        playPauseButton.textContent = "Pause";
    } else {
        audioPlayer.pause();
        playPauseButton.textContent = "Play";
    }
}

function toggleShuffle() {
    isShuffled = !isShuffled;
    shuffleButton.textContent = isShuffled ? "Shuffle On" : "Shuffle";
}

function searchSong() {
    const query = searchInput.value.toLowerCase();
    const foundSong = songs.find(song => song.title.toLowerCase().includes(query));
    if (foundSong) {
        const index = songs.indexOf(foundSong);
        loadSong(index);
    }
}

playlist.addEventListener("click", (event) => {
    if (event.target.tagName === "LI") {
        const index = [...event.target.parentNode.children].indexOf(event.target);
        loadSong(index);
    }
});

audioPlayer.addEventListener("ended", function() {
    if (isShuffled) {
        let newIndex = currentIndex;
        while (newIndex === currentIndex) {
            newIndex = Math.floor(Math.random() * songs.length);
        }
        currentIndex = newIndex;
    } else {
        currentIndex = (currentIndex + 1) % songs.length;
    }
    loadSong(currentIndex);
});

playPauseButton.addEventListener("click", togglePlayPause);
shuffleButton.addEventListener("click", toggleShuffle);
searchButton.addEventListener("click", searchSong);
previousButton.addEventListener("click", playPreviousSong);
nextButton.addEventListener("click", playNextSong);
// Add a new song dynamically
function addSong(title, source) {
    const newSong = {
        title: title,
        source: source,
        image: image
    };
    songs.push(newSong);

    // Create a new list item for the song
    const listItem = document.createElement("li");
    listItem.textContent = title;
    listItem.dataset.title = title;
    listItem.dataset.source = source;
    listItem.dataset.image = image;
    listItem.addEventListener("click", (event) => {
        const index = songs.findIndex(song => song.title === event.target.dataset.title && song.source === event.target.dataset.source);
        loadSong(index);
    });

    playlist.appendChild(listItem);
}
