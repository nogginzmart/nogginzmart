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
    name: "store ambiance",
    path: "https://files.catbox.moe/g1hdup.mp3",
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

function copyandpaste() {
  // Get the text field
  var copyText = document.getElementById("myInput");

  // Select the text field
  copyText.select();
  copyText.setSelectionRange(0, 99999); // For mobile devices

  // Copy the text inside the text field
  navigator.clipboard.writeText(copyText.value);

  // Alert the copied text
  alert(
    "the HTML was copied to your clipboard!! thanks for coming by! | " +
      copyText.value,
  );
}

window.addEventListener("load", function () {
  var loadingScreen = document.querySelector(".loadingScreen");
  loadingScreen.style.display = "none";
});
document.addEventListener("DOMContentLoaded", function () {
  // === CONFIGURATION ===
  const FORM_ID = "1FAIpQLSebET4RAzbH9Axr92kpowuKERceX0fzLKvHWjSWBkxmP7YWFQ"; // Google Form ID (from the form's URL)
  const SHEET_ID = "10zVyOMv0FE_F_99VgSHonsiHN_3xv0giq0-p280-XC4"; // Google Sheet ID (linked to form responses)
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
  form.querySelectorAll("input[name='entry.761438196']").forEach((radio) => {
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
      "input[name='entry.761438196']:checked",
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
      "Piracy Scary": "Piracy Scary",
      Convenience: "Convenience",
      "Can't afford MP3 Player, iPod, etc":
        "Can't afford MP3 Player, iPod, etc",
      "Haven't explored other options": "Haven't explored other options",
      "What's wrong with those platforms?":
        "What's wrong with those platforms?",
      "Other (answer in chatbox!)": "Other (answer in chatbox!)",
      "I have left these platforms for a better, ethical option! (share in chatbox!)":
        "I have left these platforms for a better, ethical option! (share in chatbox!)",
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

        // Count votes from responses
        rows.forEach((row) => {
          const answer = row.c[0]?.v;
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

document.getElementById("enter").addEventListener("click", () => {
    window.location.href = "home.html";
  });

  function setStyle(id,style,value)
{
    id.style[style] = value;
}
function opacity(el,opacity)
{
        setStyle(el,"filter:","alpha(opacity="+opacity+")");
        setStyle(el,"-moz-opacity",opacity/100);
        setStyle(el,"-khtml-opacity",opacity/100);
        setStyle(el,"opacity",opacity/100);
}
function calendar()
{
        var date = new Date();
        var day = date.getDate();
        var month = date.getMonth();
        var year = date.getYear();
        if(year<=200)
        {
                year += 1900;
        }
        months = new Array('January', 'February', 'March', 'April', 'May', 'June', 'Jully', 'August', 'September', 'October', 'November', 'December');
        days_in_month = new Array(31,28,31,30,31,30,31,31,30,31,30,31);
        if(year%4 == 0 && year!=1900)
        {
                days_in_month[1]=29;
        }
        total = days_in_month[month];
        var date_today = day+' '+months[month]+' '+year;
        beg_j = date;
        beg_j.setDate(1);
        if(beg_j.getDate()==2)
        {
                beg_j=setDate(0);
        }
        beg_j = beg_j.getDay();
        document.write('<table class="cal_calendar" onload="opacity(document.getElementById(\'cal_body\'),20);"><tbody id="cal_body"><tr><th colspan="7">'+date_today+'</th></tr>');
        document.write('<tr class="cal_d_weeks"><th>Sun</th><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th></tr><tr>');
        week = 0;
        for(i=1;i<=beg_j;i++)
        {
                document.write('<td class="cal_days_bef_aft">'+(days_in_month[month-1]-beg_j+i)+'</td>');
                week++;
        }
        for(i=1;i<=total;i++)
        {
                if(week==0)
                {
                        document.write('<tr>');
                }
                if(day==i)
                {
                        document.write('<td class="cal_today">'+i+'</td>');
                }
                else
                {
                        document.write('<td>'+i+'</td>');
                }
                week++;
                if(week==7)
                {
                        document.write('</tr>');
                        week=0;
                }
        }
        for(i=1;week!=0;i++)
        {
                document.write('<td class="cal_days_bef_aft">'+i+'</td>');
                week++;
                if(week==7)
                {
                        document.write('</tr>');
                        week=0;
                }
        }
        document.write('</tbody></table>');
        return true;
}
