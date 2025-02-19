// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        return;
    }
    
    if (currentScroll > lastScroll) {
        // Scrolling down
        navbar.style.transform = 'translateY(-100%)';
    } else {
        // Scrolling up
        navbar.style.transform = 'translateY(0)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// Add animation to elements when they come into view
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.project-card, .skill-category').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s ease-out';
    observer.observe(el);
});

// Mouse interaction with floating dots
document.addEventListener('mousemove', (e) => {
    const dots = document.querySelectorAll('.floating-dot');
    const heroContent = document.querySelector('.hero-content');
    const rect = heroContent.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    dots.forEach(dot => {
        // Calculate distance from mouse to center
        const deltaX = e.clientX - centerX;
        const deltaY = e.clientY - centerY;
        
        // Calculate rotation and movement based on mouse position
        const rotation = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
        const distance = Math.min(Math.sqrt(deltaX * deltaX + deltaY * deltaY) / 30, 10);
        
        // Apply transformation
        const moveX = (deltaX / distance) * 0.5;
        const moveY = (deltaY / distance) * 0.5;
        
        dot.style.transform = `translate(${moveX}px, ${moveY}px) rotate(${rotation}deg)`;
    });
});

// Reset position when mouse leaves
document.addEventListener('mouseleave', () => {
    const dots = document.querySelectorAll('.floating-dot');
    dots.forEach(dot => {
        dot.style.transform = 'translate(0, 0) rotate(0deg)';
    });
});
