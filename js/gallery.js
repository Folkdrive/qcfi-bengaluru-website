// Gallery Page Specific JavaScript - Performance Optimized with Lazy Loading
class GalleryManager {
    constructor() {
        this.currentPage = 1;
        this.imagesPerPage = 9;
        this.isLoading = false;
        this.observer = null;
        this.allImages = [];
        this.init();
    }

    init() {
        console.log('Gallery Manager initialized');
        this.setupLazyLoading();
        this.loadGalleryImages();
        this.setupEventListeners();
        this.initializeAOS();
    }

    setupLazyLoading() {
        // Intersection Observer for lazy loading with performance optimizations
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    this.loadImage(img);
                }
            });
        }, {
            rootMargin: '50px 0px',
            threshold: 0.1
        });
    }

    loadImage(img) {
        if (img.dataset.src && !img.classList.contains('loaded')) {
            const src = img.dataset.src;
            
            // Create a new image to preload
            const tempImg = new Image();
            
            tempImg.onload = () => {
                // Use requestAnimationFrame for smooth rendering
                requestAnimationFrame(() => {
                    img.src = src;
                    img.classList.remove('lazy');
                    img.classList.add('loaded');
                    this.observer.unobserve(img);
                });
            };
            
            tempImg.onerror = () => {
                console.warn('Failed to load image:', src);
                img.style.display = 'none';
                this.observer.unobserve(img);
            };
            
            // Start loading
            tempImg.src = src;
        }
    }

    getGalleryImages(galleryType) {
        const imageMap = {
            'agm': [
    '../images/AGM/WhatsApp Image 2025-11-22 at 10.11.19 AM (1).jpeg',
    '../images/AGM/WhatsApp Image 2025-11-22 at 10.11.19 AM.jpeg',
    '../images/AGM/WhatsApp Image 2025-11-22 at 10.11.22 AM (1).jpeg',
    '../images/AGM/WhatsApp Image 2025-11-22 at 10.11.22 AM (2).jpeg',
    '../images/AGM/WhatsApp Image 2025-11-22 at 10.11.22 AM.jpeg',
    '../images/AGM/WhatsApp Image 2025-11-22 at 10.11.23 AM (1).jpeg',
    '../images/AGM/WhatsApp Image 2025-11-22 at 10.11.23 AM.jpeg',
    '../images/AGM/WhatsApp Image 2025-11-22 at 10.11.24 AM (1).jpeg',
    '../images/AGM/WhatsApp Image 2025-11-22 at 10.11.24 AM.jpeg',
    '../images/AGM/WhatsApp Image 2025-11-22 at 10.11.26 AM (1).jpeg',
    '../images/AGM/WhatsApp Image 2025-11-22 at 10.11.26 AM.jpeg',
    '../images/AGM/WhatsApp Image 2025-11-22 at 10.11.27 AM (1).jpeg',
    '../images/AGM/WhatsApp Image 2025-11-22 at 10.11.27 AM.jpeg',
    '../images/AGM/WhatsApp Image 2025-11-22 at 10.11.28 AM (1).jpeg',
    '../images/AGM/WhatsApp Image 2025-11-22 at 10.11.28 AM.jpeg',
    '../images/AGM/WhatsApp Image 2025-11-22 at 10.11.29 AM (1).jpeg',
    '../images/AGM/WhatsApp Image 2025-11-22 at 10.11.30 AM (1).jpeg',
    '../images/AGM/WhatsApp Image 2025-11-22 at 10.11.30 AM.jpeg',
    '../images/AGM/WhatsApp Image 2025-11-22 at 10.11.31 AM (1).jpeg',
    '../images/AGM/WhatsApp Image 2025-11-22 at 10.11.31 AM.jpeg',
    '../images/AGM/WhatsApp Image 2025-11-22 at 10.11.32 AM (1).jpeg',
    '../images/AGM/WhatsApp Image 2025-11-22 at 10.11.34 AM.jpeg',
    '../images/AGM/WhatsApp Image 2025-11-22 at 10.11.35 AM (1).jpeg',
    '../images/AGM/WhatsApp Image 2025-11-22 at 10.11.40 AM (1).jpeg',
    '../images/AGM/WhatsApp Image 2025-11-22 at 10.11.40 AM.jpeg',
    '../images/AGM/WhatsApp Image 2025-11-22 at 10.11.41 AM (1).jpeg',
    '../images/AGM/WhatsApp Image 2025-11-22 at 10.11.41 AM.jpeg',
    '../images/AGM/WhatsApp Image 2025-11-22 at 10.11.42 AM (1).jpeg',
    '../images/AGM/WhatsApp Image 2025-11-22 at 10.11.42 AM.jpeg',
    '../images/AGM/WhatsApp Image 2025-11-22 at 10.11.43 AM (1).jpeg',
    '../images/AGM/WhatsApp Image 2025-11-22 at 10.11.43 AM.jpeg',
    '../images/AGM/WhatsApp Image 2025-11-22 at 10.11.44 AM.jpeg',
    '../images/AGM/WhatsApp Image 2025-11-22 at 10.11.46 AM (1).jpeg',
    '../images/AGM/WhatsApp Image 2025-11-22 at 10.11.46 AM.jpeg',
    '../images/AGM/WhatsApp Image 2025-11-22 at 10.11.47 AM (1).jpeg',
    '../images/AGM/WhatsApp Image 2025-11-22 at 10.11.47 AM.jpeg',
    '../images/AGM/WhatsApp Image 2025-11-22 at 10.11.48 AM (1).jpeg',
    '../images/AGM/WhatsApp Image 2025-11-22 at 10.11.48 AM (2).jpeg',
    '../images/AGM/WhatsApp Image 2025-11-22 at 10.11.48 AM.jpeg',
    '../images/AGM/WhatsApp Image 2025-11-22 at 10.11.49 AM (1).jpeg',
    '../images/AGM/WhatsApp Image 2025-11-22 at 10.11.49 AM.jpeg',
    '../images/AGM/WhatsApp Image 2025-11-22 at 10.11.51 AM (1).jpeg',
    '../images/AGM/WhatsApp Image 2025-11-22 at 10.11.53 AM (1).jpeg',
    '../images/AGM/WhatsApp Image 2025-11-22 at 10.11.54 AM (2).jpeg',
    '../images/AGM/WhatsApp Image 2025-11-22 at 10.11.55 AM (1).jpeg',
    '../images/AGM/WhatsApp Image 2025-11-22 at 10.11.58 AM (1).jpeg',
    '../images/AGM/WhatsApp Image 2025-11-22 at 10.11.59 AM (1).jpeg',
    '../images/AGM/WhatsApp Image 2025-11-22 at 10.11.59 AM.jpeg',
    '../images/AGM/WhatsApp Image 2025-11-22 at 10.12.00 AM.jpeg'
],
            'environmental-day': [
                '../images/Environmental day/WhatsApp Image 2025-11-22 at 10.10.42 AM.jpeg',
                '../images/Environmental day/WhatsApp Image 2025-11-22 at 10.10.43 AM (1).jpeg',
                '../images/Environmental day/WhatsApp Image 2025-11-22 at 10.10.43 AM (2).jpeg',
                '../images/Environmental day/WhatsApp Image 2025-11-22 at 10.10.43 AM.jpeg',
                '../images/Environmental day/WhatsApp Image 2025-11-22 at 10.10.44 AM (1).jpeg',
                '../images/Environmental day/WhatsApp Image 2025-11-22 at 10.10.44 AM (2).jpeg',
                '../images/Environmental day/WhatsApp Image 2025-11-22 at 10.10.44 AM.jpeg',
                '../images/Environmental day/WhatsApp Image 2025-11-22 at 10.10.45 AM (1).jpeg',
                '../images/Environmental day/WhatsApp Image 2025-11-22 at 10.10.45 AM.jpeg',
                '../images/Environmental day/WhatsApp Image 2025-11-22 at 10.10.46 AM (1).jpeg',
                '../images/Environmental day/WhatsApp Image 2025-11-22 at 10.10.46 AM (2).jpeg',
                '../images/Environmental day/WhatsApp Image 2025-11-22 at 10.10.46 AM.jpeg',
                '../images/Environmental day/WhatsApp Image 2025-11-22 at 10.10.47 AM (1).jpeg',
                '../images/Environmental day/WhatsApp Image 2025-11-22 at 10.10.47 AM.jpeg',
                '../images/Environmental day/WhatsApp Image 2025-11-22 at 10.10.48 AM (1).jpeg',
                '../images/Environmental day/WhatsApp Image 2025-11-22 at 10.10.48 AM.jpeg',
                '../images/Environmental day/WhatsApp Image 2025-11-22 at 10.10.49 AM (1).jpeg',
                '../images/Environmental day/WhatsApp Image 2025-11-22 at 10.10.49 AM (2).jpeg',
                '../images/Environmental day/WhatsApp Image 2025-11-22 at 10.10.49 AM.jpeg',
                '../images/Environmental day/WhatsApp Image 2025-11-22 at 10.10.50 AM (1).jpeg',
                '../images/Environmental day/WhatsApp Image 2025-11-22 at 10.10.50 AM (2).jpeg',
                '../images/Environmental day/WhatsApp Image 2025-11-22 at 10.10.50 AM.jpeg',
                '../images/Environmental day/WhatsApp Image 2025-11-22 at 10.10.51 AM (1).jpeg',
                '../images/Environmental day/WhatsApp Image 2025-11-22 at 10.10.51 AM.jpeg',
                '../images/Environmental day/WhatsApp Image 2025-11-22 at 10.10.52 AM.jpeg'
            ],
            'july-meet': [
                '../images/July Meet/WhatsApp Image 2025-11-22 at 10.10.34 AM.jpeg',
                '../images/July Meet/WhatsApp Image 2025-11-22 at 10.10.35 AM (1).jpeg',
                '../images/July Meet/WhatsApp Image 2025-11-22 at 10.10.35 AM (2).jpeg',
                '../images/July Meet/WhatsApp Image 2025-11-22 at 10.10.35 AM.jpeg',
                '../images/July Meet/WhatsApp Image 2025-11-22 at 10.10.36 AM (1).jpeg',
                '../images/July Meet/WhatsApp Image 2025-11-22 at 10.10.36 AM.jpeg',
                '../images/July Meet/WhatsApp Image 2025-11-22 at 10.10.37 AM (1).jpeg',
                '../images/July Meet/WhatsApp Image 2025-11-22 at 10.10.37 AM (2).jpeg',
                '../images/July Meet/WhatsApp Image 2025-11-22 at 10.10.37 AM.jpeg',
                '../images/July Meet/WhatsApp Image 2025-11-22 at 10.10.38 AM (1).jpeg',
                '../images/July Meet/WhatsApp Image 2025-11-22 at 10.10.38 AM.jpeg',
                '../images/July Meet/WhatsApp Image 2025-11-22 at 10.10.39 AM (1).jpeg',
                '../images/July Meet/WhatsApp Image 2025-11-22 at 10.10.39 AM (2).jpeg',
                '../images/July Meet/WhatsApp Image 2025-11-22 at 10.10.39 AM.jpeg',
                '../images/July Meet/WhatsApp Image 2025-11-22 at 10.10.40 AM (1).jpeg',
                '../images/July Meet/WhatsApp Image 2025-11-22 at 10.10.40 AM (2).jpeg',
                '../images/July Meet/WhatsApp Image 2025-11-22 at 10.10.40 AM.jpeg',
                '../images/July Meet/WhatsApp Image 2025-11-22 at 10.10.41 AM (1).jpeg',
                '../images/July Meet/WhatsApp Image 2025-11-22 at 10.10.41 AM.jpeg',
                '../images/July Meet/WhatsApp Image 2025-11-22 at 10.10.42 AM.jpeg'
            ],
            'ncqc24': [
                '../images/NCQC24/WhatsApp Image 2025-11-22 at 10.10.52 AM.jpeg',
                '../images/NCQC24/WhatsApp Image 2025-11-22 at 10.10.53 AM (1).jpeg',
                '../images/NCQC24/WhatsApp Image 2025-11-22 at 10.10.53 AM (2).jpeg',
                '../images/NCQC24/WhatsApp Image 2025-11-22 at 10.10.53 AM.jpeg',
                '../images/NCQC24/WhatsApp Image 2025-11-22 at 10.10.54 AM (1).jpeg',
                '../images/NCQC24/WhatsApp Image 2025-11-22 at 10.10.54 AM (2).jpeg',
                '../images/NCQC24/WhatsApp Image 2025-11-22 at 10.10.54 AM.jpeg',
                '../images/NCQC24/WhatsApp Image 2025-11-22 at 10.10.55 AM (1).jpeg',
                '../images/NCQC24/WhatsApp Image 2025-11-22 at 10.10.55 AM.jpeg'
            ],
            'sustainability-meet': [
                '../images/Sustainability meet/WhatsApp Image 2025-11-22 at 10.10.55 AM.jpeg',
                '../images/Sustainability meet/WhatsApp Image 2025-11-22 at 10.10.56 AM (1).jpeg',
                '../images/Sustainability meet/WhatsApp Image 2025-11-22 at 10.10.56 AM.jpeg',
                '../images/Sustainability meet/WhatsApp Image 2025-11-22 at 10.10.57 AM (1).jpeg',
                '../images/Sustainability meet/WhatsApp Image 2025-11-22 at 10.10.57 AM.jpeg',
                '../images/Sustainability meet/WhatsApp Image 2025-11-22 at 10.10.58 AM (1).jpeg',
                '../images/Sustainability meet/WhatsApp Image 2025-11-22 at 10.10.58 AM.jpeg',
                '../images/Sustainability meet/WhatsApp Image 2025-11-22 at 10.10.59 AM (1).jpeg',
                '../images/Sustainability meet/WhatsApp Image 2025-11-22 at 10.10.59 AM (2).jpeg',
                '../images/Sustainability meet/WhatsApp Image 2025-11-22 at 10.10.59 AM.jpeg',
                '../images/Sustainability meet/WhatsApp Image 2025-11-22 at 10.11.00 AM (1).jpeg',
                '../images/Sustainability meet/WhatsApp Image 2025-11-22 at 10.11.00 AM.jpeg',
                '../images/Sustainability meet/WhatsApp Image 2025-11-22 at 10.11.01 AM (1).jpeg',
                '../images/Sustainability meet/WhatsApp Image 2025-11-22 at 10.11.01 AM (2).jpeg',
                '../images/Sustainability meet/WhatsApp Image 2025-11-22 at 10.11.01 AM.jpeg',
                '../images/Sustainability meet/WhatsApp Image 2025-11-22 at 10.11.02 AM (1).jpeg',
                '../images/Sustainability meet/WhatsApp Image 2025-11-22 at 10.11.02 AM (2).jpeg',
                '../images/Sustainability meet/WhatsApp Image 2025-11-22 at 10.11.02 AM.jpeg',
                '../images/Sustainability meet/WhatsApp Image 2025-11-22 at 10.11.03 AM (1).jpeg',
                '../images/Sustainability meet/WhatsApp Image 2025-11-22 at 10.11.03 AM (2).jpeg',
                '../images/Sustainability meet/WhatsApp Image 2025-11-22 at 10.11.03 AM.jpeg',
                '../images/Sustainability meet/WhatsApp Image 2025-11-22 at 10.11.04 AM (1).jpeg',
                '../images/Sustainability meet/WhatsApp Image 2025-11-22 at 10.11.04 AM.jpeg',
                '../images/Sustainability meet/WhatsApp Image 2025-11-22 at 10.11.05 AM (1).jpeg',
                '../images/Sustainability meet/WhatsApp Image 2025-11-22 at 10.11.05 AM (2).jpeg',
                '../images/Sustainability meet/WhatsApp Image 2025-11-22 at 10.11.05 AM.jpeg',
                '../images/Sustainability meet/WhatsApp Image 2025-11-22 at 10.11.06 AM (1).jpeg',
                '../images/Sustainability meet/WhatsApp Image 2025-11-22 at 10.11.06 AM.jpeg',
                '../images/Sustainability meet/WhatsApp Image 2025-11-22 at 10.11.07 AM (1).jpeg',
                '../images/Sustainability meet/WhatsApp Image 2025-11-22 at 10.11.07 AM (2).jpeg',
                '../images/Sustainability meet/WhatsApp Image 2025-11-22 at 10.11.07 AM.jpeg',
                '../images/Sustainability meet/WhatsApp Image 2025-11-22 at 10.11.08 AM (1).jpeg',
                '../images/Sustainability meet/WhatsApp Image 2025-11-22 at 10.11.08 AM.jpeg',
                '../images/Sustainability meet/WhatsApp Image 2025-11-22 at 10.11.09 AM (1).jpeg',
                '../images/Sustainability meet/WhatsApp Image 2025-11-22 at 10.11.09 AM (2).jpeg',
                '../images/Sustainability meet/WhatsApp Image 2025-11-22 at 10.11.09 AM.jpeg',
                '../images/Sustainability meet/WhatsApp Image 2025-11-22 at 10.11.10 AM (1).jpeg',
                '../images/Sustainability meet/WhatsApp Image 2025-11-22 at 10.11.10 AM (2).jpeg',
                '../images/Sustainability meet/WhatsApp Image 2025-11-22 at 10.11.10 AM.jpeg',
                '../images/Sustainability meet/WhatsApp Image 2025-11-22 at 10.11.11 AM (1).jpeg',
                '../images/Sustainability meet/WhatsApp Image 2025-11-22 at 10.11.11 AM (2).jpeg',
                '../images/Sustainability meet/WhatsApp Image 2025-11-22 at 10.11.11 AM.jpeg',
                '../images/Sustainability meet/WhatsApp Image 2025-11-22 at 10.11.12 AM (1).jpeg',
                '../images/Sustainability meet/WhatsApp Image 2025-11-22 at 10.11.12 AM.jpeg',
                '../images/Sustainability meet/WhatsApp Image 2025-11-22 at 10.11.13 AM (1).jpeg',
                '../images/Sustainability meet/WhatsApp Image 2025-11-22 at 10.11.13 AM (2).jpeg',
                '../images/Sustainability meet/WhatsApp Image 2025-11-22 at 10.11.13 AM.jpeg',
                '../images/Sustainability meet/WhatsApp Image 2025-11-22 at 10.11.14 AM (1).jpeg',
                '../images/Sustainability meet/WhatsApp Image 2025-11-22 at 10.11.14 AM.jpeg',
                '../images/Sustainability meet/WhatsApp Image 2025-11-22 at 10.11.15 AM (1).jpeg',
                '../images/Sustainability meet/WhatsApp Image 2025-11-22 at 10.11.15 AM (2).jpeg',
                '../images/Sustainability meet/WhatsApp Image 2025-11-22 at 10.11.15 AM.jpeg',
                '../images/Sustainability meet/WhatsApp Image 2025-11-22 at 10.11.16 AM (1).jpeg',
                '../images/Sustainability meet/WhatsApp Image 2025-11-22 at 10.11.16 AM (2).jpeg',
                '../images/Sustainability meet/WhatsApp Image 2025-11-22 at 10.11.16 AM.jpeg',
                '../images/Sustainability meet/WhatsApp Image 2025-11-22 at 10.11.17 AM (1).jpeg',
                '../images/Sustainability meet/WhatsApp Image 2025-11-22 at 10.11.17 AM.jpeg',
                '../images/Sustainability meet/WhatsApp Image 2025-11-22 at 10.11.18 AM (1).jpeg',
                '../images/Sustainability meet/WhatsApp Image 2025-11-22 at 10.11.18 AM (2).jpeg',
                '../images/Sustainability meet/WhatsApp Image 2025-11-22 at 10.11.18 AM.jpeg'
            ],
            'kaizen-competition': [
                '../images/Kaizen competition 2025 at Ace Designers Ltd, Machining Components Division.jpeg'
            ]
        };

        return imageMap[galleryType] || [];
    }

    loadGalleryImages() {
        const galleryContainer = document.getElementById('agmGallery');
        if (!galleryContainer) return;

        // Get gallery type from data attribute
        const galleryType = document.body.getAttribute('data-gallery-type') || 'agm';
        
        // Load all images for this gallery
        if (this.allImages.length === 0) {
            this.allImages = this.getGalleryImages(galleryType);
        }

        const startIndex = (this.currentPage - 1) * this.imagesPerPage;
        const endIndex = startIndex + this.imagesPerPage;
        const currentImages = this.allImages.slice(startIndex, endIndex);

        if (currentImages.length === 0 && this.currentPage === 1) {
            this.showNoImagesMessage();
            this.hideLoadMoreButton();
            return;
        }

        this.renderImages(currentImages, galleryContainer);
        this.observeImages();
        
        // Update load more button
        this.updateLoadMoreButton(endIndex);
    }

    renderImages(images, container) {
        const fragment = document.createDocumentFragment();

        images.forEach((imagePath, index) => {
            const galleryItem = this.createGalleryItem(imagePath, index);
            fragment.appendChild(galleryItem);
        });

        container.appendChild(fragment);
        
        // Refresh AOS for new elements
        if (typeof AOS !== 'undefined') {
            AOS.refresh();
        }
    }

    createGalleryItem(imagePath, index) {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.setAttribute('data-aos', 'fade-up');
        galleryItem.setAttribute('data-aos-delay', (index % 3) * 100);

        const img = document.createElement('img');
        img.className = 'gallery-image lazy';
        img.dataset.src = imagePath;
        img.alt = `Gallery Image ${index + 1}`;
        img.loading = 'lazy';
        img.decoding = 'async';
        
        // Set SVG placeholder with correct aspect ratio
        img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PC9zdmc+';

        galleryItem.appendChild(img);
        return galleryItem;
    }

    observeImages() {
        const images = document.querySelectorAll('.gallery-image.lazy');
        images.forEach(img => this.observer.observe(img));
    }

    showNoImagesMessage() {
        const container = document.getElementById('agmGallery');
        if (container) {
            container.innerHTML = `
                <div class="no-images-message" style="grid-column: 1 / -1;">
                    <i class="fas fa-images"></i>
                    <h3>No Images Available</h3>
                    <p>Images will be displayed here as they become available.</p>
                </div>
            `;
        }
    }

    hideLoadMoreButton() {
        const loadMoreBtn = document.getElementById('loadMoreBtn');
        if (loadMoreBtn) {
            loadMoreBtn.style.display = 'none';
        }
    }

    updateLoadMoreButton(endIndex) {
        const loadMoreBtn = document.getElementById('loadMoreBtn');
        if (loadMoreBtn) {
            if (endIndex >= this.allImages.length) {
                loadMoreBtn.style.display = 'none';
            } else {
                loadMoreBtn.style.display = 'inline-flex';
            }
        }
    }

    setupEventListeners() {
        const loadMoreBtn = document.getElementById('loadMoreBtn');
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', () => this.loadMore());
        }

        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const targetId = anchor.getAttribute('href');
                if (targetId !== '#' && !targetId.includes('cta')) {
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

        // Touch event optimization for mobile
        this.setupTouchEvents();
    }

    setupTouchEvents() {
        // Add touch-specific optimizations
        if ('ontouchstart' in window) {
            // Reduce hover effects delay on touch devices
            const galleryItems = document.querySelectorAll('.gallery-item');
            galleryItems.forEach(item => {
                item.addEventListener('touchstart', function() {
                    this.classList.add('touch-active');
                }, { passive: true });
                
                item.addEventListener('touchend', function() {
                    this.classList.remove('touch-active');
                }, { passive: true });
            });
        }
    }

    loadMore() {
        if (this.isLoading) return;
        
        this.isLoading = true;
        this.currentPage++;
        
        const loadMoreBtn = document.getElementById('loadMoreBtn');
        if (loadMoreBtn) {
            const originalHTML = loadMoreBtn.innerHTML;
            loadMoreBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
            loadMoreBtn.disabled = true;

            // Use requestIdleCallback for better performance
            if ('requestIdleCallback' in window) {
                requestIdleCallback(() => {
                    this.loadGalleryImages();
                    this.isLoading = false;
                    loadMoreBtn.innerHTML = originalHTML;
                    loadMoreBtn.disabled = false;
                });
            } else {
                // Fallback for older browsers
                setTimeout(() => {
                    this.loadGalleryImages();
                    this.isLoading = false;
                    loadMoreBtn.innerHTML = originalHTML;
                    loadMoreBtn.disabled = false;
                }, 300);
            }
        }
    }

    initializeAOS() {
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: 800,
                once: true,
                offset: 100,
                easing: 'ease-out-cubic',
                delay: 0,
                throttleDelay: 99,
                disable: window.innerWidth < 768
            });
        }
    }

    // Method to add more images dynamically (for future use)
    addImages(newImages) {
        this.allImages = [...this.allImages, ...newImages];
        this.loadGalleryImages();
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Use requestIdleCallback for non-critical initialization
    if ('requestIdleCallback' in window) {
        requestIdleCallback(() => {
            window.galleryManager = new GalleryManager();
        });
    } else {
        window.galleryManager = new GalleryManager();
    }
    
    // Optimized resize handler
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            if (typeof AOS !== 'undefined') {
                AOS.refresh();
            }
        }, 150);
    });

    // Performance monitoring (optional)
    if ('performance' in window) {
        const galleryLoadTime = performance.now();
        console.log(`Gallery initialized in ${galleryLoadTime}ms`);
    }
});

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = GalleryManager;
}