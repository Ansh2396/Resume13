/**
 * ANSH PRATAP SINGH KUSHWAH - RESUME WEBSITE SCRIPT
 * Custom interactions, animations, and dynamic project case studies.
 */

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. NAVIGATION HEADER & MOBILE MENU
       ========================================================================== */
    const header = document.querySelector('.header');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Add scroll class for shrunk glass header styling
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuBtn.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close menu when clicking links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileMenuBtn.classList.contains('active')) {
                mobileMenuBtn.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    });


    /* ==========================================================================
       2. TYPING SUBTITLE ANIMATION
       ========================================================================== */
    const typingText = document.getElementById('typing-text');
    const roles = [
        "Machine Learning Enthusiast.",
        "Data Analytics Enthusiast.",
        "Computer Science Undergraduate."
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeEffect() {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            // Deleting character
            typingText.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50; // Delete faster
        } else {
            // Typing character
            typingText.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        // Handle states
        if (!isDeleting && charIndex === currentRole.length) {
            // Wait before deleting
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            // Move to next role
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typingSpeed = 500; // Pause before typing next
        }

        setTimeout(typeEffect, typingSpeed);
    }

    if (typingText) {
        setTimeout(typeEffect, 1000);
    }


    /* ==========================================================================
       3. INTERSECTION OBSERVER (SCROLL REVEAL & SKILLS ANIMATION & SCROLL SPY)
       ========================================================================== */
    const sections = document.querySelectorAll('section');
    const revealElements = document.querySelectorAll('.scroll-reveal');
    const skillBars = document.querySelectorAll('.skill-bar-fill');

    // Reveal elements on scroll
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // If it is the skills section, animate progress bars
                if (entry.target.id === 'skills') {
                    animateSkills();
                }
            }
        });
    }, {
        threshold: 0.15
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // Force animation trigger for skills if already in view
    function animateSkills() {
        skillBars.forEach(bar => {
            const percentage = bar.parentElement.previousElementSibling.querySelector('.skill-percentage').textContent;
            bar.style.width = percentage;
        });
    }

    // ScrollSpy: Update active nav links
    const scrollSpyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: "-20% 0px -60% 0px" // Focus center of viewport
    });

    sections.forEach(sec => scrollSpyObserver.observe(sec));


    /* ==========================================================================
       4. PROJECTS GRID CATEGORY FILTER
       ========================================================================== */
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state in buttons
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                
                if (filterValue === 'all' || cardCategory === filterValue) {
                    card.classList.remove('hidden');
                    // Add micro-animation fade-in
                    card.style.animation = 'fadeInUp 0.4s ease forwards';
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });


    /* ==========================================================================
       5. PROJECT DETAILED CASE STUDIES (MODAL POPUP)
       ========================================================================== */
    const projectModal = document.getElementById('project-modal');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const modalBadge = document.getElementById('modal-badge');
    const modalTitle = document.getElementById('modal-title');
    const modalBodyContent = document.getElementById('modal-body-content');
    const viewDetailsButtons = document.querySelectorAll('.view-details-btn');

    // Case studies database
    const caseStudies = {
        house: {
            badge: "Machine Learning / Regression",
            title: "House Price Prediction",
            content: `
                <div>
                    <h3 class="modal-section-title"><i class="fa-solid fa-file-invoice"></i> Executive Summary</h3>
                    <p>Designed and built a precise real estate estimation engine using regression pipelines in Python. The model helps predict residential values based on physical and environmental parameters, allowing buyers and realtors to gauge fair market valuations.</p>
                </div>
                <div>
                    <h3 class="modal-section-title"><i class="fa-solid fa-list-check"></i> Methodology & Pipeline</h3>
                    <p>Conducted extensive outlier pruning utilizing <strong>Isolation Forest</strong> on square footage and price targets. Managed skewness in target columns by applying a logarithmic log-1p transform. Features were normalized using StandardScaler, and recursive feature elimination (RFE) isolated 12 high-correlation factors (e.g., location score, size, age, and local crime index).</p>
                </div>
                <div>
                    <h3 class="modal-section-title"><i class="fa-solid fa-chart-simple"></i> Model Architecture & Performance</h3>
                    <div class="modal-metrics-grid">
                        <div class="metric-box">
                            <span class="metric-val">92.4%</span>
                            <span class="metric-lbl">R² Score</span>
                        </div>
                        <div class="metric-box">
                            <span class="metric-val">$14,210</span>
                            <span class="metric-lbl">RMSE Error</span>
                        </div>
                        <div class="metric-box">
                            <span class="metric-val">GridSearch</span>
                            <span class="metric-lbl">Hyper-tuning</span>
                        </div>
                    </div>
                    <p>Compared Ordinary Least Squares (OLS) Regression, Ridge, Lasso, and Random Forest regressors. Random Forest Regressor performed exceptionally well after hyperparameter optimization, capturing non-linear geographical correlations perfectly.</p>
                </div>
                <div>
                    <h3 class="modal-section-title"><i class="fa-solid fa-toolbox"></i> Technology Toolkit</h3>
                    <div class="tool-tags">
                        <span class="tag">Python</span>
                        <span class="tag">Scikit-learn</span>
                        <span class="tag">Pandas</span>
                        <span class="tag">NumPy</span>
                        <span class="tag">Matplotlib</span>
                        <span class="tag">Seaborn</span>
                    </div>
                </div>
            `
        },
        cancer: {
            badge: "Machine Learning / Classification",
            title: "Breast Cancer Classification",
            content: `
                <div>
                    <h3 class="modal-section-title"><i class="fa-solid fa-file-invoice"></i> Executive Summary</h3>
                    <p>Implemented clinical diagnostic classification models to detect benign vs malignant tumor growths from diagnostic biopsies. By automating this, the model provides an auxiliary diagnosis validation step for lab experts, minimizing false negative diagnostic mistakes.</p>
                </div>
                <div>
                    <h3 class="modal-section-title"><i class="fa-solid fa-list-check"></i> Methodology & Pipeline</h3>
                    <p>Parsed fine-needle aspirate (FNA) digitized measurements from the UCI Wisconsin Breast Cancer dataset. Evaluated feature density profiles, correlation matrices, and engineered scaling features. Implemented strict Principal Component Analysis (PCA) to condense 30 dimensional inputs into 8 essential orthogonal components, avoiding model overfitting.</p>
                </div>
                <div>
                    <h3 class="modal-section-title"><i class="fa-solid fa-chart-simple"></i> Model Architecture & Performance</h3>
                    <div class="modal-metrics-grid">
                        <div class="metric-box">
                            <span class="metric-val">96.8%</span>
                            <span class="metric-lbl">Accuracy Score</span>
                        </div>
                        <div class="metric-box">
                            <span class="metric-val">97.2%</span>
                            <span class="metric-lbl">F1-Score</span>
                        </div>
                        <div class="metric-box">
                            <span class="metric-val">0.982</span>
                            <span class="metric-lbl">ROC-AUC</span>
                        </div>
                    </div>
                    <p>Designed and compared a <strong>Logistic Regression</strong> model with a <strong>Decision Tree Classifier</strong>. Logistic regression with L2 regularization achieved maximum classification accuracy while maintaining excellent recall metrics (critical to prevent false-negative cancer diagnostics).</p>
                </div>
                <div>
                    <h3 class="modal-section-title"><i class="fa-solid fa-toolbox"></i> Technology Toolkit</h3>
                    <div class="tool-tags">
                        <span class="tag">Logistic Regression</span>
                        <span class="tag">Decision Tree</span>
                        <span class="tag">Python</span>
                        <span class="tag">Scikit-learn</span>
                        <span class="tag">Exploratory Data Analysis</span>
                        <span class="tag">PCA</span>
                    </div>
                </div>
            `
        },
        car: {
            badge: "Machine Learning / Regression & Feature Engineering",
            title: "Car Price Prediction",
            content: `
                <div>
                    <h3 class="modal-section-title"><i class="fa-solid fa-file-invoice"></i> Executive Summary</h3>
                    <p>Developed a machine learning model to estimate vehicle values based on multi-dimensional real-world automotive datasets. The model accounts for metrics such as depreciation, brand value, odometer index, fuel economy, and mechanical attributes.</p>
                </div>
                <div>
                    <h3 class="modal-section-title"><i class="fa-solid fa-list-check"></i> Methodology & Pipeline</h3>
                    <p>Implemented structural target-encoding for complex categorical columns (manufacturer, design types). Engineered custom composite features, such as <i>Depreciation Coefficient</i> (age-to-mileage ratio) and <i>Fuel Index Score</i>. Managed standard data cleaning loops including mean-imputation for numerical factors.</p>
                </div>
                <div>
                    <h3 class="modal-section-title"><i class="fa-solid fa-chart-simple"></i> Model Architecture & Performance</h3>
                    <div class="modal-metrics-grid">
                        <div class="metric-box">
                            <span class="metric-val">94.1%</span>
                            <span class="metric-lbl">R² Score</span>
                        </div>
                        <div class="metric-box">
                            <span class="metric-val">5.8%</span>
                            <span class="metric-lbl">MAPE Error</span>
                        </div>
                        <div class="metric-box">
                            <span class="metric-val">RandomForest</span>
                            <span class="metric-lbl">Best Algorithm</span>
                        </div>
                    </div>
                    <p>Compared Linear Regression, Decision Trees, and <strong>Random Forest Regressor</strong>. The tuned Random Forest model demonstrated the lowest Mean Absolute Percentage Error (MAPE), accurately adjusting pricing for high-end brands and high odometer mileage vehicles.</p>
                </div>
                <div>
                    <h3 class="modal-section-title"><i class="fa-solid fa-toolbox"></i> Technology Toolkit</h3>
                    <div class="tool-tags">
                        <span class="tag">Python</span>
                        <span class="tag">Scikit-learn</span>
                        <span class="tag">Pandas</span>
                        <span class="tag">NumPy</span>
                        <span class="tag">Feature Engineering</span>
                        <span class="tag">Tableau</span>
                    </div>
                </div>
            `
        },
        chatbot: {
            badge: "Natural Language Processing / Artificial Intelligence",
            title: "AI Chatbot Engine",
            content: `
                <div>
                    <h3 class="modal-section-title"><i class="fa-solid fa-file-invoice"></i> Executive Summary</h3>
                    <p>Created an intent recognition conversational chatbot using natural language pipelines. The agent processes text input queries, determines underlying user intentions, and returns contextual customer support-oriented responses.</p>
                </div>
                <div>
                    <h3 class="modal-section-title"><i class="fa-solid fa-list-check"></i> Methodology & Pipeline</h3>
                    <p>Built a localized NLP text processing utility. Implemented regex sanitization, tokenization, stop-word elimination, and word-lemmatization using the <strong>NLTK</strong> package. Queries were encoded into bag-of-words arrays and vectorized to identify semantic similarity matching.</p>
                </div>
                <div>
                    <h3 class="modal-section-title"><i class="fa-solid fa-chart-simple"></i> Model Architecture & Performance</h3>
                    <div class="modal-metrics-grid">
                        <div class="metric-box">
                            <span class="metric-val">91.5%</span>
                            <span class="metric-lbl">Intent Precision</span>
                        </div>
                        <div class="metric-box">
                            <span class="metric-val">120ms</span>
                            <span class="metric-lbl">Response Delay</span>
                        </div>
                        <div class="metric-box">
                            <span class="metric-val">NLTK</span>
                            <span class="metric-lbl">NLP Library</span>
                        </div>
                    </div>
                    <p>Optimized classification thresholds, allowing the bot to identify fallback intents when confidence fell below 65%. Implemented robust intent matching using cosine similarity measurements to match user inputs against static pre-mapped knowledge matrices.</p>
                </div>
                <div>
                    <h3 class="modal-section-title"><i class="fa-solid fa-toolbox"></i> Technology Toolkit</h3>
                    <div class="tool-tags">
                        <span class="tag">Natural Language Processing</span>
                        <span class="tag">Python</span>
                        <span class="tag">NLTK</span>
                        <span class="tag">Intent Recognition</span>
                        <span class="tag">Text Classification</span>
                    </div>
                </div>
            `
        },
        astream: {
            badge: "Web Application / Media Streaming",
            title: "Astream VLC-like Web Player",
            content: `
                <div>
                    <h3 class="modal-section-title"><i class="fa-solid fa-file-invoice"></i> Executive Summary</h3>
                    <p>Developed Astream, a responsive, web-based media streaming application inspired by VLC Media Player. Designed to allow users to upload, catalog, search, and stream audio and video content directly in the browser. Hosted live at <a href="https://ansh2396.github.io/Astream.github.io/" target="_blank" style="color: var(--accent-cyan); text-decoration: underline;">ansh2396.github.io/Astream.github.io</a>.</p>
                </div>
                <div>
                    <h3 class="modal-section-title"><i class="fa-solid fa-gears"></i> Backend & Database Architecture</h3>
                    <p>Built a robust server architecture utilizing <strong>Flask (3.0.2)</strong>. Managed relational database entities, user accounts, and media metadata using <strong>Flask-SQLAlchemy (3.1.1)</strong> with automated schema migrations. Integrated secure password hashing and session management to isolate user content libraries.</p>
                </div>
                <div>
                    <h3 class="modal-section-title"><i class="fa-solid fa-photo-film"></i> Media Processing & UI</h3>
                    <p>Utilized <strong>Pillow (10.2.0)</strong> for advanced image manipulation: automated thumbnail generation from uploaded video frames, profile avatar cropping, and dynamic cover art resizing. Created a sleek, VLC-inspired interface using HTML5 video/audio elements with customized controls (playback speed, volume boosting, theater mode, and playlist queueing).</p>
                </div>
                <div>
                    <h3 class="modal-section-title"><i class="fa-solid fa-chart-simple"></i> System Performance & Metrics</h3>
                    <div class="modal-metrics-grid">
                        <div class="metric-box">
                            <span class="metric-val">100%</span>
                            <span class="metric-lbl">Responsive HTML5</span>
                        </div>
                        <div class="metric-box">
                            <span class="metric-val">&lt; 150ms</span>
                            <span class="metric-lbl">Query Latency</span>
                        </div>
                        <div class="metric-box">
                            <span class="metric-val">Auto</span>
                            <span class="metric-lbl">Thumbnail Gen</span>
                        </div>
                    </div>
                    <p>Optimized SQL queries through eager loading relationships in SQLAlchemy, minimizing N+1 query overhead. Configured static asset caching to serve thumbnail files and cover arts efficiently.</p>
                </div>
                <div>
                    <h3 class="modal-section-title"><i class="fa-solid fa-toolbox"></i> Technology Toolkit</h3>
                    <div class="tool-tags">
                        <span class="tag">Flask 3.0.2</span>
                        <span class="tag">SQLAlchemy 3.1.1</span>
                        <span class="tag">Pillow 10.2.0</span>
                        <span class="tag">SQLite/MySQL</span>
                        <span class="tag">HTML5 Media API</span>
                        <span class="tag">JavaScript</span>
                    </div>
                </div>
            `
        }
    };

    // Open Modal function
    function openModal(projectKey) {
        const data = caseStudies[projectKey];
        if (!data) return;

        modalBadge.textContent = data.badge;
        modalTitle.textContent = data.title;
        modalBodyContent.innerHTML = data.content;

        projectModal.classList.remove('hidden');
        document.body.style.overflow = 'hidden'; // Stop background scrolling
    }

    // Close Modal function
    function closeModal() {
        projectModal.classList.add('hidden');
        document.body.style.overflow = 'auto'; // Re-enable background scrolling
    }

    // Attach Event Listeners to View Details buttons
    viewDetailsButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const projectKey = btn.getAttribute('data-project');
            openModal(projectKey);
        });
    });

    // Close modal triggers
    if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
    
    // Close modal clicking overlay background
    if (projectModal) {
        projectModal.addEventListener('click', (e) => {
            if (e.target === projectModal) {
                closeModal();
            }
        });
    }

    // Close modal using escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !projectModal.classList.contains('hidden')) {
            closeModal();
        }
    });


    /* ==========================================================================
       6. GLASSMORPHIC CONTACT FORM LOGIC (MOCK SUBMISSION)
       ========================================================================== */
    const contactForm = document.getElementById('contact-form');
    const successOverlay = document.getElementById('form-success-overlay');
    const closeSuccessBtn = document.getElementById('close-success-btn');

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Fetch form fields
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;

            // Submit Button Loader State
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnHtml = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = `<span>Sending...</span> <i class="fa-solid fa-spinner fa-spin"></i>`;

            // Submit to FormSubmit AJAX endpoint
            fetch("https://formsubmit.co/ajax/thakuransh6268@gmail.com", {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    _subject: subject,
                    message: message
                })
            })
            .then(response => response.json())
            .then(data => {
                // Restore button
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnHtml;

                if (data.success === "true" || data.success === true) {
                    // Reset form fields
                    contactForm.reset();
                    // Trigger Success overlay visual
                    successOverlay.classList.remove('hidden');
                } else {
                    alert("Submission failed. Please try again.");
                }
            })
            .catch(error => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnHtml;
                alert("An error occurred. Please try again later.");
                console.error("Form error:", error);
            });
        });

    // Close success overlay trigger
    if (closeSuccessBtn && successOverlay) {
        closeSuccessBtn.addEventListener('click', () => {
            successOverlay.classList.add('hidden');
        });
    }
});

// Utility filter fadeInUp animation style injection
const styleSheet = document.createElement("style");
styleSheet.innerText = `
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
`;
document.head.appendChild(styleSheet);
