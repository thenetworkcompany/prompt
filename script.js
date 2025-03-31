const carousel = document.getElementById('carousel');
let direction = 1;
let scrollAmount = 0;
let maxScroll = 0;
let isDragging = false;
let startX, scrollLeft;

// Drag/swipe handling with momentum-like support
let startClientX = 0;
let isPointerDown = false;

function startDrag(clientX) {
  isDragging = true;
  isPointerDown = true;
  startClientX = clientX;
  scrollLeft = carousel.scrollLeft;
}

function updateDrag(clientX) {
  if (!isDragging || !isPointerDown) return;
  const delta = clientX - startClientX;
  carousel.scrollLeft = scrollLeft - delta;
}

function stopDrag() {
  isPointerDown = false;
  isDragging = false;
}

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

// Desktop
carousel.addEventListener('mousedown', (e) => startDrag(e.clientX));
carousel.addEventListener('mousemove', (e) => updateDrag(e.clientX));
carousel.addEventListener('mouseup', stopDrag);
carousel.addEventListener('mouseleave', stopDrag);

// Mobile
carousel.addEventListener('touchstart', (e) => {
  if (e.touches.length === 1) {
    startDrag(e.touches[0].clientX);
  }
});
carousel.addEventListener('touchmove', (e) => {
  if (e.touches.length === 1) {
    updateDrag(e.touches[0].clientX);
  }
});
carousel.addEventListener('touchend', stopDrag);