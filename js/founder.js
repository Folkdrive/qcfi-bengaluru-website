// Founder Page Specific JavaScript
// Clean version without conflicts

document.addEventListener('DOMContentLoaded', function() {
    console.log('Founder page JavaScript loaded successfully');
    
    // Initialize AOS for Founder page animations
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: true,
            offset: 50,
            easing: 'ease-out-cubic'
        });
    }

    // Enhanced founder card interactions
    const founderCards = document.querySelectorAll('.founder-card');
    
    founderCards.forEach((card, index) => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Smooth scrolling for internal links on Founder page
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

    // Add scroll-based animations for founder icons
    window.addEventListener('scroll', function() {
        const founderIcons = document.querySelectorAll('.founder-icon');
        const scrollPosition = window.scrollY;
        
        founderIcons.forEach((icon, index) => {
            const iconPosition = icon.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (iconPosition < screenPosition) {
                icon.style.animationDelay = `${index * 0.1}s`;
                icon.classList.add('animate-float');
            }
        });
    });
});

// Handle window resize for Founder page specific adjustments
window.addEventListener('resize', function() {
    // Refresh AOS on resize
    if (typeof AOS !== 'undefined') {
        AOS.refresh();
    }
});

// Add CSS for founder icon animations
const founderStyles = `
    @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-8px); }
    }
    
    .founder-icon.animate-float {
        animation: float 3s ease-in-out infinite;
    }
`;

// Inject Founder page specific styles
const styleSheet = document.createElement('style');
styleSheet.textContent = founderStyles;
document.head.appendChild(styleSheet);

// Export functions if needed for other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        // Export functions if needed
    };
}