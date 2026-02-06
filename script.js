// ===== FREDERICK'S PORTFOLIO INTERACTIVITY =====

// ===== MOBILE MENU TOGGLE =====
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenuBtn.innerHTML = navLinks.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });
}

// ===== TYPING EFFECT FOR HOMEPAGE =====
function initTypingEffect() {
    const typingElement = document.querySelector('.hero-typing');
    if (typingElement) {
        const roles = [
            "Computer Science Student",
            "Quantum Computing Enthusiast",
            "Full-Stack Developer",
            "AI/ML Researcher",
            "Cybersecurity Analyst",
            "Tech Innovator"
        ];
        
        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;
        
        function type() {
            const currentRole = roles[roleIndex];
            
            if (isDeleting) {
                typingElement.textContent = currentRole.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 50;
            } else {
                typingElement.textContent = currentRole.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 100;
            }
            
            if (!isDeleting && charIndex === currentRole.length) {
                typingSpeed = 1500; // Pause at end
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                typingSpeed = 500; // Pause before next
            }
            
            setTimeout(type, typingSpeed);
        }
        
        // Start typing after page loads
        setTimeout(type, 1000);
    }
}

// ===== SKILLS PROGRESS ANIMATION =====
function animateSkills() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.getAttribute('data-width');
                bar.style.width = '0%';
                
                setTimeout(() => {
                    bar.style.width = width + '%';
                }, 300);
                
                observer.unobserve(bar);
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => observer.observe(bar));
}

// ===== ACTIVE NAV LINK HIGHLIGHTING =====
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        
        if (currentPage === linkHref || 
            (currentPage === '' && linkHref === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// ===== FORM VALIDATION =====
function validateContactForm() {
    const form = document.getElementById('contactForm');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const message = document.getElementById('message');
            
            // Reset error states
            [name, email, message].forEach(field => {
                field.style.borderColor = 'rgba(0, 180, 255, 0.3)';
            });
            
            // Validate name
            if (name.value.trim().length < 2) {
                name.style.borderColor = '#ff4757';
                isValid = false;
                showNotification('Please enter your full name.', 'error');
            }
            
            // Validate email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email.value)) {
                email.style.borderColor = '#ff4757';
                isValid = false;
                showNotification('Please enter a valid email address.', 'error');
            }
            
            // Validate message
            if (message.value.trim().length < 10) {
                message.style.borderColor = '#ff4757';
                isValid = false;
                showNotification('Please enter a message with at least 10 characters.', 'error');
            }
            
            if (isValid) {
                // Simulate form submission
                const submitBtn = form.querySelector('.submit-btn');
                const originalText = submitBtn.innerHTML;
                
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> SENDING...';
                submitBtn.disabled = true;
                
                setTimeout(() => {
                    showNotification('Message sent successfully! I will contact you soon.', 'success');
                    form.reset();
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    
                    // Send WhatsApp notification (simulated)
                    sendWhatsAppNotification(name.value, email.value, message.value.substring(0, 50));
                }, 2000);
            }
        });
    }
}

// ===== WHATSAPP NOTIFICATION SIMULATION =====
function sendWhatsAppNotification(name, email, message) {
    // In a real implementation, this would connect to a backend service
    const phoneNumber = "0701723500"; // Frederick's WhatsApp
    const encodedMessage = encodeURIComponent(`New message from ${name} (${email}): ${message}...`);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    console.log(`WhatsApp notification ready: ${whatsappUrl}`);
    // In production, you would actually send this via an API
}

