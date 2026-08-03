/*
  EDIT THE INVITATION HERE
  Every visible detail, destination link, image path and music option is kept in
  this single object. To use your own licensed audio file, add it to assets
  and set music.trackUrl to "assets/your-song.mp3".
*/
const INVITATION = {
  groomName: "Libin",
  brideName: "Diya",
  groomParents: "Babu & Lisy",
  groomSister: "Binci",
  groomBrotherInLaw: "Nijith",
  groomNiece: "Norah",
  brideParents: "James & Baby",
  brideSister: "Dini",
  brideBrotherInLaw: "Jinith",
  brideNephew: "Ayaan",
  weddingDay: "25",
  weddingMonthShort: "Oct",
  weddingYear: "2026",
  weddingDateLong: "25 October 2026",
  weddingTime: "11.30 am",
  receptionDate: "25 October 2026",
  receptionTime: "12.30 – 2.30 pm",
  weddingMoment: "2026-10-25T11:30:00+05:30",
  churchVenue: "St. Mary's Orthodox Cathedral, Pazhanji",
  churchMap: "https://www.google.com/maps/place/St.+Mary's+Orthodox+Cathedral,+Pazhanji/@10.6888936,76.0504304,1108m/data=!3m1!1e3!4m10!1m2!2m1!1spazhanji+palli+address!3m6!1s0x3ba7bfb7861658e1:0xdcba8eb0e8af1eaa!8m2!3d10.6888936!4d76.0504304!15sChZwYXpoYW5qaSBwYWxsaSBhZGRyZXNzIgJIAZIBD29ydGhvZG94X2NodXJjaOABAA!16zL20vMGdmOXBi?entry=ttu&g_ep=EgoyMDI2MDcyOC4wIKXMDSoASAFQAw%3D%3D",
  receptionVenue: "Paul's Auditorium, Pazhanji",
  receptionMap: "https://www.google.com/maps/place/Paul's+Auditorium/@10.6890667,76.054995,1108m/data=!3m2!1e3!4b1!4m6!3m5!1s0x3ba7bfbf1890e0f7:0x65dfd52679aafce9!8m2!3d10.6890614!4d76.0575699!16s%2Fg%2F1vgw_5df?entry=ttu&g_ep=EgoyMDI2MDcyOS4wIKXMDSoASAFQAw%3D%3D",
  assets: {
    cover: "assets/cover-optimized.jpg",
    floral: "assets/floral-bg.jpg",
    monogram: "assets/monogram.jpg",
    couple: "assets/couple.jpg",
    church: "assets/church.jpg",
    ringDiya: "assets/Diya.png",
    ringLibin: "assets/Libin.png",
    wineGlasses: "assets/wine-glasses.png"
  },
  music: {
    // Replace this file path whenever you want to use a different licensed song.
    trackUrl: "assets/wedding-background.mp3"
  }
};

window.INVITATION = INVITATION;

const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

function fillInvitationText() {
  $$('[data-text]').forEach((element) => {
    const value = INVITATION[element.dataset.text];
    if (value !== undefined) element.textContent = value;
  });
  $('#churchMap').href = INVITATION.churchMap;
  $('#receptionMap').href = INVITATION.receptionMap;
  $$('[data-asset]').forEach((element) => {
    const source = INVITATION.assets[element.dataset.asset];
    if (source) element.src = source;
  });
  const rootStyle = document.documentElement.style;
  rootStyle.setProperty('--cover-image', `url("${INVITATION.assets.cover}")`);
  rootStyle.setProperty('--floral-image', `url("${INVITATION.assets.floral}")`);
  document.title = `${INVITATION.groomName} weds ${INVITATION.brideName} | ${INVITATION.weddingDateLong}`;
}

function makePetals() {
  $$('.petal-field').forEach((field, fieldIndex) => {
    for (let index = 0; index < 10; index += 1) {
      const petal = document.createElement('i');
      petal.className = 'petal';
      petal.style.left = `${(index * 29 + fieldIndex * 19) % 104 - 2}%`;
      petal.style.setProperty('--size', `${5 + ((index * 7 + fieldIndex) % 8)}px`);
      petal.style.setProperty('--duration', `${10 + ((index * 3 + fieldIndex) % 9)}s`);
      petal.style.setProperty('--delay', `${-((index * 1.7 + fieldIndex) % 11)}s`);
      petal.style.setProperty('--drift', `${-55 + ((index * 31 + fieldIndex * 7) % 110)}px`);
      field.appendChild(petal);
    }
  });
}

