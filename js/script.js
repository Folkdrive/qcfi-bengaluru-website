// js/script.js
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
    
    // Dynamic Image Loading for Gallery
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
            { folder: 'images/Envernametal day/', file: 'WhatsApp Image 2025-11-22 at 10.10.42 AM.jpeg' },
            { folder: 'images/Envernametal day/', file: 'WhatsApp Image 2025-11-22 at 10.10.43 AM (1).jpeg' },
            { folder: 'images/Envernametal day/', file: 'WhatsApp Image 2025-11-22 at 10.10.46 AM (2).jpeg' },
            { folder: 'images/Envernametal day/', file: 'WhatsApp Image 2025-11-22 at 10.10.50 AM.jpeg' },
            { folder: 'images/Envernametal day/', file: 'WhatsApp Image 2025-11-22 at 10.10.52 AM.jpeg' },
            
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
        
        // Take first 10 images for the scroll (or all if less than 10)
        const selectedImages = shuffledImages.slice(0, Math.min(10, shuffledImages.length));

        // Clear existing content
        imageScrollTrack.innerHTML = '';

        if (selectedImages.length === 0) {
            if (noImagesMessage) noImagesMessage.style.display = 'block';
            return;
        }

        if (noImagesMessage) noImagesMessage.style.display = 'none';

        // Create image elements
        selectedImages.forEach((imageData, index) => {
            const imagePath = imageData.folder + imageData.file;
            
            const imageDiv = document.createElement('div');
            imageDiv.className = 'scroll-image';
            
            const img = document.createElement('img');
            img.src = imagePath;
            img.alt = `QCFI Event ${index + 1}`;
            img.onerror = function() {
                console.log('Failed to load image:', imagePath);
                this.style.display = 'none';
            };
            
            imageDiv.appendChild(img);
            imageScrollTrack.appendChild(imageDiv);
        });

        // Duplicate for seamless scrolling
        if (selectedImages.length > 0) {
            const duplicateImages = selectedImages.map((imageData, index) => {
                const imagePath = imageData.folder + imageData.file;
                
                const imageDiv = document.createElement('div');
                imageDiv.className = 'scroll-image';
                
                const img = document.createElement('img');
                img.src = imagePath;
                img.alt = `QCFI Event ${index + selectedImages.length + 1}`;
                img.onerror = function() {
                    console.log('Failed to load image:', imagePath);
                    this.style.display = 'none';
                };
                
                imageDiv.appendChild(img);
                return imageDiv;
            });

            duplicateImages.forEach(imageDiv => {
                imageScrollTrack.appendChild(imageDiv);
            });
        }
    }

    // Dynamic Partner Logos Loading
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

        // Try to load partner logos dynamically
        possibleLogoFiles.forEach((logoFile, index) => {
            const logoPath = 'images/partnerlogo/' + logoFile;
            
            const logoDiv = document.createElement('div');
            logoDiv.className = 'partner-logo';
            
            // Create image element with error handling
            const img = document.createElement('img');
            img.src = logoPath;
            img.alt = `Partner ${index + 1}`;
            img.onerror = function() {
                // If image fails to load, remove the element
                logoDiv.remove();
                checkIfNoLogos();
            };
            img.onload = function() {
                checkIfNoLogos();
            };
            
            logoDiv.appendChild(img);
            partnersTrack.appendChild(logoDiv);
        });

        function checkIfNoLogos() {
            // Check after a delay to allow images to load
            setTimeout(() => {
                if (partnersTrack.children.length === 0) {
                    if (noPartnersMessage) noPartnersMessage.style.display = 'block';
                } else {
                    if (noPartnersMessage) noPartnersMessage.style.display = 'none';
                    
                    // Duplicate logos for seamless scrolling
                    const existingLogos = Array.from(partnersTrack.children);
                    const duplicateLogos = existingLogos.map(logoDiv => {
                        return logoDiv.cloneNode(true);
                    });

                    duplicateLogos.forEach(logoDiv => {
                        partnersTrack.appendChild(logoDiv);
                    });
                }
            }, 1000);
        }

        // Initial check
        checkIfNoLogos();
    }

    // Load dynamic content
    loadRandomImages();
    loadPartnerLogos();
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && mobileNav) {
            mobileNav.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Header scroll effect
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (header) {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
    });
});