// ===== NOTIFICATION SYSTEM =====
function showNotification(message, type) {
    // Remove existing notification
    const existingNotification = document.querySelector('.cyber-notification');
    if (existingNotification) existingNotification.remove();
    
    const notification = document.createElement('div');
    notification.className = `cyber-notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${message}</span>
        <button class="notification-close"><i class="fas fa-times"></i></button>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? 'rgba(0, 255, 157, 0.15)' : 'rgba(255, 71, 87, 0.15)'};
        color: ${type === 'success' ? '#00ff9d' : '#ff4757'};
        padding: 1.2rem 1.5rem;
        border-radius: 8px;
        display: flex;
        align-items: center;
        gap: 15px;
        z-index: 9999;
        animation: slideInRight 0.3s ease forwards;
        backdrop-filter: blur(10px);
        border: 1px solid ${type === 'success' ? 'rgba(0, 255, 157, 0.3)' : 'rgba(255, 71, 87, 0.3)'};
        max-width: 400px;
        font-family: 'JetBrains Mono', monospace;
    `;
    
    document.body.appendChild(notification);
    
    // Add close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: inherit;
        cursor: pointer;
        font-size: 1rem;
        margin-left: auto;
        opacity: 0.7;
        transition: opacity 0.3s;
    `;
    
    closeBtn.addEventListener('mouseenter', () => {
        closeBtn.style.opacity = '1';
    });
    
    closeBtn.addEventListener('mouseleave', () => {
        closeBtn.style.opacity = '0.7';
    });
    
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s ease forwards';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease forwards';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// ===== BACK TO TOP BUTTON =====
function createBackToTopButton() {
    const button = document.createElement('button');
    button.innerHTML = '<i class="fas fa-chevron-up"></i>';
    button.classList.add('cyber-back-to-top');
    button.setAttribute('aria-label', 'Back to top');
    button.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: rgba(0, 180, 255, 0.2);
        color: var(--quantum-blue);
        border: 1px solid rgba(0, 180, 255, 0.5);
        border-radius: 50%;
        cursor: pointer;
        font-size: 1.2rem;
        box-shadow: 0 5px 20px rgba(0, 180, 255, 0.2);
        transition: all 0.3s ease;
        opacity: 0;
        visibility: hidden;
        z-index: 100;
        display: flex;
        align-items: center;
        justify-content: center;
        backdrop-filter: blur(5px);
    `;
    
    document.body.appendChild(button);
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 500) {
            button.style.opacity = '1';
            button.style.visibility = 'visible';
        } else {
            button.style.opacity = '0';
            button.style.visibility = 'hidden';
        }
    });
    
    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    button.addEventListener('mouseenter', () => {
        button.style.background = 'rgba(0, 180, 255, 0.4)';
        button.style.color = 'white';
        button.style.boxShadow = '0 0 20px rgba(0, 180, 255, 0.5)';
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.background = 'rgba(0, 180, 255, 0.2)';
        button.style.color = 'var(--quantum-blue)';
        button.style.boxShadow = '0 5px 20px rgba(0, 180, 255, 0.2)';
    });
}

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
    const fadeElements = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right');
    
    const fadeInOnScroll = () => {
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.style.opacity = '1';
                element.style.animationPlayState = 'running';
            }
        });
    };
    
    // Set initial state
    fadeElements.forEach(element => {
        element.style.opacity = '0';
        element.style.animationPlayState = 'paused';
    });
    
    window.addEventListener('scroll', fadeInOnScroll);
    fadeInOnScroll(); // Initial check
}

// ===== PARTICLE BACKGROUND =====
function createParticleBackground() {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particle-container';
    particleContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
        overflow: hidden;
    `;
    
    document.body.appendChild(particleContainer);
    
    // Create particles
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 3 + 1}px;
            height: ${Math.random() * 3 + 1}px;
            background: ${Math.random() > 0.5 ? 'var(--quantum-blue)' : 'var(--matrix-green)'};
            border-radius: 50%;
            opacity: ${Math.random() * 0.5 + 0.1};
        `;
        
        // Random position
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        
        particleContainer.appendChild(particle);
        
        // Animate particle
        animateParticle(particle);
    }
}

function animateParticle(particle) {
    let x = parseFloat(particle.style.left);
    let y = parseFloat(particle.style.top);
    let xSpeed = (Math.random() - 0.5) * 0.5;
    let ySpeed = (Math.random() - 0.5) * 0.5;
    
    function moveParticle() {
        x += xSpeed;
        y += ySpeed;
        
        // Bounce off edges
        if (x <= 0 || x >= 100) xSpeed *= -1;
        if (y <= 0 || y >= 100) ySpeed *= -1;
        
        // Keep within bounds
        x = Math.max(0, Math.min(100, x));
        y = Math.max(0, Math.min(100, y));
        
        particle.style.left = `${x}%`;
        particle.style.top = `${y}%`;
        
        requestAnimationFrame(moveParticle);
    }
    
    moveParticle();
}

// ===== INITIALIZE EVERYTHING =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('Frederick Nyolke Irungu Portfolio initialized');
    
    // Initialize components
    setActiveNavLink();
    validateContactForm();
    createBackToTopButton();
    initScrollAnimations();
    initTypingEffect();
    animateSkills();
    createParticleBackground();
    
    // Set current year in footer
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav-container') && 
            navLinks && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            if (mobileMenuBtn) {
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            }
        }
    });
    
    // Close mobile menu when clicking a link
    if (navLinks) {
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                if (mobileMenuBtn) {
                    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                }
            });
        });
    }
    
    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOutRight {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
});

// ===== PAGE LOAD ANIMATION =====
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Add loading animation removal
    const loader = document.querySelector('.page-loader');
    if (loader) {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 300);
        }, 500);
    }
});