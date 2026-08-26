// ========================================
// MAIN.JS - All JavaScript Functionality
// ========================================

// ----- 1. THEME TOGGLE (Light/Dark Mode) -----
const themeToggleBtns = [
    document.getElementById('theme-toggle'),
    document.getElementById('theme-toggle-mobile')
];
const themeIcons = [
    document.getElementById('theme-icon'),
    document.getElementById('theme-icon-mobile')
];
const htmlElement = document.documentElement;

// Check saved preference or system preference
if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    htmlElement.classList.add('dark');
    themeIcons.forEach(icon => {
        if (icon) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        }
    });
} else {
    htmlElement.classList.remove('dark');
}

// Toggle theme
themeToggleBtns.forEach(btn => {
    if (!btn) return;
    btn.addEventListener('click', () => {
        htmlElement.classList.toggle('dark');
        const isDark = htmlElement.classList.contains('dark');

        // Update localStorage
        localStorage.theme = isDark ? 'dark' : 'light';

        // Update icons
        themeIcons.forEach(icon => {
            if (icon) {
                icon.classList.remove(isDark ? 'fa-moon' : 'fa-sun');
                icon.classList.add(isDark ? 'fa-sun' : 'fa-moon');
            }
        });
    });
});

// ----- 2. TYPING EFFECT -----
const textToType = "Computer Engineering Graduate";
const typewriterElement = document.getElementById('typewriter');
let charIndex = 0;

function typeWriter() {
    if (charIndex < textToType.length) {
        typewriterElement.innerHTML += textToType.charAt(charIndex);
        charIndex++;
        setTimeout(typeWriter, 100);
    }
}
setTimeout(typeWriter, 500);

// ----- 3. SCROLL PROGRESS BAR & NAVBAR -----
const progressBar = document.getElementById('progressBar');
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    // Progress bar
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    progressBar.style.width = `${(scrollTop / scrollHeight) * 100}%`;

    // Navbar shadow on scroll
    if (window.scrollY > 50) {
        navbar.classList.add('shadow-md');
    } else {
        navbar.classList.remove('shadow-md');
    }
});

// ----- 4. REVEAL ON SCROLL (Intersection Observer) -----
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ----- 5. PORTFOLIO FILTERING -----
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Update button styles
        filterBtns.forEach(b => {
            b.classList.remove('bg-gray-900', 'text-white', 'dark:bg-white', 'dark:text-black', 'shadow-md', 'dark:shadow-[0_0_15px_rgba(255,255,255,0.3)]');
            b.classList.add('glass-card', 'text-gray-700', 'dark:text-gray-300');
        });
        btn.classList.remove('glass-card', 'text-gray-700', 'dark:text-gray-300');
        btn.classList.add('bg-gray-900', 'text-white', 'dark:bg-white', 'dark:text-black', 'shadow-md', 'dark:shadow-[0_0_15px_rgba(255,255,255,0.3)]');

        // Filter items
        const filterValue = btn.getAttribute('data-filter');
        portfolioItems.forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 50);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.9)';
                setTimeout(() => item.style.display = 'none', 300);
            }
        });
    });
});

// ----- 6. MOBILE MENU TOGGLE -----
const mobileBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

mobileBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
    });
});

// ----- 7. FORM SUBMISSION -----
const contactForm = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(contactForm);
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;

    submitBtn.textContent = 'Sending...';
    submitBtn.style.opacity = '0.7';

    try {
        const response = await fetch("YOUR_ENDPOINT_HERE", {
            method: "POST",
            body: formData,
            headers: { 'Accept': 'application/json' }
        });

        formMessage.classList.remove('hidden');

        if (response.ok) {
            formMessage.className = 'mt-4 text-sm font-medium text-center rounded-xl py-3 border border-green-500/50 bg-green-500/10 text-green-600 dark:text-green-400';
            formMessage.textContent = '✅ Thank you! Message sent successfully.';
            contactForm.reset();
        } else {
            throw new Error('Form submission failed');
        }
    } catch (error) {
        formMessage.className = 'mt-4 text-sm font-medium text-center rounded-xl py-3 border border-red-500/50 bg-red-500/10 text-red-600 dark:text-red-400';
        formMessage.textContent = '❌ Oops! Something went wrong. Please try again.';
    } finally {
        submitBtn.textContent = originalText;
        submitBtn.style.opacity = '1';
        setTimeout(() => formMessage.classList.add('hidden'), 5000);
    }
});

// ----- 8. FAVICON ANIMATION -----
const favicon = document.getElementById('favicon');
const nameToSpell = "PARISA";
let currentFrame = 0;

function animateFavicon() {
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');

    // Background circle
    ctx.fillStyle = '#7c3aed';
    ctx.beginPath();
    ctx.arc(16, 16, 16, 0, 2 * Math.PI);
    ctx.fill();

    // Letter
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 20px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(nameToSpell[currentFrame], 16, 17);

    favicon.href = canvas.toDataURL('image/png');

    currentFrame = (currentFrame + 1) % nameToSpell.length;
    setTimeout(animateFavicon, 600);
}

animateFavicon();

// ----- 9. VANILLA TILT INIT (Optional) -----
// Vanilla Tilt is already loaded via CDN
// You can add custom tilt settings here if needed
document.querySelectorAll('[data-tilt]').forEach(el => {
    // VanillaTilt is initialized automatically via data attributes
    // This just ensures it's available
    if (typeof VanillaTilt !== 'undefined') {
        VanillaTilt.init(el);
    }
});