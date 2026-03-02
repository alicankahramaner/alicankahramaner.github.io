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
        let address = document.getElementById("address");
        if (address) {
            address.innerText = lang === 'tr' ? 'Address: ' : 'Adres: ';
        }
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
            const projects = item.projects || [];
            const projectsHtml = projects.map(p => {
                const title = t(p.name);
                const desc = t(p.description);
                const techList = Array.isArray(p.technologies) && p.technologies.length > 0
                    ? `<div class="project-tech" style="font-size: 0.85em; color: #555; margin-top: 2px;"><strong>Tech:</strong> ${p.technologies.join(', ')}</div>`
                    : '';
                const descBlock = desc ? `<div class="project-desc" style="font-size: 0.9em; margin-top: 4px; color: #444;">${desc}</div>` : '';

                return `<li style="margin-bottom: 8px;"><div style="font-weight: 500;">${title}</div>${descBlock}${techList}</li>`;
            }).join('');

            return `
                <article class="section__list-item">
                    <div class="left">
                        <h3 class="name">${item.company}</h3>
                        <div class="addr">${t(item.location)}</div>
                        <div class="duration">${item.date}</div>
                    </div>
                    <div class="right">
                        <h3 class="name">${item.role}</h3>
                        <hr />
                        <div class="desc">
                            <ul>${projectsHtml}</ul>
                        </div>
                    </div>
                </article>
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

        el.innerHTML = projectItems.map(item => {
            const firstProject = item.projects && item.projects.length > 0 ? t(item.projects[0].name) : '';
            const techList = item.projects && item.projects.length > 0 && Array.isArray(item.projects[0].technologies) && item.projects[0].technologies.length > 0
                ? `<div style="font-size: 0.85em; color: #555; margin-top: 4px;"><strong>Tech:</strong> ${item.projects[0].technologies.join(', ')}</div>`
                : '';
            return `
            <article class="section__list-item">
                <h3 class="name">${firstProject ? firstProject + ' - ' : ''}${item.company}</h3>
                <div class="text">${t(item.cvDescription)}</div>
                ${techList}
            </article>
            `;
        }).join('');
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
