// dynamic-header.js — version avec header qui apparaît/disparaît selon la direction du scroll

// Couleurs de départ / arrivée
const START = { r: 255, g: 255, b: 255 }; // blanc
const END   = { r: 122, g: 101, b: 191 }; // #7A65BF (violet)

// petit utilitaire
const clamp01 = (t) => Math.max(0, Math.min(1, t));
// optionnel : easing léger pour que ce soit plus organique
const easeInOut = (t) => t < 0.5 ? 2*t*t : 1 - Math.pow(-2*t + 2, 2) / 2;
const lerp = (a, b, t) => Math.round(a + (b - a) * t);

// Variables pour suivre la position de défilement et l'état du header
let lastScrollPosition = 0;
let headerVisible = true;

function updateHeaderColorAndVisibility() {
  const header = document.querySelector('header');
  if (!header) return;
  if (header.style.display === 'none') return; // Ne pas traiter si header est en attente d'animation

  // % de scroll sur toute la page
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const y = window.scrollY || window.pageYOffset || 0;
  let t = max > 0 ? y / max : 0;
  t = clamp01(easeInOut(t)); // enlever easeInOut si tu veux une transition 100% linéaire

  const r = lerp(START.r, END.r, t);
  const g = lerp(START.g, END.g, t);
  const b = lerp(START.b, END.b, t);
  const css = `rgb(${r}, ${g}, ${b})`;

  // On gère la couleur de fond
  header.style.backgroundColor = css;
  
  // Déterminer la direction du défilement
  const currentScrollPosition = window.scrollY;
  
  // Ignorer les petits mouvements de défilement
  if (Math.abs(currentScrollPosition - lastScrollPosition) < 10) {
    return;
  }
  
  // Défilement vers le bas = cacher le header
  if (currentScrollPosition > lastScrollPosition && headerVisible && currentScrollPosition > 100) {
    header.style.transform = 'translateY(-100%)';
    headerVisible = false;
  } 
  // Défilement vers le haut = montrer le header
  else if (currentScrollPosition < lastScrollPosition && !headerVisible) {
    header.style.transform = 'translateY(0)';
    headerVisible = true;
  }
  
  // Mettre à jour la dernière position
  lastScrollPosition = currentScrollPosition;
}

function initDynamicHeader() {
  const header = document.querySelector('header');
  if (!header) return;

  // neutraliser tout gradient inline/shorthand, et définir la transition
  header.style.setProperty('background-image', 'none', 'important');
  header.style.setProperty('background', 'none', 'important');
  header.style.transition = 'background-color 140ms linear, transform 300ms ease';
  
  // si ton animation d'ouverture met le header en display:none,
  // laisse showHeaderAfterAnimation() faire le display:block de ton côté
  // ici on force juste une première couleur correcte :
  header.style.backgroundColor = `rgb(${START.r}, ${START.g}, ${START.b})`;
  
  // Initialisation de la transformation pour les animations
  header.style.transform = 'translateY(0)';

  // rAF-throttle pour le scroll
  let ticking = false;
  const onScroll = () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        updateHeaderColorAndVisibility();
        ticking = false;
      });
      ticking = true;
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', updateHeaderColorAndVisibility, { passive: true });

  // init
  updateHeaderColorAndVisibility();
}

/**
 * Affiche le header après l'animation d'ouverture
 */
function showHeaderAfterAnimation() {
    const header = document.querySelector('header');
    if (header) {
        header.style.display = 'block';
        header.style.transform = 'translateY(0)';
        headerVisible = true;
        console.log('✅ Header affiché après animation');
    }
}

document.addEventListener('DOMContentLoaded', initDynamicHeader);
