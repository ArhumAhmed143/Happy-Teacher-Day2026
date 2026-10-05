/**
 * Happy Teacher's Day - Tribute to Ma'am Sadia Riaz
 * Crafted with reverence & love by Afshan Ahmed
 * Interactive Features & Audio Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all interactive modules
  initSparkleCanvas();
  initLetterInteraction();
  initConfettiCelebration();
  init3DCardTilt();
  initFlowerHub();
  initCandleHub();
  initDuaGenerator();
  initCertificateActions();
  initAmbientMelody();
  initMobileMenu();
});

/* ==========================================================================
   1. Toast Notification System
   ========================================================================== */
function showToast(message, duration = 3000) {
  const toast = document.getElementById('toast');
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add('show');

  if (window.toastTimeout) clearTimeout(window.toastTimeout);
  window.toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, duration);
}

/* ==========================================================================
   2. Floating Particles & Twinkle Canvas
   ========================================================================== */
function initSparkleCanvas() {
  const canvas = document.getElementById('sparkle-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particleCount = Math.min(width < 768 ? 35 : 75, 90);
  const particles = [];

  class Sparkle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.size = Math.random() * 2.2 + 0.6;
      this.speedY = Math.random() * 0.4 + 0.15;
      this.speedX = (Math.random() - 0.5) * 0.3;
      this.alpha = Math.random() * 0.7 + 0.2;
      this.twinkleSpeed = Math.random() * 0.02 + 0.008;
      // Gold and soft rose hues
      this.color = Math.random() > 0.3 
        ? `rgba(251, 191, 36, ` 
        : `rgba(251, 113, 133, `;
    }

    update() {
      this.y -= this.speedY;
      this.x += this.speedX;
      this.alpha += Math.sin(Date.now() * this.twinkleSpeed) * 0.015;

      if (this.alpha < 0.1) this.alpha = 0.1;
      if (this.alpha > 0.9) this.alpha = 0.9;

      if (this.y < -10 || this.x < -10 || this.x > width + 10) {
        this.reset();
        this.y = height + 10;
      }
    }

    draw() {
      ctx.save();
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color + this.alpha + ')';
      ctx.shadowBlur = this.size * 3;
      ctx.shadowColor = '#fbbf24';
      ctx.fill();
      ctx.restore();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Sparkle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(animate);
  }

  animate();
}

/* ==========================================================================
   3. Confetti Celebration Trigger
   ========================================================================== */
