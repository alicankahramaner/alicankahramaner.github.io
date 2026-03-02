document.addEventListener('DOMContentLoaded', () => {

    // ─── Language ────────────────────────────────────────────────────────────
    let lang = localStorage.getItem('lang') || 'tr';

    function t(obj) {
        if (!obj || typeof obj !== 'object') return obj || '';
        return obj[lang] || obj['tr'] || '';
    }

    function setLang(newLang) {
        lang = newLang;
        localStorage.setItem('lang', lang);
        const label = document.getElementById('lang-label');
        if (label) label.textContent = lang === 'tr' ? 'EN' : 'TR';
        if (window.__contentData) renderAll(window.__contentData);
    }

    const langToggleBtn = document.getElementById('lang-toggle');
    if (langToggleBtn) {
        const label = document.getElementById('lang-label');
        if (label) label.textContent = lang === 'tr' ? 'EN' : 'TR';
        langToggleBtn.addEventListener('click', () => setLang(lang === 'tr' ? 'en' : 'tr'));
    }

    // ─── Theme ────────────────────────────────────────────────────────────────
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;

    const sunIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`;
    const moonIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;

    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
        htmlElement.setAttribute('data-theme', 'dark');
        themeToggleBtn.innerHTML = sunIcon;
    } else {
        htmlElement.setAttribute('data-theme', 'light');
        themeToggleBtn.innerHTML = moonIcon;
    }

    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        themeToggleBtn.innerHTML = newTheme === 'light' ? moonIcon : sunIcon;
    });

    // ─── Smooth Scroll ────────────────────────────────────────────────────────
    document.addEventListener('click', (e) => {
        const anchor = e.target.closest('a[href^="#"]');
        if (!anchor) return;
        e.preventDefault();
        const targetId = anchor.getAttribute('href');
        if (targetId === '#') return;
        const targetElement = document.querySelector(targetId);
        if (targetElement) targetElement.scrollIntoView({ behavior: 'smooth' });
    });

    // ─── Header Scroll ────────────────────────────────────────────────────────
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 10);
    });

    // ─── Mobile Menu ──────────────────────────────────────────────────────────
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    const hamburgerIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
    const closeIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`;

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
            mobileMenuBtn.innerHTML = navLinks.classList.contains('active') ? closeIcon : hamburgerIcon;
        });
    }

    // ─── Render Functions ─────────────────────────────────────────────────────

    function renderNav(data) {
        const navLinksEl = document.getElementById('nav-links');
        if (!navLinksEl || !data.portfolio) return;

        navLinksEl.innerHTML = data.portfolio.nav.links.map(link =>
            `<li><a href="${link.href}" class="nav-link">${t(link)}</a></li>`
        ).join('');

        // Close mobile menu on nav link click
        navLinksEl.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navLinksEl.classList.remove('active');
                document.body.style.overflow = '';
                if (mobileMenuBtn) mobileMenuBtn.innerHTML = hamburgerIcon;
            });
        });

        // CV button label
        const cvBtn = document.getElementById('cv-btn');
        if (cvBtn) cvBtn.textContent = t(data.portfolio.nav.cvButton);
    }

    function renderHero(data) {
        const hero = data.portfolio.hero;
        const titleEl = document.getElementById('hero-title');
        const subtitleEl = document.getElementById('hero-subtitle');
        const ctaEl = document.getElementById('hero-cta');

        if (titleEl) titleEl.textContent = t(hero.title);
        if (subtitleEl) subtitleEl.textContent = t(hero.subtitle);
        if (ctaEl) ctaEl.textContent = t(hero.cta);
    }

    function renderAbout(data) {
        const container = document.getElementById('about-container');
        if (!container || !data.portfolio) return;

        const about = data.portfolio.about;
        const skills = data.skills;

        const langSkillsHtml = skills.language.map(skill =>
            `<span class="skill-tag">${skill}</span>`
        ).join('');

        const domainSkillsHtml = skills.domain.map(skill =>
            `<span class="skill-tag">${skill}</span>`
        ).join('');

        container.innerHTML = `
            <div class="grid" style="grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 4rem; align-items: start;">
                <div>
                    <h2 class="h2 reveal">${t(about.title)}</h2>
                    <p class="text-lead reveal" style="margin-bottom: 1.5rem;">${t(about.description)}</p>
                    <p class="reveal" style="color: var(--text-secondary); line-height: 1.6; margin-bottom: 2rem;">
                        ${t(about.bio)}
                    </p>
                </div>
                <div class="reveal">
                    <div style="margin-bottom: 1.5rem;">
                        <h3 style="font-size: 0.8rem; letter-spacing: 2px; text-transform: uppercase; color: var(--accent); margin-bottom: 0.75rem;">${t(about.skillsTitle.language)}</h3>
                        <div class="flex" style="gap: 0.5rem; flex-wrap: wrap;">
                            ${langSkillsHtml}
                        </div>
                    </div>
                    <div>
                        <h3 style="font-size: 0.8rem; letter-spacing: 2px; text-transform: uppercase; color: var(--accent); margin-bottom: 0.75rem;">${t(about.skillsTitle.domain)}</h3>
                        <div class="flex" style="gap: 0.5rem; flex-wrap: wrap;">
                            ${domainSkillsHtml}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    function renderExperienceTitle(data) {
        const titleEl = document.getElementById('experience-title');
        if (titleEl && data.portfolio) {
            const expLink = data.portfolio.nav.links.find(l => l.href === '#experience');
            if (expLink) titleEl.textContent = t(expLink);
        }
    }

    function renderExperience(data) {
        const container = document.getElementById('experience-container');
        if (!container || !data.experience) return;

        container.innerHTML = data.experience.map((item, index) => {
            const projects = item.projects || [];
            const projectsHtml = projects.map(p => {
                const title = t(p.name);
                const desc = t(p.description);
                const techList = Array.isArray(p.technologies) && p.technologies.length > 0
                    ? `<div class="project-tech" style="font-size: 0.85em; color: var(--text-secondary); margin-top: 4px;"><strong>Tech:</strong> ${p.technologies.join(', ')}</div>`
                    : '';
                const descBlock = desc ? `<div class="project-desc" style="font-size: 0.9em; margin-top: 4px; color: var(--text-secondary);">${desc}</div>` : '';

                return `<li><div style="font-weight: 500;">${title}</div>${descBlock}${techList}</li>`;
            }).join('');

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

    function renderContact(data) {
        if (!data.portfolio) return;
        const contact = data.portfolio.contact;

        const titleEl = document.getElementById('contact-title');
        const subtitleEl = document.getElementById('contact-subtitle');
        const ctaEl = document.getElementById('contact-cta');

        if (titleEl) titleEl.textContent = t(contact.title);
        if (subtitleEl) subtitleEl.textContent = t(contact.subtitle);
        if (ctaEl) ctaEl.textContent = t(contact.cta);
    }

    function renderFooter(data) {
        if (!data.portfolio) return;
        const footerEl = document.getElementById('footer-text');
        if (footerEl) footerEl.textContent = t(data.portfolio.footer.text);
    }

    function renderAll(data) {
        renderNav(data);
        renderHero(data);
        renderAbout(data);
        renderExperienceTitle(data);
        renderExperience(data);
        renderContact(data);
        renderFooter(data);
        initializeObserver();
    }

    // ─── Intersection Observer ────────────────────────────────────────────────
    function initializeObserver() {
        const revealElements = document.querySelectorAll('.reveal');
        const sectionObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target);
                }
            });
        }, { root: null, threshold: 0.1, rootMargin: '0px' });

        revealElements.forEach(el => sectionObserver.observe(el));
    }

    // ─── Fetch & Boot ─────────────────────────────────────────────────────────
    fetch('assets/data/content.json')
        .then(response => response.json())
        .then(data => {
            window.__contentData = data;
            renderAll(data);
        })
        .catch(error => console.error('Error loading content:', error));
});
