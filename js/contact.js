// Contact Page Specific JavaScript - Optimized for PHP
document.addEventListener('DOMContentLoaded', function() {
    console.log('Contact page JavaScript loaded successfully');
    
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
    }

    // Contact form handling for PHP
    const contactForm = document.getElementById('mainContactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            // Show loading state
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            try {
                // Get form data
                const formData = new FormData(this);
                
                // Send to PHP
                const response = await fetch(this.action, {
                    method: 'POST',
                    body: formData
                });
                
                const result = await response.text();
                
                if (response.ok && result === 'success') {
                    showMessage('✅ Message sent successfully! We\'ll get back to you soon.', 'success');
                    contactForm.reset();
                } else {
                    throw new Error('Failed to send message');
                }
            } catch (error) {
                console.error('Form submission error:', error);
                showMessage('❌ Sorry, there was an error sending your message. Please try again or contact us directly.', 'error');
            } finally {
                // Reset button state
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        });
    }

    // Message display function
    function showMessage(message, type) {
        // Remove existing messages
        const existingMessage = document.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Create new message
        const messageDiv = document.createElement('div');
        messageDiv.className = `form-message ${type}`;
        messageDiv.innerHTML = message;
        
        // Add CSS styles
        messageDiv.style.cssText = `
            padding: 15px 20px;
            margin: 20px 0;
            border-radius: 10px;
            font-weight: 600;
            text-align: center;
            font-size: 16px;
            transition: all 0.3s ease;
            ${type === 'success' 
                ? 'background: linear-gradient(135deg, #d4edda, #c3e6cb); color: #155724; border: 2px solid #28a745;' 
                : 'background: linear-gradient(135deg, #f8d7da, #f5c6cb); color: #721c24; border: 2px solid #dc3545;'
            }
            box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        `;
        
        // Insert message above the form
        const formContainer = document.querySelector('.form-container');
        if (formContainer) {
            formContainer.insertBefore(messageDiv, formContainer.firstChild);
        }
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.style.opacity = '0';
                messageDiv.style.transform = 'translateY(-10px)';
                setTimeout(() => {
                    if (messageDiv.parentNode) {
                        messageDiv.remove();
                    }
                }, 300);
            }
        }, 5000);
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

    // Contact info card interactions
    const contactCards = document.querySelectorAll('.contact-card');
    
    contactCards.forEach((card) => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});

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