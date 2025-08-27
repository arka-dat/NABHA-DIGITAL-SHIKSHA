document.addEventListener('DOMContentLoaded', () => {

    // Mobile Navigation (Hamburger Menu)
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () => {
        // Toggle Nav
        nav.classList.toggle('nav-active');

        // Animate Links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });

        // Burger Animation
        burger.classList.toggle('toggle');
    });

    // Contact Form Submission
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent actual form submission

        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;

        // Simple validation
        if (name.trim() === '' || email.trim() === '') {
            formMessage.textContent = 'Please fill in all required fields.';
            formMessage.style.color = 'red';
        } else {
            // Display success message
            formMessage.textContent = `Thank you, ${name}! Your message has been received.`;
            formMessage.style.color = 'var(--primary-color)';

            // Clear the form
            contactForm.reset();
        }
    });

});