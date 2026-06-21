document.addEventListener("DOMContentLoaded", () => {
  
  // ==========================================
  // 1. LOGIKA BUKA/TUTUP HAMBURGER MENU (MOBILE)
  // ==========================================
  const menuToggle = document.getElementById('mobile-menu');
  const navOverlay = document.getElementById('nav-overlay');
  const closeMenu = document.getElementById('close-menu');
  const overlayLinks = document.querySelectorAll('.overlay-links a');

  if (menuToggle && navOverlay) {
    menuToggle.addEventListener('click', () => {
      navOverlay.classList.add('open');
      menuToggle.setAttribute('aria-expanded', 'true');
    });
  }

  if (closeMenu && navOverlay) {
    closeMenu.addEventListener('click', () => {
      navOverlay.classList.remove('open');
      if (menuToggle) {
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  overlayLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768 && navOverlay) {
        navOverlay.classList.remove('open');
        if (menuToggle) {
          menuToggle.setAttribute('aria-expanded', 'false');
        }
      }
    });
  });

  // ==========================================
  // 2. LOGIKA SMART HIDDEN NAVBAR ON SCROLL (DENGAN THROTTLE + RAF)
  // ==========================================
  let lastScrollTop = 0;
  let ticking = false;
  const navbar = document.getElementById('main-nav');

  if (navbar) {
    window.addEventListener('scroll', function() {
      if (!ticking) {
        requestAnimationFrame(() => {
          let currentScroll = window.scrollY;
          
          if (currentScroll > lastScrollTop && currentScroll > 100) {
            navbar.classList.add('nav-hidden');
          } else {
            navbar.classList.remove('nav-hidden');
          }
          
          lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  // ==========================================
  // 3. LOGIKA POP-UP MODAL (ON-DEMAND LAZY LOADING)
  // ==========================================
  const modal = document.getElementById("certModal");
  const modalImg = document.getElementById("modalImg");
  const closeModal = document.getElementById("closeModal");

  // Gunakan event delegation untuk tombol transkrip (lebih efisien)
  if (modal && modalImg && closeModal) {
    // Event listener untuk tombol transkrip menggunakan delegation
    document.addEventListener('click', function(e) {
      const btn = e.target.closest('.btn-transkrip');
      if (btn) {
        const targetImageSrc = btn.getAttribute('data-fullimg');
        const certName = btn.closest('.cert-info')?.querySelector('.cert-name')?.textContent || 'Sertifikat';
        if (targetImageSrc) {
          modalImg.src = targetImageSrc;
          modalImg.alt = 'Transkrip ' + certName;
          modal.classList.add('show');
        }
      }
    });

    closeModal.addEventListener("click", function() {
      modal.classList.remove("show");
      setTimeout(() => { 
        modalImg.src = ""; 
        modalImg.alt = "Halaman Lampiran Sertifikat";
      }, 300);
    });

    modal.addEventListener("click", function(e) {
      if (e.target === modal) {
        modal.classList.remove("show");
        setTimeout(() => { 
          modalImg.src = ""; 
          modalImg.alt = "Halaman Lampiran Sertifikat";
        }, 300);
      }
    });

    // Tutup modal dengan tombol ESC
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && modal.classList.contains('show')) {
        modal.classList.remove('show');
        setTimeout(() => { 
          modalImg.src = ""; 
          modalImg.alt = "Halaman Lampiran Sertifikat";
        }, 300);
      }
    });
  }
});