function fireConfettiCelebration() {
  playChimeSound(660, 'sine', 0.2);
  setTimeout(() => playChimeSound(880, 'sine', 0.3), 120);
  setTimeout(() => playChimeSound(1100, 'sine', 0.4), 240);

  if (typeof confetti === 'function') {
    const end = Date.now() + 1500;
    const colors = ['#f59e0b', '#fbbf24', '#f43f5e', '#fb7185', '#ffffff', '#8b5cf6'];

    (function frame() {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors: colors
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors: colors
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  } else {
    createDOMConfetti();
  }
}

function createDOMConfetti() {
  const container = document.body;
  const emojis = ['🎉', '🌹', '✨', '⭐', '🌸', '💐'];
  for (let i = 0; i < 24; i++) {
    const el = document.createElement('div');
    el.innerText = emojis[Math.floor(Math.random() * emojis.length)];
    el.style.position = 'fixed';
    el.style.left = Math.random() * 95 + 'vw';
    el.style.top = '-20px';
    el.style.fontSize = Math.random() * 18 + 18 + 'px';
    el.style.zIndex = '9999';
    el.style.pointerEvents = 'none';
    el.style.transition = 'transform 2.5s ease-out, opacity 2.5s ease';
    container.appendChild(el);

    requestAnimationFrame(() => {
      el.style.transform = `translateY(${window.innerHeight + 100}px) rotate(${Math.random() * 720}deg)`;
      el.style.opacity = '0';
    });

    setTimeout(() => el.remove(), 2600);
  }
}

function initConfettiCelebration() {
  const celebrateBtn = document.getElementById('celebrate-btn');
  if (celebrateBtn) {
    celebrateBtn.addEventListener('click', () => {
      fireConfettiCelebration();
      showToast("🎉 Happy Teacher's Day to Ma'am Sadia Riaz from Afshan Ahmed!");
    });
  }
}

/* ==========================================================================
   4. Interactive Letter Envelope
   ========================================================================== */
function initLetterInteraction() {
  const envelopeCover = document.getElementById('envelope-cover');
  const letterContent = document.getElementById('letter-content');
  const waxSealBtn = document.getElementById('wax-seal-btn');
  const recloseBtn = document.getElementById('reclose-letter-btn');
  const copyLetterBtn = document.getElementById('copy-letter-btn');

  function openLetter() {
    playChimeSound(523.25, 'triangle', 0.35);
    envelopeCover.style.display = 'none';
    letterContent.classList.add('opened');
    showToast("💌 Letter from Afshan Ahmed opened with love & respect.");
    fireConfettiCelebration();
  }

  function closeLetter() {
    letterContent.classList.remove('opened');
    setTimeout(() => {
      envelopeCover.style.display = 'flex';
      envelopeCover.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 300);
  }

  if (waxSealBtn) {
    waxSealBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      openLetter();
    });
    waxSealBtn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openLetter();
      }
    });
  }

  if (envelopeCover) envelopeCover.addEventListener('click', openLetter);
  if (recloseBtn) recloseBtn.addEventListener('click', closeLetter);

  if (copyLetterBtn) {
    copyLetterBtn.addEventListener('click', () => {
      const letterText = `Happy Teacher's Day, Respected Ma'am Sadia Riaz!

Today, on this glorious occasion of World Teachers' Day, I want to take a moment from the bottom of my heart to express my boundless appreciation, respect, and indebtedness to you.

Teachers come and go in life, but only a rare few leave an indelible footprint on our souls. Ma'am Sadia, your passion for imparting knowledge, your patient guidance, and your unwavering belief in your students have been a guiding lighthouse in my life.

"استاد وہ چراغ ہے جو خود جل کر دوسروں کو روشنی دیتا ہے، آپ نے نہ صرف علم سکھایا بلکہ ہمیں زندگی گزارنے کا سلیقہ اور حوصلہ بھی بخشا ہے۔"

Thank you for every second of patience, every smile that eased our anxiety, and every piece of wisdom that will accompany me throughout my life. I pray that Almighty Allah blesses you with abundant health, perpetual joy, and supreme success.

With the utmost respect, admiration, and prayers,
Your Student: Afshan Ahmed
October 5, 2026`;

      navigator.clipboard.writeText(letterText)
        .then(() => showToast("📋 Letter text copied to clipboard!"))
        .catch(() => showToast("Letter text ready!"));
    });
  }
}

/* ==========================================================================
   5. 3D Card Hover Tilt Effect (Desktop only)
   ========================================================================== */
function init3DCardTilt() {
  const card = document.getElementById('hero-card-3d');
  if (!card) return;

  // Only apply tilt on hover-capable devices
  if (window.matchMedia('(hover: hover)').matches) {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -10;
      const rotateY = ((x - centerX) / centerX) * 10;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  }
}

/* ==========================================================================
   6. Flower Offering Hub
   ========================================================================== */
function initFlowerHub() {
  const flowerBtn = document.getElementById('send-flower-btn');
  const countDisplay = document.getElementById('flower-count');
  const heroBouquetCounter = document.getElementById('bouquet-counter');
  const flowerTray = document.getElementById('flower-tray');

  let count = 108;
  const flowerIcons = ['🌹', '🌸', '💐', '🌺', '🌷', '🌼'];

  if (!flowerBtn) return;

  flowerBtn.addEventListener('click', (e) => {
    count++;
    if (countDisplay) countDisplay.textContent = count;
    if (heroBouquetCounter) heroBouquetCounter.textContent = `${count}+`;

    playChimeSound(784, 'sine', 0.2);

    const randomFlower = flowerIcons[Math.floor(Math.random() * flowerIcons.length)];
    const span = document.createElement('span');
    span.className = 'tray-flower';
    span.textContent = randomFlower;
    flowerTray.appendChild(span);

    if (flowerTray.children.length > 20) {
      flowerTray.removeChild(flowerTray.firstChild);
    }

    spawnFloatingFlower(e.clientX || window.innerWidth / 2, e.clientY || window.innerHeight / 2, randomFlower);

    showToast(`🌹 Beautiful ${randomFlower} offered to Ma'am Sadia Riaz!`);
  });
}

