/**
 * TIVRO - Main JavaScript
 * Version: 1.0
 */

document.addEventListener('DOMContentLoaded', function() {
    // Hero Slider Functionality with TIVRO brand colors
    const slides = document.querySelectorAll('.hero-slider .slide');
    let currentSlide = 0;
    
    // Function to change slides with brand-appropriate transitions
    function nextSlide() {
        // Remove active class from current slide
        slides[currentSlide].classList.remove('active');
        
        // Calculate next slide index
        currentSlide = (currentSlide + 1) % slides.length;
        
        // Add active class to next slide
        slides[currentSlide].classList.add('active');
    }
    
    // Set interval for automatic slide transition
    if (slides.length > 0) {
        // Initialize first slide
        slides[0].classList.add('active');
        // Start automatic slideshow
        setInterval(nextSlide, 5000); // Change slide every 5 seconds
    }
    
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking a link
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
    
    // Legal Tabs
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const target = this.getAttribute('data-target');
            
            // Remove active class from all buttons and contents
            tabBtns.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            this.classList.add('active');
            document.getElementById(target).classList.add('active');
        });
    });
    
    // Handle hash links for legal tabs
    if (window.location.hash) {
        const hash = window.location.hash.substring(1);
        const tabBtn = document.querySelector(`.tab-btn[data-target="${hash}"]`);
        
        if (tabBtn) {
            tabBtn.click();
        }
    }
    
    // Form Validation
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic validation
            let valid = true;
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const message = document.getElementById('message');
            
            if (!name.value.trim()) {
                valid = false;
                showError(name, 'Please enter your name');
            } else {
                removeError(name);
            }
            
            if (!email.value.trim()) {
                valid = false;
                showError(email, 'Please enter your email');
            } else if (!isValidEmail(email.value)) {
                valid = false;
                showError(email, 'Please enter a valid email');
            } else {
                removeError(email);
            }
            
            if (!message.value.trim()) {
                valid = false;
                showError(message, 'Please enter your message');
            } else {
                removeError(message);
            }
            
            if (valid) {
                // In a real implementation, you would send the form data to a server
                // For this demo, we'll just show a success message
                contactForm.innerHTML = `
                    <div class="success-message">
                        <i class="fas fa-check-circle"></i>
                        <h3>Thank You!</h3>
                        <p>Your message has been sent successfully. We'll get back to you soon.</p>
                    </div>
                `;
            }
        });
    }
    
    // Helper functions for form validation
    function showError(input, message) {
        const formGroup = input.parentElement;
        const errorElement = formGroup.querySelector('.error-message') || document.createElement('div');
        
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        
        if (!formGroup.querySelector('.error-message')) {
            formGroup.appendChild(errorElement);
        }
        
        formGroup.classList.add('error');
    }
    
    function removeError(input) {
        const formGroup = input.parentElement;
        const errorElement = formGroup.querySelector('.error-message');
        
        if (errorElement) {
            formGroup.removeChild(errorElement);
        }
        
        formGroup.classList.remove('error');
    }
    
    function isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href !== '#') {
                e.preventDefault();
                
                const targetElement = document.querySelector(href);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Sticky Header with opacity change
    const header = document.querySelector('header');
    const scrollThreshold = 100;
    
    function toggleStickyHeader() {
        if (window.scrollY > scrollThreshold) {
            header.classList.add('sticky');
            // Add opacity change when scrolling
            header.style.opacity = '0.8';
        } else {
            header.classList.remove('sticky');
            // Reset opacity when at top
            header.style.opacity = '1';
        }
    }
    
    window.addEventListener('scroll', toggleStickyHeader);
    toggleStickyHeader(); // Initial check
});

// FAQ Accordion functionality
document.addEventListener('DOMContentLoaded', function() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.closest('.faq-item');
            const answer = this.nextElementSibling;
            
            // Toggle current item
            answer.classList.toggle('active');
            faqItem.classList.toggle('expanded');
            
            // Update icon rotation
            const icon = this.querySelector('.toggle-icon i');
            if (icon) {
                if (answer.classList.contains('active')) {
                    icon.style.transform = 'rotate(180deg)';
                } else {
                    icon.style.transform = 'rotate(0)';
                }
            }
            
            // Optional: Close other items when opening a new one
            if (answer.classList.contains('active')) {
                document.querySelectorAll('.faq-answer.active').forEach(openAnswer => {
                    if (openAnswer !== answer) {
                        openAnswer.classList.remove('active');
                        const otherItem = openAnswer.closest('.faq-item');
                        otherItem.classList.remove('expanded');
                        
                        // Reset other icons
                        const otherIcon = otherItem.querySelector('.toggle-icon i');
                        if (otherIcon) {
                            otherIcon.style.transform = 'rotate(0)';
                        }
                    }
                });
            }
        });
    });
});

// Check if page has RTL content (Arabic)
const htmlElement = document.documentElement;
if (htmlElement.lang === 'ar') {
    document.body.classList.add('rtl');
    
    // Adjust FAQ container for RTL
    const faqContainer = document.querySelector('.faq-accordion');
    if (faqContainer) {
        faqContainer.classList.add('rtl-support');
    }
}

// Initialize two-column layout for larger screens
function setupFaqColumns() {
    const faqAccordion = document.querySelector('.faq-accordion');
    if (!faqAccordion) return;
    
    const faqItems = faqAccordion.querySelectorAll('.faq-item');
    if (faqItems.length < 3) return;
    
    // Only apply columns on larger screens
    if (window.innerWidth >= 768) {
        const leftColumn = document.createElement('div');
        leftColumn.className = 'faq-column faq-column-left';
        
        const rightColumn = document.createElement('div');
        rightColumn.className = 'faq-column faq-column-right';
        
        // Distribute items between columns
        faqItems.forEach((item, index) => {
            if (index % 2 === 0) {
                leftColumn.appendChild(item);
            } else {
                rightColumn.appendChild(item);
            }
        });
        
        // Clear and append columns
        faqAccordion.innerHTML = '';
        faqAccordion.appendChild(leftColumn);
        faqAccordion.appendChild(rightColumn);
    }
}

// Run on load and resize
setupFaqColumns();
window.addEventListener('resize', setupFaqColumns);

// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('nav');
    
    if (hamburger) {
        // Make sure hamburger is visible on mobile
        if (window.innerWidth <= 992) {
            hamburger.style.display = 'flex';
        }
        
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            nav.classList.toggle('active');
            
            // Prevent scrolling when menu is open
            document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
        });
        
        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-links a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                nav.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
        
        // Update hamburger visibility on resize
        window.addEventListener('resize', function() {
            if (window.innerWidth <= 992) {
                hamburger.style.display = 'flex';
            } else {
                hamburger.style.display = 'none';
                nav.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
});