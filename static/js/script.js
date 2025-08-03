// ===== Performance Optimization: Debounce Function =====
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
// ===== Initialize AOS =====
AOS.init({
  duration: 800,
  once: true,
  offset: 100,
  easing: 'ease-out'
});
// ===== Initialize Particles =====
particlesJS('particles-js', {
  particles: {
    number: { value: 30, density: { enable: true, value_area: 800 } },
    color: { value: "#4dabf7" },
    shape: { type: "circle" },
    opacity: { value: 0.4, random: true },
    size: { value: 3, random: true },
    line_linked: {
      enable: true,
      distance: 150,
      color: "#4dabf7",
      opacity: 0.2,
      width: 1
    },
    move: {
      enable: true,
      speed: 1,
      direction: "none",
      random: true,
      straight: false,
      out_mode: "out",
      bounce: false
    }
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: { enable: true, mode: "grab" },
      onclick: { enable: true, mode: "push" },
      resize: true
    },
    modes: {
      grab: { distance: 140, line_linked: { opacity: 0.5 } },
      push: { particles_nb: 4 }
    }
  },
  retina_detect: true
});
// ===== Loader =====
window.addEventListener("load", () => {
  setTimeout(() => {
    const loader = document.getElementById("loader");
    loader.classList.add("loader-hidden");
  }, 1000);
});
// ===== Typing Effect using Typed.js =====
const typed = new Typed("#typed-text", {
  strings: [
    "AI Developer",
    "Full-Stack Enthusiast",
    "Python Programmer",
    "Problem Solver"
  ],
  typeSpeed: 50,
  backSpeed: 30,
  loop: true,
  cursorChar: "|"
});
// ===== Scroll Reveal Animation =====
const sections = document.querySelectorAll("section");
function scrollReveal() {
  sections.forEach(sec => {
    const rect = sec.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      sec.classList.add("visible");
    }
  });
}
window.addEventListener("scroll", debounce(scrollReveal, 20));
window.addEventListener("load", scrollReveal);
// ===== Highlight Active Nav Link =====
const navLinks = document.querySelectorAll("nav a");
function highlightNav() {
  const scrollY = window.scrollY;
  sections.forEach(section => {
    const top = section.offsetTop - 100;
    const height = section.offsetHeight;
    const id = section.getAttribute("id");
    if (scrollY >= top && scrollY < top + height) {
      navLinks.forEach(link => link.classList.remove("active"));
      const active = document.querySelector(`nav a[href="#${id}"]`);
      if (active) active.classList.add("active");
    }
  });
}
window.addEventListener("scroll", debounce(highlightNav, 20));
// ===== Navbar Scroll Effect =====
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", debounce(() => {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
}, 20));
// ===== Back to Top =====
const backToTop = document.getElementById("backToTop");
window.addEventListener("scroll", debounce(() => {
  if (window.scrollY > 500) {
    backToTop.classList.add("show");
  } else {
    backToTop.classList.remove("show");
  }
}, 20));
backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
// ===== Hamburger Menu =====
const hamburger = document.getElementById("hamburger");
const navList = document.querySelector(".navbar ul");
hamburger.addEventListener("click", () => {
  navList.classList.toggle("show");
  hamburger.classList.toggle("active");
});
// Close mobile menu when clicking on a link
document.querySelectorAll(".navbar ul a").forEach(link => {
  link.addEventListener("click", () => {
    navList.classList.remove("show");
    hamburger.classList.remove("active");
  });
});
// ===== Project Filter Buttons =====
const filterBtns = document.querySelectorAll(".filter");
const projectCards = document.querySelectorAll(".project-card");
filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    filterBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    const category = btn.getAttribute("data-tech");
    
    projectCards.forEach((card, index) => {
      const type = card.getAttribute("data-tech");
      if (category === "all" || type === category) {
        // Reset card styles first
        card.style.display = "block";
        card.style.opacity = "0";
        card.style.transform = "translateY(20px)";
        
        // Trigger animation with delay
        setTimeout(() => {
          card.style.opacity = "1";
          card.style.transform = "translateY(0)";
        }, index * 100);
      } else {
        card.style.opacity = "0";
        card.style.transform = "translateY(20px)";
        setTimeout(() => {
          card.style.display = "none";
        }, 300);
      }
    });
  });
});
// ===== 3D Tilt Effect for Project Cards =====
document.querySelectorAll('.tilt-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 15;
    const rotateY = (centerX - x) / 15;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
  });
});
// ===== Form Validation =====
const form = document.getElementById("contact-form");
const status = document.getElementById("form-status");
form.addEventListener("submit", function (e) {
  e.preventDefault();
  
  // Reset previous errors
  document.querySelectorAll('.form-group').forEach(group => {
    group.classList.remove('error');
  });
  
  // Validate form
  let isValid = true;
  const formData = new FormData(form);
  
  // Validate name
  const name = formData.get('name');
  if (!name || name.trim() === '') {
    showFieldError(form.querySelector('input[name="name"]'));
    isValid = false;
  }
  
  // Validate email
  const email = formData.get('email');
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    showFieldError(form.querySelector('input[name="email"]'));
    isValid = false;
  }
  
  // Validate message
  const message = formData.get('message');
  if (!message || message.trim() === '') {
    showFieldError(form.querySelector('textarea[name="message"]'));
    isValid = false;
  }
  
  if (isValid) {
    // Show sending message
    status.textContent = "Sending message...";
    status.className = "";
    
    // Submit the form using fetch to the Flask backend
    fetch('/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        email: email,
        message: message
      })
    })
    .then(response => response.json())
    .then(data => {
      status.textContent = data.message;
      status.className = data.status; // This will be either 'success' or 'error'
      
      if (data.status === 'success') {
        form.reset();
      }
    })
    .catch(error => {
      status.textContent = "Error sending message. Please try again.";
      status.className = "error";
      console.error('Error:', error);
    });
  }
});
function showFieldError(field) {
  const formGroup = field.closest('.form-group');
  formGroup.classList.add('error');
  field.classList.add('shake');
  
  setTimeout(() => {
    field.classList.remove('shake');
  }, 500);
}
// ===== Auto Year =====
document.getElementById("year").textContent = new Date().getFullYear();
// ===== Easter Egg: Konami Code =====
let konamiCode = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
  'KeyB', 'KeyA'
];
let userSequence = [];
document.addEventListener('keydown', (e) => {
  userSequence.push(e.code);
  
  if (userSequence.length > konamiCode.length) {
    userSequence.shift();
  }
  
  if (JSON.stringify(userSequence) === JSON.stringify(konamiCode)) {
    // Easter egg animation
    document.body.style.animation = "rainbow 5s linear";
    setTimeout(() => {
      document.body.style.animation = "";
    }, 5000);
    
    userSequence = [];
  }
});
// ===== Rainbow Animation for Easter Egg =====
const style = document.createElement('style');
style.textContent = `
  @keyframes rainbow {
    0% { filter: hue-rotate(0deg); }
    100% { filter: hue-rotate(360deg); }
  }
`;
document.head.appendChild(style);
// ===== Parallax Effect for Hero Section =====
window.addEventListener('scroll', debounce(() => {
  const scrollPosition = window.scrollY;
  const hero = document.querySelector('.hero');
  if (hero) {
    hero.style.transform = `translateY(${scrollPosition * 0.3}px)`;
  }
}, 20));
// ===== Touch Gestures for Mobile =====
let touchStartX = 0;
let touchEndX = 0;
let touchStartY = 0;
let touchEndY = 0;
document.addEventListener('touchstart', e => {
  touchStartX = e.changedTouches[0].screenX;
  touchStartY = e.changedTouches[0].screenY;
});
document.addEventListener('touchend', e => {
  touchEndX = e.changedTouches[0].screenX;
  touchEndY = e.changedTouches[0].screenY;
  handleSwipe();
});
function handleSwipe() {
  const swipeThreshold = 50;
  const deltaX = touchEndX - touchStartX;
  const deltaY = touchEndY - touchStartY;
  
  // Horizontal swipe detection
  if (Math.abs(deltaX) > swipeThreshold && Math.abs(deltaX) > Math.abs(deltaY)) {
    if (deltaX > 0) {
      // Swipe right - could navigate to previous section
      console.log('Swipe right detected');
      navigateToSection('prev');
    } else {
      // Swipe left - could navigate to next section
      console.log('Swipe left detected');
      navigateToSection('next');
    }
  }
  
  // Vertical swipe detection
  if (Math.abs(deltaY) > swipeThreshold && Math.abs(deltaY) > Math.abs(deltaX)) {
    if (deltaY > 0) {
      // Swipe down
      console.log('Swipe down detected');
    } else {
      // Swipe up
      console.log('Swipe up detected');
    }
  }
}
function navigateToSection(direction) {
  const sections = Array.from(document.querySelectorAll('section'));
  const currentScroll = window.scrollY;
  
  let targetSection;
  
  if (direction === 'next') {
    // Find the next section
    for (let i = 0; i < sections.length; i++) {
      if (sections[i].offsetTop > currentScroll + 100) {
        targetSection = sections[i];
        break;
      }
    }
    
    // If we're at the last section, go to first
    if (!targetSection) {
      targetSection = sections[0];
    }
  } else {
    // Find the previous section
    for (let i = sections.length - 1; i >= 0; i--) {
      if (sections[i].offsetTop < currentScroll - 100) {
        targetSection = sections[i];
        break;
      }
    }
    
    // If we're at the first section, go to last
    if (!targetSection) {
      targetSection = sections[sections.length - 1];
    }
  }
  
  if (targetSection) {
    targetSection.scrollIntoView({ behavior: 'smooth' });
  }
}
// ===== Lazy Loading for Images =====
const imageOptions = {
  threshold: 0,
  rootMargin: '0px 0px 50px 0px'
};
const imageObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      img.classList.add('fade-in');
      observer.unobserve(img);
    }
  });
}, imageOptions);
document.querySelectorAll('img[data-src]').forEach(img => {
  imageObserver.observe(img);
});
// Add fade-in animation for lazy loaded images
const fadeStyle = document.createElement('style');
fadeStyle.textContent = `
  .fade-in {
    animation: fadeIn 0.5s ease-in-out;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;
document.head.appendChild(fadeStyle);
// ===== Mobile Navigation Active State =====
document.querySelectorAll('.mobile-nav-item').forEach(item => {
  item.addEventListener('click', (e) => {
    e.preventDefault();
    
    // Remove active class from all items
    document.querySelectorAll('.mobile-nav-item').forEach(navItem => {
      navItem.classList.remove('active');
    });
    
    // Add active class to clicked item
    item.classList.add('active');
    
    // Navigate to section
    const targetId = item.getAttribute('href');
    document.querySelector(targetId).scrollIntoView({ behavior: 'smooth' });
  });
});
// Update mobile navigation active state on scroll
window.addEventListener('scroll', debounce(() => {
  const scrollY = window.scrollY;
  
  sections.forEach(section => {
    const top = section.offsetTop - 100;
    const height = section.offsetHeight;
    const id = section.getAttribute("id");
    
    if (scrollY >= top && scrollY < top + height) {
      // Remove active class from all mobile nav items
      document.querySelectorAll('.mobile-nav-item').forEach(navItem => {
        navItem.classList.remove('active');
      });
      
      // Add active class to corresponding mobile nav item
      const activeMobileNav = document.querySelector(`.mobile-nav-item[href="#${id}"]`);
      if (activeMobileNav) {
        activeMobileNav.classList.add('active');
      }
    }
  });
}, 20));