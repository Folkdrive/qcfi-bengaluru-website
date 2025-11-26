// js/history.js
// History Page Specific JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Add scroll animations for history page elements
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Add staggered animation for timeline items
                if (entry.target.classList.contains('timeline-item')) {
                    const index = Array.from(document.querySelectorAll('.timeline-item')).indexOf(entry.target);
                    entry.target.style.transitionDelay = `${index * 0.2}s`;
                }
                
                // Add staggered animation for milestone cards
                if (entry.target.classList.contains('milestone-card')) {
                    const index = Array.from(document.querySelectorAll('.milestone-card')).indexOf(entry.target);
                    entry.target.style.transitionDelay = `${index * 0.1}s`;
                }
            }
        });
    }, observerOptions);

    // Observe all cards for animation
    const animatedElements = document.querySelectorAll('.timeline-item, .milestone-card, .legacy-stat, .gallery-item');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s ease';
        observer.observe(element);
    });

    // Enhanced hover effects for timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => {
        const content = item.querySelector('.timeline-content');
        const image = item.querySelector('.timeline-image');
        
        if (content && image) {
            item.addEventListener('mouseenter', function() {
                content.style.transform = 'translateY(-8px) scale(1.02)';
                image.style.transform = 'scale(1.05)';
            });
            
            item.addEventListener('mouseleave', function() {
                content.style.transform = 'translateY(-5px)';
                image.style.transform = 'scale(1.03)';
            });
        }
    });

    // Interactive milestone cards
    const milestoneCards = document.querySelectorAll('.milestone-card');
    milestoneCards.forEach(card => {
        const icon = card.querySelector('.milestone-icon');
        
        card.addEventListener('click', function() {
            this.classList.toggle('active');
        });
        
        // Add pulse animation on hover
        card.addEventListener('mouseenter', function() {
            if (icon) {
                icon.style.transform = 'scale(1.1) rotate(5deg)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });

    // Legacy stats counter animation
    const legacyStats = document.querySelectorAll('.legacy-stat h3');
    legacyStats.forEach(stat => {
        const finalValue = parseInt(stat.textContent);
        if (!isNaN(finalValue)) {
            let currentValue = 0;
            const duration = 2000;
            const increment = finalValue / (duration / 16);
            
            const timer = setInterval(() => {
                currentValue += increment;
                if (currentValue >= finalValue) {
                    clearInterval(timer);
                    currentValue = finalValue;
                }
                stat.textContent = Math.floor(currentValue) + '+';
            }, 16);
        }
    });

    // Image error handling with fallback
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            console.log('Image failed to load:', this.src);
            const parent = this.parentElement;
            if (parent && !parent.classList.contains('image-fallback')) {
                parent.classList.add('image-fallback');
                parent.innerHTML = '<span>Historical Image</span>';
            }
        });
    });

    // Smooth scrolling for timeline navigation
    const timelineLinks = document.querySelectorAll('a[href="#timeline"]');
    timelineLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const timelineSection = document.getElementById('timeline');
            if (timelineSection) {
                timelineSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    console.log('History page JavaScript loaded successfully');
});