function spawnFloatingFlower(x, y, icon) {
  const el = document.createElement('div');
  el.textContent = icon;
  el.style.position = 'fixed';
  el.style.left = `${Math.max(10, Math.min(window.innerWidth - 40, x - 15))}px`;
  el.style.top = `${y - 15}px`;
  el.style.fontSize = '2rem';
  el.style.zIndex = '9999';
  el.style.pointerEvents = 'none';
  el.style.transition = 'transform 1.8s cubic-bezier(0.22, 1, 0.36, 1), opacity 1.8s ease';
  document.body.appendChild(el);

  requestAnimationFrame(() => {
    const randomOffset = (Math.random() - 0.5) * 120;
    el.style.transform = `translate(${randomOffset}px, -180px) scale(1.3) rotate(${randomOffset}deg)`;
    el.style.opacity = '0';
  });

  setTimeout(() => el.remove(), 1900);
}

/* ==========================================================================
   7. Candle of Knowledge Hub
   ========================================================================== */
function initCandleHub() {
  const flame = document.getElementById('candle-flame');
  const toggleBtn = document.getElementById('toggle-candle-btn');
  const status = document.getElementById('candle-status');

  if (!toggleBtn || !flame) return;

  toggleBtn.addEventListener('click', () => {
    flame.classList.remove('lit');
    status.textContent = 'Lighting the sacred flame of knowledge...';
    
    setTimeout(() => {
      flame.classList.add('lit');
      playChimeSound(587.33, 'sine', 0.3);
      status.textContent = "Candle of Gratitude is Glowing Brightly for Ma'am Sadia!";
      showToast("✨ The Flame of Knowledge burns bright in honor of Ma'am Sadia!");
      fireConfettiCelebration();
    }, 250);
  });
}

/* ==========================================================================
   8. Dua & Blessings Generator
   ========================================================================== */
function initDuaGenerator() {
  const duaUrdu = document.getElementById('dua-urdu');
  const duaEng = document.getElementById('dua-eng');
  const newDuaBtn = document.getElementById('new-dua-btn');
  const ameenBtn = document.getElementById('say-ameen-btn');

  const prayers = [
    {
      urdu: "یا اللہ! ہماری استاد محترمہ سعدیہ ریاض کو صحتِ کاملہ، لمبی عمر اور دونوں جہانوں کی کامیابی عطا فرما۔ آمین!",
      eng: "May Allah Almighty bless Respected Ma'am Sadia Riaz with vibrant health, peace of heart, happiness, and eternal success. Ameen!"
    },
    {
      urdu: "اے ربِ کریم! محترمہ سعدیہ ریاض کے علم و عمل میں برکت عطا فرما اور ان کے چہرے پر ہمیشہ خوشیوں کی مسکراہٹ سلامت رکھ۔ آمین!",
      eng: "O Gracious Lord! Bestow abundance upon Ma'am Sadia Riaz's wisdom, protect her always, and keep her blessed with joy. Ameen!"
    },
    {
      urdu: "پروردگار! ہماری استاد کی محنت اور شفقت کا بہترین اجر عطا فرما اور انہیں ہر قسم کے غم و پریشانی سے محفوظ رکھ۔ آمین!",
      eng: "O Creator! Reward our beloved teacher Ma'am Sadia for her selfless dedication with infinite grace and safeguard her from all worries. Ameen!"
    },
    {
      urdu: "یا اللہ! جس طرح محترمہ سعدیہ نے ہمارے راستے روشن کیے، اسی طرح ان کی زندگی کے ہر قدم کو نور اور رحمت سے بھر دے۔ آمین!",
      eng: "Lord! Just as Ma'am Sadia illuminated our minds, fill every path of her life with divine light, dignity, and honor. Ameen!"
    }
  ];

  let currentIndex = 0;

  if (newDuaBtn) {
    newDuaBtn.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % prayers.length;
      duaUrdu.style.opacity = 0;
      duaEng.style.opacity = 0;

      setTimeout(() => {
        duaUrdu.textContent = `"${prayers[currentIndex].urdu}"`;
        duaEng.textContent = `"${prayers[currentIndex].eng}"`;
        duaUrdu.style.opacity = 1;
        duaEng.style.opacity = 1;
      }, 200);

      playChimeSound(698.46, 'triangle', 0.2);
    });
  }

  if (ameenBtn) {
    ameenBtn.addEventListener('click', () => {
      fireConfettiCelebration();
      showToast("🤲 Ameen, Summa Ameen! Heartfelt prayers sent for Ma'am Sadia Riaz.");
    });
  }
}

