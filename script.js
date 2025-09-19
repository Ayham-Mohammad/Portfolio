// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Contact form validation
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = this.querySelector('input[type="text"]').value.trim();
        const email = this.querySelector('input[type="email"]').value.trim();
        const message = this.querySelector('textarea').value.trim();
        if (name === "" || email === "" || message === "") {
            alert("Please fill in all fields.");
        } else {
            alert("Message sent! (Demo only.)");
            this.reset();
        }
    });
}

// Certifications animation
const certCards = document.querySelectorAll('.cert-card');
const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => { entry.target.classList.add('show'); }, index * 150);
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });
certCards.forEach(card => observer.observe(card));

// Navbar dynamic background
const navbar = document.querySelector('.navbar');
const gradientColors = ['#06141B','#11212D','#253745','#4A5C6A','#9BA8AB','#CCD0CF'];

window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const scrollPercent = scrollTop / docHeight;
    const index = Math.min(Math.floor(scrollPercent * (gradientColors.length - 1)), gradientColors.length - 2);
    const colorStart = hexToRgb(gradientColors[index]);
    const colorEnd = hexToRgb(gradientColors[index + 1]);
    const percentBetween = (scrollPercent * (gradientColors.length - 1)) - index;
    const r = Math.round(colorStart.r + (colorEnd.r - colorStart.r) * percentBetween);
    const g = Math.round(colorStart.g + (colorEnd.g - colorStart.g) * percentBetween);
    const b = Math.round(colorStart.b + (colorEnd.b - colorStart.b) * percentBetween);
    navbar.style.backgroundColor = `rgba(${r},${g},${b},0.85)`;
});

function hexToRgb(hex) {
    const bigint = parseInt(hex.replace('#',''),16);
    return { r: (bigint >> 16) & 255, g: (bigint >> 8) & 255, b: bigint & 255 };
}
