document.addEventListener('DOMContentLoaded', () => {

    // ─── Language ─────────────────────────────────────────────────────────────
    let lang = localStorage.getItem('lang') || 'tr';

    function t(obj) {
        if (!obj || typeof obj !== 'object') return obj || '';
        return obj[lang] || obj['tr'] || '';
    }

    function setLang(newLang) {
        lang = newLang;
        localStorage.setItem('lang', lang);
        updateLangLabel();
        if (window.__cvData) renderCV(window.__cvData);
    }

    function updateLangLabel() {
        const label = document.getElementById('lang-label');
        if (label) label.textContent = lang === 'tr' ? 'EN' : 'TR';
    }

    const langToggleBtn = document.getElementById('lang-toggle');
    if (langToggleBtn) {
        updateLangLabel();
        langToggleBtn.addEventListener('click', () => setLang(lang === 'tr' ? 'en' : 'tr'));
    }

    // ─── Render CV ────────────────────────────────────────────────────────────
    function renderCV(data) {
        const cv = data.cv;
        const meta = data.meta;
        const experience = data.experience;
        const skills = data.skills;

        // Page title
        document.title = t(cv.pageTitle);

        // Header
        renderHeader(meta, cv);

        // Experience
        renderExperience(experience, cv);

        // Education
        renderEducation(cv);

        // Projects
        renderProjects(experience, cv);

        // Skills
        renderSkills(skills, cv);
    }

    function renderHeader(meta, cv) {
        const jobTitleEl = document.getElementById('cv-job-title');
        const aboutEl = document.getElementById('cv-about');

        if (jobTitleEl) jobTitleEl.textContent = t(cv.jobTitle);
        if (aboutEl) aboutEl.innerHTML = t(cv.about)
            .split('. ')
            .filter(s => s.trim())
            .map(s => `<p>${s.trim()}${s.trim().endsWith('.') ? '' : '.'}</p>`)
            .join('');
    }

    function renderExperience(experience, cv) {
        const titleEl = document.getElementById('section-experience-title');
        const containerEl = document.getElementById('cv-experience');

        if (titleEl) titleEl.textContent = t(cv.sections.experience);
        if (!containerEl) return;

        containerEl.innerHTML = experience.map(item => {
            const projects = t(item.projects);
            const projectsHtml = Array.isArray(projects)
                ? projects.map(p => `<li>${p}</li>`).join('')
                : '';

            return `
                <div class="section__list-item">
                    <div class="left">
                        <div class="name">${item.company}</div>
                        <div class="addr">${t(item.location)}</div>
                        <div class="duration">${item.date}</div>
                    </div>
                    <div class="right">
                        <div class="name">${item.role}</div>
                        <div class="desc">
                            <ul>${projectsHtml}</ul>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    function renderEducation(cv) {
        const titleEl = document.getElementById('section-education-title');
        const el = document.getElementById('cv-education');

        if (titleEl) titleEl.textContent = t(cv.sections.education);
        if (!el) return;

        const edu = cv.education;
        el.innerHTML = `
            <div class="section__list-item">
                <div class="left">
                    <div class="name">${t(edu.school)}</div>
                    <div class="name">${t(edu.dept)}</div>
                    <div class="addr">${t(edu.location)}</div>
                    <div class="duration">${edu.date}</div>
                </div>
            </div>
        `;
    }

    function renderProjects(experience, cv) {
        const titleEl = document.getElementById('section-projects-title');
        const el = document.getElementById('cv-projects');

        if (titleEl) titleEl.textContent = t(cv.sections.projects);
        if (!el) return;

        // Only items that have a cvDescription
        const projectItems = experience.filter(item => item.cvDescription);

        el.innerHTML = projectItems.map(item => `
            <div class="section__list-item">
                <div class="name">${Array.isArray(t(item.projects)) ? t(item.projects)[0] : ''} - ${item.company}</div>
                <div class="text">${t(item.cvDescription)}</div>
            </div>
        `).join('');
    }

    function renderSkills(skills, cv) {
        const langTitleEl = document.getElementById('section-skills-lang-title');
        const domainTitleEl = document.getElementById('section-skills-domain-title');
        const langEl = document.getElementById('cv-skills-language');
        const domainEl = document.getElementById('cv-skills-domain');

        if (langTitleEl) langTitleEl.textContent = t(cv.sections.skillsLang);
        if (domainTitleEl) domainTitleEl.textContent = t(cv.sections.skillsDomain);

        if (langEl) {
            langEl.innerHTML = skills.language.map(s => `<span>${s}</span>`).join('');
        }
        if (domainEl) {
            domainEl.innerHTML = skills.domain.map(s => `<span>${s}</span>`).join('');
        }
    }

    // ─── PDF Print ────────────────────────────────────────────────────────────
    const pdfBtn = document.getElementById('pdf-btn');
    if (pdfBtn) {
        pdfBtn.addEventListener('click', () => {
            const toolbar = document.querySelector('.cv-toolbar');
            if (toolbar) toolbar.style.display = 'none';
            window.print();
            if (toolbar) toolbar.style.display = '';
        });
    }

    // ─── Fetch & Boot ─────────────────────────────────────────────────────────
    fetch('../../assets/data/content.json')
        .then(response => response.json())
        .then(data => {
            window.__cvData = data;
            renderCV(data);
        })
        .catch(error => console.error('Error loading CV content:', error));
});
