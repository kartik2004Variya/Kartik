// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// Navbar scrolled styling and Scroll Progress Bar
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const scrollProgress = document.querySelector('.scroll-progress');
    
    // Scrolled class
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Scroll progress percent
    if (scrollProgress) {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
        scrollProgress.style.width = `${scrolled}%`;
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Active navigation link highlighting based on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 220)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Scroll Reveal Observer
const revealOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, revealOptions);

// Add reveal class and observe
document.addEventListener('DOMContentLoaded', () => {
    const elementsToReveal = document.querySelectorAll(
        '.skill-category, .project-card, .about-text, .education-card, .timeline-content, .contact-info, .contact-form, section'
    );
    elementsToReveal.forEach(el => {
        el.classList.add('fade-in');
        revealObserver.observe(el);
    });
});

// Preloader & Loading Management
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.classList.add('fade-out');
            document.body.classList.add('loaded');
        }, 800);
    }
});

// Scroll to Top with Radial Progress
const scrollToTopBtn = document.getElementById('scroll-to-top');
const progressBar = document.querySelector('.progress-bar');

if (scrollToTopBtn && progressBar) {
    const circumference = 125.66; // 2 * PI * r (r=20)
    progressBar.style.strokeDasharray = `${circumference} ${circumference}`;
    progressBar.style.strokeDashoffset = circumference;
    
    window.addEventListener('scroll', () => {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = totalHeight > 0 ? (window.scrollY / totalHeight) : 0;
        const offset = circumference - (scrollPercent * circumference);
        progressBar.style.strokeDashoffset = offset;
        
        if (window.scrollY > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });
    
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Timeline dynamic filling and badge highlight on scroll
const timeline = document.querySelector('.experience-timeline');
const timelineItems = document.querySelectorAll('.timeline-item');
const timelineFill = document.querySelector('.timeline-fill');

if (timeline && timelineFill) {
    window.addEventListener('scroll', () => {
        const timelineRect = timeline.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Calculate fill height
        const timelineStart = timeline.offsetTop - windowHeight / 2;
        const timelineHeight = timeline.clientHeight;
        const scrollPosition = window.scrollY - timelineStart;
        
        let progress = (scrollPosition / timelineHeight) * 100;
        progress = Math.max(0, Math.min(100, progress));
        timelineFill.style.height = `${progress}%`;
        
        // Highlight active badges
        timelineItems.forEach(item => {
            const itemRect = item.getBoundingClientRect();
            if (itemRect.top < windowHeight * 0.7) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    });
}

// Interactive Project Filters
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

if (filterButtons.length > 0 && projectCards.length > 0) {
    // Make sure they are initially marked active
    projectCards.forEach(card => card.classList.add('fade-in-show'));
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const filter = button.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                const categories = card.getAttribute('data-category') || '';
                if (filter === 'all' || categories.split(' ').includes(filter)) {
                    card.classList.remove('fade-out');
                    card.classList.add('fade-in-show');
                } else {
                    card.classList.remove('fade-in-show');
                    card.classList.add('fade-out');
                }
            });
        });
    });
}

// Stats Counter animation
function animateCounters() {
    const counters = document.querySelectorAll('.stat h3');
    
    counters.forEach(counter => {
        const rawText = counter.textContent;
        const hasPlus = rawText.includes('+');
        const hasPercent = rawText.includes('%');
        const target = parseFloat(rawText);
        
        if (isNaN(target)) return;
        
        let current = 0;
        const duration = 2000; // 2 seconds
        const stepTime = 16; // ~60fps
        const totalSteps = duration / stepTime;
        const increment = target / totalSteps;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                let displayVal = Math.ceil(current);
                if (target % 1 !== 0) {
                    displayVal = current.toFixed(1);
                }
                counter.textContent = displayVal + (hasPlus ? '+' : '') + (hasPercent ? '%' : '');
                setTimeout(updateCounter, stepTime);
            } else {
                counter.textContent = rawText;
            }
        };
        
        updateCounter();
    });
}

// Trigger counter animation once when About section is in view
const aboutSection = document.querySelector('.about');
if (aboutSection) {
    const aboutObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                aboutObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    aboutObserver.observe(aboutSection);
}

// Custom Cursor Trail logic (Only for desktop)
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

if (cursorDot && cursorOutline && window.matchMedia('(pointer: fine)').matches) {
    let mouseX = 0;
    let mouseY = 0;
    let outlineX = 0;
    let outlineY = 0;
    
    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        cursorDot.style.opacity = '1';
        cursorOutline.style.opacity = '1';
        
        cursorDot.style.left = `${mouseX}px`;
        cursorDot.style.top = `${mouseY}px`;
    });
    
    window.addEventListener('mouseout', () => {
        cursorDot.style.opacity = '0';
        cursorOutline.style.opacity = '0';
    });

    const animateCursor = () => {
        const distX = mouseX - outlineX;
        const distY = mouseY - outlineY;
        
        outlineX += distX * 0.16;
        outlineY += distY * 0.16;
        
        cursorOutline.style.left = `${outlineX}px`;
        cursorOutline.style.top = `${outlineY}px`;
        
        requestAnimationFrame(animateCursor);
    };
    animateCursor();
    
    // Add hover states for interactive components
    const hoverables = document.querySelectorAll('a, button, .skill-item, .project-card, .hamburger, .social-link');
    hoverables.forEach(element => {
        element.addEventListener('mouseenter', () => {
            document.body.classList.add('cursor-hover');
        });
        element.addEventListener('mouseleave', () => {
            document.body.classList.remove('cursor-hover');
        });
    });
} else {
    // Hide cursor elements on touch devices
    if (cursorDot) cursorDot.style.display = 'none';
    if (cursorOutline) cursorOutline.style.display = 'none';
}

