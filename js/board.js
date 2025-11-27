// Board Page Specific JavaScript - Optimized
document.addEventListener('DOMContentLoaded', function() {
    console.log('Board page JavaScript loaded successfully');
    
    // Initialize AOS with performance optimizations
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
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
                duration: 800,
                once: true,
                offset: 100,
                easing: 'ease-out-cubic',
                delay: 0,
                throttleDelay: 99
            });
        };
        document.head.appendChild(script);
    }

    // Optimized board card interactions
    const boardCards = document.querySelectorAll('.board-card, .council-card');
    
    boardCards.forEach((card) => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Functionary card animations
    const functionaryCards = document.querySelectorAll('.functionary-card');
    
    functionaryCards.forEach((card) => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.functionary-icon');
            if (icon) {
                icon.style.transform = 'scale(1.1)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.functionary-icon');
            if (icon) {
                icon.style.transform = 'scale(1)';
            }
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

    // Enhanced badge animations
    const memberBadges = document.querySelectorAll('.member-badge');
    
    memberBadges.forEach((badge) => {
        badge.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
        });
        
        badge.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
});

// Add CSS for board specific animations
const boardStyles = `
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
    
    .board-card,
    .functionary-card,
    .council-card {
        animation: fadeInUp 0.6s ease-out;
    }
    
    .member-badge {
        transition: transform 0.3s ease;
    }
`;

// Inject Board page specific styles only if not already added
if (!document.querySelector('style[data-board-styles]')) {
    const styleSheet = document.createElement('style');
    styleSheet.textContent = boardStyles;
    styleSheet.setAttribute('data-board-styles', 'true');
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