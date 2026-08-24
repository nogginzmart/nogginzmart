// initiate variables
let track_name = document.querySelector(".songtitle");

let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");

let seek_slider = document.querySelector(".seek_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");
let track_index = 0;
let isPlaying = false;
let updateTimer;

// create new audio element
let curr_track = document.getElementById("music");

//
// DEFINE YOUR SONGS HERE!!!!!
// MORE THAN FOUR SONGS CAN BE ADDED!!
// JUST ADD ANOTHER BRACKET WITH NAME AND PATH
// CATBOX.MOE IS RECOMMENDED FOR UPLOADING MP3 FILES
let track_list = [
  {
    name: "The Mollusk - Ween",
    path: "https://nogginzmart.neocities.org/music/goofygoober1.ogg",
  },
  {
    name: "Spongebob & Patrick Confront The Psychic Wall of Energy - The Flaming Lips",
    path: "https://nogginzmart.neocities.org/music/goofygoober2.ogg",
  },
  {
    name: "Ocean Man - Ween",
    path: "https://nogginzmart.neocities.org/music/goofygoober3.ogg",
  },
  {
    name: "Octopus's Garden - The Beatles",
    path: "https://nogginzmart.neocities.org/music/goofygoober4.ogg",
  },
];
//
//
//
//
// the default volume of the song feel free to change

function loadTrack(track_index) {
  clearInterval(updateTimer);
  resetValues();

  // load a new track
  curr_track.src = track_list[track_index].path;
  curr_track.load();

  // update details of the track
  track_name.textContent =
    "playing " +
    (track_index + 1) +
    " of " +
    track_list.length +
    ": " +
    track_list[track_index].name;

  // set an interval of 1000 milliseconds for updating the seek slider
  updateTimer = setInterval(seekUpdate, 1000);

  // move to the next track if the current one finishes playing
  curr_track.addEventListener("ended", nextTrack);
}

// reset values
function resetValues() {
  curr_time.textContent = "0:00";
  total_duration.textContent = "0:00";
  seek_slider.value = 0;
}

// checks if song is playing
function playpauseTrack() {
  if (!isPlaying) playTrack();
  else pauseTrack();
}

// plays track when play button is pressed
function playTrack() {
  curr_track.play();
  isPlaying = true;

  // replace icon with the pause icon
  playpause_btn.innerHTML =
    "<img class='ctrlimg'  src='https://file.garden/Zztv0a9yEhr5pmEq/pause.png'></img>";
}

// pauses track when pause button is pressed
function pauseTrack() {
  curr_track.pause();
  isPlaying = false;

  // replace icon with the play icon
  playpause_btn.innerHTML =
    "<img class='ctrlimg'  src='https://file.garden/Zztv0a9yEhr5pmEq/play.png'></img>";
}

// moves to the next track
function nextTrack() {
  if (track_index < track_list.length - 1) track_index += 1;
  else track_index = 0;
  loadTrack(track_index);
  playTrack();
}

// moves to the previous track
function prevTrack() {
  if (track_index > 0) track_index -= 1;
  else track_index = track_list.length;
  loadTrack(track_index);
  playTrack();
}

// seeker slider
function seekTo() {
  seekto = curr_track.duration * (seek_slider.value / 100);
  curr_track.currentTime = seekto;
}

function seekUpdate() {
  let seekPosition = 0;

  // check if the current track duration is a legible number
  if (!isNaN(curr_track.duration)) {
    seekPosition = curr_track.currentTime * (100 / curr_track.duration);
    seek_slider.value = seekPosition;

    // calculate the time left and the total duration
    let currentMinutes = Math.floor(curr_track.currentTime / 60);
    let currentSeconds = Math.floor(
      curr_track.currentTime - currentMinutes * 60,
    );
    let durationMinutes = Math.floor(curr_track.duration / 60);
    let durationSeconds = Math.floor(
      curr_track.duration - durationMinutes * 60,
    );

    // adding a zero to the single digit time values
    if (currentSeconds < 10) {
      currentSeconds = "0" + currentSeconds;
    }
    if (durationSeconds < 10) {
      durationSeconds = "0" + durationSeconds;
    }
    if (currentMinutes < 10) {
      currentMinutes = currentMinutes;
    }
    if (durationMinutes < 10) {
      durationMinutes = durationMinutes;
    }

    curr_time.textContent = currentMinutes + ":" + currentSeconds;
    total_duration.textContent = durationMinutes + ":" + durationSeconds;
  }
}

// load the first track in the tracklist
loadTrack(track_index);

