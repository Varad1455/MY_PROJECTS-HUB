document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for anchor links on the SAME page
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // Adjust for sticky navbar height
                    behavior: 'smooth'
                });
            }
        });
    });

    // Smooth scroll to anchor if an ID is in the URL on page load
    if (window.location.hash) {
        const hash = window.location.hash;
        const targetElement = document.querySelector(hash);
        if (targetElement) {
            // Use a timeout to ensure the page has finished rendering
            setTimeout(() => {
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // Adjust for sticky navbar height
                    behavior: 'smooth'
                });
            }, 100);
        }
    }

    // Hamburger menu logic
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        // Close menu when a link inside it is clicked
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    hamburger.classList.remove('active');
                }
            });
        });
    }

    // Intersection Observer for scroll animations
    const observerOptions = {
        root: null, // observes intersections relative to the viewport
        rootMargin: '0px',
        threshold: 0.1 // trigger when 10% of the element is visible
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            // If the element is intersecting (visible)
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Stop observing once it's visible to prevent re-animation
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const elementsToAnimate = document.querySelectorAll('.dashboard-grid .card');
    elementsToAnimate.forEach(el => observer.observe(el));

    // FAQ Search logic for help-center.html
    const helpSearchInput = document.getElementById('help-search');
    if (helpSearchInput) {
        const faqCategories = document.querySelectorAll('.faq-category');
        const noResultsMessage = document.getElementById('no-faq-results');

        helpSearchInput.addEventListener('input', () => {
            const searchTerm = helpSearchInput.value.toLowerCase().trim();
            let anyResultsFound = false;

            faqCategories.forEach(category => {
                const items = category.querySelectorAll('.faq-item');
                let categoryHasVisibleItem = false;

                items.forEach(item => {
                    const question = item.querySelector('.faq-question').textContent.toLowerCase();
                    const answer = item.querySelector('.faq-answer').textContent.toLowerCase();

                    if (question.includes(searchTerm) || answer.includes(searchTerm)) {
                        item.style.display = 'block';
                        categoryHasVisibleItem = true;
                        anyResultsFound = true;
                    } else {
                        item.style.display = 'none';
                    }
                });

                category.style.display = categoryHasVisibleItem ? 'block' : 'none';
            });

            noResultsMessage.style.display = anyResultsFound ? 'none' : 'block';
        });
    }

    // Back to Top button logic
    const backToTopButton = document.getElementById('back-to-top');

    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        });

        backToTopButton.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Contact Form 'mailto' logic
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            // Construct the mailto link
            const recipientEmail = 'argadevarad14@gmail.com';
            const subject = `New Message from ${name} via Financify Website`;
            const body = `You have received a new message from your website contact form.\n\n` +
                         `Name: ${name}\n` +
                         `From Email: ${email}\n\n` +
                         `Message:\n${message}`;

            const mailtoLink = `mailto:${recipientEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

            // Open the user's default email client
            window.location.href = mailtoLink;
        });
    }
});