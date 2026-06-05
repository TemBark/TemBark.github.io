document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Scroll Animations ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => observer.observe(el));

    // --- 2. Modal Popup Logic ---
    const modal = document.getElementById('project-modal');
    const closeBtn = document.querySelector('.close-btn');
    
    // Modal Elements to update
    const modalTitle = document.getElementById('modal-title');
    const modalTech = document.getElementById('modal-tech');
    const modalDesc = document.getElementById('modal-desc');
    const modalVideo = document.getElementById('modal-video');

    // Attach click event to all work items
    document.querySelectorAll('.work-item').forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault(); // Stop page from jumping to top
            
            // Get data from the clicked item's HTML attributes
            const title = this.getAttribute('data-title');
            const tech = this.getAttribute('data-tech');
            const desc = this.getAttribute('data-desc');
            const vidSrc = this.getAttribute('data-vid');

            // Populate the modal
            modalTitle.innerText = title;
            modalTech.innerText = tech;
            modalDesc.innerText = desc;
            modalVideo.src = vidSrc; // Loads the specific video

            // Show modal & set layout to flex to center it
            modal.style.display = 'flex'; 
        });
    });

    // Close Modal via X button
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        modalVideo.src = ""; // Stops video audio/playing in background
    });

    // Close Modal by clicking outside the box
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            modalVideo.src = "";
        }
    });

});
