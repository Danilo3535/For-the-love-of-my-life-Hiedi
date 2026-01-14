let noMessages = [
    "Are you sure?",
    "Please...",
    "I will be very sad",
    "Last chance"
];

let yesMessages = [
    "Are you sure?",
    "100 percent?",
    "Do you really love me, Hiedi?"
];

let noIndex = 0;
let yesIndex = 0;
let musicStarted = false;

function handleNoClick() {
    const noBtn = document.querySelector(".no-button");
    const yesBtn = document.querySelector(".yes-button");

    noBtn.textContent = noMessages[noIndex];
    noIndex = (noIndex + 1) % noMessages.length;

    let size = parseFloat(getComputedStyle(yesBtn).fontSize);
    yesBtn.style.fontSize = (size * 1.3) + "px";
}

function handleYesClick() {
    const question = document.getElementById("question");
    const buttons = document.querySelector(".buttons");
    const finalMessage = document.getElementById("final-message");
    const song = document.getElementById("loveSong");

    if (!musicStarted) {
        song.volume = 0.5;
        song.play();
        musicStarted = true;
    }

    if (yesIndex < yesMessages.length) {
        question.textContent = yesMessages[yesIndex];
        yesIndex++;
    } else {
        question.style.display = "none";
        buttons.style.display = "none";
        finalMessage.classList.remove("hidden");
        startHearts();
    }
}

function startHearts() {
    const container = document.getElementById("hearts-container");

    setInterval(() => {
        const heart = document.createElement("div");
        heart.className = "heart";
        heart.innerHTML = "❤️";
        heart.style.left = Math.random() * 100 + "vw";
        heart.style.fontSize = (15 + Math.random() * 20) + "px";
        heart.style.animationDuration = (4 + Math.random() * 4) + "s";
        container.appendChild(heart);

        setTimeout(() => heart.remove(), 8000);
    }, 300);
}