function initCover() {
  const cover = $('#cover');
  const celebration = $('#celebration');
  const opener = $('#openInvitation');
  let opened = false;

  opener.addEventListener('click', () => {
    if (opened) return;
    opened = true;
    cover.classList.add('is-leaving');
    startMusic();
    window.setTimeout(() => celebration.scrollIntoView({ behavior: 'smooth', block: 'start' }), 340);
  });
}

function setupScratchCard() {
  const card = $('#scratchCard');
  const canvas = $('#scratchCanvas');
  const context = canvas.getContext('2d', { willReadFrequently: true });
  let isDrawing = false;
  let revealed = false;
  let ratio = window.devicePixelRatio || 1;

  function drawOverlay() {
    const box = canvas.getBoundingClientRect();
    ratio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.max(1, Math.round(box.width * ratio));
    canvas.height = Math.max(1, Math.round(box.height * ratio));
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    context.globalCompositeOperation = 'source-over';
    const gradient = context.createLinearGradient(0, 0, box.width, box.height);
    gradient.addColorStop(0, '#173d62');
    gradient.addColorStop(.5, '#0c2949');
    gradient.addColorStop(1, '#275a80');
    context.fillStyle = gradient;
    context.fillRect(0, 0, box.width, box.height);
    context.strokeStyle = 'rgba(247, 223, 160, .48)';
    context.lineWidth = 1;
    for (let x = -box.height; x < box.width; x += 11) {
      context.beginPath();
      context.moveTo(x, 0);
      context.lineTo(x + box.height, box.height);
      context.stroke();
    }
    context.fillStyle = '#f7dfa0';
    context.font = `600 ${Math.max(10, box.width * .046)}px Montserrat, sans-serif`;
    context.letterSpacing = '1px';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText('SCRATCH HERE  ✦', box.width / 2, box.height / 2);
    context.globalCompositeOperation = 'destination-out';
  }

  function scratchAt(event) {
    if (!isDrawing || revealed) return;
    const box = canvas.getBoundingClientRect();
    const x = event.clientX - box.left;
    const y = event.clientY - box.top;
    context.beginPath();
    context.arc(x, y, Math.max(18, box.width * .105), 0, Math.PI * 2);
    context.fill();
  }

  function clearedAmount() {
    const pixels = context.getImageData(0, 0, canvas.width, canvas.height).data;
    let transparent = 0;
    let inspected = 0;
    for (let index = 3; index < pixels.length; index += 20) {
      inspected += 1;
      if (pixels[index] < 50) transparent += 1;
    }
    return transparent / inspected;
  }

  function burstPetals() {
    const rect = card.getBoundingClientRect();
    for (let index = 0; index < 28; index += 1) {
      const petal = document.createElement('i');
      const angle = (Math.PI * 2 * index) / 28 + (Math.random() - .5) * .28;
      const distance = 55 + Math.random() * 135;
      petal.className = 'burst-petal';
      petal.style.left = `${rect.left + rect.width / 2}px`;
      petal.style.top = `${rect.top + rect.height / 2}px`;
      petal.style.width = `${6 + Math.random() * 8}px`;
      petal.style.height = `${5 + Math.random() * 5}px`;
      document.body.appendChild(petal);
      petal.animate([
        { transform: 'translate(-50%, -50%) rotate(0deg) scale(.35)', opacity: 1 },
        { transform: `translate(calc(-50% + ${Math.cos(angle) * distance}px), calc(-50% + ${Math.sin(angle) * distance}px + 40px)) rotate(${180 + Math.random() * 360}deg) scale(1)`, opacity: 0 }
      ], { duration: 1100 + Math.random() * 650, easing: 'cubic-bezier(.12,.8,.25,1)', fill: 'forwards' }).finished.then(() => petal.remove());
    }
  }

  function reveal() {
    if (revealed) return;
    revealed = true;
    canvas.classList.add('is-cleared');
    burstPetals();
  }

  canvas.addEventListener('pointerdown', (event) => {
    if (revealed) return;
    isDrawing = true;
    canvas.setPointerCapture(event.pointerId);
    scratchAt(event);
  });
  canvas.addEventListener('pointermove', scratchAt);
  canvas.addEventListener('pointerup', (event) => {
    isDrawing = false;
    if (canvas.hasPointerCapture(event.pointerId)) canvas.releasePointerCapture(event.pointerId);
    if (clearedAmount() > .43) reveal();
  });
  canvas.addEventListener('pointercancel', () => { isDrawing = false; });
  window.addEventListener('resize', () => { if (!revealed) drawOverlay(); }, { passive: true });
  drawOverlay();
}

