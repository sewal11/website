/**
 * ATELIER NOCTURE — Interactive Scripts
 * Handles portfolio filtering, contact form interaction, and color swatch copying.
 */

document.addEventListener('DOMContentLoaded', () => {
  initPortfolioFilter();
  initColorSwatches();
  initSmoothScroll();
});

// Category filtering for the selected works
function initPortfolioFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const workRows = document.querySelectorAll('.work-row');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      workRows.forEach(row => {
        const category = row.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          row.style.display = 'grid';
          row.style.opacity = '0';
          setTimeout(() => {
            row.style.transition = 'opacity 0.3s ease';
            row.style.opacity = '1';
          }, 20);
        } else {
          row.style.display = 'none';
        }
      });
    });
  });
}

// Interactive Color Palette Swatches
function initColorSwatches() {
  const swatches = document.querySelectorAll('.swatch');
  swatches.forEach(swatch => {
    swatch.addEventListener('click', () => {
      const color = swatch.style.getPropertyValue('--swatch-color').trim();
      const title = swatch.getAttribute('title');
      
      // Copy to clipboard if available
      if (navigator.clipboard) {
        navigator.clipboard.writeText(color);
      }

      // Visual feedback
      const originalTitle = title;
      swatch.setAttribute('title', `Copied ${color}!`);
      setTimeout(() => {
        swatch.setAttribute('title', originalTitle);
      }, 2000);
    });
  });
}

// Contact Form Handler
window.handleContactSubmit = function() {
  const form = document.getElementById('contactForm');
  const feedback = document.getElementById('formSuccessMessage');
  
  if (!form || !feedback) return;

  const name = document.getElementById('name').value;
  feedback.classList.remove('hidden');
  form.reset();

  // Scroll smoothly to feedback
  feedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
};

// Smooth anchor scrolling offset
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || !targetId) return;
      
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });
}
