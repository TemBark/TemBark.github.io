document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Global Scroll Reveal Animations ---
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

    // --- 2. Work Page Modal Popup Logic ---
    const modal = document.getElementById('project-modal');
    
    // This 'if' statement prevents errors on pages that don't have the modal (like Home or Contact)
    if (modal) {
        const closeBtn = document.querySelector('.close-btn');
        const modalTitle = document.getElementById('modal-title');
        const modalTech = document.getElementById('modal-tech');
        const modalDesc = document.getElementById('modal-desc');
        const modalVideo = document.getElementById('modal-video');

        document.querySelectorAll('.work-item').forEach(item => {
            item.addEventListener('click', function(e) {
                e.preventDefault(); 
                
                // Pull data from the HTML attributes
                const title = this.getAttribute('data-title');
                const tech = this.getAttribute('data-tech');
                const desc = this.getAttribute('data-desc');
                const vidSrc = this.getAttribute('data-vid');

                // Inject data into the modal
                modalTitle.innerText = title;
                modalTech.innerText = tech;
                modalDesc.innerText = desc;
                modalVideo.src = vidSrc; 
                
                // Show the modal
                modal.style.display = 'flex'; 
            });
        });

        // Close when clicking the X
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
            modalVideo.src = ""; // Stops the video from playing in the background
        });

        // Close when clicking the dark background outside the modal
        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
                modalVideo.src = "";
            }
        });
    }

});
