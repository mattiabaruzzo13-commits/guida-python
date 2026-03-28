// ==========================================
// SCRIPT.JS — tutto il comportamento del sito
// ==========================================


// ==========================================
// 1. NAVBAR — cambia aspetto quando scorri
// ==========================================

const navbar = document.getElementById('navbar');

window.addEventListener('scroll', function() {
  if (window.scrollY > 50) {
    navbar.style.background = 'rgba(10, 10, 15, 0.98)';
    navbar.style.borderBottomColor = 'rgba(232, 201, 126, 0.15)';
  } else {
    navbar.style.background = 'rgba(10, 10, 15, 0.9)';
    navbar.style.borderBottomColor = 'rgba(255, 255, 255, 0.07)';
  }
});


// ==========================================
// 2. NAVBAR LINK ATTIVO — evidenzia la
//    voce di menu della sezione che stai
//    guardando in quel momento
// ==========================================

const sezioni = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', function() {
  let sezioneAttiva = '';

  // Controlla quale sezione è visibile
  sezioni.forEach(function(sezione) {
    const top = sezione.offsetTop - 150;
    if (window.scrollY >= top) {
      sezioneAttiva = sezione.getAttribute('id');
    }
  });

  // Aggiorna i link della navbar
  navLinks.forEach(function(link) {
    link.classList.remove('attivo');
    if (link.getAttribute('href') === '#' + sezioneAttiva) {
      link.classList.add('attivo');
    }
  });
});


// ==========================================
// 3. SCROLL REVEAL — gli elementi appaiono
//    con un'animazione quando li scorri
// ==========================================

// Seleziona tutti gli elementi da animare
const elementiReveal = document.querySelectorAll(
  '.stat-card, .mech-card, .diff-table, .voto-grid, .pro-con'
);

// Aggiungi la classe 'nascosto' a tutti
elementiReveal.forEach(function(el) {
  el.classList.add('nascosto');
});

// IntersectionObserver — osserva quando un
// elemento entra nel viewport (schermo)
const observer = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      // L'elemento è visibile — mostralo
      entry.target.classList.remove('nascosto');
      entry.target.classList.add('visibile');
      // Smetti di osservarlo (l'animazione si fa una volta sola)
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1  // scatta quando il 10% è visibile
});

// Inizia a osservare ogni elemento
elementiReveal.forEach(function(el) {
  observer.observe(el);
});


// ==========================================
// 4. BARRE VOTO — si animano quando
//    scorri fino alla sezione voto
// ==========================================

const barre = document.querySelectorAll('.barra-fill');

const observerBarre = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      // Legge il valore dall'attributo data-val nell'HTML
      const valore = entry.target.getAttribute('data-val');
      entry.target.style.width = valore + '%';
      observerBarre.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.5
});

barre.forEach(function(barra) {
  observerBarre.observe(barra);
});


// ==========================================
// 5. ANNO AUTOMATICO nel footer
// ==========================================

// Trova tutti gli elementi del footer
const footer = document.querySelector('footer p');
if (footer) {
  const anno = new Date().getFullYear();
  footer.innerHTML = footer.innerHTML.replace('2025', anno);
}