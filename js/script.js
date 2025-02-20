document.addEventListener('DOMContentLoaded', function() {
    const viewMoreBtn = document.getElementById('view-more-btn');
    const hiddenProjects = document.querySelectorAll('.hidden-project');
    let projectsVisible = false;

    if (viewMoreBtn) {
        viewMoreBtn.addEventListener('click', function() {
            hiddenProjects.forEach(project => {
                project.style.display = projectsVisible ? 'none' : 'block';
                setTimeout(() => {
                    project.style.opacity = projectsVisible ? '0' : '1';
                    project.style.transform = projectsVisible ? 'translateY(20px)' : 'translateY(0)';
                }, 50);
            });

            projectsVisible = !projectsVisible;
            
            const btnText = viewMoreBtn.querySelector('.btn-text');
            const btnIcon = viewMoreBtn.querySelector('.btn-icon i');
            
            btnText.textContent = projectsVisible ? 'View Less' : 'View More Projects';
            btnIcon.className = projectsVisible ? 'fas fa-chevron-up' : 'fas fa-chevron-down';
        });
    }
});

// Skills section animations
document.addEventListener('DOMContentLoaded', () => {
    const skillCategories = document.querySelectorAll('.skill-category');
    
    skillCategories.forEach(category => {
        // Add hover effect
        category.addEventListener('mouseenter', () => {
            category.style.transform = 'translateY(-5px)';
            category.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2)';
        });
        
        category.addEventListener('mouseleave', () => {
            category.style.transform = 'none';
            category.style.boxShadow = 'none';
        });

        // Add click effect for skills
        const skills = category.querySelectorAll('li');
        skills.forEach(skill => {
            skill.addEventListener('click', () => {
                skill.style.transform = 'scale(1.1)';
                setTimeout(() => {
                    skill.style.transform = '';
                }, 200);
            });
        });
    });
});
