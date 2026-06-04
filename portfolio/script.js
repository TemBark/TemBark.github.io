document.addEventListener('DOMContentLoaded', () => {
    
    // Intersection Observer for Scroll Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Triggers when 15% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add the 'active' class to trigger the CSS transition
                entry.target.classList.add('active');
                // Unobserve so the animation only happens once
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Select all elements with the 'reveal' class
    const revealElements = document.querySelectorAll('.reveal');
    
    // Observe each element
    revealElements.forEach(el => {
        observer.observe(el);
    });

});
