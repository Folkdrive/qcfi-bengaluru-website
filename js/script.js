// js/script.js - Optimized Version
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileNav = document.getElementById('mobileNav');
    const closeNav = document.getElementById('closeNav');
    const imageScrollTrack = document.getElementById('imageScrollTrack');
    const partnersTrack = document.getElementById('partnersTrack');
    const noImagesMessage = document.getElementById('noImagesMessage');
    const noPartnersMessage = document.getElementById('noPartnersMessage');
    
    // Right Quick Menu Functionality
    const rightMenuBtn = document.getElementById('rightMenuBtn');
    const rightQuickMenu = document.getElementById('rightQuickMenu');
    const closeQuickMenu = document.getElementById('closeQuickMenu');

    function toggleRightMenu() {
        rightQuickMenu.classList.toggle('active');
        document.body.style.overflow = rightQuickMenu.classList.contains('active') ? 'hidden' : '';
    }

    if (rightMenuBtn && rightQuickMenu && closeQuickMenu) {
        rightMenuBtn.addEventListener('click', toggleRightMenu);
        closeQuickMenu.addEventListener('click', toggleRightMenu);

        // Close right menu when clicking outside
        document.addEventListener('click', function(e) {
            if (rightQuickMenu.classList.contains('active') && 
                !rightQuickMenu.contains(e.target) && 
                !rightMenuBtn.contains(e.target)) {
                toggleRightMenu();
            }
        });

        // Close right menu on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && rightQuickMenu.classList.contains('active')) {
                toggleRightMenu();
            }
        });
    }

    // Prevent membership links from navigating
    document.querySelectorAll('a[href="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
        });
    });
    
    // Desktop dropdown functionality
    const desktopNavItems = document.querySelectorAll('.nav-item');
    
    desktopNavItems.forEach(item => {
        const link = item.querySelector('.nav-link.has-submenu');
        const dropdown = item.querySelector('.dropdown-menu');
        
        if (link && dropdown) {
            // Show dropdown on hover
            item.addEventListener('mouseenter', function() {
                dropdown.classList.add('active');
                link.classList.add('active');
            });
            
            // Hide dropdown when mouse leaves
            item.addEventListener('mouseleave', function() {
                dropdown.classList.remove('active');
                link.classList.remove('active');
            });
            
            // Keep dropdown open when hovering over it
            dropdown.addEventListener('mouseenter', function() {
                dropdown.classList.add('active');
                link.classList.add('active');
            });
            
            dropdown.addEventListener('mouseleave', function() {
                dropdown.classList.remove('active');
                link.classList.remove('active');
            });
        }
    });
    
    // Mobile menu functionality
    function toggleMobileNav() {
        if (mobileNav) {
            const isExpanded = mobileNav.classList.toggle('active');
            document.body.style.overflow = isExpanded ? 'hidden' : '';
        }
    }
    
    if (mobileMenuBtn && mobileNav && closeNav) {
        mobileMenuBtn.addEventListener('click', toggleMobileNav);
        closeNav.addEventListener('click', toggleMobileNav);
        
        // Mobile submenu functionality
        const mobileNavItems = document.querySelectorAll('.mobile-nav-item.has-submenu');
        
        mobileNavItems.forEach(item => {
            const link = item.querySelector('.mobile-nav-link');
            
            if (link) {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    // Close other open submenus
                    mobileNavItems.forEach(otherItem => {
                        if (otherItem !== item) {
                            otherItem.classList.remove('active');
                        }
                    });
                    
                    // Toggle current submenu
                    item.classList.toggle('active');
                });
            }
        });
        
        // Close mobile nav when clicking on a link
        mobileNav.addEventListener('click', function(e) {
            if (e.target.tagName === 'A' && !e.target.classList.contains('mobile-nav-link')) {
                toggleMobileNav();
            }
        });
        
        // Close mobile nav on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && mobileNav.classList.contains('active')) {
                toggleMobileNav();
            }
        });
    }
    
    // Close dropdowns when clicking outside (desktop)
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.nav-item')) {
            document.querySelectorAll('.dropdown-menu').forEach(dropdown => {
                dropdown.classList.remove('active');
            });
            document.querySelectorAll('.nav-link.has-submenu').forEach(link => {
                link.classList.remove('active');
            });
        }
    });
    
    // Optimized Image Loading for Gallery with Lazy Loading
    function loadRandomImages() {
        if (!imageScrollTrack) return;
        
        const allImages = [
            // AGM Folder
            { folder: 'images/AGM/', file: 'WhatsApp Image 2025-11-22 at 10.11.19 AM (1).jpeg' },
            { folder: 'images/AGM/', file: 'WhatsApp Image 2025-11-22 at 10.11.23 AM (1).jpeg' },
            { folder: 'images/AGM/', file: 'WhatsApp Image 2025-11-22 at 10.11.28 AM.jpeg' },
            { folder: 'images/AGM/', file: 'WhatsApp Image 2025-11-22 at 10.11.50 AM (1).jpeg' },
            { folder: 'images/AGM/', file: 'WhatsApp Image 2025-11-22 at 10.11.55 AM (1).jpeg' },
            
            // Environmental day Folder
            { folder: 'images/Environmental day/', file: 'WhatsApp Image 2025-11-22 at 10.10.42 AM.jpeg' },
            { folder: 'images/Environmental day/', file: 'WhatsApp Image 2025-11-22 at 10.10.43 AM (1).jpeg' },
            { folder: 'images/Environmental day/', file: 'WhatsApp Image 2025-11-22 at 10.10.46 AM (2).jpeg' },
            { folder: 'images/Environmental day/', file: 'WhatsApp Image 2025-11-22 at 10.10.50 AM.jpeg' },
            { folder: 'images/Environmental day/', file: 'WhatsApp Image 2025-11-22 at 10.10.52 AM.jpeg' },
            
            // July Meet Folder
            { folder: 'images/July Meet/', file: 'WhatsApp Image 2025-11-22 at 10.10.34 AM.jpeg' },
            { folder: 'images/July Meet/', file: 'WhatsApp Image 2025-11-22 at 10.10.35 AM (2).jpeg' },
            { folder: 'images/July Meet/', file: 'WhatsApp Image 2025-11-22 at 10.10.35 AM.jpeg' },
            { folder: 'images/July Meet/', file: 'WhatsApp Image 2025-11-22 at 10.10.37 AM.jpeg' },
            { folder: 'images/July Meet/', file: 'WhatsApp Image 2025-11-22 at 10.10.42 AM.jpeg' },
            
            // NCQC24 Folder
            { folder: 'images/NCQC24/', file: 'WhatsApp Image 2025-11-22 at 10.10.52 AM.jpeg' },
            { folder: 'images/NCQC24/', file: 'WhatsApp Image 2025-11-22 at 10.10.53 AM (2).jpeg' },
            { folder: 'images/NCQC24/', file: 'WhatsApp Image 2025-11-22 at 10.10.54 AM (1).jpeg' },
            { folder: 'images/NCQC24/', file: 'WhatsApp Image 2025-11-22 at 10.10.54 AM (2).jpeg' },
            { folder: 'images/NCQC24/', file: 'WhatsApp Image 2025-11-22 at 10.10.55 AM (1).jpeg' },
            
            // Sustainability meet Folder
            { folder: 'images/Sustainability meet/', file: 'WhatsApp Image 2025-11-22 at 10.10.55 AM.jpeg' },
            { folder: 'images/Sustainability meet/', file: 'WhatsApp Image 2025-11-22 at 10.10.59 AM.jpeg' },
            { folder: 'images/Sustainability meet/', file: 'WhatsApp Image 2025-11-22 at 10.11.07 AM.jpeg' },
            { folder: 'images/Sustainability meet/', file: 'WhatsApp Image 2025-11-22 at 10.11.12 AM (1).jpeg' },
            { folder: 'images/Sustainability meet/', file: 'WhatsApp Image 2025-11-22 at 10.11.15 AM (1).jpeg' },
            { folder: 'images/Sustainability meet/', file: 'WhatsApp Image 2025-11-22 at 10.11.18 AM.jpeg' },
            
            // Root images folder
            { folder: 'images/', file: 'Kaizen competition 2025 at Ace Designers Ltd, Machining Components Division.jpeg' }
        ];

        // Filter out any invalid entries
        const validImages = allImages.filter(img => img.file && img.file.trim() !== '');
        
        // Shuffle images randomly using Fisher-Yates algorithm
        const shuffledImages = [...validImages];
        for (let i = shuffledImages.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledImages[i], shuffledImages[j]] = [shuffledImages[j], shuffledImages[i]];
        }
        
        // Take first 8 images for performance (reduced from 10)
        const selectedImages = shuffledImages.slice(0, Math.min(8, shuffledImages.length));

        // Clear existing content
        imageScrollTrack.innerHTML = '';

        if (selectedImages.length === 0) {
            if (noImagesMessage) noImagesMessage.style.display = 'block';
            return;
        }

        if (noImagesMessage) noImagesMessage.style.display = 'none';

        // Create Intersection Observer for lazy loading
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px 0px',
            threshold: 0.1
        });

        // Create image elements with lazy loading
        selectedImages.forEach((imageData, index) => {
            const imagePath = imageData.folder + imageData.file;
            
            const imageDiv = document.createElement('div');
            imageDiv.className = 'scroll-image';
            
            const img = document.createElement('img');
            img.dataset.src = imagePath; // Store real source in data attribute
            img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PC9zdmc+'; // Light gray placeholder
            img.alt = `QCFI Event ${index + 1}`;
            img.className = 'lazy';
            img.loading = 'lazy'; // Native lazy loading
            
            img.onerror = function() {
                console.log('Failed to load image:', imagePath);
                this.style.display = 'none';
            };
            
            imageDiv.appendChild(img);
            imageScrollTrack.appendChild(imageDiv);
            
            // Observe image for lazy loading
            imageObserver.observe(img);
        });

        // Duplicate for seamless scrolling (only if we have images)
        if (selectedImages.length > 0) {
            const firstBatch = Array.from(imageScrollTrack.children);
            firstBatch.forEach(imageDiv => {
                const clone = imageDiv.cloneNode(true);
                const img = clone.querySelector('img');
                if (img && img.dataset.src) {
                    imageObserver.observe(img);
                }
                imageScrollTrack.appendChild(clone);
            });
        }
    }

    // Dynamic Partner Logos Loading with Performance Optimization
    function loadPartnerLogos() {
        if (!partnersTrack) return;
        
        const possibleLogoFiles = [
            'partner1.png', 'partner2.png', 'partner3.png', 'partner4.png',
            'partner5.png', 'partner6.png', 'partner7.png', 'partner8.png',
            'logo1.png', 'logo2.png', 'logo3.png', 'logo4.png',
            'company1.png', 'company2.png', 'company3.png', 'company4.png'
        ];

        // Clear existing content
        partnersTrack.innerHTML = '';

        let loadedLogos = 0;
        const totalLogos = possibleLogoFiles.length;

        function checkIfNoLogos() {
            if (loadedLogos === 0 && partnersTrack.children.length === 0) {
                if (noPartnersMessage) noPartnersMessage.style.display = 'block';
            } else {
                if (noPartnersMessage) noPartnersMessage.style.display = 'none';
                
                // Duplicate logos for seamless scrolling only if we have actual logos
                if (partnersTrack.children.length > 0) {
                    const existingLogos = Array.from(partnersTrack.children);
                    const duplicateLogos = existingLogos.map(logoDiv => {
                        return logoDiv.cloneNode(true);
                    });

                    duplicateLogos.forEach(logoDiv => {
                        partnersTrack.appendChild(logoDiv);
                    });
                }
            }
        }

        // Try to load partner logos dynamically with error handling
        possibleLogoFiles.forEach((logoFile, index) => {
            const logoPath = 'images/partnerlogo/' + logoFile;
            
            const logoDiv = document.createElement('div');
            logoDiv.className = 'partner-logo';
            
            // Create image element with error handling
            const img = new Image();
            img.src = logoPath;
            img.alt = `Partner ${index + 1}`;
            img.loading = 'lazy';
            
            img.onerror = function() {
                // If image fails to load, remove the element
                logoDiv.remove();
                loadedLogos++;
                if (loadedLogos === totalLogos) {
                    checkIfNoLogos();
                }
            };
            
            img.onload = function() {
                loadedLogos++;
                logoDiv.appendChild(img);
                partnersTrack.appendChild(logoDiv);
                
                if (loadedLogos === totalLogos) {
                    checkIfNoLogos();
                }
            };
        });

        // Fallback check in case no images load
        setTimeout(checkIfNoLogos, 2000);
    }

    // Load dynamic content with performance optimization
    function loadContent() {
        // Use requestIdleCallback for non-critical tasks
        if ('requestIdleCallback' in window) {
            requestIdleCallback(() => {
                loadRandomImages();
                loadPartnerLogos();
            });
        } else {
            // Fallback for browsers that don't support requestIdleCallback
            setTimeout(() => {
                loadRandomImages();
                loadPartnerLogos();
            }, 100);
        }
    }

    // Initialize with performance optimization
    if ('requestIdleCallback' in window) {
        requestIdleCallback(loadContent);
    } else {
        // Fallback for older browsers
        setTimeout(loadContent, 500);
    }
    
    // Handle window resize with debouncing
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            if (window.innerWidth > 768 && mobileNav) {
                mobileNav.classList.remove('active');
                document.body.style.overflow = '';
            }
        }, 250);
    });

    // Header scroll effect with performance optimization
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (!scrollTimeout) {
            scrollTimeout = setTimeout(function() {
                scrollTimeout = null;
                const header = document.querySelector('.header');
                if (header) {
                    if (window.scrollY > 100) {
                        header.classList.add('scrolled');
                    } else {
                        header.classList.remove('scrolled');
                    }
                }
            }, 10);
        }
    });

    // Performance optimization: Preload critical images
    function preloadCriticalImages() {
        const criticalImages = [
            'images/logo.png',
            'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
        ];
        
        criticalImages.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    }

    // Preload critical images after page load
    window.addEventListener('load', preloadCriticalImages);
});