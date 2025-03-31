const carousel = document.getElementById('carousel');
let direction = 1;
let scrollAmount = 0;
let maxScroll = 0;
let isDragging = false;
let startX, scrollLeft;

function setMaxScroll() {
  maxScroll = carousel.scrollWidth - carousel.clientWidth;
}

function animateCarousel() {
  if (!isDragging) {
    scrollAmount += direction * 1.2;

    if (scrollAmount >= maxScroll || scrollAmount <= 0) {
      direction *= -1;
    }

    carousel.scrollTo({
      left: scrollAmount,
      behavior: 'auto'
    });
  }

  requestAnimationFrame(animateCarousel);
}

window.addEventListener('load', () => {
  setMaxScroll();
  requestAnimationFrame(animateCarousel);
});

window.addEventListener('resize', setMaxScroll);

// Drag support for desktop
carousel.addEventListener('mousedown', (e) => {
  isDragging = true;
  startX = e.pageX - carousel.offsetLeft;
  scrollLeft = carousel.scrollLeft;
});

carousel.addEventListener('mouseleave', () => {
  isDragging = false;
});

carousel.addEventListener('mouseup', () => {
  isDragging = false;
});

carousel.addEventListener('mousemove', (e) => {
  if (!isDragging) return;
  e.preventDefault();
  const x = e.pageX - carousel.offsetLeft;
  const walk = (x - startX) * 1.5;
  carousel.scrollLeft = scrollLeft - walk;
});

// Swipe support for mobile
carousel.addEventListener('touchstart', (e) => {
  isDragging = true;
  startX = e.touches[0].pageX;
  scrollLeft = carousel.scrollLeft;
});

carousel.addEventListener('touchend', () => {
  isDragging = false;
});

carousel.addEventListener('touchmove', (e) => {
  if (!isDragging) return;
  const x = e.touches[0].pageX;
  const walk = (x - startX) * 1.5;
  carousel.scrollLeft = scrollLeft - walk;
});