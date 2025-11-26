// Board Page Specific JavaScript
// Clean version following About page pattern

document.addEventListener('DOMContentLoaded', function() {
    console.log('Board page JavaScript loaded successfully');
    
    // Initialize AOS for Board page animations
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: true,
            offset: 50,
            easing: 'ease-out-cubic'
        });
    }

    // Enhanced board card interactions
    const boardCards = document.querySelectorAll('.board-card, .council-card');
    
    boardCards.forEach((card, index) => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Functionary card animations
    const functionaryCards = document.querySelectorAll('.functionary-card');
    
    functionaryCards.forEach((card, index) => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.functionary-icon');
            if (icon) {
                icon.style.transform = 'scale(1.1) rotate(5deg)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.functionary-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });

    // Smooth scrolling for internal links on Board page
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

    // Add scroll-based animations for member images
    window.addEventListener('scroll', function() {
        const memberImages = document.querySelectorAll('.member-image img, .council-image img');
        const scrollPosition = window.scrollY;
        
        memberImages.forEach((img, index) => {
            const imgPosition = img.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (imgPosition < screenPosition) {
                img.style.transitionDelay = `${index * 0.1}s`;
            }
        });
    });

    // Enhanced badge animations
    const memberBadges = document.querySelectorAll('.member-badge');
    
    memberBadges.forEach((badge, index) => {
        badge.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
        });
        
        badge.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
});

// Handle window resize for Board page specific adjustments
window.addEventListener('resize', function() {
    // Refresh AOS on resize
    if (typeof AOS !== 'undefined') {
        AOS.refresh();
    }
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

// Inject Board page specific styles
const styleSheet = document.createElement('style');
styleSheet.textContent = boardStyles;
document.head.appendChild(styleSheet);

// Export functions if needed for other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        // Export functions if needed
    };
}