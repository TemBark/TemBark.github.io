document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Global Scroll Reveal Animations ---
    const observerOptions = { root: null, rootMargin: '0px', threshold: 0.15 };
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


    // --- 2. Mobile Hamburger Menu Logic ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('nav-active');
            hamburger.classList.toggle('toggle');
        });
    }


    // --- 3. Page Transition Animation Logic ---
    document.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function(e) {
            
            const target = this.href;
            
            // Only trigger the exit animation if it's an internal page link.
            // Do not trigger for external links, the resume PDF, or mailto links.
            if (
                this.hostname === window.location.hostname && 
                this.getAttribute('target') !== '_blank' && 
                !this.getAttribute('href').startsWith('mailto:') &&
                !this.getAttribute('href').startsWith('#')
            ) {
                e.preventDefault(); // Stop instant loading
                
                // Add the exit animation class to the body
                document.body.classList.add('page-exit');
                
                // Wait 400ms for the animation to finish before moving to the next page
                setTimeout(() => {
                    window.location.href = target;
                }, 400); 
            }
        });
    });


    // --- 4. Work Page Modal Popup Logic ---
    const modal = document.getElementById('project-modal');
    
    if (modal) {
        const closeBtn = document.querySelector('.close-btn');
        const modalTitle = document.getElementById('modal-title');
        const modalTech = document.getElementById('modal-tech');
        const modalDesc = document.getElementById('modal-desc');
        const modalVideo = document.getElementById('modal-video');

        document.querySelectorAll('.work-item').forEach(item => {
            item.addEventListener('click', function(e) {
                e.preventDefault(); 
                modalTitle.innerText = this.getAttribute('data-title');
                modalTech.innerText = this.getAttribute('data-tech');
                modalDesc.innerText = this.getAttribute('data-desc');
                modalVideo.src = this.getAttribute('data-vid'); 
                modal.style.display = 'flex'; 
            });
        });

        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
            modalVideo.src = ""; 
        });

        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
                modalVideo.src = "";
            }
        });
    }

});