// 3D Card Hover Tilt
const projectCardsTilt = document.querySelectorAll('.project-card');
projectCardsTilt.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        card.style.transition = 'none';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0)';
        card.style.transition = 'transform 0.5s ease';
    });
});

// Interactive Canvas Particles Network
const canvas = document.getElementById('hero-canvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    const mouse = { x: null, y: null, radius: 130 };
    
    const resizeCanvas = () => {
        canvas.width = canvas.parentElement.offsetWidth;
        canvas.height = canvas.parentElement.offsetHeight;
        initParticles();
    };
    
    window.addEventListener('resize', resizeCanvas);
    
    // Listen to mouse in hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.addEventListener('mousemove', (e) => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        });
        
        hero.addEventListener('mouseleave', () => {
            mouse.x = null;
            mouse.y = null;
        });
    }
    
    class Particle {
        constructor(x, y, dx, dy, size) {
            this.x = x;
            this.y = y;
            this.dx = dx;
            this.dy = dy;
            this.size = size;
            this.baseSize = size;
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(6, 182, 212, 0.4)';
            ctx.fill();
        }
        
        update() {
            if (this.x > canvas.width || this.x < 0) this.dx = -this.dx;
            if (this.y > canvas.height || this.y < 0) this.dy = -this.dy;
            
            this.x += this.dx;
            this.y += this.dy;
            
            // Mouse interaction
            if (mouse.x !== null && mouse.y !== null) {
                const distX = this.x - mouse.x;
                const distY = this.y - mouse.y;
                const distance = Math.sqrt(distX * distX + distY * distY);
                
                if (distance < mouse.radius) {
                    const force = (mouse.radius - distance) / mouse.radius;
                    const dirX = distX / distance;
                    const dirY = distY / distance;
                    
                    this.x += dirX * force * 3;
                    this.y += dirY * force * 3;
                    this.size = this.baseSize * (1 + force * 1.5);
                } else if (this.size > this.baseSize) {
                    this.size -= 0.1;
                }
            } else if (this.size > this.baseSize) {
                this.size -= 0.1;
            }
            
            this.draw();
        }
    }
    
    function initParticles() {
        particles = [];
        let numParticles = Math.floor((canvas.width * canvas.height) / 16000);
        numParticles = Math.min(numParticles, 75); // Safe cap for screen size
        
        for (let i = 0; i < numParticles; i++) {
            const size = Math.random() * 2 + 1;
            const x = Math.random() * (canvas.width - size * 2) + size;
            const y = Math.random() * (canvas.height - size * 2) + size;
            const dx = (Math.random() - 0.5) * 0.5;
            const dy = (Math.random() - 0.5) * 0.5;
            
            particles.push(new Particle(x, y, dx, dy, size));
        }
    }
    
    function connectParticles() {
        for (let a = 0; a < particles.length; a++) {
            for (let b = a; b < particles.length; b++) {
                const distX = particles[a].x - particles[b].x;
                const distY = particles[a].y - particles[b].y;
                const distance = Math.sqrt(distX * distX + distY * distY);
                
                if (distance < 120) {
                    const opacity = ((120 - distance) / 120) * 0.12;
                    ctx.strokeStyle = `rgba(99, 102, 241, ${opacity})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particles[a].x, particles[a].y);
                    ctx.lineTo(particles[b].x, particles[b].y);
                    ctx.stroke();
                }
            }
        }
    }
    
    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => p.update());
        connectParticles();
        requestAnimationFrame(animateParticles);
    }
    
    resizeCanvas();
    animateParticles();
}

// Smart HTML preserves typingWriterEffect
function typeWriterEffect() {
    const heroTitle = document.querySelector('.hero-title');
    if (!heroTitle) return;
    
    const part1 = "Hi, I'm ";
    const part2 = "Variya Kartik";
    
    heroTitle.innerHTML = '<span class="part1"></span><span class="highlight"></span>';
    const p1Span = heroTitle.querySelector('.part1');
    const p2Span = heroTitle.querySelector('.highlight');
    
    let i = 0;
    function typePart1() {
        if (i < part1.length) {
            p1Span.textContent += part1.charAt(i);
            i++;
            setTimeout(typePart1, 60);
        } else {
            i = 0;
            setTimeout(typePart2, 200);
        }
    }
    
    function typePart2() {
        if (i < part2.length) {
            p2Span.textContent += part2.charAt(i);
            i++;
            setTimeout(typePart2, 80);
        }
    }
    
    setTimeout(typePart1, 600);
}

window.addEventListener('load', typeWriterEffect);

// Contact Form Handling with Notification Systems
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.textContent;
        
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        if (!name || !email || !subject || !message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        // Disable button and add loader spinner text
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
        
        setTimeout(() => {
            showNotification('Thank you for your message! I will get back to you soon.', 'success');
            contactForm.reset();
            submitBtn.disabled = false;
            submitBtn.textContent = originalBtnText;
        }, 1500);
    });
}

function showNotification(message, type = 'info') {
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    notification.style.cssText = `
        position: fixed;
        bottom: 30px;
        left: 30px;
        background: ${type === 'success' ? 'var(--success)' : type === 'error' ? 'var(--error)' : 'var(--primary)'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        transform: translateY(100px);
        opacity: 0;
        transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.4s ease;
        max-width: 320px;
        font-weight: 600;
        border: 1px solid rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(8px);
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateY(0)';
        notification.style.opacity = '1';
    }, 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateY(100px)';
        notification.style.opacity = '0';
        setTimeout(() => {
            if (notification.parentNode) notification.remove();
        }, 400);
    }, 4500);
}
