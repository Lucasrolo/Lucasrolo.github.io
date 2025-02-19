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

// View More Projects functionality
document.addEventListener('DOMContentLoaded', function() {
    const viewMoreBtn = document.getElementById('view-more-btn');
    const hiddenProjects = document.querySelectorAll('.hidden-project');
    const btnIcon = viewMoreBtn.querySelector('i');
    let projectsVisible = false;

    if (viewMoreBtn && hiddenProjects.length > 0) {
        viewMoreBtn.addEventListener('click', function() {
            projectsVisible = !projectsVisible;
            
            hiddenProjects.forEach(project => {
                project.classList.toggle('show');
            });

            // Update button text and icon
            const btnSpan = viewMoreBtn.querySelector('span');
            btnSpan.textContent = projectsVisible ? 'View Less Projects' : 'View More Projects';
            btnIcon.classList.toggle('fa-chevron-up');
            btnIcon.classList.toggle('fa-chevron-down');
            
            // Smooth scroll to newly visible projects if showing more
            if (projectsVisible) {
                const lastVisibleProject = hiddenProjects[hiddenProjects.length - 1];
                setTimeout(() => {
                    lastVisibleProject.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'center' 
                    });
                }, 100);
            } else {
                // Scroll back to projects section when hiding
                document.getElementById('projects').scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start' 
                });
            }
        });
    } else {
        // Hide button if no hidden projects
        viewMoreBtn.style.display = 'none';
    }
});
