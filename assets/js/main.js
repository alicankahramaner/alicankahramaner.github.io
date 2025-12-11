document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle Logic
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;
    const iconContainer = themeToggleBtn.querySelector('svg');

    // Icons
    const sunIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`;

    const moonIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;

    // Check for saved theme preference or system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
        htmlElement.setAttribute('data-theme', 'dark');
        themeToggleBtn.innerHTML = sunIcon; // Show sun icon in dark mode (to switch to light)
    } else {
        htmlElement.setAttribute('data-theme', 'light');
        themeToggleBtn.innerHTML = moonIcon; // Show moon icon in light mode (to switch to dark)
    }

    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';

        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);

        // Update Icon
        themeToggleBtn.innerHTML = newTheme === 'light' ? moonIcon : sunIcon;
    });

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Header Blur Effect on Scroll
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 10) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile Menu
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : ''; // Prevent scroll when menu open

            // Update icon (optional basic toggle)
            const isOpen = navLinks.classList.contains('active');
            mobileMenuBtn.innerHTML = isOpen
                ? `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`
                : `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
        });

        // Close menu when clicking a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
                mobileMenuBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
            });
        });
    }

    // Fetch and Render Content
    fetch('assets/data/content.json')
        .then(response => response.json())
        .then(data => {
            renderAbout(data.about);
            renderExperience(data.experience);

            // Re-initialize intersection observer for new elements
            initializeObserver();
        })
        .catch(error => console.error('Error loading content:', error));

    function renderAbout(aboutData) {
        const container = document.getElementById('about-container');
        if (!aboutData || !container) return;

        const skillsHtml = aboutData.skills.map(skill =>
            `<span style="background: var(--bg-secondary); padding: 0.5rem 1rem; border-radius: 6px; font-size: 0.9rem;">${skill}</span>`
        ).join('');

        container.innerHTML = `
            <div class="grid" style="grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 4rem; align-items: center;">
                <div>
                    <h2 class="h2 reveal">${aboutData.title}</h2>
                    <p class="text-lead reveal" style="margin-bottom: 1.5rem;">${aboutData.description}</p>
                    <p class="reveal" style="color: var(--text-secondary); line-height: 1.6; margin-bottom: 2rem;">
                        ${aboutData.bio}
                    </p>
                    <div class="flex reveal" style="gap: 1rem; flex-wrap: wrap;">
                        ${skillsHtml}
                    </div>
                </div>
            </div>
        `;
    }

    function renderExperience(experienceData) {
        const container = document.getElementById('experience-container');
        if (!experienceData || !container) return;

        container.innerHTML = experienceData.map((item, index) => {
            const projectsHtml = item.projects.map(project => `<li>${project}</li>`).join('');

            return `
                <div class="experience-item reveal" style="transition-delay: ${index * 100}ms">
                    <div class="company-logo">
                        <img src="${item.logo}" alt="${item.company} Logo" loading="lazy">
                    </div>
                    <div class="experience-content">
                        <div class="exp-header">
                            <div>
                                <div class="exp-role">${item.role}</div>
                                <div class="exp-company">${item.company}</div>
                            </div>
                            <div class="exp-date">${item.date}</div>
                        </div>
                        <ul class="exp-projects">
                            ${projectsHtml}
                        </ul>
                    </div>
                </div>
            `;
        }).join('');
    }

    function initializeObserver() {
        const revealElements = document.querySelectorAll('.reveal');

        const sectionObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            root: null,
            threshold: 0.1,
            rootMargin: "0px"
        });

        revealElements.forEach(el => sectionObserver.observe(el));
    }
});
