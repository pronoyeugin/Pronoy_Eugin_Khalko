

/* Navbar */
const header = document.querySelector(".header");
window.addEventListener("scroll", () => {

    if(window.scrollY > 40){
        header.classList.add("scrolled");
    }else{
        header.classList.remove("scrolled");
    }

});

// Banner Section text animantions start
const textElement = document.getElementById("typing-text");
const textArray = ["Web Designer & Developer"];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;



function typeEffect() {
    const currentText = textArray[textIndex];
    if (isDeleting) {
        textElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        textElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }
    let typingSpeed = isDeleting ? 100 : 150;
    if (!isDeleting && charIndex === currentText.length) {
        typingSpeed = 1000; // Pause before deleting
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % textArray.length; // Move to next word
    }
    setTimeout(typeEffect, typingSpeed);
}
typeEffect();
// text animantions end

// stats animation start
const counters = document.querySelectorAll('.counter');
function startCounter(counter) {
    const target = +counter.getAttribute('data-target');
    let count = 0;
    const increment = target / 100; // Adjust speed
    const interval = setInterval(() => {
        count += increment;
        counter.textContent = Math.floor(count) + " ";
        if (count >= target) {
            counter.textContent = target + " ";
            clearInterval(interval);
        }
    }, 20);
}
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            startCounter(entry.target);
        }
    });
}, { threshold: 1 });

counters.forEach(counter => observer.observe(counter));
// stats animation start




//animation circular progress bar  start

let circularProgresses = document.querySelectorAll(".circular-progress");
circularProgresses.forEach((circularProgress, index) => {
    let progressValue = circularProgress.querySelector(".progress-value");
    let progressStartValue = 0;
    let progressEndValue = [95, 95, 85, 75, 80, 90][index];
    let speed = 100;
    let progress = setInterval(() => {
        progressStartValue++;

        progressValue.textContent = `${progressStartValue}%`;
        circularProgress.style.background = `conic-gradient(var(--blue) ${progressStartValue * 3.6}deg, #333 0deg)`;

        if (progressStartValue == progressEndValue) {
            clearInterval(progress);
        }
    }, speed);
});

// animation circular progress bar  start


// portfolio filter start
const filterButtons = document.querySelectorAll(".filter-button");
const filterItems = document.querySelectorAll(".gallery_product.filter");

filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
        const value = this.getAttribute("data-filter");

        // toggle active state on buttons
        filterButtons.forEach((btn) => btn.classList.remove("active"));
        this.classList.add("active");

        filterItems.forEach((item) => {
            const category = item.getAttribute("data-category");
            const show = value === "all" || category === value;
            item.classList.toggle("hide", !show);
        });
    });
});

// set "All" as active on page load
if (filterButtons.length) {
    filterButtons[0].classList.add("active");
}

// portfolio category text start
const categoryNames = {
    landing: "Landing Page",
    ecommerce: "Ecommerce",
    wordpress: "Business ",
    portfolio:"Portfolio",
    others: "Others"
};

document.querySelectorAll(".gallery_product").forEach((item) => {
    const category = item.dataset.category;
    const categoryElement = item.querySelector(".portfolio-category");

    if (categoryElement) {
        categoryElement.textContent = categoryNames[category] || category;
    }
});

// portfolio filter end

// FAQ accordion start
const faqItems = document.querySelectorAll(".faq-item");

function setFaqState(item, shouldOpen) {
    const question = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");

    if (!question || !answer) return;

    if (shouldOpen) {
        item.classList.add("active");
        answer.style.maxHeight = answer.scrollHeight + "px";
        question.setAttribute("aria-expanded", "true");
    } else {
        item.classList.remove("active");
        answer.style.maxHeight = "0px";
        question.setAttribute("aria-expanded", "false");
    }
}

faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");

    if (!question || !answer) return;

    setFaqState(item, false);

    question.addEventListener("click", () => {
        const isOpen = item.classList.contains("active");

        faqItems.forEach((other) => setFaqState(other, false));

        if (!isOpen) {
            setFaqState(item, true);
        }
    });
});
// FAQ accordion end

// contact form validation start
const contactForm = document.getElementById("contactForm");

if (contactForm) {
    const formStatus = document.getElementById("formStatus");

    const fields = {
        name: {
            el: document.getElementById("cf-name"),
            validate: (v) => v.trim().length >= 2,
            message: "Please enter your name (min 2 characters)."
        },
        email: {
            el: document.getElementById("cf-email"),
            validate: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()),
            message: "Please enter a valid email address."
        },
        phone: {
            el: document.getElementById("cf-phone"),
            validate: (v) => v.trim() === "" || /^[0-9+\-()\s]{7,20}$/.test(v.trim()),
            message: "Please enter a valid phone number."
        },
        service: {
            el: document.getElementById("cf-service"),
            validate: (v) => v.trim() !== "",
            message: "Please select a service."
        },
        timeline: {
            el: document.getElementById("cf-timeline"),
            validate: (v) => v.trim().length > 0,
            message: "Please share a rough timeline."
        },
        details: {
            el: document.getElementById("cf-details"),
            validate: (v) => v.trim().length >= 10,
            message: "Please add a few details about your project (min 10 characters)."
        }
    };

    function showError(fieldKey, message) {
        const { el } = fields[fieldKey];
        const group = el.closest(".form-group");
        group.classList.add("has-error");
        group.querySelector(".form-error").textContent = message;
    }

    function clearError(fieldKey) {
        const { el } = fields[fieldKey];
        const group = el.closest(".form-group");
        group.classList.remove("has-error");
        group.querySelector(".form-error").textContent = "";
    }

    function validateField(fieldKey) {
        const field = fields[fieldKey];
        const value = field.el.value;
        if (!field.validate(value)) {
            showError(fieldKey, field.message);
            return false;
        }
        clearError(fieldKey);
        return true;
    }

    // live validation as the user types/selects
    Object.keys(fields).forEach((key) => {
        const eventName = fields[key].el.tagName === "SELECT" ? "change" : "input";
        fields[key].el.addEventListener(eventName, () => validateField(key));
    });

    contactForm.addEventListener("submit", function (e) {
        e.preventDefault();

        let isValid = true;
        Object.keys(fields).forEach((key) => {
            if (!validateField(key)) {
                isValid = false;
            }
        });

        if (!isValid) {
            formStatus.textContent = "Please fix the errors above and try again.";
            formStatus.className = "form-status error";
            return;
        }

        // NOTE: there is no backend wired up yet. Hook this up to your own
        // endpoint (PHP mailer, EmailJS, Formspree, etc.) to actually send
        // the message. For now we just simulate a successful submission.
        formStatus.textContent = "Thanks! Your message has been sent — I'll get back to you soon.";
        formStatus.className = "form-status success";
        contactForm.reset();
    });
}
// contact form validation end



// Testimonials Slider
const testimonialSwiper = new Swiper(".testimonialSwiper", {

    slidesPerView: 2,
    spaceBetween: 30,

    loop: true,

    speed: 800,

    autoplay: {
        delay: 3500,
        disableOnInteraction: false,
    },

    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },

    breakpoints: {

        0: {
            slidesPerView: 1
        },

        768: {
            slidesPerView: 2
        }

    }

});