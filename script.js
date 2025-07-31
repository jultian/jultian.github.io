document.addEventListener('DOMContentLoaded', function() {
  const cursorTrace = document.querySelector('.cursor-trace');
  let mouseX = 0;
  let mouseY = 0;
  let cursorX = 0;
  let cursorY = 0;
  let isAnimating = false;

  let lastMouseUpdate = 0;
  document.addEventListener('mousemove', (e) => {
    const now = performance.now();
    if (now - lastMouseUpdate > 16) { // ~60fps
      mouseX = e.clientX;
      mouseY = e.clientY;
      lastMouseUpdate = now;
      
      if (!isAnimating) {
        isAnimating = true;
        animateCursor();
      }
    }
  });

  function animateCursor() {
    cursorX += (mouseX - cursorX) * 0.3;
    cursorY += (mouseY - cursorY) * 0.3;
    
    cursorTrace.style.transform = `translate3d(${cursorX - 10}px, ${cursorY - 10}px, 0)`;
    
    if (Math.abs(mouseX - cursorX) > 0.1 || Math.abs(mouseY - cursorY) > 0.1) {
      requestAnimationFrame(animateCursor);
    } else {
      isAnimating = false;
    }
  }

  const interactiveElements = document.querySelectorAll('a, h1, h2');
  
  interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
      cursorTrace.style.transform += ' scale(1.5)';
      cursorTrace.style.background = 'rgba(255, 255, 255, 0.6)';
    });
    
    element.addEventListener('mouseleave', () => {
      cursorTrace.style.transform = cursorTrace.style.transform.replace(' scale(1.5)', '');
      cursorTrace.style.background = 'rgba(255, 255, 255, 0.3)';
    });
  });
});
