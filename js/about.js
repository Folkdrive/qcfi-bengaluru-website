// About Page Specific JavaScript - Optimized
document.addEventListener('DOMContentLoaded', function() {
    console.log('About page JavaScript loaded successfully');
    
    // Initialize AOS with performance optimizations
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 600,
            once: true,
            offset: 100,
            easing: 'ease-out-cubic',
            delay: 0,
            throttleDelay: 99
        });
    } else {
        const script = document.createElement('script');
        script.src = 'https://unpkg.com/aos@2.3.1/dist/aos.js';
        script.onload = function() {
            AOS.init({
                duration: 600,
                once: true,
                offset: 100,
                easing: 'ease-out-cubic',
                delay: 0,
                throttleDelay: 99
            });
        };
        document.head.appendChild(script);
    }

    // Optimized mission card interactions
    const missionCards = document.querySelectorAll('.mission-card');
    
    missionCards.forEach((card) => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Smooth scrolling for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId !== '#' && targetId !== '#cta') {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
});

// Add CSS for optimized animations
const aboutStyles = `
    @keyframes float {
        0%, 100% { transform: translateY(0px) translateZ(0); }
        50% { transform: translateY(-5px) translateZ(0); }
    }
    
    .mission-icon.animate-float {
        animation: float 4s ease-in-out infinite;
        backface-visibility: hidden;
    }
    
    @media (max-width: 768px) {
        .mission-icon.animate-float {
            animation: float 6s ease-in-out infinite;
        }
    }
`;

if (!document.querySelector('style[data-about-styles]')) {
    const styleSheet = document.createElement('style');
    styleSheet.textContent = aboutStyles;
    styleSheet.setAttribute('data-about-styles', 'true');
    document.head.appendChild(styleSheet);
}

// Handle window resize with debouncing
let resizeTimeout;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function() {
        if (typeof AOS !== 'undefined') {
            AOS.refresh();
        }
    }, 250);
});