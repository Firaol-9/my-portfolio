// Dark/Light Mode Toggle
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const body = document.body;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
body.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    if (theme === 'dark') {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    }
}

// Mobile Navigation Toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar Background on Scroll
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.2)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// Intersection Observer for Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe elements for fade-in on scroll
document.querySelectorAll('.timeline-item, .achievement-card, .skill-item, .project-card, .activity-card, .certificate-card, .book-card').forEach(el => {
    el.classList.add('fade-in-on-scroll');
    observer.observe(el);
});

// Skill Progress Bars Animation
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBar = entry.target;
            const percent = progressBar.getAttribute('data-percent');
            progressBar.style.width = percent + '%';
            skillObserver.unobserve(progressBar);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.skill-progress').forEach(bar => {
    skillObserver.observe(bar);
});

// Shared slider state map for any card type (achievements, projects, etc.)
const cardSliders = new Map(); // store slider state per card for modal syncing

// Achievement image slider per card
const achievementCards = document.querySelectorAll('.achievement-card');

achievementCards.forEach(card => {
    const images = Array.from(card.querySelectorAll('.achievement-image'));
    if (!images.length) return;

    let currentIndex = 0;
    let autoplayId = null;
    const AUTOPLAY_INTERVAL = 4000;

    const showImage = (index) => {
        currentIndex = (index + images.length) % images.length;
        images.forEach((img, idx) => {
            img.classList.toggle('active', idx === currentIndex);
        });
    };

    // initial state
    showImage(0);

    if (images.length > 1) {
        const imageRow = card.querySelector('.achievement-images-row');

        const prevBtn = document.createElement('button');
        prevBtn.className = 'achievement-next achievement-prev';
        prevBtn.setAttribute('aria-label', 'Previous achievement image');
        prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';
        imageRow.appendChild(prevBtn);

        const nextBtn = document.createElement('button');
        nextBtn.className = 'achievement-next';
        nextBtn.setAttribute('aria-label', 'Next achievement image');
        nextBtn.innerHTML = '<i class="fas fa-chevron-right"></i>';
        imageRow.appendChild(nextBtn);

        const next = () => showImage(currentIndex + 1);
        const prev = () => showImage(currentIndex - 1);

        nextBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            next();
        });

        prevBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            prev();
        });

        const startAutoplay = () => {
            stopAutoplay();
            autoplayId = setInterval(next, AUTOPLAY_INTERVAL);
        };

        const stopAutoplay = () => {
            if (autoplayId) {
                clearInterval(autoplayId);
                autoplayId = null;
            }
        };

        imageRow.addEventListener('mouseenter', stopAutoplay);
        imageRow.addEventListener('mouseleave', startAutoplay);

        startAutoplay();

        cardSliders.set(card, {
            images,
            getIndex: () => currentIndex,
            showImage,
            next,
            prev
        });
    } else {
        cardSliders.set(card, {
            images,
            getIndex: () => currentIndex,
            showImage: (idx) => showImage(idx),
            next: () => {},
            prev: () => {}
        });
    }
});

// Project image slider per card
const projectCardsForSlider = document.querySelectorAll('.project-card');

projectCardsForSlider.forEach(card => {
    const images = Array.from(card.querySelectorAll('.project-image'));
    if (!images.length) return;

    let currentIndex = 0;
    let autoplayId = null;
    const PROJECT_AUTOPLAY_INTERVAL = 4000;

    const showImage = (index) => {
        currentIndex = (index + images.length) % images.length;
        images.forEach((img, idx) => {
            img.classList.toggle('active', idx === currentIndex);
        });
    };

    // initial state
    showImage(0);

    if (images.length > 1) {
        const imageRow = card.querySelector('.project-image-container');

        const prevBtn = document.createElement('button');
        prevBtn.className = 'achievement-next achievement-prev';
        prevBtn.setAttribute('aria-label', 'Previous project image');
        prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';
        imageRow.appendChild(prevBtn);

        const nextBtn = document.createElement('button');
        nextBtn.className = 'achievement-next';
        nextBtn.setAttribute('aria-label', 'Next project image');
        nextBtn.innerHTML = '<i class="fas fa-chevron-right"></i>';
        imageRow.appendChild(nextBtn);

        const next = () => showImage(currentIndex + 1);
        const prev = () => showImage(currentIndex - 1);

        nextBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            next();
        });

        prevBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            prev();
        });

        const startAutoplay = () => {
            stopAutoplay();
            autoplayId = setInterval(next, PROJECT_AUTOPLAY_INTERVAL);
        };

        const stopAutoplay = () => {
            if (autoplayId) {
                clearInterval(autoplayId);
                autoplayId = null;
            }
        };

        imageRow.addEventListener('mouseenter', stopAutoplay);
        imageRow.addEventListener('mouseleave', startAutoplay);

        startAutoplay();

        cardSliders.set(card, {
            images,
            getIndex: () => currentIndex,
            showImage,
            next,
            prev
        });
    } else {
        cardSliders.set(card, {
            images,
            getIndex: () => currentIndex,
            showImage: (idx) => showImage(idx),
            next: () => {},
            prev: () => {}
        });
    }
});

