document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Add fade-in class to elements
    const elementsToAnimate = document.querySelectorAll('.feature-card, .cap-text, .cap-visual, .cta-box');
    elementsToAnimate.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });

    // Add visible class style dynamically
    const style = document.createElement('style');
    style.innerHTML = `
        .visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);

    // Dynamic node graph animation (simple cycle)
    const nodes = document.querySelectorAll('.node');
    let activeIndex = 1; // Start at 'Processing'

    setInterval(() => {
        nodes.forEach(n => n.classList.remove('active', 'error'));
        
        activeIndex = (activeIndex + 1) % 3;
        
        if (activeIndex === 2) {
            // Error state occasionally
            if (Math.random() > 0.5) {
                nodes[activeIndex].classList.add('error');
            } else {
                nodes[activeIndex].classList.add('active');
            }
        } else {
            nodes[activeIndex].classList.add('active');
        }
    }, 2000);
});
