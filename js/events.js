// events.js - Events Page Specific JavaScript - Mobile Optimized & Performance Focused
document.addEventListener('DOMContentLoaded', function() {
    console.log('Events page JavaScript loaded successfully');
    
    // FIX 1: Disable smooth scrolling by default
    document.documentElement.style.scrollBehavior = 'auto';
    
    // Initialize AOS with performance optimizations
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 600,
            once: true,
            offset: 100,
            easing: 'ease-out-cubic',
            delay: 0,
            throttleDelay: 99,
            disable: window.innerWidth < 768 // Disable on mobile for performance
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
                throttleDelay: 99,
                disable: window.innerWidth < 768
            });
        };
        document.head.appendChild(script);
    }

    // Initialize event filtering and navigation
    initializeEventNavigation();
    
    // Add controlled smooth scrolling for anchor links
    initializeControlledSmoothScrolling();
    
    // Performance optimization for event cards
    initializeEventCardOptimizations();
    
    // FIX 2: Prevent all unwanted scrolling
    preventUnwantedScrolling();
    
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
});

function preventUnwantedScrolling() {
    // Remove all auto-scroll behaviors
    window.scrollTo = function(x, y) {
        // Override to prevent automatic scrolling
        if (typeof y === 'number' && Math.abs(window.pageYOffset - y) > 100) {
            // Only allow manual scrolls, not automatic ones
            HTMLElement.prototype.scrollTo.call(window, x, y);
        }
    };
    
    // Disable any scroll listeners that might cause issues
    document.body.style.overscrollBehavior = 'none';
    
    // Remove any scroll event listeners that cause auto-scrolling
    const originalAddEventListener = window.addEventListener;
    window.addEventListener = function(type, listener, options) {
        if (type === 'scroll' && listener.toString().includes('scrollTo')) {
            console.log('Preventing auto-scroll listener');
            return;
        }
        originalAddEventListener.call(this, type, listener, options);
    };
    
    // Ensure month navigation doesn't auto-scroll
    const monthNavBtns = document.querySelectorAll('.month-nav-btn');
    monthNavBtns.forEach(btn => {
        const originalClick = btn.onclick;
        btn.onclick = function(e) {
            e.preventDefault();
            e.stopPropagation();
            if (originalClick) originalClick.call(this, e);
            return false;
        };
    });
}

function initializeEventNavigation() {
    const prevMonthBtn = document.getElementById('prevMonthBtn');
    const nextMonthBtn = document.getElementById('nextMonthBtn');
    const currentMonthElement = document.getElementById('currentMonth');
    
    if (!prevMonthBtn || !nextMonthBtn || !currentMonthElement) return;
    
    let currentMonthIndex = 0;
    let monthEvents = [];
    let currentMonthName = '';
    
    // Extract month information from displayed events
    function updateMonthNavigation() {
        const monthSeparators = document.querySelectorAll('.month-separator-text');
        if (monthSeparators.length === 0) {
            // No events or not loaded yet
            prevMonthBtn.disabled = true;
            nextMonthBtn.disabled = true;
            currentMonthElement.textContent = 'No Events Scheduled';
            return;
        }
        
        monthEvents = Array.from(monthSeparators).map(el => el.textContent.trim());
        
        if (currentMonthIndex >= monthEvents.length) {
            currentMonthIndex = monthEvents.length - 1;
        }
        
        if (currentMonthIndex < 0) {
            currentMonthIndex = 0;
        }
        
        currentMonthName = monthEvents[currentMonthIndex];
        currentMonthElement.textContent = currentMonthName;
        
        // Update button states
        prevMonthBtn.disabled = currentMonthIndex === 0;
        nextMonthBtn.disabled = currentMonthIndex === monthEvents.length - 1;
    }
    
    function scrollToCurrentMonthManual() {
        const monthSeparators = document.querySelectorAll('.month-separator');
        if (monthSeparators.length > currentMonthIndex) {
            const targetElement = monthSeparators[currentMonthIndex];
            const offsetTop = targetElement.offsetTop - 100; // Offset for header
            
            // Manual scroll without smooth behavior
            window.scrollTo({
                top: offsetTop,
                behavior: 'instant'
            });
        }
    }
    
    // Button event listeners - MANUAL scroll only when clicked
    prevMonthBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        if (currentMonthIndex > 0) {
            currentMonthIndex--;
            updateMonthNavigation();
            setTimeout(scrollToCurrentMonthManual, 10);
        }
        return false;
    });
    
    nextMonthBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        if (currentMonthIndex < monthEvents.length - 1) {
            currentMonthIndex++;
            updateMonthNavigation();
            setTimeout(scrollToCurrentMonthManual, 10);
        }
        return false;
    });
    
    // Update navigation after calendar events are loaded
    setTimeout(updateMonthNavigation, 1000);
}