// Modal Functionality for Achievement Images
const achievementImages = document.querySelectorAll('.achievement-image');
const modal = document.getElementById('imageModal');
const modalImage = document.getElementById('modalImage');
const modalCaption = document.getElementById('modalCaption');
const modalClose = document.getElementById('modalClose');
const modalPrev = document.getElementById('modalPrev');
const modalNext = document.getElementById('modalNext');

let activeSlider = null;

const openModalFor = (card, index) => {
    const slider = cardSliders.get(card);
    if (!slider) return;
    activeSlider = slider;
    slider.showImage(index);

    const img = slider.images[slider.getIndex()];

    modalImage.src = img.src;
    modalImage.alt = img.alt;
    modalCaption.textContent = ''; // Hide achievement footer text in modal
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
};

const refreshModalImage = () => {
    if (!activeSlider) return;
    const img = activeSlider.images[activeSlider.getIndex()];
    modalImage.src = img.src;
    modalImage.alt = img.alt;
};

achievementImages.forEach(img => {
    img.addEventListener('click', (e) => {
        e.stopPropagation();
        const card = img.closest('.achievement-card');
        const slider = cardSliders.get(card);
        const index = slider ? slider.images.indexOf(img) : 0;
        openModalFor(card, index);
    });
});

// Modal navigation
const closeModal = () => {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    activeSlider = null;
};

modalClose.addEventListener('click', closeModal);

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

modalPrev.addEventListener('click', (e) => {
    e.stopPropagation();
    if (!activeSlider) return;
    activeSlider.prev();
    refreshModalImage();
});

modalNext.addEventListener('click', (e) => {
    e.stopPropagation();
    if (!activeSlider) return;
    activeSlider.next();
    refreshModalImage();
});

// Keyboard navigation for modal
document.addEventListener('keydown', (e) => {
    if (modal.style.display === 'block') {
        if (e.key === 'Escape') {
            closeModal();
        } else if (e.key === 'ArrowRight') {
            if (activeSlider) {
                activeSlider.next();
                refreshModalImage();
            }
        } else if (e.key === 'ArrowLeft') {
            if (activeSlider) {
                activeSlider.prev();
                refreshModalImage();
            }
        }
    }
});

// Project Cards Modal (for project images)
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('click', () => {
        const slider = cardSliders.get(card);
        if (slider) {
            // Open modal tied to this project's slider so arrows/keyboard work
            openModalFor(card, slider.getIndex());
            const title = card.querySelector('.project-title').textContent;
            modalCaption.textContent = title;
        } else {
            // Fallback for single-image project cards
            const img = card.querySelector('.project-image');
            const title = card.querySelector('.project-title').textContent;
            
            modalImage.src = img.src;
            modalImage.alt = img.alt;
            modalCaption.textContent = title;
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    });
});

// Certificate Cards Modal
const certificateCards = document.querySelectorAll('.certificate-card');

certificateCards.forEach(card => {
    card.addEventListener('click', () => {
        const img = card.querySelector('.certificate-image img');
        const title = card.querySelector('.certificate-content h3').textContent;
        
        modalImage.src = img.src;
        modalImage.alt = img.alt;
        modalCaption.textContent = title;
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });
});

// Book Cards Modal
const bookCards = document.querySelectorAll('.book-card');

bookCards.forEach(card => {
    card.addEventListener('click', () => {
        const img = card.querySelector('.book-cover img');
        const title = card.querySelector('.book-title').textContent;
        
        modalImage.src = img.src;
        modalImage.alt = img.alt;
        modalCaption.textContent = title;
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });
});

// Add active class to navigation link based on scroll position
const sections = document.querySelectorAll('.section, .hero-section');
const navLinksArray = Array.from(document.querySelectorAll('.nav-link'));

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinksArray.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Add hover effect to cards
document.querySelectorAll('.achievement-card, .project-card, .certificate-card, .book-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
    });
});

// Parallax effect for hero section (subtle)
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroSection = document.querySelector('.hero-section');
    if (heroSection && scrolled < window.innerHeight) {
        heroSection.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Initialize - Add fade-in class to elements that should fade in on load
window.addEventListener('load', () => {
    // Hero elements already have fade-in classes in HTML
    // Add any additional initialization here
    
    // Ensure theme is applied on load
    const savedTheme = localStorage.getItem('theme') || 'light';
    body.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
});

// Add smooth transitions to all interactive elements
document.querySelectorAll('a, button, .card, .nav-link').forEach(element => {
    element.style.transition = 'all 0.3s ease';
});

// Accessibility: Keyboard navigation for modals
modalImage.setAttribute('tabindex', '0');
modalClose.setAttribute('tabindex', '0');

modalImage.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

modalClose.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Add ARIA labels for better accessibility
themeToggle.setAttribute('aria-label', 'Toggle dark mode');
navToggle.setAttribute('aria-label', 'Toggle navigation menu');

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll-heavy functions
const debouncedScrollHandler = debounce(() => {
    // Scroll-based animations are handled by IntersectionObserver
    // This is just for any additional scroll handlers if needed
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);