function updateCountdown() {
  const target = new Date(INVITATION.weddingMoment).getTime();
  const remaining = Math.max(0, target - Date.now());
  const values = {
    days: Math.floor(remaining / 86400000),
    hours: Math.floor((remaining % 86400000) / 3600000),
    minutes: Math.floor((remaining % 3600000) / 60000),
    seconds: Math.floor((remaining % 60000) / 1000)
  };
  $('#days').textContent = String(values.days).padStart(3, '0');
  $('#hours').textContent = String(values.hours).padStart(2, '0');
  $('#minutes').textContent = String(values.minutes).padStart(2, '0');
  $('#seconds').textContent = String(values.seconds).padStart(2, '0');
}

function initScrollExperience() {
  const sections = $$('.panel');
  const dots = $$('.rail-dot');
  const revealItems = $$('.reveal-on-scroll');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        const index = sections.indexOf(entry.target.closest('.panel'));
        if (index >= 0) dots.forEach((dot, dotIndex) => dot.classList.toggle('is-current', dotIndex === index));
      }
    });
  }, { threshold: .42 });

  sections.forEach((section) => observer.observe(section));
  revealItems.forEach((item) => observer.observe(item));

  const diya = $('.ring-diya');
  const libin = $('.ring-libin');
  let ticking = false;
  function placeRings() {
    const limit = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    const progress = Math.min(1, Math.max(0, window.scrollY / limit));
    const fall = 4 + progress * Math.max(0, window.innerHeight - 160);
    const settle = Math.max(0, (progress - .88) / .12);
    const diyaX = settle * window.innerWidth * .4;
    const libinX = -settle * window.innerWidth * .4;
    diya.style.transform = `translate3d(${diyaX}px, ${fall}px, 0) rotate(${progress * 190}deg)`;
    libin.style.transform = `translate3d(${libinX}px, ${fall - settle * 19}px, 0) rotate(${-progress * 155}deg)`;
    ticking = false;
  }
  function requestRingPlacement() {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(placeRings);
    }
  }
  window.addEventListener('scroll', requestRingPlacement, { passive: true });
  window.addEventListener('resize', requestRingPlacement, { passive: true });
  placeRings();
}

let musicPlaying = false;
let fileAudio;

function updateMusicButton() {
  const button = $('.music-toggle');
  button.setAttribute('aria-pressed', String(musicPlaying));
  button.setAttribute('aria-label', musicPlaying ? 'Pause background music' : 'Play background music');
  $('.music-label').textContent = musicPlaying ? 'Sound on' : 'Music';
}

async function startMusic() {
  if (musicPlaying || !INVITATION.music.trackUrl) return;
  if (!fileAudio) {
    fileAudio = new Audio(INVITATION.music.trackUrl);
    fileAudio.loop = true;
    fileAudio.volume = .38;
    fileAudio.preload = 'metadata';
  }
  try { await fileAudio.play(); musicPlaying = true; } catch (_) { musicPlaying = false; }
  updateMusicButton();
}

function stopMusic() {
  musicPlaying = false;
  if (fileAudio) fileAudio.pause();
  updateMusicButton();
}

function initMusic() {
  $('.music-toggle').addEventListener('click', () => {
    if (musicPlaying) stopMusic(); else startMusic();
  });
  updateMusicButton();
}

function initialize() {
  fillInvitationText();
  makePetals();
  initCover();
  setupScratchCard();
  updateCountdown();
  window.setInterval(updateCountdown, 1000);
  initScrollExperience();
  initMusic();
  window.requestAnimationFrame(() => document.body.classList.add('is-ready'));
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initialize);
else initialize();
