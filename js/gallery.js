// Gallery Page Specific JavaScript
// Scalable solution for 5 images now, 90+ images later

document.addEventListener('DOMContentLoaded', function() {
    console.log('Gallery page JavaScript loaded successfully');
    
    // Initialize AOS for Gallery page animations
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: true,
            offset: 50,
            easing: 'ease-out-cubic'
        });
    }

    // Image data for different galleries
    const galleryImages = {
        'agm': [
            {
                src: '../images/AGM/WhatsApp Image 2025-11-22 at 10.11.19 AM (1).jpeg',
                alt: 'AGM 2025 - Opening ceremony and keynote address',
                title: 'Opening Ceremony',
                description: 'Keynote address at AGM 2025'
            },
            {
                src: '../images/AGM/WhatsApp Image 2025-11-22 at 10.11.23 AM (1).jpeg',
                alt: 'AGM 2025 - Quality awards distribution',
                title: 'Awards Distribution',
                description: 'Recognizing quality excellence achievements'
            },
            {
                src: '../images/AGM/WhatsApp Image 2025-11-22 at 10.11.28 AM.jpeg',
                alt: 'AGM 2025 - Panel discussion on quality initiatives',
                title: 'Panel Discussion',
                description: 'Expert panel on quality management'
            },
            {
                src: '../images/AGM/WhatsApp Image 2025-11-22 at 10.11.50 AM (1).jpeg',
                alt: 'AGM 2025 - Networking session among members',
                title: 'Networking Session',
                description: 'Members interacting and sharing experiences'
            },
            {
                src: '../images/AGM/WhatsApp Image 2025-11-22 at 10.11.55 AM (1).jpeg',
                alt: 'AGM 2025 - Group photo of all participants',
                title: 'Group Photo',
                description: 'All AGM 2025 participants together'
            }
        ],
        'environmental-day': [
            {
                src: '../images/Environmental day/WhatsApp Image 2025-11-22 at 10.10.42 AM.jpeg',
                alt: 'Environmental Day - Tree plantation activity',
                title: 'Tree Plantation',
                description: 'Green initiative for sustainability'
            },
            {
                src: '../images/Environmental day/WhatsApp Image 2025-11-22 at 10.10.43 AM (1).jpeg',
                alt: 'Environmental Day - Awareness session',
                title: 'Awareness Session',
                description: 'Educating about environmental conservation'
            },
            {
                src: '../images/Environmental day/WhatsApp Image 2025-11-22 at 10.10.46 AM (2).jpeg',
                alt: 'Environmental Day - Team activities',
                title: 'Team Activities',
                description: 'Collaborative environmental initiatives'
            },
            {
                src: '../images/Environmental day/WhatsApp Image 2025-11-22 at 10.10.50 AM.jpeg',
                alt: 'Environmental Day - Green practices workshop',
                title: 'Green Workshop',
                description: 'Workshop on sustainable practices'
            },
            {
                src: '../images/Environmental day/WhatsApp Image 2025-11-22 at 10.10.52 AM.jpeg',
                alt: 'Environmental Day - Certificate distribution',
                title: 'Certificate Distribution',
                description: 'Recognizing environmental contributions'
            }
        ],
        'july-meet': [
            {
                src: '../images/July Meet/WhatsApp Image 2025-11-22 at 10.10.34 AM.jpeg',
                alt: 'July Meet - Quality circle discussions',
                title: 'Quality Circle Discussion',
                description: 'Team working on quality improvements'
            },
            {
                src: '../images/July Meet/WhatsApp Image 2025-11-22 at 10.10.35 AM (2).jpeg',
                alt: 'July Meet - Presentation session',
                title: 'Presentation Session',
                description: 'Sharing quality improvement results'
            },
            {
                src: '../images/July Meet/WhatsApp Image 2025-11-22 at 10.10.35 AM.jpeg',
                alt: 'July Meet - Interactive workshop',
                title: 'Interactive Workshop',
                description: 'Hands-on quality training session'
            },
            {
                src: '../images/July Meet/WhatsApp Image 2025-11-22 at 10.10.37 AM.jpeg',
                alt: 'July Meet - Group activity',
                title: 'Group Activity',
                description: 'Collaborative problem solving'
            },
            {
                src: '../images/July Meet/WhatsApp Image 2025-11-22 at 10.10.42 AM.jpeg',
                alt: 'July Meet - Networking break',
                title: 'Networking Break',
                description: 'Members interacting during break'
            }
        ],
        'ncqc24': [
            {
                src: '../images/NCQC24/WhatsApp Image 2025-11-22 at 10.10.52 AM.jpeg',
                alt: 'NCQC24 - National convention inauguration',
                title: 'Convention Inauguration',
                description: 'Opening of national quality convention'
            },
            {
                src: '../images/NCQC24/WhatsApp Image 2025-11-22 at 10.10.53 AM (2).jpeg',
                alt: 'NCQC24 - Award ceremony',
                title: 'Award Ceremony',
                description: 'National level quality awards'
            },
            {
                src: '../images/NCQC24/WhatsApp Image 2025-11-22 at 10.10.54 AM (1).jpeg',
                alt: 'NCQC24 - Technical session',
                title: 'Technical Session',
                description: 'Expert technical presentations'
            },
            {
                src: '../images/NCQC24/WhatsApp Image 2025-11-22 at 10.10.54 AM (2).jpeg',
                alt: 'NCQC24 - Panel discussion',
                title: 'Panel Discussion',
                description: 'National experts discussing quality'
            },
            {
                src: '../images/NCQC24/WhatsApp Image 2025-11-22 at 10.10.55 AM (1).jpeg',
                alt: 'NCQC24 - Cultural event',
                title: 'Cultural Event',
                description: 'Evening cultural program'
            }
        ],
        'sustainability-meet': [
            {
                src: '../images/Sustainability meet/WhatsApp Image 2025-11-22 at 10.10.55 AM.jpeg',
                alt: 'Sustainability Meet - Keynote address',
                title: 'Keynote Address',
                description: 'Expert speaking on sustainability'
            },
            {
                src: '../images/Sustainability meet/WhatsApp Image 2025-11-22 at 10.10.59 AM.jpeg',
                alt: 'Sustainability Meet - Workshop session',
                title: 'Workshop Session',
                description: 'Practical sustainability workshop'
            },
            {
                src: '../images/Sustainability meet/WhatsApp Image 2025-11-22 at 10.11.07 AM.jpeg',
                alt: 'Sustainability Meet - Group discussion',
                title: 'Group Discussion',
                description: 'Team discussing sustainable practices'
            },
            {
                src: '../images/Sustainability meet/WhatsApp Image 2025-11-22 at 10.11.12 AM (1).jpeg',
                alt: 'Sustainability Meet - Case study presentation',
                title: 'Case Study',
                description: 'Real-world sustainability examples'
            },
            {
                src: '../images/Sustainability meet/WhatsApp Image 2025-11-22 at 10.11.15 AM (1).jpeg',
                alt: 'Sustainability Meet - Networking session',
                title: 'Networking Session',
                description: 'Sustainability professionals networking'
            },
            {
                src: '../images/Sustainability meet/WhatsApp Image 2025-11-22 at 10.11.18 AM.jpeg',
                alt: 'Sustainability Meet - Closing ceremony',
                title: 'Closing Ceremony',
                description: 'Final session and takeaways'
            }
        ],
        'kaizen-competition': [
            {
                src: '../images/Kaizen competition 2025 at Ace Designers Ltd, Machining Components Division.jpeg',
                alt: 'Kaizen Competition 2025 at Ace Designers Ltd',
                title: 'Kaizen Competition 2025',
                description: 'Continuous improvement competition at Ace Designers Ltd, Machining Components Division'
            },
            {
                src: '../images/Stock/1.jpg',
                alt: 'Kaizen Competition - Team presentations',
                title: 'Team Presentations',
                description: 'Teams presenting their improvement projects'
            },
            {
                src: '../images/Stock/2.jpg',
                alt: 'Kaizen Competition - Judging panel',
                title: 'Judging Panel',
                description: 'Expert judges evaluating projects'
            },
            {
                src: '../images/Stock/3.jpg',
                alt: 'Kaizen Competition - Award ceremony',
                title: 'Award Ceremony',
                description: 'Winners receiving recognition'
            },
            {
                src: '../images/Stock/4.jpg',
                alt: 'Kaizen Competition - Participant interactions',
                title: 'Participant Interactions',
                description: 'Networking among competition participants'
            }
        ]
    };

    // Determine current gallery from URL
    function getCurrentGallery() {
        const path = window.location.pathname;
        if (path.includes('agm.html')) return 'agm';
        if (path.includes('environmental-day.html')) return 'environmental-day';
        if (path.includes('july-meet.html')) return 'july-meet';
        if (path.includes('ncqc24.html')) return 'ncqc24';
        if (path.includes('sustainability-meet.html')) return 'sustainability-meet';
        if (path.includes('kaizen-competition.html')) return 'kaizen-competition';
        return 'agm'; // default
    }

    // Load images for current gallery
    function loadGalleryImages() {
        const galleryType = getCurrentGallery();
        const images = galleryImages[galleryType] || [];
        const galleryGrid = document.getElementById('galleryGrid') || document.getElementById('agmGallery') || document.getElementById(`${galleryType}Gallery`);
        
        if (!galleryGrid) return;

        // Clear existing content
        galleryGrid.innerHTML = '';

        if (images.length === 0) {
            galleryGrid.innerHTML = `
                <div class="no-images-message">
                    <i class="fas fa-images"></i>
                    <h3>No Images Available</h3>
                    <p>Gallery images will be added soon.</p>
                </div>
            `;
            return;
        }

        // Load initial batch of images (supports pagination for 90+ images)
        const initialBatch = images.slice(0, 6); // Show 6 images initially
        renderImages(initialBatch, galleryGrid);

        // Set up load more functionality for larger galleries
        const loadMoreBtn = document.getElementById('loadMoreBtn');
        if (loadMoreBtn && images.length > 6) {
            let currentBatch = 6;
            
            loadMoreBtn.style.display = 'block';
            loadMoreBtn.addEventListener('click', function() {
                const nextBatch = images.slice(currentBatch, currentBatch + 6);
                if (nextBatch.length > 0) {
                    renderImages(nextBatch, galleryGrid);
                    currentBatch += nextBatch.length;
                    
                    // Hide button if all images are loaded
                    if (currentBatch >= images.length) {
                        loadMoreBtn.style.display = 'none';
                    }
                }
            });
        } else if (loadMoreBtn) {
            loadMoreBtn.style.display = 'none';
        }
    }

    // Render images to gallery grid
    function renderImages(images, container) {
        images.forEach((image, index) => {
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item';
            galleryItem.setAttribute('data-aos', 'fade-up');
            galleryItem.setAttribute('data-aos-delay', (index % 6) * 100);
            
            galleryItem.innerHTML = `
                <img src="${image.src}" alt="${image.alt}" class="gallery-image" loading="lazy">
                <div class="gallery-overlay">
                    <h4>${image.title}</h4>
                    <p>${image.description}</p>
                </div>
            `;
            
            // Add click event for lightbox
            galleryItem.addEventListener('click', function() {
                openLightbox(images, index);
            });
            
            container.appendChild(galleryItem);
        });
    }

    // Lightbox functionality
    function openLightbox(images, startIndex) {
        // Create lightbox if it doesn't exist
        let lightbox = document.getElementById('lightbox');
        if (!lightbox) {
            lightbox = document.createElement('div');
            lightbox.id = 'lightbox';
            lightbox.className = 'lightbox';
            lightbox.innerHTML = `
                <button class="lightbox-close">&times;</button>
                <div class="lightbox-nav">
                    <button class="lightbox-prev"><i class="fas fa-chevron-left"></i></button>
                    <button class="lightbox-next"><i class="fas fa-chevron-right"></i></button>
                </div>
                <div class="lightbox-content">
                    <img class="lightbox-image" src="" alt="">
                </div>
            `;
            document.body.appendChild(lightbox);
            
            // Add event listeners
            lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
            lightbox.querySelector('.lightbox-prev').addEventListener('click', showPrevImage);
            lightbox.querySelector('.lightbox-next').addEventListener('click', showNextImage);
            lightbox.addEventListener('click', function(e) {
                if (e.target === lightbox) closeLightbox();
            });
            
            // Keyboard navigation
            document.addEventListener('keydown', handleKeyboardNavigation);
        }
        
        // Set current image index
        lightbox.currentIndex = startIndex;
        lightbox.images = images;
        
        // Show image
        showLightboxImage(startIndex);
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function showLightboxImage(index) {
        const lightbox = document.getElementById('lightbox');
        const image = lightbox.images[index];
        const imgElement = lightbox.querySelector('.lightbox-image');
        
        imgElement.src = image.src;
        imgElement.alt = image.alt;
        lightbox.currentIndex = index;
    }

    function showNextImage() {
        const lightbox = document.getElementById('lightbox');
        const nextIndex = (lightbox.currentIndex + 1) % lightbox.images.length;
        showLightboxImage(nextIndex);
    }

    function showPrevImage() {
        const lightbox = document.getElementById('lightbox');
        const prevIndex = (lightbox.currentIndex - 1 + lightbox.images.length) % lightbox.images.length;
        showLightboxImage(prevIndex);
    }

    function closeLightbox() {
        const lightbox = document.getElementById('lightbox');
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
        document.removeEventListener('keydown', handleKeyboardNavigation);
    }

    function handleKeyboardNavigation(e) {
        const lightbox = document.getElementById('lightbox');
        if (!lightbox || !lightbox.classList.contains('active')) return;
        
        switch(e.key) {
            case 'Escape':
                closeLightbox();
                break;
            case 'ArrowLeft':
                showPrevImage();
                break;
            case 'ArrowRight':
                showNextImage();
                break;
        }
    }

    // Enhanced gallery item interactions
    function enhanceGalleryInteractions() {
        const galleryItems = document.querySelectorAll('.gallery-item');
        
        galleryItems.forEach(item => {
            item.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-8px) scale(1.02)';
            });
            
            item.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });
    }

    // Initialize gallery
    loadGalleryImages();
    enhanceGalleryInteractions();

    // Update page title and meta based on gallery type
    function updatePageMeta() {
        const galleryType = getCurrentGallery();
        const titles = {
            'agm': 'AGM Gallery | QCFI Bengaluru Chapter | Annual General Meeting Photos',
            'environmental-day': 'Environmental Day Gallery | QCFI Bengaluru | Sustainability Events',
            'july-meet': 'July Meet Gallery | QCFI Bengaluru Chapter | Quality Circle Meetings',
            'ncqc24': 'NCQC24 Gallery | National Convention on Quality Circles 2024 | QCFI',
            'sustainability-meet': 'Sustainability Meet Gallery | QCFI Bengaluru | Green Initiatives',
            'kaizen-competition': 'Kaizen Competition 2025 Gallery | QCFI Bengaluru | Continuous Improvement'
        };
        
        if (titles[galleryType] && document.title !== titles[galleryType]) {
            document.title = titles[galleryType];
        }
    }

    updatePageMeta();
});

// Handle window resize for gallery optimizations
window.addEventListener('resize', function() {
    // Refresh AOS on resize
    if (typeof AOS !== 'undefined') {
        AOS.refresh();
    }
});

// Add CSS for gallery specific animations
const galleryStyles = `
    @keyframes fadeInScale {
        from {
            opacity: 0;
            transform: scale(0.9);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }
    
    .gallery-item {
        animation: fadeInScale 0.6s ease-out;
    }
    
    .no-images-message {
        text-align: center;
        padding: 60px 20px;
        color: var(--text-light);
    }
    
    .no-images-message i {
        font-size: 3rem;
        margin-bottom: 20px;
        color: var(--primary-blue);
    }
    
    .no-images-message h3 {
        margin-bottom: 10px;
        color: var(--text-dark);
    }
`;

// Inject gallery specific styles
const styleSheet = document.createElement('style');
styleSheet.textContent = galleryStyles;
document.head.appendChild(styleSheet);