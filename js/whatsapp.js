/**
 * TIVRO - WhatsApp Button JavaScript
 * Version: 1.0
 */

document.addEventListener('DOMContentLoaded', function() {
    const whatsappButton = document.querySelector('.whatsapp-button');
    
    if (whatsappButton) {
        // Show WhatsApp button after scrolling down
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                whatsappButton.classList.add('visible');
            } else {
                whatsappButton.classList.remove('visible');
            }
        });
        
        // Add animation class on hover
        whatsappButton.addEventListener('mouseenter', function() {
            this.classList.add('pulse');
        });
        
        whatsappButton.addEventListener('mouseleave', function() {
            this.classList.remove('pulse');
        });
        
        // Add tracking for WhatsApp clicks (for analytics in a real implementation)
        const whatsappLink = whatsappButton.querySelector('a');
        
        if (whatsappLink) {
            whatsappLink.addEventListener('click', function() {
                // In a real implementation, you would track this event with analytics
                console.log('WhatsApp button clicked');
            });
        }
    }
    
    // Add additional CSS for WhatsApp button animations
    const style = document.createElement('style');
    style.textContent = `
        .whatsapp-button {
            opacity: 0;
            transform: scale(0.8);
            transition: all 0.3s ease;
        }
        
        .whatsapp-button.visible {
            opacity: 1;
            transform: scale(1);
        }
        
        .whatsapp-button.pulse a {
            animation: pulse 1s infinite;
        }
        
        @keyframes pulse {
            0% {
                transform: scale(1);
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
            }
            50% {
                transform: scale(1.1);
                box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
            }
            100% {
                transform: scale(1);
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
            }
        }
    `;
    
    document.head.appendChild(style);
});