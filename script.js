const carousel = document.getElementById('carousel');
let scrollAmount = 0;
let originalChildren = [];
let cloneCount = 0;

function cloneAndAppendChildren() {
  originalChildren = Array.from(carousel.children).slice(0);
  cloneCount = originalChildren.length;
  originalChildren.forEach(child => {
    const clone = child.cloneNode(true);
    carousel.appendChild(clone);
  });
}

function shuffleOriginalChildren() {
  for (let i = originalChildren.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [originalChildren[i], originalChildren[j]] = [originalChildren[j], originalChildren[i]];
  }
  originalChildren.forEach(child => carousel.appendChild(child));
}

function animateCarousel() {
  scrollAmount += 2.03;
  carousel.scrollTo({
    left: scrollAmount,
    behavior: 'auto'
  });

  if (scrollAmount >= carousel.scrollWidth / 2) {
    shuffleOriginalChildren();
    scrollAmount = 0;
    carousel.scrollTo({ left: 0, behavior: 'auto' });
  }

  requestAnimationFrame(animateCarousel);
}

window.addEventListener('load', () => {
  cloneAndAppendChildren();
  requestAnimationFrame(animateCarousel);
});