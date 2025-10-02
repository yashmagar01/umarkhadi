document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenu && navLinks) {
        mobileMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }
});

// Statistics Counter Animation
const stats = document.querySelectorAll('.stat-number');

function animateValue(element, start, end, duration) {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
            current = end;
            clearInterval(timer);
        }
        
        if (end >= 1000) {
            element.textContent = Math.floor(current).toLocaleString('en-IN');
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Intersection Observer for Statistics
const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = parseInt(entry.target.getAttribute('data-target'));
            animateValue(entry.target, 0, target, 2000);
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

stats.forEach(stat => observer.observe(stat));

// Scroll Reveal Animations
ScrollReveal().reveal('.hero-content', {
    delay: 200,
    distance: '50px',
    origin: 'bottom'
});

ScrollReveal().reveal('.stat-card', {
    delay: 200,
    interval: 200,
    distance: '30px',
    origin: 'bottom'
});

ScrollReveal().reveal('.achievement-card', {
    delay: 200,
    interval: 200,
    distance: '30px',
    origin: 'bottom'
});

ScrollReveal().reveal('.service-card', {
    delay: 200,
    interval: 200,
    distance: '30px',
    origin: 'bottom'
});

// Form Submission
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Add form submission logic here
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
    });
}

// Leadership Section Interactions
const leaderBios = {
    chairman: {
        name: 'Dr. Krishnaji Da. Patil',
        role: 'Chairman',
        bio: 'Distinguished leader with extensive experience in cooperative management. Leading the society\'s strategic initiatives and growth since 2020.',
        achievements: [
            'Implemented digital transformation initiatives',
            'Increased member engagement by 40%',
            'Led sustainable business practices implementation'
        ]
    },
    'vice-chairman': {
        name: 'Dr. Kanjibhai Go. Borich',
        role: 'Vice Chairman',
        bio: 'Expert in cooperative governance and community development. Supporting strategic decision-making and member welfare programs.',
        achievements: [
            'Developed community outreach programs',
            'Enhanced governance transparency',
            'Strengthened stakeholder relationships'
        ]
    },
    secretary1: {
        name: 'Shri Vaibhav Tri. Kocharekar',
        role: 'Secretary',
        bio: 'Experienced administrator managing day-to-day operations and member services. Focused on operational excellence and member satisfaction.',
        achievements: [
            'Streamlined administrative processes',
            'Improved member communication channels',
            'Implemented efficient record-keeping systems'
        ]
    },
    secretary2: {
        name: 'Shri Mangesh Sh. Pednekar',
        role: 'Secretary',
        bio: 'Dedicated to maintaining efficient operations and member service quality. Expert in compliance and regulatory affairs.',
        achievements: [
            'Enhanced compliance procedures',
            'Optimized service delivery',
            'Strengthened regulatory relationships'
        ]
    },
    treasurer: {
        name: 'Ku. Madhubala E. Mayekar',
        role: 'Treasurer',
        bio: 'Financial expert ensuring sound fiscal management and growth. Maintaining transparency and accountability in financial operations.',
        achievements: [
            'Achieved 100% audit compliance',
            'Improved financial reporting systems',
            'Implemented cost optimization measures'
        ]
    }
};

// Modal Functionality
const modal = document.querySelector('.modal-container');
const closeModal = document.querySelector('.close-modal');
const bioButtons = document.querySelectorAll('.bio-btn');

function showLeaderBio(leader) {
    const bio = leaderBios[leader];
    const bioContent = document.querySelector('.leader-bio');
    
    bioContent.innerHTML = `
        <h2>${bio.name}</h2>
        <h3>${bio.role}</h3>
        <p class="bio-text">${bio.bio}</p>
        <h4>Key Achievements:</h4>
        <ul>
            ${bio.achievements.map(achievement => `<li>${achievement}</li>`).join('')}
        </ul>
    `;
    
    modal.style.display = 'flex';
}

bioButtons.forEach(button => {
    button.addEventListener('click', () => {
        const leader = button.getAttribute('data-leader');
        showLeaderBio(leader);
    });
});

closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Board Meeting Calendar
const calendarGrid = document.querySelector('.calendar-grid');
const currentDate = new Date();
const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                'July', 'August', 'September', 'October', 'November', 'December'];

