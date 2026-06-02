/* -------------------------------------------------------------
   APP INITIALIZATION & CORE INTERACTIVE LOGIC
   ------------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
    // Lucide Icons initialization
    lucide.createIcons();

    // App State Configuration
    const state = {
        activeTab: "home",
        selectedProject: 0,
        activeTypingTimeout: null
    };

    /* -------------------------------------------------------------
       TYPEWRITER TEXT MECHANIC
       ------------------------------------------------------------- */
    const typewriterGreeting = document.getElementById("typewriter-greeting");
    const originalGreetingText = typewriterGreeting ? typewriterGreeting.innerText : "";

    function runTypewriter(textElement, rawString, delay = 15) {
        if (!textElement) return;

        // Clear active timer
        if (state.activeTypingTimeout) {
            clearTimeout(state.activeTypingTimeout);
        }

        textElement.innerHTML = "";
        let index = 0;

        function type() {
            if (index < rawString.length) {
                textElement.innerHTML += rawString.charAt(index);
                index++;
                state.activeTypingTimeout = setTimeout(type, delay);
            }
        }

        type();
    }

    // Run Typewriter on initial Home load
    if (typewriterGreeting) {
        runTypewriter(typewriterGreeting, originalGreetingText);
    }

    /* -------------------------------------------------------------
       TABS ROUTING & PANEL SWITCHER
       ------------------------------------------------------------- */
    const navButtons = document.querySelectorAll(".nav-btn");
    const tabPanels = document.querySelectorAll(".tab-panel");

    function switchTab(targetTabId) {
        if (state.activeTab === targetTabId) return;

        state.activeTab = targetTabId;

        // Visual highlights of navigation buttons
        navButtons.forEach(btn => {
            if (btn.getAttribute("data-tab") === targetTabId) {
                btn.classList.add("active");
            } else {
                btn.classList.remove("active");
            }
        });

        // Toggle panel section displays
        tabPanels.forEach(panel => {
            if (panel.id === `${targetTabId}-panel`) {
                panel.classList.add("active");
            } else {
                panel.classList.remove("active");
            }
        });

        // Trigger side-effects based on target panel
        if (targetTabId === "home") {
            runTypewriter(typewriterGreeting, originalGreetingText);
        } else if (targetTabId === "projects") {
            renderProjectDisplay();
        } else if (targetTabId === "skills") {
            resetInspector();
        }

        // Scroll main viewport back to top on transitions
        const contentArea = document.getElementById("tab-content-area");
        if (contentArea) {
            contentArea.scrollTop = 0;
        }
    }

    navButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            switchTab(btn.getAttribute("data-tab"));
        });
    });

    /* -------------------------------------------------------------
       PROJECT DETAIL DISPLAY PANEL MANAGER
       ------------------------------------------------------------- */
    const projectData = [
        {
            title: "Blood Donation Management System",
            level: 18,
            desc: "Final Year Project (FYP) developed for Hospital Machang. A complete blood supply management platform coordinating donor recruitment campaigns, reservation tracking, blood group distribution diagnostics, and automatic low-stock threshold notifications.",
            tech: ["PHP", "MySQL", "JavaScript ES6", "XAMPP Stack", "Bootstrap", "System Architecture"],
            mockup: `
                <div class="project-screenshot-container">
                    <div class="mockup-window-header">
                        <div class="mockup-window-dots">
                            <span class="mockup-window-dot red"></span>
                            <span class="mockup-window-dot yellow"></span>
                            <span class="mockup-window-dot green"></span>
                        </div>
                        <span class="mockup-window-address">localhost/bdms-machang/dashboard.php</span>
                    </div>
                    <div class="screenshot-scroll-wrapper">
                        <img src="img/bdms.png" alt="Blood Donation System" class="screenshot-img scrollable">
                    </div>
                </div>
            `
        },
        {
            title: "MyBeachCare",
            level: 15,
            desc: "Community-driven environmental reports and beach maintenance logging application. Connects local municipal councils and active volunteers with reporting tools for beach pollution, cleaning activities coordination, and public conservation resources.",
            tech: ["PHP", "MySQL", "JavaScript ES6", "Responsive CSS Grid", "XAMPP", "Leaflet Map API"],
            mockup: `
                <div class="project-screenshot-container">
                    <div class="mockup-window-header">
                        <div class="mockup-window-dots">
                            <span class="mockup-window-dot red"></span>
                            <span class="mockup-window-dot yellow"></span>
                            <span class="mockup-window-dot green"></span>
                        </div>
                        <span class="mockup-window-address">localhost/mybeachcare/index.php</span>
                    </div>
                    <div class="screenshot-scroll-wrapper">
                        <img src="img/mybeachcare.png" alt="MyBeachCare" class="screenshot-img scrollable">
                    </div>
                </div>
            `
        },
        {
            title: "HTML & CSS Interactive Lessons",
            level: 10,
            desc: "A collection of interactive HTML & CSS coursework lessons hosted on GitHub Pages. Features hands-on coding exercises, visual demonstrations of CSS properties, and structured learning modules covering layout techniques, responsive design, and modern styling patterns.",
            tech: ["HTML", "CSS", "GitHub Pages", "Responsive Design", "Interactive Demos"],
            link: "https://dilaarifin.github.io/Coursework/",
            mockup: `
                <div class="project-screenshot-container">
                    <div class="mockup-window-header">
                        <div class="mockup-window-dots">
                            <span class="mockup-window-dot red"></span>
                            <span class="mockup-window-dot yellow"></span>
                            <span class="mockup-window-dot green"></span>
                        </div>
                        <span class="mockup-window-address">dilaarifin.github.io/Coursework/</span>
                    </div>
                    <div class="screenshot-scroll-wrapper">
                        <img src="img/coursework.png" alt="HTML & CSS Interactive Lessons" class="screenshot-img scrollable">
                    </div>
                </div>
            `
        },
        {
            title: "MachangLatte Cafe Order System",
            level: 14,
            desc: "Web-based point-of-sale and menu management portal customized for MachangLatte cafe. Facilitates table scanning, queue processing, inventory checkups, dynamic price adjustments, and receipt generation scripts.",
            tech: ["PHP", "MySQL", "JavaScript", "XAMPP", "Vanilla CSS Flexbox", "Database Normalization"],
            mockup: `
                <div class="project-screenshot-container">
                    <div class="mockup-window-header">
                        <div class="mockup-window-dots">
                            <span class="mockup-window-dot red"></span>
                            <span class="mockup-window-dot yellow"></span>
                            <span class="mockup-window-dot green"></span>
                        </div>
                        <span class="mockup-window-address">localhost/machanglatte/shop.php</span>
                    </div>
                    <div class="screenshot-scroll-wrapper">
                        <img src="img/machanglatte.png" alt="MachangLatte" class="screenshot-img scrollable">
                    </div>
                </div>
            `
        },
        {
            title: "Student Grade C++ Program",
            level: 10,
            desc: "A terminal-based student database and grading utility engineered in C++. Features weighted grade assessments, GPA computation metrics, performance tier rankings, and flat-file logging mechanics for persistent student records.",
            tech: ["C++", "Object-Oriented Programming", "CLI Design", "File Streams", "Academic Algorithms"],
            mockup: `
                <div class="project-screenshot-container">
                    <div class="mockup-window-header">
                        <div class="mockup-window-dots">
                            <span class="mockup-window-dot red"></span>
                            <span class="mockup-window-dot yellow"></span>
                            <span class="mockup-window-dot green"></span>
                        </div>
                        <span class="mockup-window-address">student_grade.cpp</span>
                    </div>
                    <div class="screenshot-scroll-wrapper">
                        <img src="img/studentgradec.png" alt="Student Grade C++ Program" class="screenshot-img fit-center">
                    </div>
                </div>
            `
        },
        {
            title: "iLIBS Library Management System",
            level: 12,
            desc: "An Integrated Library System (ILS) designed with a deep library science understanding. Integrates search index catalogs, loan checkouts ledger logging, overdue penalty calculators, and book indexing utilities.",
            tech: ["Python", "SQL", "SQLite Database", "Data Structures", "Metadata Indexing"],
            mockup: `
                <div class="project-screenshot-container">
                    <div class="mockup-window-header">
                        <div class="mockup-window-dots">
                            <span class="mockup-window-dot red"></span>
                            <span class="mockup-window-dot yellow"></span>
                            <span class="mockup-window-dot green"></span>
                        </div>
                        <span class="mockup-window-address">ilibs_terminal.py</span>
                    </div>
                    <div class="screenshot-scroll-wrapper">
                        <img src="img/ilibs.png" alt="iLIBS Library System" class="screenshot-img fit-center">
                    </div>
                </div>
            `
        },
        {
            title: "Gotham School Student System",
            level: 11,
            desc: "A school records management application. Performs standard CRUD operations for student enrollments, exam records logging, class assignments tracker, and reports generator script.",
            tech: ["Python", "Object-Oriented Programming", "JSON File Storage", "CLI Design", "System Validation"],
            mockup: `
                <div class="project-screenshot-container">
                    <div class="mockup-window-header">
                        <div class="mockup-window-dots">
                            <span class="mockup-window-dot red"></span>
                            <span class="mockup-window-dot yellow"></span>
                            <span class="mockup-window-dot green"></span>
                        </div>
                        <span class="mockup-window-address">gotham_academy.py</span>
                    </div>
                    <div class="screenshot-scroll-wrapper">
                        <img src="img/gotham.png" alt="Gotham School System" class="screenshot-img fit-center">
                    </div>
                </div>
            `
        }
    ];

    const projectButtons = document.querySelectorAll(".project-list-btn");

    function renderProjectDisplay() {
        const data = projectData[state.selectedProject];
        if (!data) return;

        // Dynamic labels text binding
        const lvlTag = document.getElementById("proj-lvl-tag");
        const titleTag = document.getElementById("proj-title");
        const descTag = document.getElementById("proj-desc");
        const canvasTag = document.getElementById("proj-mockup-canvas");
        const badgesContainer = document.getElementById("proj-tech-badges");

        if (lvlTag) lvlTag.innerText = `LEVEL REQ: ${data.level}`;
        if (titleTag) titleTag.innerText = data.title;
        if (descTag) descTag.innerText = data.desc;
        if (canvasTag) canvasTag.innerHTML = data.mockup;

        // Render equipped item badges
        if (badgesContainer) {
            badgesContainer.innerHTML = "";
            data.tech.forEach(item => {
                const span = document.createElement("span");
                span.className = "tech-badge";
                span.innerHTML = `<i data-lucide="check-square"></i> ${item}`;
                badgesContainer.appendChild(span);
            });
        }

        // Render or remove live site link button
        const detailFooter = badgesContainer ? badgesContainer.parentElement : null;
        let liveLinkBtn = document.getElementById("proj-live-link");
        if (data.link) {
            if (!liveLinkBtn && detailFooter) {
                liveLinkBtn = document.createElement("a");
                liveLinkBtn.id = "proj-live-link";
                liveLinkBtn.className = "project-live-link-btn";
                liveLinkBtn.target = "_blank";
                liveLinkBtn.rel = "noopener noreferrer";
                detailFooter.appendChild(liveLinkBtn);
            }
            if (liveLinkBtn) {
                liveLinkBtn.href = data.link;
                liveLinkBtn.innerHTML = `<i data-lucide="external-link"></i> Visit Live Site`;
                liveLinkBtn.classList.remove("hidden");
            }
        } else {
            if (liveLinkBtn) liveLinkBtn.classList.add("hidden");
        }

        // Trigger Lucide icons processing for injected dynamic mockups
        lucide.createIcons();
    }

    projectButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const index = parseInt(btn.getAttribute("data-proj"));
            if (state.selectedProject === index) return;

            state.selectedProject = index;

            // Highlight chosen buttons list
            projectButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            // Redraw panel detail fields
            renderProjectDisplay();
        });
    });

    /* -------------------------------------------------------------
       SPELLBOOK INVENTORY SLOT INSPECTOR & FILTERS
       ------------------------------------------------------------- */
    const inventorySlots = document.querySelectorAll(".inventory-slot");
    const itemInspectorPanel = document.getElementById("item-inspector-panel");
    const itemDetailFields = document.getElementById("item-detail-fields");

    const inspectRarity = document.getElementById("inspect-rarity");
    const inspectName = document.getElementById("inspect-name");
    const inspectPower = document.getElementById("inspect-power");
    const inspectPowerNum = document.getElementById("inspect-power-num");
    const inspectDesc = document.getElementById("inspect-desc");

    function showItemDetails(slot) {
        if (!slot) return;

        const name = slot.getAttribute("data-name");
        const rarity = slot.getAttribute("data-rarity");
        const power = slot.getAttribute("data-pow");
        const desc = slot.getAttribute("data-desc");

        // Hide prompt placeholder, show details layout block
        if (itemInspectorPanel) {
            const prompt = itemInspectorPanel.querySelector(".inspector-prompt");
            if (prompt) prompt.classList.add("hidden");
        }
        if (itemDetailFields) itemDetailFields.classList.remove("hidden");

        // Set metadata properties
        if (inspectName) inspectName.innerText = name;
        if (inspectRarity) {
            inspectRarity.innerText = rarity.toUpperCase();
            inspectRarity.className = `item-rarity ${rarity}`;
        }

        if (inspectPower) inspectPower.style.width = power;
        if (inspectPowerNum) inspectPowerNum.innerText = power;
        if (inspectDesc) inspectDesc.innerText = desc;
    }

    function resetInspector() {
        if (itemInspectorPanel) {
            const prompt = itemInspectorPanel.querySelector(".inspector-prompt");
            if (prompt) prompt.classList.remove("hidden");
        }
        if (itemDetailFields) itemDetailFields.classList.add("hidden");
    }

    inventorySlots.forEach(slot => {
        // Show details on slot hover
        slot.addEventListener("mouseenter", () => {
            showItemDetails(slot);
        });

        // Show details and lock on slot click
        slot.addEventListener("click", () => {
            showItemDetails(slot);
        });
    });

    // Inventory category buttons filters
    const filterButtons = document.querySelectorAll(".filter-btn");
    filterButtons.forEach(fbtn => {
        fbtn.addEventListener("click", () => {
            const filterValue = fbtn.getAttribute("data-filter");

            // Toggle filter button highlights
            filterButtons.forEach(f => f.classList.remove("active"));
            fbtn.classList.add("active");

            // Filter grid cells visually
            inventorySlots.forEach(slot => {
                const category = slot.getAttribute("data-cat");
                if (filterValue === "all" || category === filterValue) {
                    slot.classList.remove("slot-filtered");
                } else {
                    slot.classList.add("slot-filtered");
                }
            });

            // Resets side preview description
            resetInspector();
        });
    });

    /* -------------------------------------------------------------
       CONTACT TERMINAL LOGS & DIRECT MESSAGE FORM
       ------------------------------------------------------------- */
    const contactOptionsList = document.getElementById("contact-options-list");
    const contactChatLog = document.getElementById("contact-chat-log");
    const messageFormContainer = document.getElementById("message-form-container");
    const cancelFormBtn = document.getElementById("cancel-form-btn");

    function addDialogueRow(speaker, text, speakerClass) {
        if (!contactChatLog) return;

        const row = document.createElement("p");
        row.className = `chat-line ${speakerClass}`;
        row.innerHTML = `<span class="speaker">${speaker}:</span> "${text}"`;
        contactChatLog.appendChild(row);

        // Auto-scroll terminal dialog screen to bottom
        contactChatLog.scrollTop = contactChatLog.scrollHeight;
    }

    // Handles contact choices triggers
    if (contactOptionsList) {
        contactOptionsList.querySelectorAll(".choice-btn").forEach(choiceBtn => {
            choiceBtn.addEventListener("click", () => {
                const action = choiceBtn.getAttribute("data-action");

                if (action === "email") {
                    addDialogueRow("Recruiter", "Selecting email address option...", "visitor");
                    setTimeout(() => {
                        addDialogueRow("Dila", "Direct email portal configured at mikacker9@gmail.com. Opening client inbox link!", "dila");
                        window.location.href = "mailto:mikacker9@gmail.com";
                    }, 400);
                }
                else if (action === "linkedin") {
                    addDialogueRow("Recruiter", "Accessing LinkedIn profile network...", "visitor");
                    setTimeout(() => {
                        addDialogueRow("Dila", "Opening LinkedIn portal in new catalog window. Connection saved!", "dila");
                        window.open("https://www.linkedin.com/in/fadhilah-arifin", "_blank");
                    }, 400);
                }
                else if (action === "github") {
                    addDialogueRow("Recruiter", "Inspecting GitHub repository codebases...", "visitor");
                    setTimeout(() => {
                        addDialogueRow("Dila", "Opening GitHub terminal profile in new portal window!", "dila");
                        window.open("https://github.com/dilaarifin", "_blank");
                    }, 400);
                }
                else if (action === "message") {
                    addDialogueRow("Recruiter", "Deploying direct message scroll composer...", "visitor");
                    setTimeout(() => {
                        if (messageFormContainer) messageFormContainer.classList.remove("hidden");
                        contactOptionsList.classList.add("hidden");
                    }, 300);
                }
            });
        });
    }

    if (cancelFormBtn) {
        cancelFormBtn.addEventListener("click", () => {
            if (messageFormContainer) messageFormContainer.classList.add("hidden");
            if (contactOptionsList) contactOptionsList.classList.remove("hidden");
        });
    }

    // Global handles for Formspree dispatch submission
    window.handleFormSubmit = function () {
        const nameInput = document.getElementById("form-sender-name") ? document.getElementById("form-sender-name").value : "";
        const msgInput = document.getElementById("form-msg") ? document.getElementById("form-msg").value : "";

        const form = document.getElementById("contact-rpg-form");
        const successAlert = document.getElementById("form-success-alert");

        if (form) form.classList.add("hidden");
        if (successAlert) successAlert.classList.remove("hidden");

        // Log inside dialogue terminal logger
        addDialogueRow(nameInput || "Visitor", `Dispatched custom scroll details: [${msgInput.substring(0, 30)}...]`, "visitor");

        setTimeout(() => {
            addDialogueRow("Dila", `Thank you, ${nameInput || 'visitor'}! Message saved to my email scrolls. I will contact you ASAP!`, "dila");
        }, 600);

        // Submit via standard DOM Formspree integration after visual feedback
        setTimeout(() => {
            if (form) form.submit();
        }, 1400);
    };

    /* -------------------------------------------------------------
       SCREENSHOT LIGHTBOX MODAL HANDLER
       ------------------------------------------------------------- */
    const screenshotModal = document.getElementById("screenshot-modal");
    const modalImage = document.getElementById("modal-image");
    const modalCloseBtn = document.getElementById("modal-close-btn");
    const canvasTag = document.getElementById("proj-mockup-canvas");

    function openLightbox(src) {
        if (!screenshotModal || !modalImage) return;
        modalImage.src = src;
        screenshotModal.classList.remove("hidden");
    }

    function closeLightbox() {
        if (!screenshotModal) return;
        screenshotModal.classList.add("hidden");
    }

    if (canvasTag) {
        // Event delegation to capture click on images inside mockup canvas
        canvasTag.addEventListener("click", (e) => {
            const img = e.target.closest(".screenshot-img");
            if (img) {
                openLightbox(img.src);
            }
        });
    }

    if (modalCloseBtn) {
        modalCloseBtn.addEventListener("click", closeLightbox);
    }

    if (screenshotModal) {
        // Close when clicking the background overlay
        screenshotModal.addEventListener("click", (e) => {
            if (e.target === screenshotModal) {
                closeLightbox();
            }
        });
    }

    // Escape key listener to close lightbox
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            closeLightbox();
        }
    });
});
