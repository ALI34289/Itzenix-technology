document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    const header = document.querySelector('header');
    const chatIcon = document.getElementById('chat-icon');
    const chatWindow = document.getElementById('chat-window');
    const closeChat = document.getElementById('close-chat');
    const sendChat = document.getElementById('send-chat');
    const chatInput = document.getElementById('chat-input');
    const chatBody = document.getElementById('chat-body');
    const preloader = document.getElementById('preloader');
    const counters = document.querySelectorAll('.counter');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioGrid = document.querySelector('.portfolio-grid');
    const themeToggle = document.getElementById('theme-toggle');
    const faqItems = document.querySelectorAll('.faq-item');
    const newsletterForm = document.getElementById('newsletter-form');

    window.addEventListener('load', () => {
        preloader.style.display = 'none';
    });

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        counters.forEach(counter => {
            const rect = counter.getBoundingClientRect();
            if (rect.top >= 0 && rect.bottom <= window.innerHeight && !counter.classList.contains('animated')) {
                const target = +counter.getAttribute('data-target');
                counter.innerText = '0';
                counter.classList.add('animated');

                const updateCounter = () => {
                    const value = +counter.innerText;
                    const increment = target / 200;

                    if (value < target) {
                        counter.innerText = `${Math.ceil(value + increment)}`;
                        setTimeout(updateCounter, 1);
                    } else {
                        counter.innerText = target;
                    }
                };
                updateCounter();
            }
        });
    });

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (validateForm()) {
            const formData = new FormData(contactForm);
            try {
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                if (response.ok) {
                    alert('Thank you for your message! It has been sent.');
                    contactForm.reset();
                } else {
                    alert('Oops! There was a problem submitting your form.');
                }
            } catch (error) {
                alert('Oops! There was a problem submitting your form.');
            }
        }
    });

    function validateForm() {
        const name = contactForm.querySelector('input[name="name"]');
        const email = contactForm.querySelector('input[name="email"]');
        const message = contactForm.querySelector('textarea[name="message"]');
        let isValid = true;

        // Name validation
        if (name.value.trim() === '') {
            setError(name, 'Name is required');
            isValid = false;
        } else {
            setSuccess(name);
        }

        // Email validation
        if (email.value.trim() === '') {
            setError(email, 'Email is required');
            isValid = false;
        } else if (!isEmail(email.value.trim())) {
            setError(email, 'Please enter a valid email');
            isValid = false;
        } else {
            setSuccess(email);
        }

        // Message validation
        if (message.value.trim() === '') {
            setError(message, 'Message is required');
            isValid = false;
        } else {
            setSuccess(message);
        }

        return isValid;
    }

    function setError(input, message) {
        const formControl = input.parentElement;
        const small = formControl.querySelector('small');
        formControl.className = 'form-control error';
        small.innerText = message;
    }

    function setSuccess(input) {
        const formControl = input.parentElement;
        formControl.className = 'form-control success';
    }

    function isEmail(email) {
        return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
    }


    // Testimonial Slider
    const swiper = new Swiper('.swiper-container', {
        loop: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });

    // Portfolio Slider
    const portfolioSlider = new Swiper('.portfolio-slider', {
        slidesPerView: 3,
        spaceBetween: 30,
        loop: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            // when window width is >= 320px
            320: {
                slidesPerView: 1,
                spaceBetween: 20
            },
            // when window width is >= 768px
            768: {
                slidesPerView: 2,
                spaceBetween: 30
            },
            // when window width is >= 1024px
            1024: {
                slidesPerView: 3,
                spaceBetween: 30
            }
        }
    });

    // Portfolio Filtering
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.getAttribute('data-filter');

            portfolioSlider.slides.forEach(slide => {
                if (filter === '*' || slide.classList.contains(filter.substring(1))) {
                    slide.style.display = 'block';
                } else {
                    slide.style.display = 'none';
                }
            });
            portfolioSlider.update();
        });
    });

    // FAQ Accordion
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const openItem = document.querySelector('.faq-item.active');
            if (openItem && openItem !== item) {
                openItem.classList.remove('active');
            }
            item.classList.toggle('active');
        });
    });

    // Newsletter Form
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input[name="email"]');
        if (isEmail(email.value.trim())) {
            alert('Thank you for subscribing!');
            email.value = '';
        } else {
            alert('Please enter a valid email address.');
        }
    });

    // Theme Toggle
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        if (document.body.classList.contains('dark-mode')) {
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }
    });

    // ScrollReveal Animations
    const sr = ScrollReveal({
        origin: 'top',
        distance: '60px',
        duration: 2500,
        delay: 400,
    });

    sr.reveal(`.hero-content, .section-title`);
    sr.reveal(`.service-cards .card`, { interval: 100 });
    sr.reveal(`.about-content`, { origin: 'left' });
    sr.reveal(`.features .feature`, { interval: 100 });
    sr.reveal(`.swiper-container`, { origin: 'bottom' });
    sr.reveal(`.job`, { interval: 100 });
    sr.reveal(`#contact-form`, { origin: 'left' });
    sr.reveal(`.stat`, { interval: 100 });
    sr.reveal(`.portfolio-item`, { interval: 100 });
    sr.reveal(`.faq-item`, { interval: 100 });
    sr.reveal(`#newsletter`, { origin: 'bottom' });
});
