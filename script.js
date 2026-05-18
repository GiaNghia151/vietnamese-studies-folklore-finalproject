document.addEventListener('DOMContentLoaded', () => {
    // 1. Sticky Navbar
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Adjust for fixed navbar
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 3. Number Counter Animation
    const stats = document.querySelectorAll('.stat-number');
    let hasAnimated = false;

    const animateNumbers = () => {
        stats.forEach(stat => {
            const target = +stat.getAttribute('data-target');
            const duration = 2000; // 2 seconds
            const increment = target / (duration / 16); // 60fps
            
            let current = 0;
            
            const updateNumber = () => {
                current += increment;
                if (current < target) {
                    stat.innerText = Math.ceil(current);
                    requestAnimationFrame(updateNumber);
                } else {
                    stat.innerText = target;
                }
            };
            
            updateNumber();
        });
    };

    // 4. Scroll Animations (Intersection Observer)
    // Add fade-in class to major sections/cards
    const elementsToAnimate = document.querySelectorAll('.section-title, .section-subtitle, .problem-card, .initiative-card, .game-card, .matters-card, .timeline-item, .detail-card');
    
    elementsToAnimate.forEach(el => {
        el.classList.add('fade-in');
    });

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Trigger number animation when hero section is visible
                if (entry.target.closest('.hero') && !hasAnimated) {
                    animateNumbers();
                    hasAnimated = true;
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    elementsToAnimate.forEach(el => {
        observer.observe(el);
    });

    // Also observe hero specifically for the counter
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        observer.observe(heroSection);
    }

    // 5. Contact Form Handling
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Basic validation is handled by HTML5 'required' attributes
            
            // Simulate API call/submission
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerText;
            
            submitBtn.innerText = 'Sending...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                // Hide form, show success
                contactForm.style.display = 'none';
                formSuccess.style.display = 'block';
                
                // Optional: reset form
                contactForm.reset();
                
                // Optional: revert back after some time
                // setTimeout(() => {
                //     formSuccess.style.display = 'none';
                //     contactForm.style.display = 'flex';
                //     submitBtn.innerText = originalText;
                //     submitBtn.disabled = false;
                // }, 5000);
            }, 1500);
        });
    }
});