function initializeControlledSmoothScrolling() {
    // Controlled smooth scrolling ONLY for explicit anchor clicks
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId !== '#' && targetId !== '#cta') {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 80;
                    
                    // Manual scroll - no smooth behavior to prevent auto-scrolling
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'instant'
                    });
                }
            }
        });
    });
    
    // Touch optimization for mobile
    if ('ontouchstart' in window) {
        document.querySelectorAll('.event-card-modern, .past-event-card, .event-type-card').forEach(card => {
            card.addEventListener('touchstart', function() {
                this.classList.add('touch-active');
            });
            
            card.addEventListener('touchend', function() {
                setTimeout(() => {
                    this.classList.remove('touch-active');
                }, 150);
            });
        });
    }
}

function initializeEventCardOptimizations() {
    // Lazy load images for future use
    const lazyImages = document.querySelectorAll('.event-card-modern img, .past-event-card img');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                    }
                    imageObserver.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px 0px',
            threshold: 0.1
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    }
    
    // Optimize event card hover effects for mobile
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        // Replace hover effects with active states on mobile
        document.querySelectorAll('.event-card-modern, .past-event-card, .event-type-card').forEach(card => {
            card.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.98)';
            });
            
            card.addEventListener('touchend', function() {
                this.style.transform = '';
            });
        });
        
        // Optimize button sizes for touch
        document.querySelectorAll('.btn-primary, .btn-secondary, .add-calendar-btn, .register-btn').forEach(btn => {
            btn.style.minHeight = '44px';
            btn.style.minWidth = '44px';
            btn.style.padding = '12px 20px';
        });
    }
    
    // Add CSS for touch feedback
    const touchStyles = `
        .event-card-modern.touch-active,
        .past-event-card.touch-active,
        .event-type-card.touch-active {
            transform: scale(0.98) !important;
            transition: transform 0.1s ease !important;
        }
        
        @media (max-width: 768px) {
            .event-card-modern:hover,
            .past-event-card:hover,
            .event-type-card:hover {
                transform: none !important;
            }
            
            .event-card-modern .add-calendar-btn:hover,
            .event-card-modern .register-btn:hover {
                transform: none !important;
            }
        }
    `;
    
    if (!document.querySelector('style[data-events-touch-styles]')) {
        const styleSheet = document.createElement('style');
        styleSheet.textContent = touchStyles;
        styleSheet.setAttribute('data-events-touch-styles', 'true');
        document.head.appendChild(styleSheet);
    }
}

// Performance: RequestIdleCallback for non-critical tasks
if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
        // Preload critical resources
        preloadCriticalResources();
        
        // Initialize non-critical features
        initializeNonCriticalFeatures();
    });
} else {
    setTimeout(() => {
        preloadCriticalResources();
        initializeNonCriticalFeatures();
    }, 1000);
}

function preloadCriticalResources() {
    // Preload important images
    const criticalImages = [
        '../images/logo.png',
        '../images/Stock/11.jpg'
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

function initializeNonCriticalFeatures() {
    // Initialize tooltips for event types
    const eventTypeCards = document.querySelectorAll('.event-type-card');
    
    eventTypeCards.forEach(card => {
        const icon = card.querySelector('.event-type-icon i');
        if (icon) {
            card.addEventListener('mouseenter', function() {
                icon.style.transform = 'rotate(5deg) scale(1.1)';
            });
            
            card.addEventListener('mouseleave', function() {
                icon.style.transform = '';
            });
        }
    });
    
    // Add subtle animation to loading spinner
    const loadingSpinner = document.querySelector('.loading-spinner');
    if (loadingSpinner) {
        let rotation = 0;
        const spinnerInterval = setInterval(() => {
            rotation += 5;
            if (loadingSpinner) {
                loadingSpinner.style.transform = `rotate(${rotation}deg)`;
            } else {
                clearInterval(spinnerInterval);
            }
        }, 50);
    }
}

// Handle back/forward navigation
window.addEventListener('pageshow', function(event) {
    if (event.persisted) {
        // Page was restored from bfcache
        if (typeof AOS !== 'undefined') {
            AOS.refresh();
        }
    }
});

// Error handling for calendar integration
window.addEventListener('error', function(e) {
    if (e.message && e.message.includes('calendar') || e.message.includes('Calendar')) {
        console.warn('Calendar integration issue detected:', e.message);
        // Gracefully handle calendar errors
        const loadingState = document.getElementById('loadingState');
        const noEventsState = document.getElementById('noEventsState');
        
        if (loadingState && noEventsState) {
            loadingState.style.display = 'none';
            noEventsState.style.display = 'block';
            noEventsState.innerHTML = `
                <div class="no-events-icon">
                    <i class="fas fa-exclamation-triangle"></i>
                </div>
                <h3>Calendar Temporarily Unavailable</h3>
                <p>We're having trouble loading events from our calendar. Please check back later or contact us for event information.</p>
                <a href="BangaloreChapter/contact.html" class="btn-primary">Contact Us for Event Details</a>
            `;
        }
    }
}, true);