const noMessages = [
  "Are you sure?",
  "Please...",
  "I will be very sad",
  "Last chance"
];

const yesMessages = [
  "Are you sure?",
  "100 percent?",
  "Do you really love me, Hiedi?"
];

let noIndex = 0;
let yesIndex = 0;
let musicStarted = false;
let heartsStarted = false;

const yesBtn = document.getElementById("yesBtn");
const noBtn  = document.getElementById("noBtn");
const question = document.getElementById("question");
const buttons = document.getElementById("buttons");
const final = document.getElementById("final");
const hint = document.getElementById("hint");
const song = document.getElementById("loveSong");
const playBtn = document.getElementById("playBtn");

const love3Left = document.getElementById("love3Left");
const love3Right = document.getElementById("love3Right");
const finalCluster = document.getElementById("finalCluster");

// Start falling roses immediately
startRoses();

yesBtn.addEventListener("click", handleYesClick);
noBtn.addEventListener("click", handleNoClick);
playBtn.addEventListener("click", () => tryPlaySong(true));

// Extra safety: if loop fails for any reason, restart
song.addEventListener("ended", () => {
  song.currentTime = 0;
  song.play().catch(()=>{});
});

function handleNoClick(){
  noBtn.textContent = noMessages[noIndex];
  noIndex = (noIndex + 1) % noMessages.length;

  const size = parseFloat(getComputedStyle(yesBtn).fontSize);
  const next = Math.min(size * 1.18, 64);
  yesBtn.style.fontSize = next + "px";

  noBtn.animate(
    [{ transform:"translateX(0)"},{ transform:"translateX(-6px)"},{ transform:"translateX(6px)"},{ transform:"translateX(0)"}],
    { duration: 220, easing:"ease-out" }
  );
}

function handleYesClick(){
  if (!musicStarted) tryPlaySong(false);

  if (yesIndex < yesMessages.length){
    question.textContent = yesMessages[yesIndex];
    yesIndex++;
    return;
  }

  question.classList.add("hidden");
  buttons.classList.add("hidden");
  hint.textContent = "";
  final.classList.remove("hidden");

  love3Left.classList.add("hidden");
  love3Right.classList.add("hidden");

  finalCluster.classList.remove("hidden");

  if (!heartsStarted){
    heartsStarted = true;
    startHearts();
  }
}

async function tryPlaySong(fromButton){
  try{
    song.volume = 0.45;
    await song.play();
    musicStarted = true;
    playBtn.classList.add("hidden");
    hint.textContent = "";
  }catch(e){
    musicStarted = false;
    if (!final.classList.contains("hidden")){
      playBtn.classList.remove("hidden");
    } else {
      hint.textContent = "If music doesn’t start, it will appear at the end: tap 'Play music'.";
    }
  }
}

/* Falling ROSES (🌹) */
function startRoses(){
  const container = document.getElementById("roses-container");

  setInterval(() => {
    const rose = document.createElement("div");
    rose.className = "rose";
    rose.textContent = "🌹";

    rose.style.left = (Math.random() * 100) + "vw";
    const size = 18 + Math.random() * 26; // 18-44px
    rose.style.fontSize = size + "px";

    const dur = 5 + Math.random() * 5; // 5-10s
    rose.style.animationDuration = dur + "s";

    rose.style.setProperty("--rot", (Math.random() * 260 - 130).toFixed(0) + "deg");

    container.appendChild(rose);

    setTimeout(() => rose.remove(), Math.ceil(dur * 1000) + 500);
  }, 200);
}

/* Hearts at final */
function startHearts(){
  const container = document.getElementById("hearts-container");

  for (let i = 0; i < 16; i++){
    setTimeout(() => spawnHeart(container, true), i * 60);
  }

  setInterval(() => {
    spawnHeart(container, false);
  }, 260);
}

function spawnHeart(container, isBurst){
  const heart = document.createElement("div");
  heart.className = "heart";
  heart.textContent = "❤️";

  const left = Math.random() * 100;
  const size = 14 + Math.random() * 26;
  const dur  = (isBurst ? 4 : 5) + Math.random() * 3;
  const drift = (Math.random() * 140 - 70).toFixed(0) + "px";
  const rot = (Math.random() * 140 - 70).toFixed(0) + "deg";

  heart.style.left = left + "vw";
  heart.style.fontSize = size + "px";
  heart.style.animationDuration = dur + "s";
  heart.style.setProperty("--drift", drift);
  heart.style.setProperty("--rot", rot);

  container.appendChild(heart);

  const ttl = Math.ceil(dur * 1000) + 500;
  setTimeout(() => heart.remove(), ttl);
}
