// House of Fries Website JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Header scroll effect with food theme
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.borderBottom = '1px solid rgba(245, 158, 11, 0.3)';
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.96)';
            header.style.borderBottom = '1px solid rgba(245, 158, 11, 0.2)';
            header.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.1)';
        }
    });
    
    // Smooth scrolling for navigation
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Menu item animations and interactions
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach((item, index) => {
        // Staggered animation
        item.style.opacity = '0';
        item.style.transform = 'translateX(-30px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        // Add special effects to featured items
        if (item.classList.contains('featured')) {
            item.addEventListener('mouseenter', function() {
                this.style.transform = 'translateX(15px) scale(1.02)';
                this.style.boxShadow = '0 15px 30px rgba(220, 38, 38, 0.2)';
            });
            
            item.addEventListener('mouseleave', function() {
                this.style.transform = 'translateX(10px) scale(1)';
                this.style.boxShadow = 'var(--shadow)';
            });
        }
    });
    
    // Intersection Observer for menu and other animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('menu-item')) {
                    // Staggered animation for menu items
                    const items = entry.target.parentElement.querySelectorAll('.menu-item');
                    items.forEach((item, index) => {
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateX(0)';
                        }, index * 100);
                    });
                } else {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.menu-category, .review-card, .feature, .contact-method');
    animateElements.forEach(el => {
        observer.observe(el);
        if (!el.classList.contains('menu-item')) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        }
    });
    
    // Observe just the first menu item in each category to trigger the staggered effect
    const firstMenuItems = document.querySelectorAll('.menu-category .menu-item:first-child');
    firstMenuItems.forEach(item => observer.observe(item));
    
    // Phone order button effects
    const orderButtons = document.querySelectorAll('a[href^="tel:"]');
    orderButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Add order effect
            this.style.transform = 'scale(1.1)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
            
            // Analytics tracking (placeholder)
            console.log('Order call initiated:', this.href);
        });
    });
    
    // Hero highlights animation
    const highlights = document.querySelectorAll('.highlight');
    highlights.forEach((highlight, index) => {
        highlight.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) translateY(-5px)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        highlight.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) translateY(0)';
        });
    });
    
    // Happy hour notification
    function checkHappyHour() {
        const now = new Date();
        const currentHour = now.getHours();
        const currentDay = now.getDay(); // 0 = Sunday
        
        // Happy hour: 3-5 PM weekdays
        if (currentDay >= 1 && currentDay <= 5 && currentHour >= 15 && currentHour < 17) {
            showHappyHourBanner();
        }
    }
    
    function showHappyHourBanner() {
        const banner = document.createElement('div');
        banner.innerHTML = `
            <div style="
                position: fixed;
                top: 80px;
                left: 0;
                right: 0;
                background: linear-gradient(135deg, #f59e0b, #dc2626);
                color: white;
                padding: 1rem;
                text-align: center;
                z-index: 999;
                animation: slideDown 0.5s ease;
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
            ">
                <strong>🍟 HAPPY HOUR NOW! 🍟</strong> 
                <span style="margin-left: 1rem;">$2 off milkshakes & appetizers until 5 PM!</span>
                <button onclick="this.parentElement.parentElement.remove()" style="
                    background: none;
                    border: none;
                    color: white;
                    font-size: 1.2rem;
                    cursor: pointer;
                    float: right;
                    margin-top: -5px;
                ">×</button>
            </div>
        `;
        document.body.appendChild(banner);
    }
    
    checkHappyHour();
    
    // Review cards with food emojis
    const reviewCards = document.querySelectorAll('.review-card');
    reviewCards.forEach((card, index) => {
        const foodEmojis = ['🍟', '🍔', '🥤', '🧀', '🌶️'];
        
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) rotate(1deg)';
            // Add a random food emoji effect
            if (!this.querySelector('.food-emoji')) {
                const emoji = document.createElement('span');
                emoji.className = 'food-emoji';
                emoji.textContent = foodEmojis[Math.floor(Math.random() * foodEmojis.length)];
                emoji.style.cssText = `
                    position: absolute;
                    top: -10px;
                    right: -10px;
                    font-size: 1.5rem;
                    animation: bounce 0.5s ease;
                `;
                this.style.position = 'relative';
                this.appendChild(emoji);
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotate(0deg)';
            const emoji = this.querySelector('.food-emoji');
            if (emoji) {
                emoji.remove();
            }
        });
    });
    
    // Menu category switching effect (if we had tabs)
    const categoryTitles = document.querySelectorAll('.category-title');
    categoryTitles.forEach(title => {
        title.addEventListener('click', function() {
            // Scroll to this category
            this.parentElement.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        });
    });
    
    // Hours status indicator
    function updateHoursStatus() {
        const now = new Date();
        const currentHour = now.getHours();
        const currentDay = now.getDay();
        
        let isOpen = false;
        let status = '';
        
        // Check if open based on hours
        if (currentDay >= 1 && currentDay <= 4) { // Mon-Thu
            if (currentHour >= 11 && currentHour < 21) {
                isOpen = true;
                status = '🟢 Open Now';
            }
        } else if (currentDay === 5 || currentDay === 6) { // Fri-Sat
            if (currentHour >= 11 && currentHour < 22) {
                isOpen = true;
                status = '🟢 Open Now';
            }
        } else if (currentDay === 0) { // Sunday
            if (currentHour >= 12 && currentHour < 20) {
                isOpen = true;
                status = '🟢 Open Now';
            }
        }
        
        if (!isOpen) {
            status = '🔴 Closed - Order for pickup tomorrow!';
        }
        
        // Add status to hours section
        const hoursSection = document.querySelector('.hours');
        if (hoursSection && !hoursSection.querySelector('.status-indicator')) {
            const statusDiv = document.createElement('div');
            statusDiv.className = 'status-indicator';
            statusDiv.innerHTML = `<p style="
                background: ${isOpen ? 'rgba(5, 150, 105, 0.2)' : 'rgba(220, 38, 38, 0.2)'};
                color: ${isOpen ? '#059669' : '#dc2626'};
                padding: 0.75rem;
                border-radius: 8px;
                text-align: center;
                font-weight: 600;
                margin-top: 1rem;
                font-family: 'Fredoka', cursive;
            ">${status}</p>`;
            hoursSection.appendChild(statusDiv);
        }
    }
    
    updateHoursStatus();
    
    // Mobile menu functionality
    function initMobileMenu() {
        const nav = document.querySelector('.nav');
        const navToggle = document.createElement('button');
        navToggle.className = 'nav-toggle';
        navToggle.innerHTML = '🍔';
        navToggle.style.cssText = `
            display: none;
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0.5rem;
            border-radius: 50%;
            background: var(--cream-color);
        `;
        
        const navBrand = document.querySelector('.nav-brand');
        navBrand.parentNode.insertBefore(navToggle, nav);
        
        navToggle.addEventListener('click', function() {
            nav.classList.toggle('mobile-active');
            this.innerHTML = nav.classList.contains('mobile-active') ? '✕' : '🍔';
        });
        
        function checkScreenSize() {
            if (window.innerWidth <= 768) {
                navToggle.style.display = 'block';
                nav.style.display = nav.classList.contains('mobile-active') ? 'flex' : 'none';
                
                if (nav.classList.contains('mobile-active')) {
                    nav.style.cssText = `
                        display: flex;
                        position: absolute;
                        top: 100%;
                        left: 0;
                        right: 0;
                        background: white;
                        flex-direction: column;
                        padding: 1.5rem;
                        box-shadow: var(--shadow);
                        border-top: 3px solid var(--primary-color);
                        border-radius: 0 0 15px 15px;
                    `;
                }
            } else {
                navToggle.style.display = 'none';
                nav.style.cssText = 'display: flex;';
                nav.classList.remove('mobile-active');
                navToggle.innerHTML = '🍔';
            }
        }
        
        window.addEventListener('resize', checkScreenSize);
        checkScreenSize();
    }
    
    initMobileMenu();
    
    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes bounce {
            0%, 20%, 60%, 100% { transform: translateY(0); }
            40% { transform: translateY(-10px); }
            80% { transform: translateY(-5px); }
        }
        
        @keyframes slideDown {
            from {
                transform: translateY(-100%);
                opacity: 0;
            }
            to {
                transform: translateY(0);
                opacity: 1;
            }
        }
        
        .nav-toggle:hover {
            transform: scale(1.1);
            background: var(--primary-color) !important;
        }
        
        .mobile-active {
            animation: slideDown 0.4s ease;
        }
        
        .highlight:hover .highlight-icon {
            animation: bounce 0.6s ease;
        }
        
        .popular {
            animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
    `;
    document.head.appendChild(style);
    
    // Food delivery tracking simulation
    const deliveryButtons = document.querySelectorAll('.method-content');
    deliveryButtons.forEach(button => {
        if (button.textContent.includes('DoorDash') || 
            button.textContent.includes('Uber Eats') || 
            button.textContent.includes('Grubhub')) {
            button.addEventListener('click', function() {
                console.log('Delivery option clicked:', this.textContent);
            });
        }
    });
    
    // Fun food facts rotation
    const foodFacts = [
        "🍟 Americans eat 4.5 billion pounds of french fries per year!",
        "🧀 The perfect fry-to-cheese ratio is 3:1",
        "🍔 Our burgers are made with locally sourced beef",
        "🥤 Hand-spun milkshakes taste 100x better than machine-made",
        "👨‍🍳 All our fries are hand-cut daily for maximum freshness"
    ];
    
    let factIndex = 0;
    function rotateFacts() {
        // This could be displayed in a ticker or notification
        console.log(foodFacts[factIndex]);
        factIndex = (factIndex + 1) % foodFacts.length;
    }
    
    // Rotate facts every 30 seconds
    setInterval(rotateFacts, 30000);
    rotateFacts(); // Show first fact immediately
    
    console.log('House of Fries website initialized successfully! 🍟');
    console.log('Craving some delicious fries? Call us now!');
});