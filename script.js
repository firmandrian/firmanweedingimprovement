/*
  KONFIGURASI UNDANGAN FIRMAN & FADIA
  - Isi nomor WhatsApp penerima RSVP di WHATSAPP_NUMBER.
  - Simpan musik di assets/the-way-you-look-at-me.mp3.
*/

const WHATSAPP_NUMBER = "GANTI_DENGAN_NOMOR_WA";

const cover = document.getElementById("cover");
const openButton = document.getElementById("openInvite");
const musicButton = document.getElementById("musicButton");

const weddingMusic = new Audio("assets/the-way-you-look-at-me.mp3");
weddingMusic.loop = true;
weddingMusic.volume = 0.5;

async function toggleMusic() {
  if (weddingMusic.paused) {
    try {
      await weddingMusic.play();
      musicButton.textContent = "♫ Musik: On";
    } catch (error) {
      console.error("Musik gagal diputar:", error);
      musicButton.textContent = "♫ Musik: Off";
      alert("Musik gagal diputar. Pastikan file assets/the-way-you-look-at-me.mp3 tersedia dan dapat diputar browser.");
    }
  } else {
    weddingMusic.pause();
    musicButton.textContent = "♫ Musik: Off";
  }
}

openButton.addEventListener("click", async () => {
  cover.classList.add("closed");
  document.body.classList.remove("locked");
  musicButton.hidden = false;
  if (weddingMusic.paused) await toggleMusic();
});

musicButton.addEventListener("click", toggleMusic);

// Countdown menuju akad, 27 Maret 2027 pukul 09.00 WIB.
const weddingDate = new Date("2027-03-27T09:00:00+07:00").getTime();

function updateCountdown() {
  const diff = weddingDate - Date.now();
  const countdown = document.getElementById("countdown");

  if (diff <= 0) {
    countdown.innerHTML = "<p>Hari bahagia kami telah tiba. Terima kasih telah menjadi bagian dari cerita kami! ♡</p>";
    return;
  }

  const values = {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000)
  };

  Object.entries(values).forEach(([id, value]) => {
    const element = document.getElementById(id);
    if (element) element.textContent = String(value).padStart(2, "0");
  });
}

updateCountdown();
setInterval(updateCountdown, 1000);

// RSVP melalui WhatsApp.
document.getElementById("rsvpForm").addEventListener("submit", (event) => {
  event.preventDefault();

  if (WHATSAPP_NUMBER === "GANTI_DENGAN_NOMOR_WA") {
    alert("RSVP belum diaktifkan. Isi nomor WhatsApp penerima pada variabel WHATSAPP_NUMBER di script.js.");
    return;
  }

  const name = document.getElementById("guestName").value.trim();
  const attendance = document.getElementById("attendance").value;
  const guests = document.getElementById("guests").value;
  const wish = document.getElementById("wish").value.trim();

  const message =
    `Assalamu'alaikum, saya ingin mengonfirmasi undangan pernikahan Firman & Fadia.` +
    `%0A%0ANama: ${encodeURIComponent(name)}` +
    `%0AKehadiran: ${encodeURIComponent(attendance)}` +
    `%0AJumlah tamu: ${encodeURIComponent(guests)}` +
    `%0AUcapan & doa: ${encodeURIComponent(wish || "-")}`;

  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank", "noopener");
});

// Animasi elemen saat masuk ke area layar (scroll reveal).
const revealElements = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealElements.forEach((element) => revealObserver.observe(element));

// Kelopak bunga kecil yang jatuh perlahan.
const petalLayer = document.querySelector(".petal-layer");
function createPetal() {
  if (!petalLayer || document.hidden) return;
  const petal = document.createElement("span");
  petal.className = "petal";
  petal.style.left = `${Math.random() * 100}%`;
  petal.style.setProperty("--drift", `${Math.random() * 150 - 75}px`);
  petal.style.animationDuration = `${8 + Math.random() * 7}s`;
  petal.style.opacity = `${0.25 + Math.random() * 0.35}`;
  petalLayer.appendChild(petal);
  setTimeout(() => petal.remove(), 16000);
}
setInterval(createPetal, 950);
