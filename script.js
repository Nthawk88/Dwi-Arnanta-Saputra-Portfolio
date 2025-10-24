// ===== MOBILE NAVIGATION TOGGLE =====
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle mobile menu
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

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    }
});

// ===== SMOOTH SCROLLING FOR NAVIGATION LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = document.getElementById('header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== HEADER SCROLL EFFECT =====
const header = document.getElementById('header');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Add/remove scrolled class for styling
    if (scrollTop > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    // Hide/show header on scroll (optional effect)
    if (scrollTop > lastScrollTop && scrollTop > 200) {
        // Scrolling down
        header.style.transform = 'translateY(-100%)';
    } else {
        // Scrolling up
        header.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop;
});

// ===== ACTIVE NAVIGATION LINK HIGHLIGHTING =====
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY + 150;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const correspondingLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            // Remove active class from all links
            navLinks.forEach(link => link.classList.remove('active'));
            // Add active class to current link
            if (correspondingLink) {
                correspondingLink.classList.add('active');
            }
        }
    });
});

// ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe elements for animation
const animateElements = document.querySelectorAll('.project-card, .skill-category, .contact-item');
animateElements.forEach(el => {
    observer.observe(el);
});

// ===== TYPING ANIMATION FOR HOME TITLE =====
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing animation when page loads
window.addEventListener('load', () => {
    const titleElement = document.querySelector('.title-main');
    const originalText = titleElement.textContent;
    
    // Only run typing animation on desktop
    if (window.innerWidth > 768) {
        typeWriter(titleElement, originalText, 150);
    }
});

// ===== PARALLAX EFFECT FOR BACKGROUND =====
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.bg-pattern');
    
    if (parallax) {
        const speed = scrolled * 0.5;
        parallax.style.transform = `translateY(${speed}px)`;
    }
});

// ===== SKILL ITEMS ANIMATION =====
const skillItems = document.querySelectorAll('.skill-item');

skillItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'translateY(-3px) scale(1.05)';
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'translateY(0) scale(1)';
    });
});

// ===== PROJECT CARDS HOVER EFFECT =====
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';

        // If card has video media and prefers hover playback
        const mediaType = card.getAttribute('data-media-type');
        if (mediaType === 'video') {
            ensureProjectVideo(card);
            const video = card.querySelector('.project-video');
            if (video) {
                card.classList.add('playing');
                video.muted = true;
                const playPromise = video.play();
                if (playPromise) {
                    playPromise.catch(() => {});
                }
            }
        }
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';

        const video = card.querySelector('.project-video');
        if (video) {
            video.pause();
            video.currentTime = 0;
            card.classList.remove('playing');
        }
    });

    // Click to open modal for video (or show full image)
    const media = card.querySelector('.project-media');
    if (media) {
        media.addEventListener('click', () => {
            const type = card.getAttribute('data-media-type');
            if (type === 'video') {
                const src = card.getAttribute('data-video-src');
                openVideoModal(src);
            } else if (type === 'image') {
                // open image in new tab or lightbox-like modal
                const imgSrc = card.getAttribute('data-image-src');
                if (imgSrc) window.open(imgSrc, '_blank');
            }
        });
    }
});

// Ensure a <video> element exists in a project card when needed
function ensureProjectVideo(card) {
    if (card.querySelector('.project-video')) return;
    const src = card.getAttribute('data-video-src');
    const thumbnail = card.getAttribute('data-thumbnail');
    const container = card.querySelector('.project-media');
    if (!container || !src) return;

    const video = document.createElement('video');
    video.className = 'project-video';
    video.src = src;
    video.playsInline = true;
    video.muted = true;
    video.loop = true;
    video.preload = 'metadata';

    // If browser blocks autoplay, we still keep thumbnail until click
    video.addEventListener('loadeddata', () => {
        // no-op placeholder for future hooks
    });

    container.appendChild(video);
}

// ===== VIDEO MODAL LOGIC =====
const videoModal = document.getElementById('video-modal');
const modalVideo = document.getElementById('modal-video');
const videoCloseBtn = document.querySelector('.video-close');
const videoBackdrop = document.querySelector('.video-backdrop');

function openVideoModal(src) {
    if (!videoModal || !modalVideo || !src) return;
    modalVideo.src = src;
    videoModal.classList.add('active');
    modalVideo.play().catch(() => {});
    document.body.style.overflow = 'hidden';
}

function closeVideoModal() {
    if (!videoModal || !modalVideo) return;
    modalVideo.pause();
    modalVideo.currentTime = 0;
    modalVideo.removeAttribute('src');
    videoModal.classList.remove('active');
    document.body.style.overflow = '';
}

if (videoCloseBtn) videoCloseBtn.addEventListener('click', closeVideoModal);
if (videoBackdrop) videoBackdrop.addEventListener('click', closeVideoModal);
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && videoModal && videoModal.classList.contains('active')) {
        closeVideoModal();
    }
});

// ===== CERTIFICATE MODAL LOGIC =====
const certificateModal = document.getElementById('certificate-modal');
const modalCertificate = document.getElementById('modal-certificate');
const certificateCloseBtn = document.querySelector('.certificate-close');
const certificateBackdrop = document.querySelector('.certificate-backdrop');

