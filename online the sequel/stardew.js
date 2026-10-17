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
    name: "Summer (Nature's Crescendo) - Stardew Valley OST",
    path: "https://nogginzmart.discount/music/stardew1.ogg",
  },
  {
    name:"Ready Now - Dodie (Moominvalley (2019) OST)",
    path:"https://nogginzmart.discount/music/stardew2.ogg",
  },
  {
    name:"Stardew Valley Fair Theme - Stardew Valley OST",
    path:"https://nogginzmart.discount/music/stardew3.ogg",
  },
  {
    name:"Such Great Heights - Iron & Wine",
    path:"https://nogginzmart.discount/music/stardew4.ogg",
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

document.addEventListener("DOMContentLoaded", function () {
  // === CONFIGURATION ===
  const FORM_ID = "1FAIpQLSdj8EaE3P-9w_S3DTCNqj6onN5scMZrKn8hDWTmpK-pExXFWw"; // Google Form ID (from the form's URL)
  const SHEET_ID = "1EuGUonjtVQCnNAceMlrS4AzPMyBvdr-BRAWbRVwozxY"; // Google Sheet ID (linked to form responses)
  const STORAGE_KEY = `pollVoted_${FORM_ID}`; // LocalStorage key to track if this browser already voted

  // === DOM ELEMENTS ===
  const form = document.getElementById("pollForm");
  const voteBtn = document.getElementById("voteBtn");
  const resultsBtn = document.getElementById("resultsBtn");
  const resultsSection = document.getElementById("results");

  // === INITIAL STATE ===
  // If this browser already voted, disable the vote button but allow viewing results
  if (localStorage.getItem(STORAGE_KEY) === "true") {
    voteBtn.disabled = true;
    resultsBtn.disabled = false;
  }

  // === ENABLE VOTING WHEN USER SELECTS AN OPTION ===
  form.querySelectorAll("input[name='entry.1503332910']").forEach((radio) => {
    radio.addEventListener("change", () => {
      // Enable "Other" text input only if "Other" is selected
      // if (otherRadio.checked) {
      //   otherInput.disabled = false;
      // } else {
      //   otherInput.disabled = true;
      //   otherInput.value = "";
      // }

      // Enable vote button if user hasn’t already voted
      if (!localStorage.getItem(STORAGE_KEY)) {
        voteBtn.disabled = false;
      }
    });
  });

  // === HANDLE FORM SUBMISSION ===
  form.addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent page reload

    // Block duplicate votes
    if (localStorage.getItem(STORAGE_KEY) === "true") {
      alert("You’ve already voted from this browser.");
      return;
    }

    // Require a selected option
    const selected = form.querySelector(
      "input[name='entry.1503332910']:checked",
    );
    if (!selected) {
      alert("Please select an answer.");
      return;
    }

    // Require text if "Other" is chosen
    // if (otherRadio.checked && !otherInput.value.trim()) {
    //   alert("Please enter your custom answer.");
    //   return;
    // }

    // Prepare data to send
    const formData = new FormData(form);

    // Submit vote directly to the Google Form
    fetch(`https://docs.google.com/forms/d/e/${FORM_ID}/formResponse`, {
      method: "POST",
      mode: "no-cors", // Required: avoids CORS issues but prevents reading response
      body: formData,
    })
      .then(() => {
        // Mark as voted in localStorage
        localStorage.setItem(STORAGE_KEY, "true");

        // Update UI
        voteBtn.disabled = true;
        resultsBtn.disabled = false;
        resultsSection.innerHTML = "<p>Thanks for voting!</p>";
      })
      .catch(() => {
        alert("Error submitting vote. Please try again.");
      });
  });

  // === FETCH AND DISPLAY RESULTS ===
  resultsBtn.addEventListener("click", function () {
    form.style.display = "none";
    resultsSection.style.display = "block";
    resultsSection.textContent = "Loading results...";

    // Map full Google Form answers to short labels
    const optionLabels = {
      "Abigail": "Abigail",
      "Alex": "Alex",
      "Claire (Stardew Expanded)":
        "Claire (Stardew Expanded)",
      "Elliot": "Elliot",
      "Emily":
        "Emily",
      "Haley": 
      "Haley",
      "Harvey": "Harvey",
      "Lance (Stardew Expanded)": "Lance (Stardew Expanded)",
      "Leah": "Leah",
      "Magnus (Stardew Expanded)": "Magnus (Stardew Expanded)",
      "Olivia (Stardew Expanded)": "Olivia (Stardew Expanded)",
      "Penny": "Penny",
      "Sam": "Sam",
      "Scarlet (Stardew Expanded)": "Scarlet (Stardew Expanded)",
      "Sebastian": "Sebastian",
      "Shane": "Shane",
      "Sophia (Stardew Expanded)": "Sophia (Stardew Expanded)",
      "Victor (Stardew Expanded)": "Victor (Stardew Expanded)",
    };

    // Initialize counts to 0 for all options
    const counts = {};
    for (const fullAnswer in optionLabels) {
      counts[fullAnswer] = 0;
    }

    // Google Sheets "gviz" endpoint returns JSON wrapped in a function call
    fetch(`https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?`)
      .then((res) => res.text())
      .then((text) => {
        // Extract JSON from wrapper
        const match = text.match(
          /google\.visualization\.Query\.setResponse\((.*)\);/s,
        );
        if (!match) throw new Error("Invalid response format");
        const data = JSON.parse(match[1]);
        // Each row is one form response
        const rows = data.table.rows;

        /// Count votes from responses
        rows.forEach((row) => {
          const answer = row.c[1]?.v;
          if (answer && counts.hasOwnProperty(answer)) {
            counts[answer]++;
          }
        });

        // Total number of votes
        const totalVotes = Object.values(counts).reduce(
          (sum, count) => sum + count,
          0,
        );

        // Highest vote count (optional, only needed if you want relative bar widths)
        const maxVotes = Math.max(...Object.values(counts), 0);

        // Render results with short labels and proper pluralization
        let html = "<center><h1>Results</h1></center><ul>";

        for (const fullAnswer in counts) {
          const count = counts[fullAnswer];
          const label = optionLabels[fullAnswer] || fullAnswer;
          const voteLabel = count === 0 ? "vote" : "votes";

          // Percentage of total votes
          const percent =
            totalVotes > 0 ? Math.round((count / totalVotes) * 100) : 0;

          // Width relative to the most popular option (only if desired)
          const widthPercent = maxVotes > 0 ? (count / maxVotes) * 100 : 0;

          html += `
    <li>
      <div style="font-size:13px;margin-bottom:4px;">
        ${label} — ${count} ${voteLabel}
      </div>

      <progress class="progress-indicator" max="100" value="${percent}"></progress>
    </li>
  `;
        }

        html += "</ul>";
        resultsSection.innerHTML = html;
      })
      .catch((err) => {
        resultsSection.textContent = "Error loading results: " + err.message;
      });
  });
});

