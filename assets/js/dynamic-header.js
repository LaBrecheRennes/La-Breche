// dynamic-header.js — version simple (violet -> beige selon le scroll)

// Couleurs de départ / arrivée
const START = { r: 255, g: 255, b: 255 }; // blanc
const END   = { r: 122, g: 101, b: 191 }; // #7A65BF (violet)

// petit utilitaire
const clamp01 = (t) => Math.max(0, Math.min(1, t));
// optionnel : easing léger pour que ce soit plus organique
const easeInOut = (t) => t < 0.5 ? 2*t*t : 1 - Math.pow(-2*t + 2, 2) / 2;
const lerp = (a, b, t) => Math.round(a + (b - a) * t);

function updateHeaderColor() {
  const header = document.querySelector('header');
  if (!header) return;

  // % de scroll sur toute la page
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const y = window.scrollY || window.pageYOffset || 0;
  let t = max > 0 ? y / max : 0;
  t = clamp01(easeInOut(t)); // enlever easeInOut si tu veux une transition 100% linéaire

  const r = lerp(START.r, END.r, t);
  const g = lerp(START.g, END.g, t);
  const b = lerp(START.b, END.b, t);
  const css = `rgb(${r}, ${g}, ${b})`;

  // on ne gère QUE background-color
  header.style.backgroundColor = css;
}

function initSimpleDynamicHeader() {
  const header = document.querySelector('header');
  if (!header) return;

  // neutraliser tout gradient inline/shorthand, et définir la transition
  header.style.setProperty('background-image', 'none', 'important');
  header.style.setProperty('background', 'none', 'important');
  header.style.transition = 'background-color 140ms linear';
  
  // si ton animation d'ouverture met le header en display:none,
  // laisse showHeaderAfterAnimation() faire le display:block de ton côté
  // ici on force juste une première couleur correcte :
  header.style.backgroundColor = `rgb(${START.r}, ${START.g}, ${START.b})`;

  // rAF-throttle pour le scroll
  let ticking = false;
  const onScroll = () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        updateHeaderColor();
        ticking = false;
      });
      ticking = true;
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', updateHeaderColor, { passive: true });

  // init
  updateHeaderColor();
}

/**
 * Affiche le header après l'animation d'ouverture
 */
function showHeaderAfterAnimation() {
    const header = document.querySelector('header');
    if (header) {
        header.style.display = 'block';
        console.log('✅ Header affiché après animation');
    }
}

document.addEventListener('DOMContentLoaded', initSimpleDynamicHeader);