// Generate next 3 months of board meetings
for (let i = 0; i < 3; i++) {
    const meetingDate = new Date(currentDate);
    meetingDate.setMonth(currentDate.getMonth() + i);
    meetingDate.setDate(15); // Assuming board meetings are on 15th of each month
    
    const meetingCard = document.createElement('div');
    meetingCard.className = 'meeting-card';
    meetingCard.innerHTML = `
        <h4>${months[meetingDate.getMonth()]} ${meetingDate.getFullYear()}</h4>
        <p>Monthly Board Meeting</p>
        <p class="meeting-date">${meetingDate.toLocaleDateString()}</p>
    `;
    
    calendarGrid.appendChild(meetingCard);
}

// Additional ScrollReveal Animations for Leadership Section
ScrollReveal().reveal('.leader-card', {
    delay: 200,
    interval: 200,
    distance: '30px',
    origin: 'bottom'
});

ScrollReveal().reveal('.metric-card', {
    delay: 200,
    interval: 200,
    distance: '30px',
    origin: 'bottom'
});

ScrollReveal().reveal('.meeting-card', {
    delay: 200,
    interval: 200,
    distance: '30px',
    origin: 'bottom'
});

// Financial Dashboard Charts and Interactions
document.addEventListener('DOMContentLoaded', () => {
    // Revenue Chart
    const revenueCtx = document.getElementById('revenueChart').getContext('2d');
    const revenueChart = new Chart(revenueCtx, {
        type: 'line',
        data: {
            labels: ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'],
            datasets: [{
                label: 'Monthly Revenue (₹ in thousands)',
                data: [320, 350, 380, 410, 390, 420, 450, 430, 470, 500, 480, 413],
                borderColor: '#0056b3',
                backgroundColor: 'rgba(0, 86, 179, 0.1)',
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: {
                duration: 750, // Reduced animation duration
                easing: 'easeInOutQuart'
            },
            plugins: {
                legend: {
                    position: 'top',
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: value => '₹' + value + 'K'
                    }
                }
            },
            elements: {
                line: {
                    tension: 0.4
                },
                point: {
                    radius: 4,
                    hoverRadius: 6
                }
            },
            layout: {
                padding: {
                    top: 20,
                    right: 20,
                    bottom: 20,
                    left: 20
                }
            }
        }
    });

    // 10-Year History Chart
    const historyCtx = document.getElementById('historyChart').getContext('2d');
    const historyChart = new Chart(historyCtx, {
        type: 'bar',
        data: {
            labels: ['2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025'],
            datasets: [{
                label: 'Annual Revenue (₹ in Lakhs)',
                data: [2.1, 2.4, 2.8, 3.0, 2.7, 3.2, 3.5, 3.8, 4.0, 4.13],
                backgroundColor: '#0056b3',
                borderRadius: 5
            }, {
                label: 'Net Profit (₹ in Lakhs)',
                data: [0.8, 0.9, 1.1, 1.2, 1.0, 1.3, 1.5, 1.7, 1.9, 1.203],
                backgroundColor: '#00965e',
                borderRadius: 5
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: {
                duration: 750,
                easing: 'easeInOutQuart'
            },
            plugins: {
                legend: {
                    position: 'top'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: value => '₹' + value + 'L'
                    }
                }
            },
            layout: {
                padding: {
                    top: 20,
                    right: 20,
                    bottom: 20,
                    left: 20
                }
            }
        }
    });

    // Benefits Calculator
    const calculateBtn = document.getElementById('calculateBenefits');
    const purchaseAmount = document.getElementById('purchaseAmount');
    const schemeSelection = document.getElementById('schemeSelection');
    const benefitsResult = document.getElementById('benefitsResult');

    calculateBtn.addEventListener('click', () => {
        const amount = parseInt(purchaseAmount.value) || 0;
        const selectedSchemes = Array.from(schemeSelection.selectedOptions).map(option => option.value);
        
        let totalBenefits = 0;
        
        // Basic benefits calculation (simplified for demo)
        if (selectedSchemes.includes('convenience')) {
            totalBenefits += amount * 0.05; // 5% benefit
        }
        if (selectedSchemes.includes('diwali')) {
            totalBenefits += amount * 0.03; // 3% additional benefit
        }

        // Annual calculation
        totalBenefits *= 12;
        
        benefitsResult.textContent = '₹' + totalBenefits.toLocaleString('en-IN', {
            maximumFractionDigits: 0
        });
        
        benefitsResult.style.animation = 'none';
        benefitsResult.offsetHeight; // Trigger reflow
        benefitsResult.style.animation = 'fadeInUp 0.5s ease';
    });

    // Login Form Handler
    const loginForm = document.querySelector('.login-form');
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Member portal login functionality will be implemented soon.');
    });

    // Service Button Handlers
    const serviceButtons = document.querySelectorAll('.service-btn');
    serviceButtons.forEach(button => {
        button.addEventListener('click', () => {
            alert('This service will be available soon in the member portal.');
        });
    });

    // Download Report Handler
    const downloadBtn = document.querySelector('.download-report');
    downloadBtn.addEventListener('click', () => {
        alert('Annual report download will be available soon.');
    });

    // Scheme Detail Button Handlers
    const schemeDetailBtns = document.querySelectorAll('.scheme-details-btn');
    schemeDetailBtns.forEach(button => {
        button.addEventListener('click', () => {
            alert('Detailed scheme information will be available soon.');
        });
    });
});