(function() {
  function generateRandomItem(items, lastItem) {
    let randomItem = items[Math.floor(Math.random() * items.length)];
    if (!lastItem) return randomItem;

    while (randomItem == lastItem) {
      randomItem = items[Math.floor(Math.random() * items.length)];
    }
    return randomItem;
  }

  function initRandomFactAboutMe() {
    const btn = document.querySelector("#gimmerandomfact");
    const factEl = document.querySelector("#fortune");

    if (!btn || !factEl) return;

    btn.addEventListener("click", () => {
      const currentItem = factEl.innerHTML ? factEl.innerHTML : false;
      factEl.innerHTML = generateRandomItem(
        [
          "The spirits are very displeased today. They will do their best to make your life difficult.",
          "The spirits are somewhat annoyed today. Luck will not be on your side.",
          "The spirits feel neutral today. The day is in your hands.",
          "This is rare. The spirits feel absolutely neutral today.",
          "The spirits are in good humor today. I think you'll have a little extra luck.",
          "The spirits are very happy today! They will do their best to shower everyone with good fortune.",
        ],
        currentItem
      );
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    initRandomFactAboutMe();
  });
})();

const images = [
  "https://nogginzmart.discount/catbox%20aint%20working/stardew/abigail.jpg",
  "https://nogginzmart.discount/catbox%20aint%20working/stardew/alex.jpg",
  "https://nogginzmart.discount/catbox%20aint%20working/stardew/andy.jpg",
  "https://nogginzmart.discount/catbox%20aint%20working/stardew/apples.jpg",
  "https://nogginzmart.discount/catbox%20aint%20working/stardew/caroline.jpg",
  "https://nogginzmart.discount/catbox%20aint%20working/stardew/claire.jpg",
  "https://nogginzmart.discount/catbox%20aint%20working/stardew/clint.jpg",
  "https://nogginzmart.discount/catbox%20aint%20working/stardew/demetrius.jpg",
  "https://nogginzmart.discount/catbox%20aint%20working/stardew/dwarf.jpg",
  "https://nogginzmart.discount/catbox%20aint%20working/stardew/elliot.jpg",
  "https://nogginzmart.discount/catbox%20aint%20working/stardew/emily.jpg",
  "https://nogginzmart.discount/catbox%20aint%20working/stardew/evenlyn.jpg",
  "https://nogginzmart.discount/catbox%20aint%20working/stardew/george.jpg",
  "https://nogginzmart.discount/catbox%20aint%20working/stardew/gunther.jpg",
  "https://nogginzmart.discount/catbox%20aint%20working/stardew/gus.jpg",
  "https://nogginzmart.discount/catbox%20aint%20working/stardew/haley.jpg",
  "https://nogginzmart.discount/catbox%20aint%20working/stardew/harvey.jpg",
  "https://nogginzmart.discount/catbox%20aint%20working/stardew/henchman.jpg",
  "https://nogginzmart.discount/catbox%20aint%20working/stardew/jas.jpg",
  "https://nogginzmart.discount/catbox%20aint%20working/stardew/jodi.jpg",
  "https://nogginzmart.discount/catbox%20aint%20working/stardew/kent.jpg",
  "https://nogginzmart.discount/catbox%20aint%20working/stardew/krobus.jpg",
  "https://nogginzmart.discount/catbox%20aint%20working/stardew/lance.jpg",
  "https://nogginzmart.discount/catbox%20aint%20working/stardew/leah.jpg",
  "https://nogginzmart.discount/catbox%20aint%20working/stardew/leo.jpg",
  "https://nogginzmart.discount/catbox%20aint%20working/stardew/lewis.jpg",
  "https://nogginzmart.discount/catbox%20aint%20working/stardew/linus.jpg",
  "https://nogginzmart.discount/catbox%20aint%20working/stardew/marlon.jpg",
  "https://nogginzmart.discount/catbox%20aint%20working/stardew/marnie.jpg",
  "https://nogginzmart.discount/catbox%20aint%20working/stardew/martin.jpg",
  "https://nogginzmart.discount/catbox%20aint%20working/stardew/maru.jpg",
  "https://nogginzmart.discount/catbox%20aint%20working/stardew/morgan.jpg",
  "https://nogginzmart.discount/catbox%20aint%20working/stardew/morris.jpg",
  "https://nogginzmart.discount/catbox%20aint%20working/stardew/olivia.jpg",
  "https://nogginzmart.discount/catbox%20aint%20working/stardew/pam.jpg",
  "https://nogginzmart.discount/catbox%20aint%20working/stardew/penny.jpg",
  "https://nogginzmart.discount/catbox%20aint%20working/stardew/pierre.jpg",
  "https://nogginzmart.discount/catbox%20aint%20working/stardew/robin.jpg",
  "https://nogginzmart.discount/catbox%20aint%20working/stardew/sam.jpg",
  "https://nogginzmart.discount/catbox%20aint%20working/stardew/sandy.jpg",
  "https://nogginzmart.discount/catbox%20aint%20working/stardew/scarlett.jpg",
  "https://nogginzmart.discount/catbox%20aint%20working/stardew/sebastian.jpg",
  "https://nogginzmart.discount/catbox%20aint%20working/stardew/shane.jpg",
  "https://nogginzmart.discount/catbox%20aint%20working/stardew/sophia.jpg",
  "https://nogginzmart.discount/catbox%20aint%20working/stardew/susan.jpg",
  "https://nogginzmart.discount/catbox%20aint%20working/stardew/victor.jpg",
  "https://nogginzmart.discount/catbox%20aint%20working/stardew/vincent.jpg",
  "https://nogginzmart.discount/catbox%20aint%20working/stardew/willy.jpg",
  "https://nogginzmart.discount/catbox%20aint%20working/stardew/wizard.jpg",
];

document.getElementById("btn").addEventListener("click", function() {
  const randomIndex = Math.floor(Math.random() * images.length);
  document.getElementById("randomImage").src = images[randomIndex];
});