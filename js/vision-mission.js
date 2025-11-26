// js/vision-mission.js
// Vision & Mission Page Specific JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Add scroll animations for vision-mission page elements
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all cards for animation
    const cards = document.querySelectorAll('.vm-card, .objective-card, .gallery-item');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        observer.observe(card);
    });

    // Add hover effects for vision-mission icons
    const vmIcons = document.querySelectorAll('.vm-icon');
    vmIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) rotate(5deg)';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    });

    // Enhanced click handling for objective cards
    const objectiveCards = document.querySelectorAll('.objective-card');
    objectiveCards.forEach(card => {
        card.addEventListener('click', function() {
            this.classList.toggle('active');
        });
    });

    // Image error handling
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            console.log('Image failed to load:', this.src);
            this.style.display = 'none';
        });
    });

    console.log('Vision & Mission page JavaScript loaded successfully');
});