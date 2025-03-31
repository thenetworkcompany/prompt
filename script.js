const carousel = document.getElementById('carousel');
let direction = 1;
let scrollAmount = 0;
let maxScroll = 0;

// Drag/swipe handling with momentum-like support
let isPointerDown = false;
let startX = 0;
let scrollStart = 0;

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

function startDrag(e) {
  isPointerDown = true;
  startX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
  scrollStart = carousel.scrollLeft;
  carousel.classList.add('dragging');
}

function duringDrag(e) {
  if (!isPointerDown) return;
  const currentX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
  const deltaX = currentX - startX;
  carousel.scrollLeft = scrollStart - deltaX;
}

function endDrag() {
  isPointerDown = false;
  carousel.classList.remove('dragging');
}

carousel.addEventListener('mousedown', startDrag);
carousel.addEventListener('mousemove', duringDrag);
carousel.addEventListener('mouseup', endDrag);
carousel.addEventListener('mouseleave', endDrag);

carousel.addEventListener('touchstart', startDrag, { passive: true });
carousel.addEventListener('touchmove', duringDrag, { passive: true });
carousel.addEventListener('touchend', endDrag);