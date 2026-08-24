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
    name: "Where'd All The Time Go? - Dr. Dog",
    path: "https://nogginzmart.neocities.org/music/about1.ogg",
  },
  {
    name:"Pepper - Butthole Surfers",
    path:"https://nogginzmart.neocities.org/music/DTTKIF_1.ogg",
  },
  {
    name:"Birdhouse in Your Soul - We Might Be Giants",
    path:"https://nogginzmart.neocities.org/music/about_2.ogg",
  },
  {
    name:"Bang The Doldrums - Fall Out Boy",
    path:"https://nogginzmart.neocities.org/music/about4.ogg",
  },
  {
    name:"Early Sunsets Over Monroeville - My Chemical Romance",
    path:"https://nogginzmart.neocities.org/music/about6.ogg",
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
    const factEl = document.querySelector("#randomfact");

    if (!btn || !factEl) return;

    btn.addEventListener("click", () => {
      const currentItem = factEl.innerHTML ? factEl.innerHTML : false;
      factEl.innerHTML = generateRandomItem(
        [
          "I thought my family got excommunicated from the Catholic church after the last time we went.<br>we got grounded & had to pick up cigarette butts around our property.<br> We never did go back to church.",
          "When I step outside, if it's too bright, I will sneeze!",
          "I only started making this website because I was bored over the summer, <br>stuck in my parents' house with no job",
          "I played trumpet all through middle school & highschool!",
          "When choosing my instrument going into middle school band, I didn't know the difference between trumpet & trombone. <br>Least I didn't hate playing the trumpet",
          "I've broken my dominant arm twice!<br>",
          "I came out as gay at 10 years old!",
          "I got my driver's liscense at 20 years old",
          "I'm scared of the Spongebob Squarepants ending credits song.",
          "I wanted to be an animator<br>then I realized I didn't like drawing THAT many things",
          "I was a chronic shoplifter from 15 to 17<br>I still do it sometimes",
          "I didn't have my own phone till I was a freshman in highschool!",
          "I had 1 random edit I made on Instagram get 1000 likes",
          "I can't ride a bike",
          "I can't swim<br>probably because I've almost drowned several times",
          "When I was a kid, I used to lie & say my parents would<br>bring cupcakes to class for my birthday<br>least no one gave me shit for it",
          "I won a math bee in 4th grade!<br>fuck you 12's times tables",
          "I ate those silca beads as a toddler & my dad called poison control<br>I was fine lol",
          "I got scarlett fever at 6",
          "I'm agnostic & practice Pagan spiritualism<br>I consider myself a witch!",
          "as of writing this, I'm still a virgin",
          "I forged my mum's signature on a bad grade in 1st grade<br>my mum threatened to take me to the police to<br>'teach me a lesson'<br>I was grounded for WEEKS",
          "I have 4 calendars<br>hourly, weekly, & 2 monthly<br>send help",
          "my ass NEEDS to graduate university<br>class of EVENTUALLY",
          "I've changed my major 3 times in university<br>microbiology to english to accounting",
          "I've made more friends online than in person",
          "I did cheerleading & soccer as a little kid!",
          "I've sang in multiple talent shows!",
          "I would've failed Geometry in highschool if it weren't for COVID",
          "I never owned my own gaming console till college<br>of which being my DS Lite & 3DS XL",
          "I don't tell many people IRL what my website is<br>I need my privacy LOL",
          "I collected Pokemon cards in intermediate school!<br>I still have most of them!",
          "I would kill to swing on a swing set for hours",
          "in middle school when I was a super loner <br>I'd read books in my dad's collection<br>read Ender's Game, Of Mice & Men, Carrie, & The Outsiders that way",
          "I have always had impeccable timing",
          "I once wrote a 27 page creative writing essay in middle school",
          "platforms I've been on (in order) is <br>Google +, Tumblr, Amino, Instagram, & Twitter",
          "most of my early internet access was through our family computer<br>imagine sharing 1 computer with 5 other people<br>(excluding my mom)",
          "I always have dreams of running away from middle or high school",
          "I tried running away at 7<br>I didn't get very far before the police found me",
          "I've been on antidepressants since 13",
          "I came out as trans at 13!",
          "my first chosen name was Charlie",
          "my favorite wax melt is Better Homes & Gardens'<br>'Farmhouse Pumpkin Patch'<br>you can get it at Walmart",
          "My parents didn't like us watching Adventure Time, Chowder,<br>Ed, Edd, & Eddy, & Invader Zim<br>growing up<br>we watched them anyway",
          "I don't believe Wyoming, Idaho, & Ohio exist",
          "I used to lie in elementary school that I was allergic<br>to peanut butter so I didn't have to eat it",
          "I have 3 siblings!",
          "I've gone by Lee since 8th grade",
          "I'm left handed!",
          "SEGA & DIC let me rewrite Sonic Underground<br> please please please",
          "if it weren't for school & work, I'm pretty much a NEET",
          "I was banned from the official Undertale Amino<br>I get sassy ONCE & I'm banned forever smh",
          "I got banned from Netpass <br>(online Streetpass for 3DS family of consoles)<br>for 4 months because I named my Tomodachi Life island<br>'Faggotry Island'",
          "I was part of the 2018 mass Tumblr exodus to Twitter",
          "that I'm awesome & cool & gay & evil",
          "my birthday 2018 was the worst. birthday. EVER",
          "I despise being bored<br>I will find something to do",
          "I wrote a series of Mario Cat comic books in intermediate school<br>my little brother still has most of them",
          "I genuienly didn't think Omori was going to come out",
          "although I'm usually live in organized chaos,<br>I can't stand my apartment or room being dirty",
          "I used to wish as a kid that I would get my own fairy god parents<br>I think that was probably a sign LMAO",
        ],
        currentItem
      );
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    initRandomFactAboutMe();
  });
})();

document.getElementById("enter").addEventListener("click", () => {
    window.location.href = "about.html";
  });