// Community Impact Section
// Smooth counter animation with easing
function easeOutQuart(x) {
    return 1 - Math.pow(1 - x, 4);
}

function animateCounter(element, targetValue, duration = 2000) {
    const startValue = parseInt(element.textContent) || 0;
    const range = targetValue - startValue;
    const startTime = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const easedProgress = easeOutQuart(progress);
        const currentValue = Math.floor(startValue + (range * easedProgress));
        
        element.textContent = currentValue.toLocaleString('en-IN');
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    requestAnimationFrame(update);
}

document.addEventListener('DOMContentLoaded', () => {
    // Initialize impact metrics with realistic data
    const metrics = [
        { element: document.querySelector('[data-value="61"]'), value: 61 },
        { element: document.querySelector('[data-value="1597"]'), value: 1597 },
        { element: document.querySelector('[data-value="150"]'), value: 150 },
        { element: document.querySelector('[data-value="25"]'), value: 25 }
    ];

    // Animate metrics when they come into view
    const metricsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const metric = metrics.find(m => m.element === entry.target);
                if (metric) {
                    animateCounter(metric.element, metric.value);
                    metricsObserver.unobserve(entry.target);
                }
            }
        });
    }, { threshold: 0.5 });

    // Observe all metric elements
    metrics.forEach(metric => {
        if (metric.element) {
            metricsObserver.observe(metric.element);
        }
    });

    // Timeline Data
    const timelineData = {
        1960: [
            { year: 1964, title: 'Foundation', description: 'Establishment of Umarkhadi Consumers Cooperative Society with initial 50 members' },
            { year: 1965, title: 'First Store', description: 'Opening of Janata Bhandar community store serving local neighborhoods' },
            { year: 1968, title: 'Member Growth', description: 'Membership crosses 200 active participants' }
        ],
        1970: [
            { year: 1974, title: 'Service Expansion', description: 'Introduction of premium quality household products' },
            { year: 1978, title: 'Healthcare Initiative', description: 'Launch of member healthcare benefits program' }
        ],
        1980: [
            { year: 1983, title: 'Educational Support', description: 'Started student achievement recognition program' },
            { year: 1987, title: 'Community Growth', description: 'Membership reaches 500 families' }
        ],
        1990: [
            { year: 1992, title: 'Modern Infrastructure', description: 'Store modernization and inventory management system' },
            { year: 1996, title: 'Quality Recognition', description: 'Received excellence in service award' }
        ],
        2000: [
            { year: 2003, title: 'Digital Transformation', description: 'Implementation of computerized billing system' },
            { year: 2008, title: 'Milestone Achievement', description: 'Celebrated serving 1000+ members' }
        ],
        2010: [
            { year: 2014, title: 'Golden Jubilee', description: '50 years of community service celebration' },
            { year: 2018, title: 'Sustainability Initiative', description: 'Launch of eco-friendly packaging' }
        ],
        2020: [
            { year: 2020, title: 'Digital Services', description: 'Introduction of online order management' },
            { year: 2024, title: 'Diamond Jubilee', description: '60 years of excellence in cooperative service' }
        ]
    };

    // Timeline Navigation
    const decadeButtons = document.querySelectorAll('.decade-btn');
    const timelineContent = document.querySelector('.timeline-content');

    function showTimelineContent(decade) {
        const events = timelineData[decade];
        if (!events) return;

        timelineContent.innerHTML = events.map(event => `
            <div class="timeline-event">
                <div class="event-year">${event.year}</div>
                <div class="event-content">
                    <h4>${event.title}</h4>
                    <p>${event.description}</p>
                </div>
            </div>
        `).join('');
    }

    decadeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            decadeButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            showTimelineContent(parseInt(btn.dataset.decade));
        });
    });

    // Service Slider
    const serviceTrack = document.querySelector('.service-track');
    const serviceSlides = document.querySelectorAll('.service-slide');
    const serviceNavBtns = document.querySelectorAll('.service-slider .slider-nav');
    let serviceCurrentSlide = 0;

    function updateServiceSlider() {
        const slideWidth = serviceSlides[0].offsetWidth + 32; // Including gap
        serviceTrack.style.transform = `translateX(-${serviceCurrentSlide * slideWidth}px)`;
    }

    serviceNavBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (btn.classList.contains('prev')) {
                serviceCurrentSlide = Math.max(serviceCurrentSlide - 1, 0);
            } else {
                serviceCurrentSlide = Math.min(serviceCurrentSlide + 1, serviceSlides.length - 1);
            }
            updateServiceSlider();
        });
    });

    // Gallery Filtering
    const galleryFilters = document.querySelectorAll('.filter-btn');
    const galleryGrid = document.querySelector('.gallery-grid');

    // Sample gallery items
    const galleryItems = [
        { category: 'events', image: 'https://via.placeholder.com/300', title: 'Annual Community Meet' },
        { category: 'education', image: 'https://via.placeholder.com/300', title: 'Student Awards Ceremony' },
        { category: 'awards', image: 'https://via.placeholder.com/300', title: 'Excellence in Service' }
    ];

    function updateGallery(filter) {
        const items = filter === 'all' 
            ? galleryItems 
            : galleryItems.filter(item => item.category === filter);

        galleryGrid.innerHTML = items.map(item => `
            <div class="gallery-item" data-category="${item.category}">
                <img src="${item.image}" alt="${item.title}">
                <h4>${item.title}</h4>
            </div>
        `).join('');
    }

    galleryFilters.forEach(btn => {
        btn.addEventListener('click', () => {
            galleryFilters.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            updateGallery(btn.dataset.filter);
        });
    });

    // Initialize everything
    showTimelineContent(1960);
    updateGallery('all');
});