// autoplay on page load
window.addEventListener("DOMContentLoaded", () => {
  playTrack();
});

function copyOne() {
  var copyText = document.getElementById("inputOne");
  navigator.clipboard.writeText(copyText.value);
  alert("Code has been pasted to your clipboard for generic theme!");
}

function copyTwo() {
  var copyText = document.getElementById("inputTwo");
  navigator.clipboard.writeText(copyText.value);
  alert("Code has been pasted to your clipboard for theme 1!");
}

function copyThree() {
  var copyText = document.getElementById("inputThree");
  navigator.clipboard.writeText(copyText.value);
  alert("Code has been pasted to your clipboard for theme 2!");
}

function copyFour() {
  var copyText = document.getElementById("inputFour");
  navigator.clipboard.writeText(copyText.value);
  alert("");
}

function copyFive() {
  var copyText = document.getElementById("inputFive");
  navigator.clipboard.writeText(copyText.value);
  alert("");
}

window.addEventListener("load", function () {
  var loadingScreen = document.querySelector(".loadingScreen");
  loadingScreen.style.display = "none";
});
document.addEventListener("DOMContentLoaded", function () {
  // === CONFIGURATION ===
  const FORM_ID = "1FAIpQLSc4UQZrjJfFgfdW5Fl2Fna57WmT28dXLNFd1g6ZcSX87L-PmA";
  const STORAGE_KEY = `pollVoted_${FORM_ID}`;

  // === DOM ELEMENTS ===
  const form = document.getElementById("pollForm");
  const voteBtn = document.getElementById("voteBtn");

  // === INPUTS ===
  const websiteUrl = document.getElementById("websiteUrl");
  const siteName = document.getElementById("siteName");
  const favoriteEpisodes = document.getElementById("favoriteEpisodes");
  const siteDescription = document.getElementById("siteDescription");
  const warnings = document.getElementById("warnings");
  const buttonLink = document.getElementById("buttonLink");

  const textInputs = [
    websiteUrl,
    siteName,
    favoriteEpisodes,
    siteDescription,
    warnings,
    buttonLink,
  ];

  // Fields required before submitting
  const requiredInputs = [
    websiteUrl,
    siteName,
    favoriteEpisodes,
    siteDescription,
  ];

  // === CHECK IF ALREADY SUBMITTED ===
  if (localStorage.getItem(STORAGE_KEY) === "true") {
    voteBtn.disabled = true;
    voteBtn.textContent = "Already Submitted";
  }

  // === ENABLE SUBMIT BUTTON ===
  textInputs.forEach((input) => {
    input.addEventListener("input", () => {
      if (localStorage.getItem(STORAGE_KEY) === "true") {
        return;
      }

      const filled = requiredInputs.every((input) => input.value.trim() !== "");

      voteBtn.disabled = !filled;
    });
  });

  // === SUBMIT TO GOOGLE FORMS ===
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (localStorage.getItem(STORAGE_KEY) === "true") {
      alert("You have already submitted this application.");
      return;
    }

    // Validate required fields
    for (const input of requiredInputs) {
      if (!input.value.trim()) {
        alert("Please fill out all required fields.");

        input.focus();

        return;
      }
    }

    // Collect Google Form fields
    const formData = new FormData(form);

    // Debug: shows what is being sent
    console.log("Submitting:");

    for (const pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }

    fetch(`https://docs.google.com/forms/d/e/${FORM_ID}/formResponse`, {
      method: "POST",
      mode: "no-cors",
      body: formData,
    })
      .then(() => {
        console.log("Submitted successfully");

        localStorage.setItem(STORAGE_KEY, "true");

        voteBtn.disabled = true;

        voteBtn.textContent = "Submitted!";

        form.innerHTML = `
        <center>
          <h2>Thanks for submitting!</h2>
          <p>Your application has been received.</p>
        </center>
      `;
      })

      .catch((error) => {
        console.error("Submission error:", error);

        alert(
          "There was an error submitting your application. Please try again.",
        );
      });
  });
});

const popup = document.getElementById("popup");
const closeBtn = document.getElementById("closeBtn");

// Show popup when page loads
window.addEventListener("load", () => {
    popup.style.display = "flex";
});

// Close popup
closeBtn.addEventListener("click", () => {
    popup.style.display = "none";
});

// Optional: Close when clicking outside the popup
popup.addEventListener("click", (e) => {
    if (e.target === popup) {
        popup.style.display = "none";
    }
});

document.getElementById("enter").addEventListener("click", () => {
  window.location.href = "goofygoober.html";
});