/* ==========================================================================
   9. Certificate Actions
   ========================================================================== */
function initCertificateActions() {
  const printBtn = document.getElementById('print-cert-btn');
  const shareBtn = document.getElementById('share-tribute-btn');

  if (printBtn) {
    printBtn.addEventListener('click', () => {
      showToast("🖨️ Preparing certificate for print / PDF save...");
      setTimeout(() => {
        window.print();
      }, 500);
    });
  }

  if (shareBtn) {
    shareBtn.addEventListener('click', () => {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(window.location.href);
        showToast("🔗 Tribute web page link copied to clipboard!");
      } else {
        showToast("Share this link with Ma'am Sadia Riaz!");
      }
    });
  }
}

/* ==========================================================================
   10. Ambient Melody Synthesizer (Web Audio API)
   ========================================================================== */
let audioCtx = null;
let isPlayingMelody = false;
let melodyInterval = null;

function playChimeSound(freq = 440, type = 'sine', duration = 0.3) {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    if (!audioCtx) audioCtx = new AudioContext();

    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

    gain.gain.setValueAtTime(0.18, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + duration);
  } catch (e) {
    // Audio silently ignored if unsupported
  }
}

function initAmbientMelody() {
  const toggleBtn = document.getElementById('audio-toggle-btn');
  const soundWave = document.getElementById('sound-wave');
  const musicIcon = document.getElementById('music-icon');

  if (!toggleBtn) return;

  const melodyNotes = [
    523.25, // C5
    587.33, // D5
    659.25, // E5
    783.99, // G5
    880.00, // A5
    1046.50 // C6
  ];

  let noteIdx = 0;

  function startMelody() {
    isPlayingMelody = true;
    soundWave.classList.add('playing');
    musicIcon.textContent = '🔊';
    showToast("🎶 Playing peaceful Teacher's Day tribute melody...");

    melodyInterval = setInterval(() => {
      if (!isPlayingMelody) return;
      const note = melodyNotes[noteIdx % melodyNotes.length];
      playChimeSound(note, 'sine', 0.8);
      noteIdx = (noteIdx + 1) % melodyNotes.length;
    }, 600);
  }

  function stopMelody() {
    isPlayingMelody = false;
    soundWave.classList.remove('playing');
    musicIcon.textContent = '🎵';
    if (melodyInterval) clearInterval(melodyInterval);
    showToast("🔇 Melody muted.");
  }

  toggleBtn.addEventListener('click', () => {
    if (isPlayingMelody) {
      stopMelody();
    } else {
      startMelody();
    }
  });
}

/* ==========================================================================
   11. Robust Mobile Menu Controller
   ========================================================================== */
function initMobileMenu() {
  const toggle = document.getElementById('menu-toggle');
  const navLinks = document.getElementById('nav-links');
  const backdrop = document.getElementById('nav-backdrop');

  if (!toggle || !navLinks) return;

  function toggleMenu(show) {
    const isOpen = typeof show === 'boolean' ? show : !navLinks.classList.contains('open');
    if (isOpen) {
      navLinks.classList.add('open');
      toggle.classList.add('active');
      toggle.setAttribute('aria-expanded', 'true');
      if (backdrop) backdrop.classList.add('open');
      document.body.style.overflow = 'hidden';
    } else {
      navLinks.classList.remove('open');
      toggle.classList.remove('active');
      toggle.setAttribute('aria-expanded', 'false');
      if (backdrop) backdrop.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  toggle.addEventListener('click', () => toggleMenu());
  if (backdrop) backdrop.addEventListener('click', () => toggleMenu(false));

  // Close menu when any navigation link is clicked
  const linkItems = navLinks.querySelectorAll('a');
  linkItems.forEach(link => {
    link.addEventListener('click', () => {
      toggleMenu(false);
    });
  });
}
