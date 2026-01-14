// ========================================
// PuffGuard - Main JavaScript
// ========================================

// ========================================
// Mobile Menu Toggle
// ========================================
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navMenu = document.getElementById('navMenu');

mobileMenuToggle?.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    mobileMenuToggle.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
    });
});

// ========================================
// Smooth Scroll for Navigation Links
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80; // Account for fixed navbar
            const targetPosition = target.offsetTop - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ========================================
// Scroll Animations - Intersection Observer
// ========================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Optional: stop observing after animation
            // observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all elements with scroll animation
document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
});

// ========================================
// FAQ Accordion
// ========================================
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');

    question?.addEventListener('click', () => {
        // Close other items
        faqItems.forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
            }
        });

        // Toggle current item
        item.classList.toggle('active');
    });
});

// ========================================
// Navbar Background on Scroll
// ========================================
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Hide/show navbar on scroll
    if (scrollTop > lastScrollTop && scrollTop > 300) {
        navbar.classList.add('hidden');
    } else {
        navbar.classList.remove('hidden');
    }

    lastScrollTop = scrollTop;
});

// ========================================
// Newsletter Form
// ========================================
const newsletterForm = document.querySelector('.newsletter-form');

newsletterForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = e.target.querySelector('input[type="email"]').value;

    // Here you would normally send the email to your server
    console.log('Newsletter signup:', email);

    // Show success message
    alert('Thanks for subscribing! Check your email for confirmation.');

    // Reset form
    e.target.reset();
});

// ========================================
// Mobile Menu Styles
// ========================================
const style = document.createElement('style');
style.textContent = `
    @media (max-width: 768px) {
        .nav-menu {
            position: fixed;
            top: 72px;
            left: 0;
            right: 0;
            background: white;
            flex-direction: column;
            padding: var(--space-lg);
            box-shadow: var(--shadow-lg);
            transform: translateY(-100%);
            opacity: 0;
            transition: all var(--transition-base);
        }

        .nav-menu.active {
            transform: translateY(0);
            opacity: 1;
        }

        .mobile-menu-toggle.active span:nth-child(1) {
            transform: rotate(45deg) translate(6px, 6px);
        }

        .mobile-menu-toggle.active span:nth-child(2) {
            opacity: 0;
        }

        .mobile-menu-toggle.active span:nth-child(3) {
            transform: rotate(-45deg) translate(6px, -6px);
        }
    }

    .navbar.scrolled {
        background: rgba(255, 255, 255, 0.98);
        box-shadow: var(--shadow-md);
    }

    .navbar.hidden {
        transform: translateY(-100%);
    }
`;

document.head.appendChild(style);

// ========================================
// Page Load Animations
// ========================================
window.addEventListener('load', () => {
    // Add a small delay to ensure smooth animations
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
});

// ========================================
// Analytics Events (if you add analytics)
// ========================================
function trackEvent(category, action, label) {
    // Google Analytics example
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            event_category: category,
            event_label: label
        });
    }
}

// Track CTA clicks
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function() {
        const buttonText = this.textContent.trim();
        const section = this.closest('section')?.className || 'unknown';
        trackEvent('CTA', 'click', `${section} - ${buttonText}`);
    });
});

// ========================================
// Lazy Loading Images (native)
// ========================================
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.dataset.src || img.src;
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

// ========================================
// Legal Page Enhancements
// ========================================
// Reading Progress Bar
const readingProgress = document.getElementById('readingProgress');
if (readingProgress) {
    window.addEventListener('scroll', () => {
        const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPos = window.scrollY;
        const scrollPercent = (scrollPos / docHeight) * 100;
        readingProgress.style.width = scrollPercent + '%';
    });
}

// Table of Contents Active State
const tocLinks = document.querySelectorAll('.toc-link');
const sections = document.querySelectorAll('.legal-body h2[id]');

if (tocLinks.length > 0 && sections.length > 0) {
    // Create intersection observer for sections
    const tocObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Remove active class from all links
                tocLinks.forEach(link => link.classList.remove('active'));

                // Add active class to corresponding link
                const activeLink = document.querySelector(`.toc-link[href="#${entry.target.id}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }, {
        rootMargin: '-20% 0px -70% 0px'
    });

    // Observe all sections
    sections.forEach(section => {
        tocObserver.observe(section);
    });

    // Smooth scroll for TOC links
    tocLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Collapsible Sections for Mobile
const legalSections = document.querySelectorAll('.legal-body h2');
if (window.innerWidth <= 768) {
    legalSections.forEach(section => {
        section.style.cursor = 'pointer';
        section.addEventListener('click', function() {
            const content = [];
            let sibling = this.nextElementSibling;

            while (sibling && sibling.tagName !== 'H2') {
                content.push(sibling);
                sibling = sibling.nextElementSibling;
            }

            content.forEach(elem => {
                if (elem.style.display === 'none') {
                    elem.style.display = '';
                } else {
                    elem.style.display = 'none';
                }
            });
        });
    });
}