// Contact Page Specific JavaScript
// Clean version following established pattern

document.addEventListener('DOMContentLoaded', function() {
    console.log('Contact page JavaScript loaded successfully');
    
    // Initialize AOS for Contact page animations
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: true,
            offset: 50,
            easing: 'ease-out-cubic'
        });
    }

    // Enhanced contact card interactions
    const contactCards = document.querySelectorAll('.contact-card');
    
    contactCards.forEach((card, index) => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.contact-icon');
            if (icon) {
                icon.style.transform = 'scale(1.1) rotate(5deg)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.contact-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });

    // Contact form handling
    const contactForm = document.getElementById('mainContactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const formObject = Object.fromEntries(formData.entries());
            
            // Basic validation
            if (!formObject.name || !formObject.email || !formObject.subject || !formObject.message) {
                showFormMessage('Please fill in all required fields.', 'error');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formObject.email)) {
                showFormMessage('Please enter a valid email address.', 'error');
                return;
            }
            
            // Simulate form submission
            showFormMessage('Thank you for your message! We will get back to you soon.', 'success');
            
            // Reset form
            this.reset();
            
            // In a real implementation, you would send the data to a server here
            console.log('Form submitted:', formObject);
        });
    }

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

    // Add interactive features to email addresses
    const emailLinks = document.querySelectorAll('.email-addresses a');
    
    emailLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const email = this.getAttribute('href').replace('mailto:', '');
            
            // Copy to clipboard functionality
            if (navigator.clipboard) {
                navigator.clipboard.writeText(email).then(() => {
                    showFormMessage('Email address copied to clipboard!', 'success');
                }).catch(() => {
                    window.location.href = this.getAttribute('href');
                });
            } else {
                window.location.href = this.getAttribute('href');
            }
        });
    });

    // Map interaction enhancements
    const mapContainer = document.querySelector('.map-container');
    
    if (mapContainer) {
        mapContainer.addEventListener('mouseenter', function() {
            const overlay = this.querySelector('.map-overlay');
            if (overlay) {
                overlay.style.opacity = '1';
            }
        });
        
        mapContainer.addEventListener('mouseleave', function() {
            const overlay = this.querySelector('.map-overlay');
            if (overlay) {
                overlay.style.opacity = '0.9';
            }
        });
    }
});

// Form message display function
function showFormMessage(message, type) {
    // Remove existing messages
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create new message
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message form-message-${type}`;
    messageDiv.textContent = message;
    
    // Add styles
    messageDiv.style.cssText = `
        padding: 15px 20px;
        border-radius: 8px;
        margin-bottom: 20px;
        font-weight: 500;
        text-align: center;
        background: ${type === 'success' ? 'var(--light-blue)' : '#fee2e2'};
        color: ${type === 'success' ? 'var(--primary-blue)' : '#dc2626'};
        border: 1px solid ${type === 'success' ? 'var(--primary-blue)' : '#dc2626'};
    `;
    
    // Insert message
    const form = document.getElementById('mainContactForm');
    if (form) {
        form.insertBefore(messageDiv, form.firstChild);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            messageDiv.remove();
        }, 5000);
    }
}

// Handle window resize for Contact page specific adjustments
window.addEventListener('resize', function() {
    // Refresh AOS on resize
    if (typeof AOS !== 'undefined') {
        AOS.refresh();
    }
    
    // Adjust map overlay for mobile
    const mapOverlay = document.querySelector('.map-overlay');
    if (mapOverlay && window.innerWidth <= 767) {
        mapOverlay.style.position = 'relative';
        mapOverlay.style.marginTop = '15px';
    }
});

// Add CSS for contact specific animations
const contactStyles = `
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .contact-card {
        animation: slideInUp 0.6s ease-out;
    }
    
    .map-overlay {
        transition: opacity 0.3s ease;
    }
    
    .form-message {
        animation: slideInUp 0.3s ease-out;
    }
`;

// Inject Contact page specific styles
const styleSheet = document.createElement('style');
styleSheet.textContent = contactStyles;
document.head.appendChild(styleSheet);

// Export functions if needed for other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        showFormMessage,
        // Export other functions if needed
    };
}