// Config
const birthdayDateAD = "2026-01-21";
const messages = {
    header: "สุขสันต์วันเกิด จัสมิน 🌸🎂\nขอให้มีความสุขมาก ๆ นะ 💖",
    surprises: {
        step1: "เธอคือความสดใสของโลกใบนี้ ✨",
        step2: "ขอบคุณที่เกิดมานะ ❤️"
    }
};

// Elements
const typeText = document.getElementById('typewriterText');
const ageDisplay = document.getElementById('ageDisplay');
const btn1 = document.getElementById('btnStep1');
const btn2 = document.getElementById('btnStep2');
const btn3 = document.getElementById('btnStep3');
const bgMusic = document.getElementById('bgMusic');
const clickSound = document.getElementById('clickSound');
const musicToggle = document.getElementById('musicToggle');

// State
let isMusicPlaying = false;

// Init
window.onload = () => {
    startsakuraLoop();
    calculateAge();
    typeWriter(messages.header, 0);
};

// Typewriter
function typeWriter(text, i) {
    if (i < text.length) {
        typeText.innerHTML = text.substring(0, i + 1) + '<span class="cursor">|</span>';
        setTimeout(() => typeWriter(text, i + 1), 100);
    } else {
        typeText.innerHTML = text.replace(/\n/g, '<br>');
    }
}

// Age
function calculateAge() {
    const today = new Date();
    const birthDate = new Date(birthdayDateAD);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    ageDisplay.textContent = age < 0 ? "(รอวันเกิด...)" : `อายุ ${age} ปี`;
}

// Audio Engine
function toggleMusic() {
    if (isMusicPlaying) {
        bgMusic.pause();
        isMusicPlaying = false;
        musicToggle.classList.remove('playing');
        musicToggle.innerHTML = "<span>🎵</span>"; // Muted icon?
    } else {
        bgMusic.volume = 0.3;
        bgMusic.play().then(() => {
            isMusicPlaying = true;
            musicToggle.classList.add('playing');
            musicToggle.innerHTML = "<span>🔥</span>"; // Flame or note
        }).catch(e => console.log("Audio block/missing:", e));
    }
}

function playClick() {
    clickSound.currentTime = 0;
    clickSound.play().catch(() => { });
}

// Auto-play on first interaction if needed, but user has explicit toggle now.
// We can auto-start on first click of ANY button too.
function ensureMusic() {
    if (!isMusicPlaying && bgMusic.paused) {
        toggleMusic();
    }
}

// Music Button
musicToggle.addEventListener('click', (e) => {
    e.stopPropagation(); // Prevent ensuring music twice
    toggleMusic();
    playClick();
});

// Sakura
function createSakura(amount = 1) {
    const container = document.getElementById('sakuraContainer');
    for (let i = 0; i < amount; i++) {
        const petal = document.createElement('div');
        petal.classList.add('sakura');
        const size = Math.random() * 10 + 10;
        const left = Math.random() * 100;
        const duration = Math.random() * 3 + 5;
        petal.style.width = `${size}px`;
        petal.style.height = `${size}px`;
        petal.style.left = `${left}%`;
        petal.style.animationDuration = `${duration}s`;
        container.appendChild(petal);
        setTimeout(() => petal.remove(), duration * 1000);
    }
}

function startsakuraLoop() { setInterval(() => createSakura(1), 500); }
function burstSakura() { createSakura(30); }

// Steps
btn1.addEventListener('click', () => {
    playClick();
    ensureMusic(); // Auto start music
    burstSakura();
    btn1.classList.add('hidden');
    btn2.classList.remove('hidden');
    typeText.innerHTML = messages.surprises.step1;
});

btn2.addEventListener('click', () => {
    playClick();
    burstSakura();
    btn2.classList.add('hidden');
    btn3.classList.remove('hidden');
    typeText.innerHTML = messages.surprises.step2;
});

btn3.addEventListener('click', () => {
    // Final Surprise Message
    ensureMusic(); // Make sure music is playing!
    typeText.innerHTML = "สุขสันต์วันเกิดนะคนเก่ง! 🎂<br>ขอบคุณที่เป็นความสุขของเค้านะ 💖<br>รักจัสมินที่สุดเลย! ✨";
    // Optional: confetti or more effects could go here
    createSakura(50);
});