function openCertificateModal(imageSrc, title, issuer, date) {
    if (!certificateModal || !modalCertificate || !imageSrc) return;
    
    // Set certificate image
    modalCertificate.src = imageSrc;
    modalCertificate.alt = title;
    
    // Set certificate info
    document.getElementById('modal-certificate-title').textContent = title;
    document.getElementById('modal-certificate-issuer').textContent = issuer;
    document.getElementById('modal-certificate-date').textContent = date;
    
    // Show modal
    certificateModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeCertificateModal() {
    if (!certificateModal || !modalCertificate) return;
    
    // Clear certificate image
    modalCertificate.removeAttribute('src');
    
    // Hide modal
    certificateModal.classList.remove('active');
    document.body.style.overflow = '';
}

if (certificateCloseBtn) certificateCloseBtn.addEventListener('click', closeCertificateModal);
if (certificateBackdrop) certificateBackdrop.addEventListener('click', closeCertificateModal);
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && certificateModal && certificateModal.classList.contains('active')) {
        closeCertificateModal();
    }
});

// ===== CONTACT LINKS HOVER EFFECT =====
const contactItems = document.querySelectorAll('.contact-item');

contactItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'translateY(-5px) scale(1.05)';
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'translateY(0) scale(1)';
    });
});

// ===== CYBER ICON ROTATION ANIMATION =====
const cyberIcon = document.querySelector('.cyber-icon');

if (cyberIcon) {
    let rotation = 0;
    
    setInterval(() => {
        rotation += 1;
        cyberIcon.style.transform = `rotate(${rotation}deg)`;
    }, 100);
}

// ===== GLITCH EFFECT FOR LOGO (OPTIONAL) =====
const logo = document.querySelector('.logo-text');

if (logo) {
    logo.addEventListener('mouseenter', () => {
        logo.style.animation = 'glitch 0.3s ease-in-out';
    });
    
    logo.addEventListener('animationend', () => {
        logo.style.animation = '';
    });
}

// Add glitch animation CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes glitch {
        0% { transform: translate(0); }
        20% { transform: translate(-2px, 2px); }
        40% { transform: translate(-2px, -2px); }
        60% { transform: translate(2px, 2px); }
        80% { transform: translate(2px, -2px); }
        100% { transform: translate(0); }
    }
    
    .animate-in {
        animation: fadeInUp 0.6s ease-out forwards;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .nav-link.active {
        color: #00ffff !important;
        text-shadow: 0 0 5px rgba(0, 255, 255, 0.5);
    }
    
    .nav-link.active::after {
        width: 100% !important;
    }
    
    .header.scrolled {
        background: rgba(26, 26, 26, 0.98);
        backdrop-filter: blur(15px);
    }
`;
document.head.appendChild(style);

// ===== PERFORMANCE OPTIMIZATION =====
// Throttle scroll events for better performance
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to scroll events
const throttledScrollHandler = throttle(() => {
    // Scroll-related functions are already handled above
}, 16); // ~60fps

window.addEventListener('scroll', throttledScrollHandler);

// ===== LOADING ANIMATION =====
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Add loading animation CSS
    const loadingStyle = document.createElement('style');
    loadingStyle.textContent = `
        body {
            opacity: 0;
            transition: opacity 0.5s ease-in-out;
        }
        
        body.loaded {
            opacity: 1;
        }
    `;
    document.head.appendChild(loadingStyle);
});

// ===== KEYBOARD NAVIGATION SUPPORT =====
document.addEventListener('keydown', (e) => {
    // ESC key to close mobile menu
    if (e.key === 'Escape') {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    }
    
    // Arrow keys for section navigation (optional)
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        const currentSection = document.querySelector('section:target');
        const sections = Array.from(document.querySelectorAll('section[id]'));
        const currentIndex = sections.indexOf(currentSection);
        
        if (e.key === 'ArrowDown' && currentIndex < sections.length - 1) {
            const nextSection = sections[currentIndex + 1];
            nextSection.scrollIntoView({ behavior: 'smooth' });
        } else if (e.key === 'ArrowUp' && currentIndex > 0) {
            const prevSection = sections[currentIndex - 1];
            prevSection.scrollIntoView({ behavior: 'smooth' });
        }
    }
});

// ===== CONSOLE MESSAGE (FUN FEATURE) =====
console.log(`
    ╔══════════════════════════════════════════════════════════════╗
    ║                                                              ║
    ║  🔒 CYBERSECURITY STUDENT PORTFOLIO 🔒                      ║
    ║                                                              ║
    ║  Welcome to my digital fortress!                             ║
    ║  Built with: HTML5, CSS3, JavaScript                         ║
    ║  Security Level: MAXIMUM                                     ║
    ║                                                              ║
    ║  Feel free to explore the code - it's open source!           ║
    ║                                                              ║
    ╚══════════════════════════════════════════════════════════════╝
`);

// ===== ERROR HANDLING =====
window.addEventListener('error', (e) => {
    console.error('Portfolio Error:', e.error);
    // Gracefully handle any JavaScript errors
});

// ===== RESIZE HANDLER =====
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        // Close mobile menu on resize
        if (window.innerWidth > 768) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    }, 250);
});