// Additional ScrollReveal Animations for Community Section
ScrollReveal().reveal('.timeline-section', {
    delay: 200,
    distance: '30px',
    origin: 'top'
});

ScrollReveal().reveal('.metric-card', {
    delay: 200,
    interval: 200,
    distance: '30px',
    origin: 'bottom'
});

ScrollReveal().reveal('.service-slide', {
    delay: 200,
    interval: 200,
    distance: '30px',
    origin: 'bottom'
});

ScrollReveal().reveal('.testimonial-card', {
    delay: 200,
    distance: '30px',
    origin: 'bottom'
});

ScrollReveal().reveal('.partner-card', {
    delay: 200,
    interval: 200,
    distance: '30px',
    origin: 'bottom'
});

// Additional ScrollReveal Animations for Financial Dashboard
ScrollReveal().reveal('.member-portal', {
    delay: 200,
    distance: '30px',
    origin: 'top'
});

ScrollReveal().reveal('.metric-widget', {
    delay: 200,
    interval: 200,
    distance: '30px',
    origin: 'bottom'
});

ScrollReveal().reveal('.scheme-card', {
    delay: 200,
    interval: 200,
    distance: '30px',
    origin: 'bottom'
});

ScrollReveal().reveal('.benefits-calculator', {
    delay: 200,
    distance: '30px',
    origin: 'bottom'
});