document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const menu = document.querySelector('.menu');
    
    mobileMenuToggle.addEventListener('click', function() {
        menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
    });
    
    // Close menu when clicking on a link
    const menuLinks = document.querySelectorAll('.menu a');
    menuLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                menu.style.display = 'none';
            }
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Responsive menu handling
    function handleResize() {
        if (window.innerWidth > 768) {
            menu.style.display = 'block';
        } else {
            menu.style.display = 'none';
        }
    }
    
    window.addEventListener('resize', handleResize);
    handleResize();
});